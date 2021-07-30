import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../../Negocio/Servicios/Proyecto.service';
import { Proyecto } from '../../../Negocio/Entidades/Proyecto';


@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.component.html',
  styleUrls: ['./form-proyecto.component.css'],
  providers: [ProyectoService]
})
export class FormProyectoComponent implements OnInit {

	public proyectos: Proyecto[];
  public nuevoProyecto: Proyecto;
  public projectId: number;
  
  
  constructor( private route: ActivatedRoute, private router:Router,private proyectoService: ProyectoService) {
    this.nuevoProyecto= new Proyecto(null,"","","","mañana","hoy",false,1,[]);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    //Crea el proyecto
    this.nuevoProyecto.fechaEntrega = this.nuevoProyecto.fechaInicio;
    console.log("nuevo Proyecto",this.nuevoProyecto);
    this.proyectoService.Crear(this.nuevoProyecto)
    .subscribe((data:Proyecto) =>{
      console.log("return ", data);
      this.projectId = data.idProyecto;
      console.log("El id es" + this.projectId);

      //ruta....
      this.router.navigate(['Proyecto/'+this.projectId+'/nombre/'+this.nuevoProyecto.nombre+'/Colaboradores']);
      
    });  
  }

  cancelar(){
    var opcion = confirm("Se borraran todos los cambios\n¿Desea continuar?");
    if (opcion == true) {
      this.router.navigate(['/Proyectos']);
    }
  }
}
