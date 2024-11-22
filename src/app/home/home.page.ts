import { Component } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { Browser } from '@capacitor/browser';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  textoEscaneado: string = ''; // Contenido del código QR
  mensaje: string = ''; // Mensajes para el usuario
  datosQR: any = {}; // JSON extraído del contenido del QR

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  // Método para obtener las claves del JSON
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  async escanear() {
    try {
      const resultado: any = await BarcodeScanner.scan();

      if (resultado && resultado.hasOwnProperty('code')) {
        this.textoEscaneado = resultado.code;
        this.mensaje = 'Código escaneado correctamente.';
        console.log('Texto escaneado:', this.textoEscaneado);

        try {
          const datosQR = JSON.parse(this.textoEscaneado);
          console.log('Datos escaneados:', datosQR);

          if (datosQR.seccion) {
            const fechaActual = new Date().toISOString();

            // Redirigir a Attendance con los datos
            this.navCtrl.navigateForward('/attendance', {
              queryParams: {
                seccion: datosQR.seccion,
                fecha: fechaActual,
                estado: 'Presente',
              },
            });
          } else {
            this.mensaje = 'El QR no contiene información de sección.';
          }
        } catch (error) {
          console.error('El contenido no es un JSON válido:', error);
          this.mensaje = 'El contenido escaneado no es un JSON válido.';
        }
      } else {
        this.mensaje = 'No se detectó contenido en el QR.';
      }
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      this.mensaje = 'Ocurrió un error durante el escaneo.';
    }
  }

  async goToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  async goToAttendance() {
    this.navCtrl.navigateForward('/attendance');
  }
}
