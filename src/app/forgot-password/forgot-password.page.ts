import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}

  async resetPassword() {
    
    const loading = await this.loadingController.create({
      message: 'Enviando solicitud...',
      duration: 3000 
    });
    await loading.present();

    try {
      
      await this.afAuth.sendPasswordResetEmail(this.email);

    
      const alert = await this.alertController.create({
        header: 'Solicitud Enviada',
        message: 'Revisa tu correo para restablecer la contraseña.',
        buttons: ['OK']
      });

      await alert.present();

      
      setTimeout(() => {
        loading.dismiss(); 
        this.navCtrl.navigateBack('/login'); 
      }, 2000);

    } catch (error) {
      console.error('Error al enviar solicitud:', error);

      
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al enviar el correo. Inténtalo de nuevo.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
  goToLogin() {
    this.navCtrl.navigateRoot('/login'); // Redirige a la página de login
  }
}
