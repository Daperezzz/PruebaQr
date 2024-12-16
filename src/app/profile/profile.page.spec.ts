import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      providers: [
        AuthService,
        AlertController,
        NavController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
