import { IUser } from './IUser'

const fakeUsers: IUser[] = [
  {
    id: 1,
    email: 'teste@gmail.com',
    senha: '123456',
    pessoaId: 1,
    pessoa: {
      id: 1,
      cargo: 'Cargo',
      horasTrabalhoDiario: 3,
      nomeCompleto: 'Matheus Santiago',
      equipeId: 1,
      equipe: {
        id: 1,
        nome: 'Time 1',
        setorId: 1
      }
    }
  }
]

export class UserService {
  static async getAll () {
    return fakeUsers
  }
}
