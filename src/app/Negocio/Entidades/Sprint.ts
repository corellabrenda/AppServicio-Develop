
import { HistoriaUsuario } from './HistoriaUsuario';

export class Sprint{

	constructor(
		public idSprint:number,
		public numeroSprint:number,
		public velocidad:number,
		public actual: boolean,
		public terminado:boolean,
		public historias: HistoriaUsuario[]
	){}
}