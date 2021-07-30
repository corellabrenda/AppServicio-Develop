import { Injectable } from '@angular/core';
import{ Sprint } from '../Entidades/Sprint';
import { SprintRepository} from '../../Datos/SprintRepository';
import {HistoriaUsuario } from '../Entidades/HistoriaUsuario';


@Injectable({
  providedIn: 'root'
})
export class SprintService {

  	constructor(private sprintRepository: SprintRepository) { }

  	ObtenerSprints(){
  		return this.sprintRepository.retrieveAll();
	}

  	Crear(sprint: Sprint){
		return this.sprintRepository.create(sprint);
	}
		  
	Obtener(idSprint:number){
		return this.sprintRepository.retrieve(idSprint);
	}
	
	Actualizar(idSprint:number,nuevoSprint:Sprint){
		return this.sprintRepository.update(idSprint,nuevoSprint);
	}

	ActualizarSprints(sprints:Sprint[]){
		return this.sprintRepository.updateSprints(sprints);
	}
		  
	Eliminar(idSprint:number){
		return this.sprintRepository.remove(idSprint);
  	}
  
  	AgregarHistoria(idSprint:number, idHistorias:number[]) {
    	return this.sprintRepository.addHistoria(idSprint,idHistorias);
  	}

  	QuitarHistoria(idSprint:number, idHistorias:number[]){
  		return this.sprintRepository.removeHistoria(idSprint,idHistorias);
 	}

}
