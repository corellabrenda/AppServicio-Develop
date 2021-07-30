import {PlanLiberacion} from './PlanLiberacion';

export class Proyecto{

	constructor(
		public idProyecto: number,
		public nombre:string,
		public descripcion:string,
		public fechaInicio: string,
		public fechaEntrega: string,
		public fechaUltimaMod: string,
		public terminado: boolean,
		public duracionSprint: number,
		public planesLiberacion: PlanLiberacion[]
	){}
}