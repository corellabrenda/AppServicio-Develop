import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HomeComponent} from './home/home.component';
//componentes
import { MisProyectosComponent } from './Proyectos/mis-proyectos/mis-proyectos.component';
import { ProyectoEnCursoComponent } from './Proyectos/proyecto-en-curso/proyecto-en-curso.component';

import { Erro404Component } from './Help/erro404/erro404.component';
import { PanelColaboradoresComponent } from './Colaboradores/panel-colaboradores/panel-colaboradores.component';

import { CrearHistoriaComponent } from './Historias/crear-historia/crear-historia.component';
import { FormProyectoComponent } from './ProyectoNuevo/form-proyecto/form-proyecto.component';
import { FormPlanComponent } from './ProyectoNuevo/form-plan/form-plan.component';
import { PlanLiberacionComponent } from './plan-liberacion/plan-liberacion.component';

//utilerias

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
//Back-end
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { AgregarColaboradoresComponent } from './ProyectoNuevo/agregar-colaboradores/agregar-colaboradores.component';
import { TerminarSprintComponent } from './Historias/terminar-sprint/terminar-sprint.component';
import { RunAlgoritmoComponent } from './Algoritmo/run-algoritmo/run-algoritmo.component';
import { RecargarComponent } from './Help/recargar/recargar.component';
import { ProyectoPreCargadoComponent } from './Help/proyecto-pre-cargado/proyecto-pre-cargado.component';

//import { PAGES_ROUTES } from './pages-routing.module';
import {PagesRoutingModule} from './pages-routing.module'
import { MisColaboradoresComponent } from './Colaboradores/mis-colaboradores/mis-colaboradores.component';


@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent, 
    MisProyectosComponent,
    ProyectoEnCursoComponent,
    PanelColaboradoresComponent,
    Erro404Component,
    MisColaboradoresComponent,
    CrearHistoriaComponent,
    PlanLiberacionComponent,
    FormPlanComponent,
    AgregarColaboradoresComponent,
    FormProyectoComponent,
    TerminarSprintComponent,
    RunAlgoritmoComponent,
    RecargarComponent,
    ProyectoPreCargadoComponent
  ],
  imports: [
    //PAGES_ROUTES,
    PagesRoutingModule,
    CommonModule,
    
    BrowserModule,
    DragDropModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    HttpClientModule,
    MatNativeDateModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [PagesComponent],
  exports: [PanelColaboradoresComponent,PlanLiberacionComponent]
})
export class PagesModule { }
