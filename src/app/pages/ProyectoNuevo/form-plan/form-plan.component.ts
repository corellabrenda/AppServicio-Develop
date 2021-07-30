import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanLiberacionComponent } from '../../plan-liberacion/plan-liberacion.component';
import { PlanLiberacion } from 'src/app/Negocio/Entidades/PlanLiberacion';
import { PlanLiberacionService } from 'src/app/Negocio/Servicios/PlanLiberacion.service';
import { ProyectoService } from 'src/app/Negocio/Servicios/Proyecto.service';
import { Proyecto } from 'src/app/Negocio/Entidades/Proyecto';
import { SprintService } from 'src/app/Negocio/Servicios/Sprint.service';
import { HistoriaService } from 'src/app/Negocio/Servicios/Historia.service'

@Component({
  selector: 'app-form-plan',
  templateUrl: './form-plan.component.html',
  styleUrls: ['./form-plan.component.css']
})
export class FormPlanComponent implements OnInit, AfterViewInit {

  @ViewChild(PlanLiberacionComponent) hijo;
  public idProyecto:number;
  public velocidadEquipo:number;
  public plan:PlanLiberacion;    //este tiene el backlog

  constructor(private route: ActivatedRoute, private router:Router, private planService:PlanLiberacionService,private proyectoService:ProyectoService, private sprintService:SprintService, private historiaService:HistoriaService) {
  }
  ngAfterViewInit(): void {
    console.log("Comunicación de hijo a padre");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProyecto = Number(params['id']);
      this.proyectoService.Obtener(this.idProyecto).subscribe((data:Proyecto)=> {
          this.plan = data.planesLiberacion[0];
          this.velocidadEquipo = 0;
          for(var i = 0; i < this.plan.colaboradores.length; i++) {
            this.velocidadEquipo += this.plan.colaboradores[i].velocidad;
          }
        }
      );
    });
  }

  guardar() {

    var vacios = false;
    for(var i = 0; i < this.hijo.sprints.length; i++) {
      if(this.hijo.sprints[i].velocidad == 0) {
        vacios = true;
        break;
      }
    }


    if(this.hijo.backlog.length == 0 && !vacios && this.hijo.sprints.length > 0) {  

      //El backlog no se guarda pues este debe estar vacio en un plan inicial
      //en otro caso guardarlo


      //se persiste el cambio en cuanto a su numero de Sprint al que pertenece
      for(var i = 0; i < this.hijo.sprints.length; i++) {
        for(var j in this.hijo.sprints[i].historias){
          //persistir......
          this.hijo.sprints[i].historias[j].numeroSprint = this.hijo.sprints[i].numeroSprint;
          this.historiaService.Actualizar(this.hijo.sprints[i].historias[j].idHistoriaUsuario , this.hijo.sprints[i].historias[j])
          .subscribe();
        }
      }


      for(var k = 0; k < this.hijo.sprints.length; k++){
        this.sprintService.Crear(this.hijo.sprints[k]).subscribe(data => {
          this.planService.AgregarSprint(this.plan.idPlanLiberacion,data.idSprint).subscribe();
        });
      }
      

      this.router.navigate(['/Proyectos']);
    } else {
      alert("No se puede crear el proyecto, asegúrese de que:\n"
            + "1. No queden Historias en el Backlog\n"
            + "2. No queden Sprints vacíos\n" 
            + "3. Haya al menos 1 Sprint");
    }
	}

	cancelar(){
    var opcion = confirm("Se borrarán todos los cambios\n¿Desea continuar?");
    if (opcion == true) {

      //Se borra el plan
      //this.planService.Eliminar(this.plan.idPlanLiberacion).subscribe();

      //Se borran las historias
      for(var i = 0; i < this.hijo.sprints.length; i++) {
        for(var j = 0; j < this.hijo.sprints[i].historias.length; j++) {
          this.hijo.historiaService.Eliminar(this.hijo.sprints[i].historias[j].idHistoriaUsuario).subscribe();
        }
      }

      //Se borran las historias en backlog
      for(var i = 0; i < this.hijo.backlog.length; i++) {
        this.hijo.historiaService.Eliminar(this.hijo.backlog[i].idHistoriaUsuario).subscribe();
      }

            //Se borra el proyecto
      this.proyectoService.Eliminar(this.idProyecto).subscribe(a=>{
        this.router.navigate(['/Proyectos']);
      });
      
    }
	}

  
}
