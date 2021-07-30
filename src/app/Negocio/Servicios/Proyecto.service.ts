import { Injectable } from '@angular/core'; 
import { Proyecto } from '../Entidades/Proyecto';
import {ProyectoRepository} from '../../Datos/ProyectoRepository';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

 
  constructor(private proyectoRepository: ProyectoRepository) {}

  ObtenerProyectos(){
  	return this.proyectoRepository.retrieveAll();
  }

  Crear(proyecto: Proyecto){
		return this.proyectoRepository.create(proyecto);
	}
		  
	Obtener(idProyecto:number){
		return this.proyectoRepository.retrieve(idProyecto);
	}
	
	Actualizar(idProyecto:number,nuevoProyecto:Proyecto){
		return this.proyectoRepository.update(idProyecto,nuevoProyecto);
	}
		  
	Eliminar(idProyecto:number){
		return this.proyectoRepository.remove(idProyecto);
  }
  
  AgregarPlan(idProyecto:number, idPlan:number) {
    return this.proyectoRepository.addPlanLiberacion(idProyecto,idPlan);
  }

}
