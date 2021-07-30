import { Component, OnInit,Input } from '@angular/core';
import {AlgoritmoService} from '../../../Negocio/Servicios/Algoritmo.service';
import{PlanLiberacion} from '../../../Negocio/Entidades/PlanLiberacion';
import { Router, ActivatedRoute, Params } from '@angular/router';
import{SprintService} from '../../../Negocio/Servicios/Sprint.service';
import{HistoriaService} from '../../../Negocio/Servicios/Historia.service';

@Component({
  selector: 'app-run-algoritmo',
  templateUrl: './run-algoritmo.component.html',
  styleUrls: ['./run-algoritmo.component.css']
})
export class RunAlgoritmoComponent implements OnInit {

  //public opcionesLiberacion: PlanLiberacion[]=[];
  public prioridadColor:string[]=["baja","media","alta"];
  @Input() opcionesLiberacion:PlanLiberacion[]=[];  
  public vel:number;

  constructor(private algoritmoService:AlgoritmoService, private router:Router, private historiaService:HistoriaService, private sprintService:SprintService) { 
  }

  ngOnInit(): void {

    this.vel=0;
    for(var i=0; i<this.opcionesLiberacion[0].colaboradores.length;i++){
      this.vel=this.vel+this.opcionesLiberacion[0].colaboradores[i].velocidad;
    }
  }

  info(){
    alert("Aqui podriamos informacion acerca del procedimiento del algoritmo\nPodras elegir entre la opciones de estabilizar, etct,etc");
  }

  elegir(planNuevo:PlanLiberacion){
    console.log("nuevo plan",planNuevo);
    this.algoritmoService.replanea(planNuevo)
    .subscribe((plan:PlanLiberacion)=>{
      console.log("esta es la replaneacion ",plan);
      for (var i = 0; i < plan.sprints.length; i++) {
        if(plan.sprints[i].historias.length == 0) {
          //Revisa si un sprint vacío no está terminado o es el actual
          if(!plan.sprints[i].terminado && !plan.sprints[i].actual) {
            this.sprintService.Eliminar(plan.sprints[i].idSprint)
            .subscribe();
          }
        } else{
          for (var j = 0; j < plan.sprints[i].historias.length ; j++) {
            plan.sprints[i].historias[j].numeroSprint =  plan.sprints[i].numeroSprint;
            this.historiaService.Actualizar(plan.sprints[i].historias[j].idHistoriaUsuario,plan.sprints[i].historias[j])
            .subscribe();
          }
        }
      }
      window.location.reload();
    })
    
  }

}
