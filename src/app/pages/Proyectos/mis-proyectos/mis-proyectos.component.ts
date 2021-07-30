import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Proyecto } from '../../../Negocio/Entidades/Proyecto';
import { ProyectoService } from '../../../Negocio/Servicios/Proyecto.service';
 

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {

    
  displayedColumns: string[] = ["nombre","fechaInicio","fechaEntrega","terminado","duracionSprint","Ver","Borrar"];
  proyectos: Proyecto[]=[];
  //arreglo de json para tabla dinamica


  constructor(private route: ActivatedRoute,private router:Router, private proyectoService:ProyectoService) {}

  ngOnInit(): void {
    this.proyectoService.ObtenerProyectos()
    .subscribe((data: Proyecto[])=>{
      this.proyectos=data;
    });
  }

  ir(proyecto: Proyecto){
    this.router.navigate(['/Proyecto/'+proyecto.idProyecto+'/plan/'+proyecto.planesLiberacion[0].idPlanLiberacion+'/ver']);
  }

  redirigir(){
    this.router.navigate(['/NuevoProyecto']);
  }

  borrar(proyecto:Proyecto) {
    var borra = confirm("Se borrará toda la información del proyecto, incluidos Sprints e Historias de Usuario\n"
                        +"Esta acción no se puede deshacer, ¿desea continuar?")
    if(borra) {
      const re=this.proyectos.findIndex(element=>element.idProyecto===proyecto.idProyecto);
      if(re>=0)
        this.proyectos.splice(re,1);
      
      this.proyectoService.Eliminar(proyecto.idProyecto).subscribe();
    }
  }
 

}
