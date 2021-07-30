import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from '../../app/Negocio/Servicios/usuario.service';
import { Usuario } from '../Negocio/Entidades/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario='';
  public contrasena='';
  constructor(private usuarioService:UsuarioService,private router: Router) { }

  ngOnInit(): void {
  }
  
  showPassword(){
    console.log("login");
    this.usuarioService.login(this.usuario,this.contrasena).subscribe(usu=>{
      console.log(usu[0]. contrasenia);
      if(usu[0]. contrasenia==this.contrasena&&usu!=null){
        document.getElementById('alerta').innerHTML='';
          this.router.navigate(['/home']);
      }else{
        document.getElementById('alerta').innerHTML='Usuario o contraseña incorrecta';
      }
      
    });
    
  }
  Registro(){
    this.router.navigate(['/registro']);

  }

}
