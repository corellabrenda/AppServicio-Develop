import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from '../../app/Negocio/Servicios/usuario.service';
import { Usuario } from '../Negocio/Entidades/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public usuario='';
  public correo='';
  public telefono='';
  public contrasena='';
  public nombre='';
  public ap='';
  public am='';

  constructor(private usuarioService:UsuarioService,private router: Router) { }

  ngOnInit(): void {
  }
  Registrar(){
    var usuario_nuevo = {usuario: this.usuario,correoElectronico: this.correo, telefono:this.telefono, contrasenia:this.contrasena, nombre: this.nombre, apellidoPaterno:this.ap, apellidoMaterno:this.am};
    this.usuarioService.creaUsuario(usuario_nuevo).subscribe();
    this.router.navigate(['/login']);
  }
  Cancelar(){
    this.router.navigate(['/login']);
  }
}
