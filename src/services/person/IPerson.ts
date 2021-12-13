import { ITeam } from '../team/ITeam'

export interface IPerson {
    id: number;
    nomeCompleto: string;
    cargo: string;
    horasTrabalhoDiario: number;
    equipeId: number;
    equipe?: ITeam;
    tipoPessoaId: number;
}
