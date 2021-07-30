import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HistoriaUsuario } from '../../../Negocio/Entidades/HistoriaUsuario';
import { HistoriaService } from '../../../Negocio/Servicios/Historia.service';

@Component({
  selector: 'app-crear-historia',
  templateUrl: './crear-historia.component.html',
  styleUrls: ['./crear-historia.component.css']
})
export class CrearHistoriaComponent implements OnInit {

  public nuevaHistoria:HistoriaUsuario;
  public historiaAux:HistoriaUsuario;
  public condicion:Boolean;
  
  constructor(private historiaService: HistoriaService, public dialogRef: MatDialogRef<CrearHistoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistoriaUsuario) { 
    console.log("datos recibidos ",this.data);	//datos que se pasan desde la ventana que fue creada
    if(this.data == null) {
      this.condicion = true;
      //this.nuevaHistoria=new HistoriaUsuario(null,1,"","",1,false,3);
      this.nuevaHistoria=new HistoriaUsuario(null,1,"","","",1,false,1,null,0,[]);
    } else {
      this.condicion=false;
      this.nuevaHistoria = this.data;
      this.historiaAux = new HistoriaUsuario(null,1,"","","",1,false,-1,null,0,[]);
    }
  }

  ngOnInit(): void {
  }

  onNoClick(){
    if(!this.nuevaHistoria.terminada) {
      var opcion = confirm("Se borrarán todos los cambios\n¿Desea continuar?");
    } else {
      var opcion = true;
    }
    if (opcion == true) {
      if(this.historiaAux != undefined) {
        this.dialogRef.close(null);
      } else {
        this.dialogRef.close(0);
      }
    }
  }

  addHistoria(){
    console.log("json a enviar ", this.nuevaHistoria);
  	this.historiaService.Crear(this.nuevaHistoria)
    .subscribe((result: HistoriaUsuario) =>{
      console.log("ya llegue del servicio con ",result);
      //this.nuevaHistoria=result;
      this.dialogRef.close(result);
    });
  }

  updateHistoria(){
  	this.historiaService.Actualizar(this.nuevaHistoria.idHistoriaUsuario,this.nuevaHistoria)
    .subscribe((result: HistoriaUsuario) =>{
      //this.nuevaHistoria=result;
      this.dialogRef.close(result);
    });
  }

  removeHistoria() {
    var conf = confirm("¿Estas seguro que deseas borrar la Historia de usuario?\nEsta accion no se puede deshacer.");
    if(conf){
      this.historiaService.Eliminar(this.nuevaHistoria.idHistoriaUsuario).subscribe();
      this.dialogRef.close(0);
    }else 
      this.dialogRef.close(null);
    
  }


}
