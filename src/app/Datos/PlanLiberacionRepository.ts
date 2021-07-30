import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { PlanLiberacion } from '../Negocio/Entidades/PlanLiberacion';


@Injectable({
  providedIn: 'root'
})

export class PlanLiberacionRepository{
  Url='/v1/planesLiberacion';

  constructor(private http: HttpClient) {}

  create(planLiberacion:PlanLiberacion){
		return this.http.post<PlanLiberacion>(this.Url,planLiberacion);
  }
  
  retrieveAll(){
		return this.http.get<PlanLiberacion[]>(this.Url);
  }
  
  retrieve(idPlan:number){
		return this.http.get<PlanLiberacion>(this.Url+'/'+ idPlan.toString());
  }
  
  update(idPlan:number, planLiberacion:PlanLiberacion){
		return this.http.put<PlanLiberacion>(this.Url+'/'+ idPlan.toString(),planLiberacion);
  }
  
  remove(idPlan:number){
		return this.http.delete(this.Url+'/'+ idPlan.toString());
  }
  
  addSprint(idPlan:number, idSprint:number) {
    /*
    var path='/sprints?';
    for(var i=0;i<idSprint.length-1; i++){
      path=path+'idSprint='+idSprint[i].toString()+'&';
    }
    path=path+'idSprint='+idSprint[i].toString();
    return this.http.post(this.Url+'/'+ idPlan.toString() + path ,idSprint);
    */
    return this.http.post(this.Url+'/'+ idPlan.toString() + '/sprint?idSprint=' + idSprint.toString(),idSprint);
  }

  addColaborador(idPlan:number, idColaborador:number) {
    return this.http.post(this.Url+'/'+ idPlan.toString() + '/colaboradores?idColaborador=' + idColaborador.toString(),idColaborador);
  }

  removeColaborador(idPlan:number, idColaborador:number){
    return this.http.delete(this.Url+'/'+idPlan.toString() + '/colaboradores?idColaborador=' + idColaborador.toString());
  }

  addHistoriaToBacklog(idPlan: number, idHistorias:number[]){
    var path='/historias?';
    for(var i=0;i<idHistorias.length-1; i++){
      path=path+'idHistoria='+idHistorias[i].toString()+'&';
    }
    path=path+'idHistoria='+idHistorias[i].toString();

    return this.http.post(this.Url+'/'+idPlan.toString() + path,idHistorias);
  }

  removeHistoriaToBacklog(idPlan: number, idHistorias:number[]){
    var path='/historias?';
    for(var i=0;i<idHistorias.length-1; i++){
      path=path+'idHistoria='+idHistorias[i].toString()+'&';
    }
    path=path+'idHistoria='+idHistorias[i].toString();

    return this.http.delete(this.Url+'/'+idPlan.toString() + path);
  }

}