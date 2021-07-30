import { Component,ViewChild, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {PanelColaboradoresComponent} from './../../Colaboradores/panel-colaboradores/panel-colaboradores.component';
import {PlanLiberacionService} from '../../../Negocio/Servicios/PlanLiberacion.service';
import { ProyectoService } from 'src/app/Negocio/Servicios/Proyecto.service';
import { PlanLiberacion } from 'src/app/Negocio/Entidades/PlanLiberacion';

@Component({
  selector: 'app-agregar-colaboradores',
  templateUrl: './agregar-colaboradores.component.html',
  styleUrls: ['./agregar-colaboradores.component.css']
})
export class AgregarColaboradoresComponent implements OnInit {

  @ViewChild(PanelColaboradoresComponent) panelColaboradores;  //accedemos a los datos del hijo
  public idProyecto:number;
  public nombreProyecto: string;
  public nuevoPlan: PlanLiberacion;

  constructor(private route: ActivatedRoute, private router:Router, private planLiberacionService: PlanLiberacionService, private proyectoService:ProyectoService) {
    this.nuevoPlan=new PlanLiberacion(null,"",0.00,0.0,0.0,0.0,0,false,[],[],[]);
  }

  ngOnInit(): void {
  	this.route.params.subscribe(params => {
  		this.idProyecto = Number(params['id']);
      this.nombreProyecto = params['name'];
  		console.log("proyecto ",this.idProyecto, "nombre del proyecto ",this.nombreProyecto);
  	});
  }
 
 
  siguiente(){
      if(this.panelColaboradores.colaboradoresEnPlan.length == 0) {
        alert("Debe haber al menos un colaborador");
      } else {

          //Crea el Plan
          this.nuevoPlan.nombre = "Plan del proyecto " + this.nombreProyecto;
          this.planLiberacionService.Crear(this.nuevoPlan)
          .subscribe((data: PlanLiberacion) =>{
            console.log("return ", data);

            //Los asocia
            this.proyectoService.AgregarPlan(this.idProyecto,data.idPlanLiberacion)
            .subscribe(() => {

                for (let c of this.panelColaboradores.colaboradoresEnPlan){
                  this.planLiberacionService.AgregarColaborador(data.idPlanLiberacion,c.idColaborador)
                  .subscribe();
                }
                this.router.navigate(['Proyecto/'+this.idProyecto+'/plan/'+data.idPlanLiberacion]);

            });
          });

      }
  }

  cancelar(){

    var opcion = confirm("Se borraran todos los cambios\n¿Desea continuar?");
    if (opcion == true) {
      //Se borra el proyecto
      this.proyectoService.Eliminar(this.idProyecto).subscribe();

      //Se borra el plan
      //this.planLiberacionService.Eliminar(this.idPlan).subscribe();

      this.router.navigate(['/Proyectos']);
    }
	}

}
