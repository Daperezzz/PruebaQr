import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombreEstudiante: string = '';
  carrera: string = '';
  semestre: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController // Añadir LoadingController aquí
  ) {}

  async register() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
      duration: 1000 // Duración de 1 segundo
    });
    await loading.present(); // Presentar el loading

    try {
      await this.authService.register(
        this.email,
        this.password,
        this.nombreEstudiante,
        this.carrera,
        this.semestre
      );
      
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Tu cuenta ha sido registrada. Ahora puedes iniciar sesión.',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/login'); // Navega a la página de login después del registro
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error en el Registro',
        message: (error as Error).message || 'Hubo un problema al registrar la cuenta',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      loading.dismiss(); // Asegúrate de cerrar el loading
    }
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login'); // Navegar a la página de login
  }
}
