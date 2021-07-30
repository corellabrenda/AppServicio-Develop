import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  public creaUsuario(usuario_nuevo){
    console.log(usuario_nuevo);
    return this.http.post('/v1/usuarios',usuario_nuevo);
  }
  public login(usuario,contrasena){
    console.log(usuario+contrasena);
    return this.http.get('/v1/usuarios',usuario);
  }
}
