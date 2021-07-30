import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Colaborador } from '../../../Negocio/Entidades/Colaborador';
import { ColaboradorService} from '../../../Negocio/Servicios/Colaborador.service';
import {PlanLiberacionService} from '../../../Negocio/Servicios/PlanLiberacion.service';
import { PlanLiberacion } from 'src/app/Negocio/Entidades/PlanLiberacion';

@Component({ 
  selector: 'app-panel-colaboradores',
  templateUrl: './panel-colaboradores.component.html',
  styleUrls: ['./panel-colaboradores.component.css','../../../app.component.css']
})
export class PanelColaboradoresComponent implements OnInit {

  public veltotal:number = 0;
  public disable:boolean = true;
  public colaboradoresDisponibles: Colaborador[]=[];
  //public colaboradoresEnPlan: Colaborador[]= [];
  @Input() colaboradoresEnPlan:Colaborador[]=[];
  @Input() idPlan: number;
  @Input() plan:PlanLiberacion;

  public planInicial:boolean=true;

    constructor(private service: ColaboradorService, private route: ActivatedRoute, private planService:PlanLiberacionService, private router:Router, private planLiberacionService:PlanLiberacionService) {}

    ngOnInit(): void {


      if(this.colaboradoresEnPlan.length!=0){
        console.log("Encurso");
        this.planInicial=false;
      }
 

      this.service.ObtenerColaboradoresDisponibles()
        .subscribe((data:Colaborador[])=>{
            this.colaboradoresDisponibles=data;
      });
      for(var i = 0; i < this.colaboradoresEnPlan.length; i++) {
        this.veltotal += this.colaboradoresEnPlan[i].velocidad;
      }
    }


  drop (event: CdkDragDrop<Colaborador[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
       transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
    }
    this.veltotal = 0;
    for(var i = 0; i < this.colaboradoresEnPlan.length; i++) {
      this.veltotal += this.colaboradoresEnPlan[i].velocidad;
    }
   
  }

  dropCurso (event: CdkDragDrop<Colaborador[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      
      //el evento fue de colaboradores en plan hacia colaboradores Disponible
      if(event.previousContainer.id=="enPlan"){
        var conf=confirm("¿Deseas quitar a "+event.previousContainer.data[event.previousIndex].nombre + " del plan?");
        console.log(event.previousContainer.data[event.previousIndex]);
        if(conf){
            this.planLiberacionService.QuitarColaborador(this.idPlan,event.previousContainer.data[event.previousIndex].idColaborador)
            .subscribe(a=>{
               transferArrayItem(event.previousContainer.data,
                              event.container.data,
                              event.previousIndex,
                              event.currentIndex);

              this.veltotal = 0;
              for(var i = 0; i < this.colaboradoresEnPlan.length; i++) 
                this.veltotal += this.colaboradoresEnPlan[i].velocidad;
          
              

            });
            if(!this.plan.pendiente) {
              this.plan.pendiente=true;
              this.planService.Actualizar(this.plan.idPlanLiberacion,this.plan).subscribe();
            }
        }

      }else{
        var conf=confirm("¿Deseas agregar a "+event.previousContainer.data[event.previousIndex].nombre +" al plan?");
        if(conf){
          this.planLiberacionService.AgregarColaborador(this.idPlan,event.previousContainer.data[event.previousIndex].idColaborador)
          .subscribe(b=>{
            
            transferArrayItem(event.previousContainer.data,
                              event.container.data,
                              event.previousIndex,
                              event.currentIndex);

              this.veltotal = 0;
              for(var i = 0; i < this.colaboradoresEnPlan.length; i++) 
                this.veltotal += this.colaboradoresEnPlan[i].velocidad;
          });

          if(!this.plan.pendiente) {
            this.plan.pendiente=true;
            this.planService.Actualizar(this.plan.idPlanLiberacion,this.plan).subscribe();
          }
        }
      }

 
    }
   
  }

  disablefunction(){
    this.disable=false;
  }

}
