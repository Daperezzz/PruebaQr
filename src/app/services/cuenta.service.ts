import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentaService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.firestore.collection('pruebaConexion').add({ mensaje: 'Conexión exitosa' })
      .then(() => console.log('Conexión con Firestore exitosa'))
      .catch((error) => console.error('Error en la conexión a Firestore:', error));
  }

  // Función para obtener datos del usuario actual
  async obtenerDatos(): Promise<{ nombreEstudiante?: string; carrera?: string; semestre?: string; email?: string; } | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userId = user.uid;
      console.log("Buscando datos para el usuario con ID:", userId);
      const userDoc = await this.firestore.collection('usuarios').doc(userId).ref.get();
      if (userDoc.exists) {
        console.log("Datos encontrados:", userDoc.data());
        return userDoc.data() as { nombreEstudiante?: string; carrera?: string; semestre?: string; email?: string; };
      } else {
        console.error("El documento del usuario no existe en Firestore.");
        return null;
      }
    } else {
      console.error("No hay un usuario autenticado.");
      return null;
    }
  }


  async register(email: string, password: string, nombreEstudiante: string, carrera: string, semestre: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user?.uid;

      if (userId) {
        await this.firestore.collection('usuarios').doc(userId).set({
          nombreEstudiante,
          carrera,
          semestre,
          email
        });
        console.log("Registro y datos de usuario guardados exitosamente en Firestore");
      }
    } catch (error) {
      console.error("Error en el registro o al guardar datos del usuario: ", error);
      throw error;
    }
  }

  getCurrentUser() {
   
    return of({ id: 1, name: 'Usuario Ejemplo' });
  }
}
