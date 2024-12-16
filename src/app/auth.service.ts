import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<any | undefined>(undefined);

  constructor(
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    // Inicializa el estado del usuario cuando el servicio es instanciado
    this.ngOnInit();
  }

  async ngOnInit() {
    // Usamos `addListener` en lugar de `onAuthStateChanged`
    FirebaseAuthentication.addListener('authStateChange', (user: any) => {
      this.usuarioActual.next(user); // Actualiza el estado del usuario
    });
  }

  async register(email: string, password: string, nombreEstudiante: string, carrera: string, semestre: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = result.user?.uid;
      console.log("UID obtenido:", uid); // Confirmar que el UID se obtiene correctamente
  
      if (uid) {
        await this.saveUserData(uid, {
          nombreEstudiante: nombreEstudiante,
          carrera: carrera,
          semestre: semestre,
          email: email
        });
        console.log("Datos guardados en Firestore"); // Confirmacion de que los datos se guardaron
      }
  
      return result;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Error: El correo electrónico ya está en uso.');
        throw new Error('El correo electrónico ya está en uso. Intenta con otro correo.');
      } else {
        console.error('Error al registrar:', error);
        throw error;
      }
    }
  }
  

  async login(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new Error('Debes ingresar tanto el correo como la contraseña');
      }
  
      console.log('Intentando iniciar sesión con:', email, password); // Log de diagnóstico
  
      const result = await FirebaseAuthentication.signInWithEmailAndPassword({
        email: email,
        password: password,
      });
  
      console.log('Resultado de inicio de sesión:', result); // Log de diagnóstico
  
      // Actualiza el estado del usuario autenticado
      this.usuarioActual.next(result.user);
      
      console.log('Usuario logueado:', result);
      return result;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Credenciales inválidas o error en el inicio de sesión');
    }
  }
  

  async logout() {
    try {
      await FirebaseAuthentication.signOut();
      this.usuarioActual.next(undefined); // Reinicia el estado del usuario al cerrar sesión
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  saveUserData(uid: string, data: any) {
    return this.firestore.collection('users').doc(uid).set(data);
  }

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState; // Devuelve un observable del estado de autenticación
  }

  // Observable para otros componentes que necesiten saber el estado del usuario
  get usuarioObservable() {
    return this.usuarioActual.asObservable();
  }
}



