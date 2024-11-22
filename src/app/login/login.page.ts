import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController, 
    private authService: AuthService
  ) {}

  async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Cargando...', 
      duration: 1000 
    });
    await loading.present(); 

    try {
      await this.authService.login(this.email, this.password);
      this.navCtrl.navigateRoot('/home'); 
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error de Autenticación',
        message: (error as Error).message || 'Ocurrió un error al iniciar sesión',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      loading.dismiss(); 
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register'); 
  }

  goToForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password'); 
  }
}
