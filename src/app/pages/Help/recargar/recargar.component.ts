import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recargar',
  templateUrl: './recargar.component.html',
  styleUrls: ['./recargar.component.css']
})
export class RecargarComponent implements OnInit {

  constructor( private location: Location) { }

  ngOnInit(): void {
  }

  regresar(){
  	this.location.back();
  }

}
