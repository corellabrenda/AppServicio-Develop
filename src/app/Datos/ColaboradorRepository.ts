import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Colaborador } from '../Negocio/Entidades/Colaborador';
import { catchError, retry } from 'rxjs/operators';

 
@Injectable({
  providedIn: 'root'
})

export class ColaboradorRepository{

	Url='v1/colaboradores';

  constructor(private http: HttpClient) {}

  create(colaborador: Colaborador){
  	return this.http.post<Colaborador>(this.Url,colaborador);
  }

  retrieveAll(){
  	return this.http.get<Colaborador[]>(this.Url);
  }

  retrieveDisp(){
    return this.http.get<Colaborador[]>(this.Url+'/disponibles');
  }

  retrieveInPlan(idPlan:number){
    return this.http.get<Colaborador[]>(this.Url+'/planesLiberacion/'+idPlan);
  }

  retrieve(idColaborador:number){
		return this.http.get<Colaborador>(this.Url+'/'+ idColaborador.toString());
  }
  
  update(idColaborador:number, colaborador:Colaborador){
		return this.http.put<Colaborador>(this.Url+'/'+ idColaborador.toString(),colaborador);
  }
  
  remove(idColaborador:number){
		return this.http.delete(this.Url+'/'+ idColaborador);
  }

}