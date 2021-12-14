import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { SeleccionEstudiantesComponent } from './seleccion-estudiantes/seleccion-estudiantes.component';
import { DesignarTutorAcademicoComponent } from './designar-tutor-academico/designar-tutor-academico.component';
import { GenararActaComponent } from './genarar-acta/genarar-acta.component';



@NgModule({
  declarations: [ ConvocatoriaComponent, SeleccionEstudiantesComponent, DesignarTutorAcademicoComponent, GenararActaComponent],
  imports: [
    CommonModule
  ]
})
export class GestionPppModule { }
