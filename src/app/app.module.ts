import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';



import { AngularFireModule } from '@angular/fire/compat'; 
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; 
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// Importa HttpClientModule para manejar las peticiones HTTP
import { HttpClientModule } from '@angular/common/http';


import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializo Firebase
    AngularFireAuthModule, 
    AngularFirestoreModule, 
    HttpClientModule, 
    ServicesModule 
    
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule {}
