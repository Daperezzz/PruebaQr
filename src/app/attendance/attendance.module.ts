import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AttendancePageRoutingModule } from './attendance-routing.module';
import { AssignmentModalComponent } from './assignment-modal.component'
import { AttendancePage } from './attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancePageRoutingModule
  ],
  declarations: [AttendancePage, AssignmentModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agregar esquema para componentes Ionic
})
export class AttendancePageModule {}
