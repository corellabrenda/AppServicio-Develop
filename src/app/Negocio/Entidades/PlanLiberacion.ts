import {Sprint} from '../Entidades/Sprint';
import {Colaborador} from '../Entidades/Colaborador';
import {HistoriaUsuario} from '../Entidades/HistoriaUsuario';
export class PlanLiberacion{

	constructor(
		public idPlanLiberacion:number,
		public nombre:string,
		public costo:number,
		public estabilidad: number,
		public valorLiberacion: number,
		public aprovechamiento: number,
		public tiempoExtraPorcentaje: number,
		public pendiente: boolean,
		public sprints: Sprint[],
		public colaboradores: Colaborador[],
		public backlog: HistoriaUsuario[]

	){}
}