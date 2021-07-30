import { Injectable } from '@angular/core'; 
import{ Sprint } from '../Entidades/Sprint';
import {SprintService} from './Sprint.service';
import {PlanLiberacion} from '../Entidades/PlanLiberacion';
import {PlanLiberacionRepository} from '../../Datos/PlanLiberacionRepository';
 
@Injectable({
  providedIn: 'root'
})


export class PlanLiberacionService {

  constructor(private sprintService: SprintService, private planRepository:PlanLiberacionRepository) {}

  /*ObtenerSprintDePlan(){
  	//por ahora, despues necesitara un metodo especial
  	return this.sprintService.ObtenerSprints();
  }//Revisar luego*/
  
  Crear(plan: PlanLiberacion){
  	return this.planRepository.create(plan);
  }

  ObtenerPlanes(){
  	return this.planRepository.retrieveAll();
	}
	  
	Obtener(idPlan:number){
	  return this.planRepository.retrieve(idPlan);
	}
	
	Actualizar(idPlan:number,nuevoPlan:PlanLiberacion){
  	return this.planRepository.update(idPlan,nuevoPlan);
	}
		  
	Eliminar(idPlan:number){
		return this.planRepository.remove(idPlan);
  }

  AgregarSprint(idPlan:number, idSprint:number) {
    return this.planRepository.addSprint(idPlan,idSprint);
  }

  AgregarColaborador(idPlan:number, idColaborador:number) {
    return this.planRepository.addColaborador(idPlan,idColaborador);
  }

  QuitarColaborador(idPlan:number, idColaborador:number){
    return this.planRepository.removeColaborador(idPlan,idColaborador);
  }

  AgregarHistoriasBacklog(idPlan: number, idHistorias: number[]){
    return this.planRepository.addHistoriaToBacklog(idPlan,idHistorias);
  }

  QuitarHistoriasBacklog(idPlan: number, idHistorias: number[]){
    return this.planRepository.removeHistoriaToBacklog(idPlan,idHistorias);
  }

}