import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { HistoriaUsuario } from '../Negocio/Entidades/HistoriaUsuario';


@Injectable({
  providedIn: 'root'
})

export class HistoriaUsuarioRepository{

	Url='/v1/historias';

  constructor(private http: HttpClient) {}

  create(historia: HistoriaUsuario){
  	return this.http.post<HistoriaUsuario>(this.Url,historia);
  }

  retrieveAll(){
  	return this.http.get<HistoriaUsuario[]>(this.Url);
	}
	  
	retrieve(idHistoriaUsuario:number){
		return this.http.get<HistoriaUsuario>(this.Url+'/'+ idHistoriaUsuario.toString());
  }
  
  update(idHistoriaUsuario:number, historiaUsuario:HistoriaUsuario){
		return this.http.put<HistoriaUsuario>('v1/historia'+'/'+ idHistoriaUsuario.toString(),historiaUsuario);
  }

  updateHistorias(historiasUsuario:HistoriaUsuario[]){
    return this.http.put<HistoriaUsuario>(this.Url, historiasUsuario);
  }
  
  remove(idHistoriaUsuario:number){
		return this.http.delete(this.Url+'/'+ idHistoriaUsuario.toString());
  }

}