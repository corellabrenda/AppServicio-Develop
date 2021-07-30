import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PlanLiberacion} from '../Entidades/PlanLiberacion';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlgoritmoService {

  constructor(private http: HttpClient) {}

  run(planActual: PlanLiberacion){
  	console.log("Esto se manda al algoritmo",planActual);
      //this.http.post<PlanLiberacion[]>('/v1/algoritmo',planActual);
      //return null;
      //return this.http.get('/v1/status');
  	return this.http.post('/v1/algoritmo',planActual, {responseType: 'text'});
    
  }

  buscaPorcentaje(){
  	console.log("Buscando porcentaje");
  	return this.http.get('/v1/porcentaje');
  }

  replanea(planNuevo: PlanLiberacion){
  	return this.http.put('v1/algoritmo/cambio',planNuevo);
  }

  planPrpuestas(ruta:String){
  	console.log("Buscando propuestas");
  	return this.http.get('/v1'+ruta);
  }


}
