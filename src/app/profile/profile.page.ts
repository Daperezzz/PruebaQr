import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any = {};
  editMode: boolean = false; 
  fieldToEdit: string | null = null; 

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private http: HttpClient,
    private navCtrl: NavController 
  ) {}

  async ngOnInit() {
    await this.cargarInformacionUsuario();
  }

  async cargarInformacionUsuario() {
    try {
      this.userData = await this.authService.getUserData();
      if (!this.userData) {
        this.showError('No se encontraron datos para este usuario.');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      this.showError('Error al cargar los datos del perfil.');
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  editField(field: string) {
    this.fieldToEdit = field;
    this.editMode = true;
  }

  async guardarCambios() {
    const url = 'https://tudominio.com/api/cuenta'; // Reemplaza con tu URL de API real
    const token = 'Bearer TU_TOKEN_JWT'; // Aquí deberías obtener el token almacenado en tu LocalStorage o mediante otro método de autenticación.

    const headers = new HttpHeaders({
        'Authorization': token,
        'Content-Type': 'application/json'
    });

    const body = {
        nombre: this.userData.nombre,
        carrera: this.userData.carrera,
        semestre: this.userData.semestre,
        email: this.userData.email
    };

    this.http.post(url, body, { headers })
        .subscribe(
            async response => {
                console.log('Actualización exitosa:', response);
                this.editMode = false;
                this.navCtrl.navigateForward('/home');
            },
            error => {
                console.error('Error al actualizar:', error);
                this.showError('No se pudo actualizar la información. Inténtalo de nuevo.');
            }
        );
  }

  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  navigateToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  cerrarSesion() {
    this.authService.logout(); 
    this.navCtrl.navigateRoot('/login'); 
  }


}
