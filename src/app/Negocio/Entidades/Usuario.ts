import {Colaborador} from './Colaborador';
import {Proyecto} from './Proyecto';

export class Usuario{


	constructor(
		public usuario:string,
		public correoElectronico:string,
		public telefono:string,
		public contrasenia:string,
		public nombre:string,
		public apellidoPaterno:string,
		public apellidoMaterno:string,
		//public colaboradores: Colaborador[],
		//public proyectos: Proyecto[]

	){}
}