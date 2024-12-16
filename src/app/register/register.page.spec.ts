import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// definimos un injectiontoken para simular la configuracion de firebase
const FIREBASE_CONFIG = new InjectionToken('angularfire2.app.options', {
  providedIn: 'root',
  factory: () => ({
    apiKey: 'fake-api-key',
    authDomain: 'fake-auth-domain',
    projectId: 'fake-project-id',
    storageBucket: 'fake-storage-bucket',
    messagingSenderId: 'fake-messaging-sender-id',
    appId: 'fake-app-id',
    measurementId: 'fake-measurement-id'
  }),
});

// mock de angularfireauth para evitar dependencias reales y simular comportamiento
class MockAngularFireAuth {
  authState = { subscribe: () => {} }; // simula authstate
  createUserWithEmailAndPassword = jasmine.createSpy('createUserWithEmailAndPassword'); // espia de jasmine para pruebas
}

// describe: define el conjunto de pruebas para registerpage
describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  // se ejecuta antes de cada prueba, configura el entorno de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage], // declara el componente que estamos probando
      imports: [
        FormsModule, // se incluye porque el componente usa formularios
        IonicModule.forRoot(), // inicializa ionic
        AngularFireModule.initializeApp({
          // se pasa una configuracion falsa para firebase
          apiKey: 'fake-api-key',
          authDomain: 'fake-auth-domain',
          projectId: 'fake-project-id',
          storageBucket: 'fake-storage-bucket',
          messagingSenderId: 'fake-messaging-sender-id',
          appId: 'fake-app-id',
          measurementId: 'fake-measurement-id'
        })
      ],
      providers: [
        { provide: AngularFireAuth, useClass: MockAngularFireAuth }, // usa el mock para evitar dependencias reales
        { provide: FIREBASE_CONFIG, useValue: { apiKey: 'fake-api-key', authDomain: 'fake-auth-domain' } } // usa configuracion simulada para firebase
      ]
    }).compileComponents();
  });

  // inicializa el componente antes de cada prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara el ciclo de deteccion de cambios
  });

  // prueba basica: verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// como funciona la validacion y por que es util:
//
// esta validacion se enfoca en probar el componente register.page.ts dentro de un entorno controlado mediante el uso de mocks. 
// en lugar de depender de servicios reales como angularfireauth o la configuracion de firebase, se utilizan simulaciones (mocks) 
// para emular su comportamiento. esto permite realizar pruebas unitarias de manera aislada, sin necesidad de conectar el componente 
// con un backend real.
//
// porque decidimos hacerlo asi y que ventajas tiene:
//
// - independencia de servicios externos: al usar mocks, evitamos que las pruebas dependan de servicios como firebase, lo cual hace 
//   que las pruebas sean mas rapidas y confiables.
// - facilidad para testear errores y comportamientos especificos: podemos controlar facilmente las respuestas de los servicios 
//   simulados (como el comportamiento de angularfireauth) para probar diferentes escenarios y asegurarnos de que el componente maneje 
//   bien cada caso.
// - mejor rendimiento en pruebas: al evitar hacer llamadas reales a servicios externos, las pruebas se ejecutan mucho mas rapido, 
//   lo cual es crucial para un desarrollo agil y una correcion mas probnta de los errorres
// - facilita la integracion en pipelines de ci cd las pruebas unitarias rapidas y sin dependencias externas son ideales para integrarse 
//   en procesos de integracion continua y despliegue continuo.
// gracia el aplausoooo