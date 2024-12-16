import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendancePage } from './attendance.page';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// describe: acaestamos definiendo un conjunto de pruebas para el componente atendancepage
describe('AttendancePage', () => {
  let component: AttendancePage;
  let fixture: ComponentFixture<AttendancePage>;

  // mock para activatedroute, simula un observable vacio para evitar dependencias reales
  const mockActivatedRoute = {
    queryParams: of({})
  };

  // mock para el mdalcontroller, simula el comportamiento basico de un modal
  const mockModalController = {
    create: () => Promise.resolve({
      present: () => Promise.resolve()
    })
  };

  // mock para el navcontroller,simula metodos como back y navigaterut
  const mockNavController = {
    back: () => Promise.resolve(),
    navigateRoot: () => Promise.resolve()
  };

  // esto se ejecuta antes de cada prueba, configura el entorno de testing
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendancePage], // declaramos el componente que estamos testeando
      imports: [IonicModule.forRoot()], // usamos el modulo de ionic para que todo funcione
      providers: [
        // reemplazamos las dependencias reales por los mocks que definimos
        { provide: ModalController, useValue: mockModalController },
        { provide: NavController, useValue: mockNavController },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    // creamos el componente y lo inicializamos para cada prueba
    fixture = TestBed.createComponent(AttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara el ciclo de detección de cambios
  });

  // prueba basica: verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
