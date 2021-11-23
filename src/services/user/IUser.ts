import { IPerson } from '../person/IPerson'

export interface IUser {
    id: number;
    email: string;
    senha: string;
    pessoaId: 1;
    pessoa?: IPerson
}
