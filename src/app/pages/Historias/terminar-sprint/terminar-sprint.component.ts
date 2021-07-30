import { Component, OnInit, Inject } from '@angular/core';
import { HistoriaService } from 'src/app/Negocio/Servicios/Historia.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sprint } from 'src/app/Negocio/Entidades/Sprint';
import { SprintService } from 'src/app/Negocio/Servicios/Sprint.service';
import { HistoriaUsuario } from 'src/app/Negocio/Entidades/HistoriaUsuario';

@Component({
  selector: 'app-terminar-sprint',
  templateUrl: './terminar-sprint.component.html',
  styleUrls: ['./terminar-sprint.component.css']
})
export class TerminarSprintComponent implements OnInit {

  public sprint:Sprint;

  constructor(private historiaService: HistoriaService, private sprintService: SprintService, public dialogRef: MatDialogRef<TerminarSprintComponent>, @Inject(MAT_DIALOG_DATA) public data: Sprint) {
    this.sprint = this.data;
  }

  ngOnInit(): void {
  }

  onNoClick(){
    var opcion = confirm("Se borrarán todos los cambios\n¿Desea continuar?");
    if (opcion == true) {
      this.dialogRef.close(null);
    }
  }

  terminar(){
    for(var i = 0; i < this.sprint.historias.length; i++) {
      //console.log((<HTMLInputElement> document.getElementById("HU" + this.sprint.historias[i].idHistoriaUsuario.toString())).checked);
      //Revisa que la checkbox esté seleccionada
      if ((<HTMLInputElement> document.getElementById("HU" + this.sprint.historias[i].idHistoriaUsuario.toString())).checked) {
        //console.log("Historia terminada");
        //Da por terminada la historia con sus puntos restantes en 0
        this.sprint.historias[i].terminada = true;
        this.historiaService.Actualizar(this.sprint.historias[i].idHistoriaUsuario,this.sprint.historias[i])
        .subscribe((result: HistoriaUsuario) =>{
          console.log("ya llegue del servicio con ",result);
          //this.nuevaHistoria=result;
        });
      }
    }
    this.dialogRef.close(1);
  }

}
