import { Component } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { ModalController, NavController } from '@ionic/angular';
import { AssignmentModalComponent } from './assignment-modal.component';
import { ActivatedRoute } from '@angular/router';

interface DatoAsignatura {
  seccion: string;
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage {
  mensaje: string = '';
  textoEscaneado: string = '';

  // Datos para cada asignatura
  datosIngles: DatoAsignatura[] = [];
  datosProgramacion: DatoAsignatura[] = [];
  datosEstadistica: DatoAsignatura[] = [];
  datosCalidad: DatoAsignatura[] = [];
  datosArquitectura: DatoAsignatura[] = [];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Escuchar los parámetros pasados desde Home
    this.route.queryParams.subscribe((params) => {
      if (params['seccion'] && params['fecha'] && params['estado']) {
        this.procesarDatos(JSON.stringify(params));
      }
    });
  }

  async escanear() {
    try {
      const resultado = await BarcodeScanner.scan();

      if (resultado?.code) {
        this.textoEscaneado = resultado.code;
        this.mensaje = 'Código escaneado correctamente.';
        console.log('Texto escaneado:', this.textoEscaneado);

        // Procesar el texto escaneado
        this.procesarDatos(this.textoEscaneado);
      } else {
        this.mensaje = 'No se detectó contenido en el QR.';
      }
    } catch (error) {
      this.mensaje = 'Ocurrió un error durante el escaneo.';
      console.error('Error durante el escaneo:', error);
    }
  }

  procesarDatos(texto: string) {
    try {
      // Intentar convertir el texto escaneado en un JSON válido
      const datos = JSON.parse(texto);

      // Mostrar el JSON completo en consola en formato JSON
      console.log('JSON escaneado:', JSON.stringify(datos, null, 2));

      // Validar y asignar los datos según la sección
      switch (datos.seccion) {
        case 'SD008':
          this.datosIngles.push({
            seccion: datos.seccion,
            fecha: datos.fecha || 'Sin fecha',
            estado: 'Presente',
          });
          this.mensaje = 'Datos agregados a Inglés Intermedio.';
          break;

        case '002v':
          this.datosProgramacion.push({
            seccion: datos.seccion || 'Sin sección',
            fecha: datos.fecha || 'Sin fecha',
            estado: 'Presente',
          });
          this.mensaje = 'Datos agregados a Programación de Aplicaciones Móviles.';
          break;

        case '003v':
          this.datosEstadistica.push({
            seccion: datos.seccion || 'Sin sección',
            fecha: datos.fecha || 'Sin fecha',
            estado: 'Presente',
          });
          this.mensaje = 'Datos agregados a Estadística Descriptiva.';
          break;

        case '004v':
          this.datosCalidad.push({
            seccion: datos.seccion || 'Sin sección',
            fecha: datos.fecha || 'Sin fecha',
            estado: 'Presente',
          });
          this.mensaje = 'Datos agregados a Calidad del Software.';
          break;

        case '005v':
          this.datosArquitectura.push({
            seccion: datos.seccion || 'Sin sección',
            fecha: datos.fecha || 'Sin fecha',
            estado: 'Presente',
          });
          this.mensaje = 'Datos agregados a Arquitectura.';
          break;

        default:
          this.mensaje = 'El código no corresponde a ninguna asignatura.';
          console.warn('Sección desconocida:', JSON.stringify(datos, null, 2));
          break;
      }
    } catch (error) {
      this.mensaje = 'El contenido escaneado no es un JSON válido.';
      console.error('Error procesando el texto escaneado:', texto, error);
    }
  }

  async openModal(asignatura: string, datos: DatoAsignatura[]) {
    const modal = await this.modalCtrl.create({
      component: AssignmentModalComponent,
      componentProps: {
        asignatura,
        datos,
      },
      mode: 'ios',
    });
    await modal.present();
  }

  navigateBack() {
    this.navCtrl.back();
  }

  navigateHome() {
    this.navCtrl.navigateRoot('/home');
  }

  async openHelp() {
    const alert = await this.modalCtrl.create({
      component: AssignmentModalComponent,
      componentProps: {
        asignatura: 'Ayuda',
        datos: [],
      },
      cssClass: 'custom-help-modal',
    });
    await alert.present();
  }

}
