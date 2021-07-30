import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../Negocio/Entidades/Proyecto';


@Injectable({
  providedIn: 'root'
})

export class ProyectoRepository{

	Url='/v1/proyectos';

	constructor(private http: HttpClient) {}

	retrieveAll(){
		return this.http.get<Proyecto[]>(this.Url);
	}

	create(proyecto: Proyecto){
		return this.http.post<Proyecto>(this.Url,proyecto);
	}
  
  retrieve(idProyecto:number){
		return this.http.get<Proyecto>(this.Url+'/'+ idProyecto.toString());
  }
  
  update(idProyecto:number, proyecto:Proyecto){
		return this.http.put<Proyecto>(this.Url+'/'+ idProyecto.toString(),proyecto);
  }
  
  remove(idProyecto:number){
		return this.http.delete(this.Url+'/'+ idProyecto.toString());
  }
  
  addPlanLiberacion(idProyecto:number, idPlanLiberacion:number) {
    return this.http.post(this.Url+'/'+ idProyecto.toString() + '/planesLiberacion?idPlanLiberacion=' + idPlanLiberacion.toString(),idPlanLiberacion);
  }
  
  /*removePlanLiberacion(idProyecto:number, idPlanLiberacion:number) {
    return this.http.delete(this.Url+'/'+ idProyecto.toString() + '/planLiberacion',idPlanLiberacion);
  }*/

}