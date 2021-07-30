import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisColaboradoresComponent } from './Colaboradores/mis-colaboradores/mis-colaboradores.component';
import {HomeComponent} from './home/home.component';
import { PagesComponent } from './pages.component';
import { MisProyectosComponent } from './Proyectos/mis-proyectos/mis-proyectos.component';

import { Erro404Component } from './Help/erro404/erro404.component';

import { FormProyectoComponent } from './ProyectoNuevo/form-proyecto/form-proyecto.component';
import { ProyectoEnCursoComponent } from './Proyectos/proyecto-en-curso/proyecto-en-curso.component';


import { FormPlanComponent } from './ProyectoNuevo/form-plan/form-plan.component';
import {AgregarColaboradoresComponent} from './ProyectoNuevo/agregar-colaboradores/agregar-colaboradores.component';
import {RunAlgoritmoComponent} from './Algoritmo/run-algoritmo/run-algoritmo.component';
import{RecargarComponent} from './Help/recargar/recargar.component';
import {ProyectoPreCargadoComponent} from './Help/proyecto-pre-cargado/proyecto-pre-cargado.component';



// we define the child routes for components in pages folder
const pagesRoutes: Routes = [
  { path: '',
      component : PagesComponent,
      children: [ /* canActivate checks that the user is logged in before entering the component */
        {path:'home' , component: HomeComponent},
        {path:'Proyectos' , component: MisProyectosComponent},
	      {path:'Proyecto/:id/plan/:idp/ver',component:ProyectoEnCursoComponent},

        {path:'NuevoProyecto' , component: FormProyectoComponent},
        {path:'Proyecto/:id/nombre/:name/Colaboradores' , component: AgregarColaboradoresComponent}, //panel de colaboradores
        {path:'Proyecto/:id/plan/:idp' , component:FormPlanComponent},

        {path:'MisColaboradores', component: MisColaboradoresComponent},
        {path:'run_Algoritmo', component: RunAlgoritmoComponent},
        {path:'recargar', component: RecargarComponent},
        {path:'CargarProyecto', component: ProyectoPreCargadoComponent},
        
        
      {path: '',  redirectTo: '/login', pathMatch : 'full'   } /* empty path redirects to login */
      ]
      }

];
// we export the child routes contained in the pages folder
//export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }