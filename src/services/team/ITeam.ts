import { ISector } from '../sector/ISector'

export interface ITeam {
    id: number;
    nome: string;
    setorId: number;
    setor?: ISector | null;
}
