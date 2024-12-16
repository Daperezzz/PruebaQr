import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

// describe: define el conjunto de pruebas para el componente loginpage
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // se ejecuta antes de cada prueba, configura el entorno de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage], // declara el componente que estamos testeando
      imports: [
        IonicModule.forRoot(), // importa ionicmodule para inicializar ionic
        FormsModule, // importa formsmodule porque el componente usa formularios
        AngularFireModule.initializeApp(environment.firebaseConfig) // inicializa firebase con la configuracion del entorno
      ]
    }).compileComponents();

    // crea la instancia del componente y inicializa
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara el ciclo de detección de cambios
  });

  // prueba basica: verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

