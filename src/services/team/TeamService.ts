import { api } from '../api'
import { ITeam } from './ITeam'

// const fakeTeams: ITeam[] = [
//   { id: 1, nome: 'Time 1', setorId: 1, setor: { id: 1, descricao: 'Setor 1' }, pessoaLiderId: 1 },
//   { id: 2, nome: 'Time 2', setorId: 1, setor: { id: 1, descricao: 'Setor 1' }, pessoaLiderId: 1 },
//   { id: 3, nome: 'Time 3', setorId: 2, setor: { id: 2, descricao: 'Setor 2' }, pessoaLiderId: 2 },
//   { id: 4, nome: 'Time 4', setorId: 2, setor: { id: 2, descricao: 'Setor 2' }, pessoaLiderId: 2 }
// ]

interface ICreateTeamDTO {
  nome: string
  pessoaLiderId: number
  setorId: number
}

export class TeamService {
  static async getAll (search?: string) {
    const { data } = await api.get<ITeam[]>(search ? `/equipe/PorNome?nome=${search}` : '/equipe')

    return data
  }

  static async get (id: number) {
    const { data } = await api.get<ITeam>(`/equipe/${id}`)

    return data
  }

  static async create (team: ICreateTeamDTO) {
    const { data } = await api.post<ITeam>('/equipe', team)

    return data
  }

  static async update (team: ICreateTeamDTO & { id: number }) {
    const { data } = await api.put<ITeam>(`/equipe/${team.id}`, team)

    return data
  }

  static async getBySectorId (id: number) {
    const { data } = await api.get<ITeam[]>(`/equipe/buscar-setor/${id}`)

    return data
  }
}
