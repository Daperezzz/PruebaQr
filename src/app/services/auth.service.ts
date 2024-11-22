import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<any>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser.next(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Ocurrió un error desconocido';
      throw new Error('Error al iniciar sesión: ' + errorMessage);
    }
  }

  async register(email: string, password: string, nombre: string, carrera: string, semestre: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.firestore.collection('users').doc(userCredential.user?.uid).set({
        nombre,
        carrera,
        semestre,
        email
      });
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Ocurrió un error desconocido';
      throw new Error('Error al registrar usuario: ' + errorMessage);
    }
  }

  // Obtener datos del usuario desde Firestore
  async getUserData(): Promise<any> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
      return userDoc?.data();
    }
    return null;
  }

  // Actualizar datos del usuario en Firestore
  async updateUserData(data: { nombre?: string; carrera?: string; semestre?: string }): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      await this.firestore.collection('users').doc(user.uid).update(data);
    } else {
      throw new Error('Usuario no autenticado.');
    }
  
}

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.navCtrl.navigateRoot('/login');
    this.currentUser.next(null);
  }
}
