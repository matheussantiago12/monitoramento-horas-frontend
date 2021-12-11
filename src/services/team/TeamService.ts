import { ITeam } from './ITeam'

const fakeTeams: ITeam[] = [
  { id: 1, nome: 'Time 1', setorId: 1, setor: { id: 1, descricao: 'Setor 1' } },
  { id: 2, nome: 'Time 2', setorId: 1, setor: { id: 1, descricao: 'Setor 1' } },
  { id: 3, nome: 'Time 3', setorId: 2, setor: { id: 2, descricao: 'Setor 2' } },
  { id: 4, nome: 'Time 4', setorId: 2, setor: { id: 2, descricao: 'Setor 2' } }
]

export class TeamService {
  static async getAll () {
    return fakeTeams
  }

  static async get (id: number) {
    return fakeTeams.find((team) => team.id === id)
  }

  static async findBySectorId (id: number) {
    return fakeTeams.filter(team => team.setorId === id)
  }
}
