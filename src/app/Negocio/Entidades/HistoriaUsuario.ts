
export class HistoriaUsuario{

	constructor(
		public idHistoriaUsuario:number,
		public numeroHu:number,
		public nombre:string,
		public descripcion:string,
		public hipervinculo:string,
		public puntosHistoria:number,
		public terminada: boolean,
		public prioridad: number,
		public idSprint: number,
		public numeroSprint: number,
		public dependencias: HistoriaUsuario[]
	){}
}