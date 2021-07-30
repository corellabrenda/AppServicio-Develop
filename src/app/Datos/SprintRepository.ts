import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Sprint } from '../Negocio/Entidades/Sprint';

 
@Injectable({
  providedIn: 'root'
})

export class SprintRepository{

	Url='v1/sprints';

	constructor(private http: HttpClient) { }

  	create(sprintnuevo: Sprint){
  		return this.http.post<Sprint>(this.Url,sprintnuevo);
	}
	  
	retrieveAll(){
		return this.http.get<Sprint[]>(this.Url);
	}

	retrieve(idSprint:number){
		return this.http.get<Sprint>(this.Url+'/'+ idSprint.toString());
  	}
  
	update(idSprint:number, Sprint:Sprint){
		return this.http.put<Sprint>('v1/sprint'+'/'+ idSprint.toString(),Sprint);
	}

	updateSprints(sprints:Sprint[]){
		return this.http.put<Sprint>(this.Url,sprints);
	}

	  
	remove(idSprint:number){
		return this.http.delete(this.Url+'/'+ idSprint.toString());
	}

	addHistoria(idSprint:number, idHistorias:number[]) {
		var path='/historias?';
		for(var i=0;i<idHistorias.length-1; i++){
			path=path+'idHistoria='+idHistorias[i].toString()+'&';
		}
		path=path+'idHistoria='+idHistorias[i].toString();

		return this.http.post(this.Url+'/'+ idSprint.toString() + path ,idHistorias);
	}

	removeHistoria(idSprint:number, idHistorias:number[]){
		var path='/historias?';
		for(var i=0;i<idHistorias.length-1; i++){
			path=path+'idHistoria='+idHistorias[i].toString()+'&';
		}
		path=path+'idHistoria='+idHistorias[i].toString();
		return this.http.delete(this.Url+'/'+ idSprint.toString() + path);
	}

}