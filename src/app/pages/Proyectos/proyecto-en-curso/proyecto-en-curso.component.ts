import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProyectoService } from 'src/app/Negocio/Servicios/Proyecto.service';
import { Proyecto } from 'src/app/Negocio/Entidades/Proyecto';
import { PlanLiberacion } from 'src/app/Negocio/Entidades/PlanLiberacion';
import { SprintService } from 'src/app/Negocio/Servicios/Sprint.service';
import { Sprint } from 'src/app/Negocio/Entidades/Sprint';
import { MatDialog } from '@angular/material/dialog';
import { TerminarSprintComponent } from '../../Historias/terminar-sprint/terminar-sprint.component';
import { HistoriaUsuario } from 'src/app/Negocio/Entidades/HistoriaUsuario';
import { HistoriaService } from 'src/app/Negocio/Servicios/Historia.service';
import { PanelColaboradoresComponent } from '../../Colaboradores/panel-colaboradores/panel-colaboradores.component';
import { PlanLiberacionComponent } from '../../plan-liberacion/plan-liberacion.component';
import { PlanLiberacionService } from '../../../Negocio/Servicios/PlanLiberacion.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

import{AlgoritmoService} from '../../../Negocio/Servicios/Algoritmo.service';


 
@Component({
	selector: 'app-proyecto-en-curso',
	templateUrl: './proyecto-en-curso.component.html',
	styleUrls: ['./proyecto-en-curso.component.css']
})
export class ProyectoEnCursoComponent implements OnInit, AfterViewInit{

  public color: ThemePalette = 'primary';
  public mode: ProgressBarMode = 'determinate';
  public value: number = 0;
  public value2: number = 0;
  public bufferValue: number = 0;

  @ViewChild(PanelColaboradoresComponent) hijoColab;
  @ViewChild(PlanLiberacionComponent) hijoPlan;

  public idProyecto: number;
  public idPlan: number;
  public proyecto:Proyecto;
  public sprintActual:number;
  public indiceActual:number;
  

  //verificacion del resultado del regreso de planes del algoritmo
  public todo:boolean=true;  //si estamos en el plan normalmente
  public listo:boolean=false;  //si estamos en espera del resultado del algoritmo
  public espera:boolean=false;
  public opcionesPlan:PlanLiberacion[];
  public localiza:String;


  constructor(private cdref: ChangeDetectorRef, private route: ActivatedRoute, private router:Router, private proyectoService:ProyectoService, private sprintService:SprintService,  public dialog: MatDialog, private planLiberacionService:PlanLiberacionService,private historiaService:HistoriaService,private algoritmoService:AlgoritmoService) {}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
      this.idProyecto = Number(params['id']);
      this.idPlan = Number(params['idp']);

      this.proyectoService.Obtener(this.idProyecto).subscribe((data:Proyecto)=> {
        this.proyecto = data;
        var sprint = data.planesLiberacion[0].sprints;
        if(!this.proyecto.terminado) {
          for(var i = 0; i < sprint.length; i++) {
            if(sprint[i].actual) {
              this.sprintActual = sprint[i].numeroSprint;
              this.indiceActual = i;
              break;
            }
          }
        }

        //obtiene el numero de HU del backlog inicialmente
        console.log(this.proyecto.planesLiberacion[0].backlog);

      });
    });
		//obtener el numero de sprints
		//tambien todos los sprints en una consulta

    

  }
  
  ngAfterViewInit(): void {
    if(this.hijoColab !== undefined) {
      console.log("Comunicación de hijo a padre " + this.hijoColab.veltotal);
    }
    console.log("Entra");
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  terminar() {
    var finSprint = confirm("¿Desea terminar con el Sprint Actual?\nEsta acción no se puede deshacer");
    if(finSprint) {

      //busca las historias no terminadas y sus posiciones
      var band=false;
      var NT:number[]=[];
      var NTposiciones:number[]=[];
      for (var i = 0; i < this.hijoPlan.plan.sprints[this.indiceActual].historias.length; i++) {
        if(this.hijoPlan.plan.sprints[this.indiceActual].historias[i].terminada==false){
          NT.push(this.hijoPlan.plan.sprints[this.indiceActual].historias[i].idHistoriaUsuario);
          NTposiciones.push(i);
        }
      }

      var siguiente=0;
      //Busca el sprint siguiente al actual
      for(var i = 0; i < this.hijoPlan.plan.sprints.length; i++) {
        if(this.hijoPlan.plan.sprints[i].numeroSprint == this.sprintActual+1) {
          siguiente = i;
          break;
        }
      }

      if(NT.length>0){
        
        alert("Hemos encontrado Historias que no fueron terminadas");
        //primero se quitan las historias no terminadas del sprint
        this.sprintService.QuitarHistoria(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,NT)
        .subscribe(a=>{
          //si hay HU y el sprint es el ultimo
          if(this.sprintActual == this.hijoPlan.plan.sprints.length) {
            alert("se creo un nuevo sprint");
            this.sprintService.Crear(new Sprint(null,this.sprintActual+1,0,true,false,[]))
            .subscribe(b => {
                this.sprintService.AgregarHistoria(b.idSprint,NT)
                .subscribe(c=> {
                  this.planLiberacionService.AgregarSprint(this.idPlan,b.idSprint)
                  .subscribe(w=>{
                    //actualizamos el nuevo para actualizar su velocidad
                    this.sprintService.Actualizar(b.idSprint,b).subscribe();

                    //terminamos el sprint actual
                    this.hijoPlan.plan.sprints[this.indiceActual].actual = false;
                    this.hijoPlan.plan.sprints[this.indiceActual].terminado = true;
                    this.sprintService.Actualizar(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,this.hijoPlan.plan.sprints[this.indiceActual])
                    .subscribe(d=> {
                      //No es necesario marcar un evento disruptivo
                      /*if(!this.proyecto.planesLiberacion[0].pendiente) {
                        this.proyecto.planesLiberacion[0].pendiente = true;
                        this.planLiberacionService.Actualizar(this.proyecto.planesLiberacion[0].idPlanLiberacion,this.proyecto.planesLiberacion[0])
                        .subscribe(e=> {
                          this.router.navigate(['/recargar']);
                          //Manda error
                          //window.location.reload();
                        });
                      }else{*/
                        this.router.navigate(['/recargar']);
                        //window.location.reload();
                      //} 
                    });
                  }); 
                });

              });
          } else {
            //Revisa si el siguiente sprint está vacío
            if(this.hijoPlan.plan.sprints[siguiente].historias.length > 0){
              //estas mismas se agregan al backlog como historias nuevas
              this.planLiberacionService.AgregarHistoriasBacklog(this.hijoPlan.plan.idPlanLiberacion, NT)
              .subscribe(b=>{
                  //se refleja el cambio en pantalla
                  for (var k = 0; k < NT.length; k++) {
                    this.proyecto.planesLiberacion[0].backlog.push(this.hijoPlan.plan.sprints[this.indiceActual].historias[NTposiciones[k]]);
                    this.proyecto.planesLiberacion[0].sprints[this.indiceActual].historias.splice(NTposiciones[k],1);
                  }

                  //Revsisa si no es el ultimo
                  if(this.sprintActual != this.hijoPlan.plan.sprints.length) {

                    //Quita el actual y lo pone como terminado
                    this.hijoPlan.plan.sprints[this.indiceActual].actual = false;
                    this.hijoPlan.plan.sprints[this.indiceActual].terminado = true;
                    console.log("Voy a actualizar");
                    this.sprintService.Actualizar(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,this.hijoPlan.plan.sprints[this.indiceActual])
                    .subscribe(a=>{
                      //Busca cual es el siguiente sprint por numero
                      for(var i = 0; i < this.hijoPlan.plan.sprints.length; i++) {
                        if(this.hijoPlan.plan.sprints[i].numeroSprint == this.sprintActual+1) {
                          this.sprintActual = this.hijoPlan.plan.sprints[i].numeroSprint;
                          this.indiceActual = i;
                          break;
                        }
                      }

                      //Pone el siguiente sprint como el actual
                      this.hijoPlan.plan.sprints[this.indiceActual].actual = true;
                      this.sprintService.Actualizar(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,this.hijoPlan.plan.sprints[this.indiceActual])
                      .subscribe();
                    
                    });

                  }
                  //Si es el ultimo
                  else {
                    //Termina el sprint y el proyecto
                    this.proyecto.terminado = true;
                    this.proyectoService.Actualizar(this.proyecto.idProyecto,this.proyecto)
                    .subscribe(a => {
                      for(var col = 0; col < this.hijoColab.colaboradoresEnPlan.length; col++) {
                        console.log("Quitar colaborador");
                        this.planLiberacionService.QuitarColaborador(this.proyecto.planesLiberacion[0].idPlanLiberacion,this.hijoColab.colaboradoresEnPlan[col].idColaborador).subscribe();
                      }
                    });

                    this.hijoPlan.plan.sprints[this.indiceActual].actual = false;
                    this.hijoPlan.plan.sprints[this.indiceActual].terminado = true;
                    this.sprintService.Actualizar(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,this.hijoPlan.plan.sprints[this.indiceActual])
                    .subscribe();

                  }

                  if(!this.proyecto.planesLiberacion[0].pendiente) {
                    this.proyecto.planesLiberacion[0].pendiente = true;
                    this.planLiberacionService.Actualizar(this.proyecto.planesLiberacion[0].idPlanLiberacion,this.proyecto.planesLiberacion[0]).subscribe();
                  }

                  this.router.navigate(['/recargar']);
                  //window.location.reload();

              });
            } else {
              //Si está vacío, se devuelven las HU
              this.sprintService.AgregarHistoria(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,NT)
              .subscribe(a=>{
                alert("No se puede mover a un sprint vacío");
                this.router.navigate(['/recargar']);   
              });
            }
          }
        });

      }else{    //si no hay historias no terminadas (NT) solo actualizamos

        //Revsisa si no es el ultimo
        if(this.sprintActual != this.hijoPlan.plan.sprints.length) {

          //Revisa si el siguiente sprint está vacío
          if(this.hijoPlan.plan.sprints[siguiente].historias.length > 0){
            //Quita el actual y lo pone como terminado
            this.hijoPlan.plan.sprints[this.indiceActual].actual = false;
            this.hijoPlan.plan.sprints[this.indiceActual].terminado = true;
            this.sprintService.Actualizar(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,this.hijoPlan.plan.sprints[this.indiceActual])
            .subscribe(a=>{
                //Busca cual es el siguiente sprint por numero
                for(var i = 0; i < this.hijoPlan.plan.sprints.length; i++) {
                  if(this.hijoPlan.plan.sprints[i].numeroSprint == this.sprintActual+1) {
                    this.sprintActual = this.hijoPlan.plan.sprints[i].numeroSprint;
                    this.indiceActual = i;
                    break;
                  }
                }

                //Pone el siguiente sprint como el actual
                this.hijoPlan.plan.sprints[this.indiceActual].actual = true;
                this.sprintService.Actualizar(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,this.hijoPlan.plan.sprints[this.indiceActual])
                .subscribe();
                  
            });
          } else {
            alert("No se puede mover a un sprint vacío");
          }
        }
        //Si es el ultimo
        else {
          //Termina el sprint y el proyecto
          this.proyecto.terminado = true;
          this.proyectoService.Actualizar(this.proyecto.idProyecto,this.proyecto)
          .subscribe(a => {
            for(var col = 0; col < this.hijoColab.colaboradoresEnPlan.length; col++) {
              console.log("Quitar colaborador");
              this.planLiberacionService.QuitarColaborador(this.proyecto.planesLiberacion[0].idPlanLiberacion,this.hijoColab.colaboradoresEnPlan[col].idColaborador).subscribe();
            }
          });

          this.hijoPlan.plan.sprints[this.indiceActual].actual = false;
          this.hijoPlan.plan.sprints[this.indiceActual].terminado = true;
          this.sprintService.Actualizar(this.hijoPlan.plan.sprints[this.indiceActual].idSprint,this.hijoPlan.plan.sprints[this.indiceActual])
          .subscribe();

          if(this.proyecto.planesLiberacion[0].pendiente) {
            this.proyecto.planesLiberacion[0].pendiente = false;
            this.planLiberacionService.Actualizar(this.proyecto.planesLiberacion[0].idPlanLiberacion,this.proyecto.planesLiberacion[0]).subscribe();
          }

        }

        this.router.navigate(['/recargar']);
        //window.location.reload();
      }//fin NT>0

    }

  }//fin del metodo

	guardar() {
    var conf=confirm("Quieres confirmar todos los cambios hechos");
    if (conf){
      if(this.proyecto.planesLiberacion[0].colaboradores.length>0) {
        if(this.proyecto.planesLiberacion[0].backlog.length==0){

          console.log("aqui",this.proyecto.planesLiberacion[0]);
          var HV=0;  //verificar si hay historias vacias
          for(var i=0;i<this.proyecto.planesLiberacion[0].sprints.length;i++){
            //Revisa si existen sprints vacíos cuyo número sea mayor al actual
            if(this.proyecto.planesLiberacion[0].sprints[i].historias.length==0 && this.proyecto.planesLiberacion[0].sprints[i].numeroSprint>this.sprintActual){
              HV=1;
              break;
            }
          }

          if(HV==0){
            this.proyecto.planesLiberacion[0].pendiente=false;
            this.planLiberacionService.Actualizar(this.proyecto.planesLiberacion[0].idPlanLiberacion,this.proyecto.planesLiberacion[0]).subscribe();  
          }else{
            alert("No podemos confirmar si existen sprints vacios. Porfavor realiza una replaneación");
          }
            
        }else{
          alert("Hemos detectado historias en el Backlog, por favor mueve las HU o realiza una replaneacion");
        }
      } else {
        alert("Debe haber al menos un colaborador en el plan");
      }
    }
  }//fin de Guardar


	cancelar(){
		this.router.navigate(['/Proyectos']);
	}


  replanear(){

    var condicion= false;
    if(this.hijoColab.colaboradoresEnPlan.length == 0) {
      condicion=true;
    }

    for(var i = 0; i < this.hijoPlan.sprints.length; i++) {
      if(this.hijoPlan.sprints[i].numeroSprint > this.sprintActual) {
        if(this.hijoPlan.sprints[i].historias.length == 0) {
          condicion=true;
          break;
        } 
      }
    }

    if(this.sprintActual == this.proyecto.planesLiberacion[0].sprints.length && this.proyecto.planesLiberacion[0].backlog.length == 0) {
      condicion=true;
    }
    
    if(!condicion) {
      console.log("Ejecutando algoritmo");
      this.todo=false;
      this.espera=true;
      //se cambia solo el numSprint de las historias
      for(var j in this.proyecto.planesLiberacion[0].backlog){

        //si es el ultimo, pone el numero en el actual
        if( (this.sprintActual+1)==this.proyecto.planesLiberacion[0].sprints.length)
          this.proyecto.planesLiberacion[0].backlog[j].numeroSprint=this.sprintActual;
        else
          this.proyecto.planesLiberacion[0].backlog[j].numeroSprint=this.sprintActual+1;
      }
      console.log("plan de hijo",this.hijoPlan.plan);
      console.log("plan de aqui",this.proyecto.planesLiberacion[0]);

      //Revisa el porcentaje cada 20 seguntos
      var intervalo = setInterval(() => {  
        this.revisaPorcentaje();
        
        if(this.value==100){
          this.algoritmoService.planPrpuestas(this.localiza).subscribe((resul:PlanLiberacion[])=>{
            this.espera=false;
            this.listo=true;
            console.log(resul);
            this.opcionesPlan=resul;
            //Para que deje de correr el intervalo al terminar la ejecucion del algoritmo
            clearInterval(intervalo);
          }
          );
        }
      }, 20000);
      
      
      this.algoritmoService.run(this.proyecto.planesLiberacion[0])
      .subscribe(response=>{
        ///this.espera=false;
        //this.listo=true;
        console.log(" regrese del run()");
        console.log(response);
        this.localiza=response;
        //this.opcionesPlan=response;
        //Para que deje de correr el intervalo al terminar la ejecucion del algoritmo
        //clearInterval(intervalo);
      });
    } else {
      alert("No esposible ejecutar la replaneación, asegúrate de no tener sprints vacíos después del actual y de tener al menos un colaborador.\nEn caso de estar en el último sprint, asegúrate de tener alguna historia en el backlog");
    }
    
    
  }

  revisaPorcentaje() {
    this.algoritmoService.buscaPorcentaje().subscribe((porcentaje:number) => {
      this.value = porcentaje;
      this.bufferValue = porcentaje;
    });
  }
 

}
