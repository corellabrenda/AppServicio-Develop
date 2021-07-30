import { Component, OnInit } from '@angular/core';
import {Colaborador} from './../../../Negocio/Entidades/Colaborador';
import {HistoriaUsuario} from './../../../Negocio/Entidades/HistoriaUsuario';
import {PlanLiberacion} from './../../../Negocio/Entidades/PlanLiberacion';
import {Proyecto} from './../../../Negocio/Entidades/Proyecto';
import {Sprint} from './../../../Negocio/Entidades/Sprint';

import {ColaboradorService} from './../../../Negocio/Servicios/Colaborador.service';
import {HistoriaService} from './../../../Negocio/Servicios/Historia.service';
import {PlanLiberacionService} from './../../../Negocio/Servicios/PlanLiberacion.service';
import {ProyectoService} from './../../../Negocio/Servicios/Proyecto.service';
import {SprintService} from './../../../Negocio/Servicios/Sprint.service';


@Component({
  selector: 'app-proyecto-pre-cargado',
  templateUrl: './proyecto-pre-cargado.component.html',
  styleUrls: ['./proyecto-pre-cargado.component.css']
})
export class ProyectoPreCargadoComponent implements OnInit {

	colaboradores: Colaborador[]=[];
	proyecto: Proyecto;
	planLiberacion: PlanLiberacion;
	sprints: Sprint[]=[];



  constructor(	private colaboradorService:ColaboradorService,
  				private historiaService:HistoriaService,
  				private planLiberacionService:PlanLiberacionService,
  				private proyectoService:ProyectoService, 
  				private sprintService:SprintService)
  { 
  
  	//
    var historias:HistoriaUsuario[]=[];
    var historiasA:HistoriaUsuario[]=[];
    historias.push(new HistoriaUsuario(null,13,"H","h","",9,false, 1 ,null,0,[]));
    historias.push(new HistoriaUsuario(null,2,"H","h","",8,false, 2 ,null,0,[]));
    historias.push(new HistoriaUsuario(null,16,"H","h","",10,false, 3 ,null,0,[]));
    historias.push(new HistoriaUsuario(null,4,"H","h","",9,false, 3 ,null,0,[]));
    historias.push(new HistoriaUsuario(null,17,"H","h","",4,false, 3 ,null,0,[]));
    for (var a = 0; a < historias.length; a++) {
      this.historiaService.Crear(historias[a])
      .subscribe((au:HistoriaUsuario)=>{
        historiasA.push(au);
      });
    }


    var historias2:HistoriaUsuario[]=[];
    var historias2A:HistoriaUsuario[]=[];
    historias2.push(new HistoriaUsuario(null,5,"H","h","",13,false, 2 ,null,0,[]));
    historias2.push(new HistoriaUsuario(null,6,"H","h","",14,false, 2 ,null,0,[]));
    historias2.push(new HistoriaUsuario(null,7,"H","h","",12,false, 3 ,null,0,[]));
    for (var i = 0; i < historias2.length; i++) {
      this.historiaService.Crear(historias2[i])
      .subscribe((a:HistoriaUsuario)=>{
        historias2A.push(a);
      });
    }


    var historias3:HistoriaUsuario[]=[];
    var historias3A:HistoriaUsuario[]=[];
    historias3.push(new HistoriaUsuario(null,8,"H","h","",12,false, 3 ,null,0,[]));
    historias3.push(new HistoriaUsuario(null,9,"H","h","",9,false, 2 ,null,0,[]));
    historias3.push(new HistoriaUsuario(null,10,"H","h","",6,false, 3 ,null,0,[]));
    historias3.push(new HistoriaUsuario(null,11,"H","h","",8,false, 3 ,null,0,[]));
    historias3.push(new HistoriaUsuario(null,12,"H","h","",5,false, 2 ,null,0,[]));
    for (var j = 0; j < historias3.length; j++) {
      this.historiaService.Crear(historias3[j])
      .subscribe((a:HistoriaUsuario)=>{
        historias3A.push(a);
      });
    }

    var historias4:HistoriaUsuario[]=[];
    var historias4A:HistoriaUsuario[]=[];
    historias4.push(new HistoriaUsuario(null,1,"H","h","",9,false, 1 ,null,0,[]));
    historias4.push(new HistoriaUsuario(null,14,"H","h","",9,false, 2 ,null,0,[]));
    historias4.push(new HistoriaUsuario(null,15,"H","h","",9,false, 3 ,null,0,[]));
    historias4.push(new HistoriaUsuario(null,3,"H","h","",10,false, 1 ,null,0,[]));
    historias4.push(new HistoriaUsuario(null,18,"H","h","",10,false, 3 ,null,0,[]));
    for (var k = 0; k < historias4.length; k++) {
      this.historiaService.Crear(historias4[k])
      .subscribe((a:HistoriaUsuario)=>{
        historias4A.push(a);
      });
    }



    var colaboradoresAux: Colaborador[]=[];
    colaboradoresAux.push(new Colaborador(null,"Usuario1","Senior",15000,50,15));
    colaboradoresAux.push(new Colaborador(null,"Usuario2","Junior",10000,40,10));
    colaboradoresAux.push(new Colaborador(null,"Usuario3","Senior",10000,40,10));
    colaboradoresAux.push(new Colaborador(null,"Usuario4","Junior",6000,30,5));

  	for (var i = 0; i < colaboradoresAux.length ; i++) {
  		//this.colaboradores.push(new Colaborador(null,"Usuario"+i,"Senior",10,1,10));
  		this.colaboradorService.Crear(colaboradoresAux[i])
  		.subscribe((col:Colaborador)=>{
  			this.colaboradores.push(col);
  		});
  	}



  	this.proyecto=new Proyecto(null,"Predefinido","Proyecto ya hecho","01/01/2020","01/10/2020","01/01/2020",false,10,[]);
  	this.planLiberacion=new PlanLiberacion(null,"Plan Predefinido",10,0,0,0,22.5,false,[],[],[]);


    this.proyectoService.Crear(this.proyecto)
    .subscribe(pro=>{
      this.proyecto=pro;

      this.planLiberacionService.Crear(this.planLiberacion)
      .subscribe(plan=>{
        this.planLiberacion=plan;
        this.proyectoService.AgregarPlan(this.proyecto.idProyecto,this.planLiberacion.idPlanLiberacion).subscribe();
        
        for (var i = 0; i < this.colaboradores.length; i++) {
          this.planLiberacionService.AgregarColaborador(this.planLiberacion.idPlanLiberacion,this.colaboradores[i].idColaborador)
          .subscribe();
        }

          this.sprints.push(new Sprint(null,1,40,true,false,[]));
          this.sprints[0].historias=historiasA;

          this.sprints.push(new Sprint(null,2,40,false,false,[]));
          this.sprints[1].historias=historias2A;

          this.sprints.push(new Sprint(null,3,40,false,false,[]));
          this.sprints[2].historias=historias3A;

          this.sprints.push(new Sprint(null,4,40,false,false,[]));
          this.sprints[3].historias=historias4A;



          
          for (var i = 0; i < this.sprints.length; i++) {
            var velocidad=0;
              for (var j = 0 ; j < this.sprints[i].historias.length; j++) {
                this.sprints[i].historias[j].numeroSprint=this.sprints[i].numeroSprint;
                velocidad += this.sprints[i].historias[j].puntosHistoria;
              }
              this.historiaService.ActualizarHistorias(this.sprints[i].historias).subscribe();
              this.sprints[i].velocidad = velocidad;
          }



        //persiste el cambio de la idSprint
        

        //.............Se crea los sprins

        for (var i = 0; i < this.sprints.length; i++) {
          this.sprintService.Crear(this.sprints[i])
          .subscribe((sp1:Sprint)=>{
            this.planLiberacionService.AgregarSprint(this.planLiberacion.idPlanLiberacion,sp1.idSprint)
            .subscribe(c=>{
              
                 
            });
          });

        }



      });
    });



  }

  ngOnInit(): void {
  }

}
