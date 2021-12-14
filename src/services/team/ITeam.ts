import { ISector } from '../sector/ISector'
import { IUser } from '../user/IUser'

export interface ITeam {
    id: number;
    nome: string;
    setorId: number;
    setor?: ISector | null;
    pessoaLider?: IUser | null
    pessoaLiderId: number
}
