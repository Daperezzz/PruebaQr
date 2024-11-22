import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importa los módulos de Firebase
import { AngularFireModule } from '@angular/fire/compat'; 
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; 
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// Importa HttpClientModule para manejar las peticiones HTTP
import { HttpClientModule } from '@angular/common/http';

// Importa el módulo de servicios
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase
    AngularFireAuthModule, // Módulo de autenticación de Firebase
    AngularFirestoreModule, // Módulo de Firestore
    HttpClientModule, // Agrega el módulo HttpClient para manejar solicitudes HTTP
    ServicesModule // Importa el módulo de servicios
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite el uso de componentes personalizados de Ionic
})
export class AppModule {}
