import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaService } from './cuenta.service';
import { AsistenciaService } from './asistencia.service';

@NgModule({
  providers: [CuentaService, AsistenciaService],
  imports: [CommonModule]
})
export class ServicesModule {}
