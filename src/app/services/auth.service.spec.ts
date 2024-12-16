import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FIREBASE_APP_NAME } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

// describe: define el conjunto de pruebas para authservice
describe('AuthService', () => {
  let service: AuthService;

  // mock para angularfireauth, simula el comportamiento de autentificacion
  const mockAngularFireAuth = {
    authState: of(null), // simula un estado de autenticacion nulo
    currentUser: Promise.resolve(null), // simula la obtencion de un usuario actual nulo
    signInWithEmailAndPassword: () => Promise.resolve(null), // simula el inicio de sesion
    createUserWithEmailAndPassword: () => Promise.resolve(null), // simula la creacion de un nuevo usuario
    signOut: () => Promise.resolve() // simula el cierre de sesion
  };

  // mock para angularfirestore, simula las interacciones con firestore
  const mockAngularFirestore = {
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({
          data: () => ({}) // simula obtener datos de firestore
        }),
        set: () => Promise.resolve(), // simula agregar un documento
        update: () => Promise.resolve() // simula actualizar un documento
      })
    })
  };

  // mock para navcontroller,simula la navegacion
  const mockNavController = {
    navigateRoot: () => Promise.resolve() // simula la navegacion a la rais
  };

  // se ejecuta antes de cada prueba, configura el entorno de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthService, // provee el servicio que estamos testeando
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }, // usa el mock de angularfireauth
        { provide: AngularFirestore, useValue: mockAngularFirestore }, // usa el mock de angularfirestore
        { provide: NavController, useValue: mockNavController }, // usa el mock de navcontroller
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }, // usa la configuracion de firebase
        { provide: FIREBASE_APP_NAME, useValue: '[DEFAULT]' }, // usa el nombre por defecto para firebase
        { 
          provide: 'angularfire2.app.options', 
          useValue: environment.firebaseConfig // usa la configuracion de firebase para angularfire2
        }
      ]
    }).compileComponents();

    // inyecta el servicio authservice
    service = TestBed.inject(AuthService);
  });

  // prueba basica: verifica que el servicio se cree correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // prueba de login: verifica que la funcion login maneje la autenticacion
  it('should handle login', async () => {
    await expectAsync(service.login('test@test.com', 'password')).toBeResolved();
  });

  // prueba de logout: verifica que la funcion logout maneje el cierre de sesion
  it('should handle logout', async () => {
    await expectAsync(service.logout()).toBeResolved();
  });
});
