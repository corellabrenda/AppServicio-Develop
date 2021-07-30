import { Injectable } from '@angular/core';
import {HistoriaUsuario} from '../Entidades/HistoriaUsuario';
import {HistoriaUsuarioRepository} from '../../Datos/HistoriaUsuarioRepository';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  constructor(private historiaUsuarioRepository: HistoriaUsuarioRepository) {}

  	Crear(historia: HistoriaUsuario){
  		return this.historiaUsuarioRepository.create(historia);
  	}

  	ObtenerHistorias(){
  		return this.historiaUsuarioRepository.retrieveAll();
	}
	  
	Obtener(idHistoria:number){
	  return this.historiaUsuarioRepository.retrieve(idHistoria);
	}
	
	Actualizar(idHistoria:number,nuevaHistoria:HistoriaUsuario){
  		return this.historiaUsuarioRepository.update(idHistoria,nuevaHistoria);
	}

	ActualizarHistorias(historias:HistoriaUsuario[]){
		return this.historiaUsuarioRepository.updateHistorias(historias);
	}
		  
	Eliminar(idHistoria:number){
		return this.historiaUsuarioRepository.remove(idHistoria);
	}

}
 