import { ITeam } from './ITeam'

const fakeTeams: ITeam[] = [
  { id: 1, nome: 'Time 1', setorId: 1 },
  { id: 2, nome: 'Time 2', setorId: 1 },
  { id: 3, nome: 'Time 3', setorId: 2 },
  { id: 4, nome: 'Time 4', setorId: 2 }
]

export class TeamService {
  static async findBySectorId (id: number) {
    return fakeTeams.filter(team => team.setorId === id)
  }
}
