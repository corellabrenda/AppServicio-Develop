import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {ColaboradorService} from '../../../Negocio/Servicios/Colaborador.service';
import {Colaborador} from '../../../Negocio/Entidades/Colaborador';
 
 
@Component({
  selector: 'app-mis-colaboradores',
  templateUrl: './mis-colaboradores.component.html',
  styleUrls: ['./mis-colaboradores.component.css','../../../app.component.css'],
  providers:[ColaboradorService]
})
export class MisColaboradoresComponent implements OnInit {


  public colaboradores: Colaborador[]=[];
  displayedColumns: string[] = ['nombre', 'rango','salarioSprint','salarioPHExtra','velocidad','editar','borrar'];
  condition:boolean=false;  //para saber si se muestra el formulario de agregar
  rango: String[]= ['Junior','Senior','Master'];
  condition2: boolean = false; //para el formulario de actualizacion 

  public nuevo_colaborador: Colaborador;
  public actualizar_colaborador: Colaborador;

  constructor(private colaboradorService: ColaboradorService,private route: ActivatedRoute, private router:Router) {
    this.nuevo_colaborador=new Colaborador(null,'','',1,1,1);
    this.actualizar_colaborador = new Colaborador(null,'','',1,1,1);
  } 
 
  ngOnInit(): void {
    this.colaboradorService.ObtenerColaboradores()
    .subscribe((t: Colaborador[])=>{
      this.colaboradores=t;
    })
  }

  agregaColaborador(){
    this.condition = true;
  }

  onSubmit(){
    //guarda el colaborador
    this.colaboradorService.Crear(this.nuevo_colaborador)
    .subscribe((data:Colaborador)=>{
        this.colaboradores.push(data);
        this.nuevo_colaborador=new Colaborador(null,'','',1,1,1);
      }
     );
    this.condition=false; 
  }

  cancelar(){
    var opcion = confirm("Se perderán todos los cambios\n¿Desea continuar?");
    if(opcion) {
      this.condition=false;
      this.condition2=false;
    }
  }

  editarColaborador(){
    var opcion = confirm("Se sobreescribirán los cambios\n¿Desea continuar?");
    if(opcion) {
      this.colaboradorService.Actualizar(this.actualizar_colaborador.idColaborador,this.actualizar_colaborador)
      .subscribe(      //aqui se llama al metodo para actualizar
        response =>{
          this.actualizar_colaborador = new Colaborador(null,'','',1,1,1);
          this.condition2=false;
            this.colaboradorService.ObtenerColaboradores() // se vuelve a pedir la lista para actualizar la tabla
              .subscribe((t: Colaborador[])=>{
                this.colaboradores=[];
                console.log("Volviendo a mostrar colaboradores depues de actualizar");
                this.colaboradores=t;
              });
        },
      error =>{
        console.log(<any>error);
      });
    }
  }

  updateOpcion(colaboradorUpdate: Colaborador){  //cambiar la condicion para mostrar el html
    this.condition2 = true;
    this.actualizar_colaborador.idColaborador = colaboradorUpdate.idColaborador;
    this.actualizar_colaborador.nombre = colaboradorUpdate.nombre;
    this.actualizar_colaborador.rango = colaboradorUpdate.rango;
    this.actualizar_colaborador.salarioSprint = colaboradorUpdate.salarioSprint;
    this.actualizar_colaborador.salarioHExtra = colaboradorUpdate.salarioHExtra;
    this.actualizar_colaborador.velocidad = colaboradorUpdate.velocidad;
  }


  delete(id:number){
    var opcion = confirm("Se borrará el colaborador actual, esta acción no se puede deshacer\n¿Desea continuar?");
    if(opcion) {
      console.log("id borrar: ",id);
      this.colaboradorService.Eliminar(id)
      .subscribe( data =>{
        console.log("regresando del eliminar colab :",data);
        this.colaboradorService.ObtenerColaboradores()
        .subscribe((data1:Colaborador[])=>{
          this.colaboradores=[];
          this.colaboradores=data1;
        });
      });
    }
  }

  
}