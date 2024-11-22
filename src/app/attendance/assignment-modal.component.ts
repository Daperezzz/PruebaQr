import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assignment-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ asignatura }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list *ngIf="datos.length > 0; else noData">
        <ion-item *ngFor="let dato of datos">
          <ion-label>
            <h2>Sección: {{ dato.seccion }}</h2>
            <p>Fecha: {{ dato.fecha }}</p>
            <p>Estado: {{ dato.estado }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <ng-template #noData>
        <ion-text>No hay datos registrados para esta asignatura.</ion-text>
      </ng-template>
    </ion-content>
  `,
})
export class AssignmentModalComponent {
  @Input() asignatura!: string;
  @Input() datos: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
