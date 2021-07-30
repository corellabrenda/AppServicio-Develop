import { Injectable } from '@angular/core'; 
import { Colaborador } from '../Entidades/Colaborador';

import { ColaboradorRepository } from '../../Datos/ColaboradorRepository';

@Injectable({
  providedIn: 'root'
})

export class ColaboradorService {

  constructor(private colaboradorRepository: ColaboradorRepository) {}

  Crear(colaborador: Colaborador){
    return this.colaboradorRepository.create(colaborador);
  }
  
  ObtenerColaboradores(){
    return this.colaboradorRepository.retrieveAll();
	}

  ObtenerColaboradoresDisponibles(){
    return this.colaboradorRepository.retrieveDisp();
  }

  ObtenerColaboradoresEnProyecto(idPlan:number){
    return this.colaboradorRepository.retrieveInPlan(idPlan);
  }
	  
	Obtener(idColaborador:number){
    return this.colaboradorRepository.retrieve(idColaborador);
  }

  Actualizar(idColaborador:number,nuevoColaborador:Colaborador){
    return this.colaboradorRepository.update(idColaborador,nuevoColaborador);
  }
	  
	Eliminar(idColaborador:number){
		return this.colaboradorRepository.remove(idColaborador);
	}

}