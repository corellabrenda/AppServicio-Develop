import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


import {CrearHistoriaComponent} from '../Historias/crear-historia/crear-historia.component';
import { Sprint } from '../../Negocio/Entidades/Sprint';
import { HistoriaUsuario } from '../../Negocio/Entidades/HistoriaUsuario';
import { HistoriaService } from '../../Negocio/Servicios/Historia.service';

import {PlanLiberacionService} from '../../Negocio/Servicios/PlanLiberacion.service';
import { SprintService } from '../../Negocio/Servicios/Sprint.service';
import{PlanLiberacion} from '../../Negocio/Entidades/PlanLiberacion';

@Component({
  selector: 'app-plan-liberacion',
  templateUrl: './plan-liberacion.component.html',
  styleUrls: ['./plan-liberacion.component.css']
}) 
export class PlanLiberacionComponent implements OnInit {

  @Input() plan:PlanLiberacion;
  @Input() proyTerm:boolean;  //verifica si el proyecto ya esta terminado

	public backlog:HistoriaUsuario[];  
  public sprints:Sprint[] = [];
  public idActual: number;
  public numeroActual: number;

  //Variable para saber si es el proyecto en curso o no
  @Input() edita:boolean;
  @Input() velocidadColaboradores:number;
  public prioridadColor:string[]=["baja","media","alta"];
  public Actua_Historia: boolean=true;

  public bandera_A_B:boolean=false;  //bandera que verifica si se ha borrado o actualizado una historia


  constructor(private historiaService:HistoriaService, private sprintService: SprintService, private planService:PlanLiberacionService,
    private route: ActivatedRoute, private router:Router, public dialog: MatDialog) {
	}

	ngOnInit(): void {

    //si es nulo estamos en un plan inicial, si no es un plan en curso
    if(this.plan==null){
      this.backlog=[];
    }else{
      this.backlog=this.plan.backlog; //se persiste tanto en el arreglo como en la variable oroginal del plan
      
       if(this.plan.sprints.length > 0) {
        //Se ordenan
        for(var i = 0; i < this.plan.sprints.length; i++) {

          if(this.plan.sprints[i].actual){
            this.idActual=this.plan.sprints[i].idSprint;
            this.numeroActual=this.plan.sprints[i].numeroSprint;
          }
          this.sprints.push(this.plan.sprints[i]);
          for(var j = 0; j < this.sprints.length-1; j++) {
            if(this.sprints[j].numeroSprint > this.sprints[this.sprints.length-1].numeroSprint) {
              var aux = this.sprints[this.sprints.length-1];
              for(var k = this.sprints.length-1; k > j; k--) {
                this.sprints[k] = this.sprints[k-1];
              }
              this.sprints[j] = aux;
              break;
            }
          }
        }

      }

    }


	}//fin del oninit




  CrearHistoriaDialog() {

    let dialogRef = this.dialog.open(CrearHistoriaComponent,{data:null});

    dialogRef.afterClosed()
    .subscribe(data =>{
      console.log("El dialogo se ha cerrado ",data);
      if (data!=0 && data!=null) {
         this.backlog.push(data);
      }
      
    });
  }

  CrearHistoriaDialog_Curso() {

    let dialogRef = this.dialog.open(CrearHistoriaComponent,{data:null});

    dialogRef.afterClosed()
    .subscribe(data =>{
      console.log("El dialogo se ha cerrado ",data);
      if (data!=0 && data!=null) {
         
         //Se persiste
         this.planService.AgregarHistoriasBacklog(this.plan.idPlanLiberacion, [data.idHistoriaUsuario])
          .subscribe(a=>{
           console.log("BackLog Actualizado");
            this.backlog.push(data);
            if(!this.edita) {
              if(!this.plan.pendiente) {
                this.plan.pendiente=true;
                this.planService.Actualizar(this.plan.idPlanLiberacion,this.plan).subscribe();
              }
            }
          });
      }
      
    });
  }


	crearSprint(){
    this.sprints.push(new Sprint(null,0,0,false,false,[]));
    this.sprints[this.sprints.length-1].numeroSprint = this.sprints.length;
    if(this.sprints.length == 1) {
      this.sprints[0].actual = true;
      console.log("Se creo el primero");
    }
    //Si el proyecto está en curso, lo persiste
    if(!this.edita) {
      console.log("Voy a agregar un sprint");
      if(!this.plan.pendiente) {
        this.plan.pendiente=true;
        this.planService.Actualizar(this.plan.idPlanLiberacion,this.plan).subscribe();
      }
      this.sprintService.Crear(this.sprints[this.sprints.length-1]).subscribe(
        data=>{
          this.sprints[this.sprints.length-1] = data;
          console.log("Sprint creado " + this.sprints[this.sprints.length-1].idSprint);
          this.planService.AgregarSprint(this.plan.idPlanLiberacion,data.idSprint).subscribe(
            () => {
              console.log("Sprint agregado");
              window.location.reload();
            });
        }
      );
    }
  }
  
  borrarSprint(){
    if(this.sprints.length > 0) {
      var ultimo = this.sprints[this.sprints.length-1];
      //Revisa si es el inicial
      if(this.edita) {
        for (var i = 0; i < ultimo.historias.length; i++) {
          //se manda al backlog las historias del sprint que se borro
          this.backlog.push(ultimo.historias[i]);
        }
        this.sprints.pop();
      } else {
        var confirma = confirm("¿Deseas borrar el ultimo Sprint?");
        if(confirma) {
          if(!this.plan.pendiente) {
            this.plan.pendiente=true;
            this.planService.Actualizar(this.plan.idPlanLiberacion,this.plan).subscribe();
          }
          var idHU = [];
          for (var i = 0; i < ultimo.historias.length; i++) {
            //se manda al backlog las historias del sprint que se borro
            this.backlog.push(ultimo.historias[i]);
            //Arreglo de HU
            idHU.push(ultimo.historias[i].idHistoriaUsuario);
          }
          console.log("id del Sprint: " + ultimo.idSprint);
          //Si no tiene historias
          if(idHU.length == 0) {
            this.sprintService.Eliminar(ultimo.idSprint).subscribe(a => {this.sprints.pop(); window.location.reload();});
          } else {
            this.sprintService.QuitarHistoria(ultimo.idSprint,idHU)
            .subscribe(a => {
              this.sprintService.Eliminar(ultimo.idSprint)
              .subscribe(b => {
                this.planService.AgregarHistoriasBacklog(this.plan.idPlanLiberacion,idHU)
                .subscribe(c => {
                  this.sprints.pop();
                  window.location.reload();
                });
              });
            });
          }
        }
      }
      
    }
  }
  

 
  drop(event: CdkDragDrop<HistoriaUsuario[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
			console.log("Se queda igual");
		} else {
      //metodo de transferencia para un plan inicial
      if(this.edita) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        console.log("Sprints",this.sprints);
        console.log("BackLog",this.backlog);
        //Se vuelven a contabilizar los PH de los sprints
        for(var i = 0; i < this.sprints.length; i++) {
          var velocidad = 0;
          for(var j = 0; j < this.sprints[i].historias.length; j++) {
            velocidad += this.sprints[i].historias[j].puntosHistoria;
          }
          this.sprints[i].velocidad = velocidad;
        }
      } else {

        if(event.previousContainer.id > this.idActual.toString() && event.container.id > this.idActual.toString()){
          console.log("jajajajjaa");
          var conf=confirm("¿Deseas mover la HU "+event.previousContainer.data[event.previousIndex].numeroHu + " de su lugar? ");
          //console.log("Anterior: " + event.previousIndex + " Nuevo:" + event.currentIndex);
          if(conf){
            var idHU = [event.previousContainer.data[event.previousIndex].idHistoriaUsuario];
            var idSpr1 = event.previousContainer.id;
            var idSpr2 = event.container.id;

            //Revisa si se está moviendo del backlog a un sprint
            if(idSpr1=="backlog"){
              this.planService.QuitarHistoriasBacklog(this.plan.idPlanLiberacion,idHU)
              .subscribe(a=>{
                //Se agrega la historia al sprint
                this.sprintService.AgregarHistoria(Number(idSpr2),idHU)
                .subscribe(b=> {
                  transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
                  //Se vuelven a contabilizar los PH de los sprints
                  for(var i = 0; i < this.sprints.length; i++) {
                    var velocidad = 0;
                    for(var j = 0; j < this.sprints[i].historias.length; j++) {
                      velocidad += this.sprints[i].historias[j].puntosHistoria;
                    }
                    if(velocidad != this.sprints[i].velocidad) {
                      this.sprints[i].velocidad = velocidad;
                      this.sprintService.Actualizar(this.sprints[i].idSprint,this.sprints[i]).subscribe();
                    }
                  }
                });
              });
              //Revisa que no venga ni se mueva al actual
            } else {
              //Se quita la historia del sprint actual
              this.sprintService.QuitarHistoria(Number(idSpr1),idHU)
              .subscribe(a=>{
                //Se agrega la historia al sprint o al backlog
                if(idSpr2=="backlog"){
                  this.planService.AgregarHistoriasBacklog(this.plan.idPlanLiberacion,idHU)
                  .subscribe(b=> {
                    transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
                    //Se vuelven a contabilizar los PH de los sprints
                    for(var i = 0; i < this.sprints.length; i++) {
                      var velocidad = 0;
                      for(var j = 0; j < this.sprints[i].historias.length; j++) {
                        velocidad += this.sprints[i].historias[j].puntosHistoria;
                      }
                      //Persiste cambios en la velocidad
                      if(velocidad != this.sprints[i].velocidad) {
                        this.sprints[i].velocidad = velocidad;
                        this.sprintService.Actualizar(this.sprints[i].idSprint,this.sprints[i]).subscribe();
                      }
                    }
                  });
                } else {
                  this.sprintService.AgregarHistoria(Number(idSpr2),idHU)
                  .subscribe(b=> {
                    transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
                    //Se vuelven a contabilizar los PH de los sprints
                    for(var i = 0; i < this.sprints.length; i++) {
                      var velocidad = 0;
                      for(var j = 0; j < this.sprints[i].historias.length; j++) {
                        velocidad += this.sprints[i].historias[j].puntosHistoria;
                      }
                      if(velocidad != this.sprints[i].velocidad) {
                        this.sprints[i].velocidad = velocidad;
                        this.sprintService.Actualizar(this.sprints[i].idSprint,this.sprints[i]).subscribe();
                      }
                    }
                  });
                }
              });
            }///fin else
          }//if de conf
          //Activa la bandera
          if(!this.plan.pendiente) {
            this.plan.pendiente=true;
            this.planService.Actualizar(this.plan.idPlanLiberacion,this.plan).subscribe();
          }
        }
      }
      
    }//else.....
    
	}//fin metodo
  
  ActualizarHistoria_Curso(hU:HistoriaUsuario, indiceSprint:number, indiceHis:number) {
    var historiaAux = new HistoriaUsuario(null,1,"","","",1,false,-1,null,0,[]);
    historiaAux.idHistoriaUsuario = hU.idHistoriaUsuario;
    historiaAux.numeroHu = hU.numeroHu;
    historiaAux.nombre = hU.nombre;
    historiaAux.descripcion = hU.descripcion;
    historiaAux.puntosHistoria = hU.puntosHistoria;
    historiaAux.terminada = hU.terminada;
    historiaAux.prioridad = hU.prioridad;
    historiaAux.idSprint = hU.idSprint;
    historiaAux.numeroSprint=hU.numeroSprint;
    console.log(indiceSprint,"  ",indiceHis);

    let dialogRef = this.dialog.open(CrearHistoriaComponent,{data:hU});
    dialogRef.afterClosed()
      .subscribe(data =>{
        console.log("El dialogo se ha cerrado ",data);
        this.bandera_A_B=true;
        //Si se borró la HU
        if (data==0) {
          //En caso de que se borre una historia del backlog
          if(indiceSprint == null) 
            this.plan.backlog.splice(indiceHis,1);
          //Si es cualquier historia de un sprint
          else 
            this.sprints[indiceSprint].historias.splice(indiceHis,1);

          console.log(this.plan);
          //Edita es un booleano para ver si está en curso
          if(!this.edita) {
            if(!this.plan.pendiente) {
              this.plan.pendiente=true;
              this.planService.Actualizar(this.plan.idPlanLiberacion,this.plan).subscribe();
            }
          }
        }
        //Si se cancelaron los cambios, se regresan los valores de las HU a como estaban
        else if(data == (undefined || null)) {
          this.bandera_A_B=false;
          //Backlog
          if(indiceSprint == null) {
  
            this.plan.backlog[indiceHis] = historiaAux;
   
          }
          //Sprint
          else {
            this.sprints[indiceSprint].historias[indiceHis] = historiaAux; 
          }
        }
        //Si se editó, se actualiza
        else {
          //Revisa que la historia no se haya editado en sus puntos o prioridad (los más importantes)
          if(!this.edita) {
            if(!this.plan.pendiente && (data.prioridad!=historiaAux.prioridad || data.puntosHistoria!=historiaAux.puntosHistoria)) {
              this.plan.pendiente=true;
              this.planService.Actualizar(this.plan.idPlanLiberacion,this.plan).subscribe();
            }
          }
        }

        //se actualiza para volver a contar la velocidad del sprint
        if(indiceSprint != null) {
          this.sprintService.Actualizar(this.plan.sprints[indiceSprint].idSprint,this.plan.sprints[indiceSprint])
          .subscribe((spri:Sprint)=>{
            this.sprints[indiceSprint].velocidad=spri.velocidad;
          })
        }
                
      });
  }


  ActualizarHistoria_Inicial(hU:HistoriaUsuario, indiceSprint:number, indiceHis:number) {
    var historiaAux = new HistoriaUsuario(null,1,"","","",1,false,-1,null,0,[]);
    historiaAux.idHistoriaUsuario = hU.idHistoriaUsuario;
    historiaAux.numeroHu = hU.numeroHu;
    historiaAux.nombre = hU.nombre;
    historiaAux.descripcion = hU.descripcion;
    historiaAux.puntosHistoria = hU.puntosHistoria;
    historiaAux.terminada = hU.terminada;
    historiaAux.prioridad = hU.prioridad;
    historiaAux.idSprint = hU.idSprint;
    historiaAux.numeroSprint=hU.numeroSprint;
    console.log(indiceSprint,"  ",indiceHis);

    let dialogRef = this.dialog.open(CrearHistoriaComponent,{data:hU});
    dialogRef.afterClosed()
      .subscribe(data =>{
        console.log("El dialogo se ha cerrado ",data);
        //Si se borró la HU
        if (data==0) {
          //En caso de que se borre una historia del backlog
          if(indiceSprint == null) {
            this.backlog.splice(indiceHis,1);
          //Si es cualquier historia de un sprint
          } else {
            this.sprints[indiceSprint].historias.splice(indiceHis,1);
          }
          console.log(this.plan);

          
        }
        //Si se cancelaron los cambios, se regresan los valores de las HU a como estaban
        else if(data == (undefined || null)) {
          //Backlog
          if(indiceSprint == null) {
  
            this.plan.backlog[indiceHis] = historiaAux;
   
          }
          //Sprint
          else {
            this.sprints[indiceSprint].historias[indiceHis] = historiaAux; 
          }
        }
        
        //Se contabilizan los PH del sprint
        if(indiceSprint != null) {
          var velocidad = 0;
          for(var j = 0; j < this.sprints[indiceSprint].historias.length; j++) {
            velocidad += this.sprints[indiceSprint].historias[j].puntosHistoria;
          }
          this.sprints[indiceSprint].velocidad = velocidad;
        }

      });       
 
  }




  //Agregar o Quitar las historias terminadas. Poder guardar cuales son las que se van a actualizar
  //en su campo terminada
  A_Q_historiasTerminadas(item:HistoriaUsuario){
    this.Actua_Historia=false;
    this.historiaService.Actualizar(item.idHistoriaUsuario,item)
      .subscribe((result: HistoriaUsuario) =>{
      console.log("historia cambio a terminada");
      this.Actua_Historia=true;
         
    });
  }

}
