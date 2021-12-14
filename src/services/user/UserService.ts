import { api } from '../api'
import { IUser } from './IUser'

// const fakeUsers: IUser[] = [
//   {
//     id: 1,
//     email: 'teste@gmail.com',
//     senha: '123456',
//     pessoaId: 1,
//     pessoa: {
//       id: 1,
//       cargo: 'Cargo',
//       horasTrabalhoDiario: 3,
//       nomeCompleto: 'Matheus Santiago',
//       equipeId: 1,
//       tipoPessoaId: 1,
//       equipe: {
//         id: 1,
//         nome: 'Time 1',
//         setorId: 1,
//         pessoaLiderId: 1
//       }
//     }
//   }
// ]

interface ICreateUserDTO {
  email: string
  senha: string
  cargo: string
  nomeCompleto: string
  equipeId: number
  tipoPessoaId: number
}

export class UserService {
  static async getAll (search?: string) {
    const { data } = await api.get<IUser[]>(search ? `/usuario/PorNome?nome=${search}` : '/usuario')

    return data
  }

  static async get (id: number) {
    const { data } = await api.get<IUser>(`/usuario/${id}`)

    return data
  }

  static async getLeaders () {
    const { data } = await api.get<IUser[]>('/usuario/lideres')

    return data
  }

  static async create (user: ICreateUserDTO) {
    const { data } = await api.post<IUser>('/usuario', user)

    return data
  }

  static async update (user: ICreateUserDTO & { id: number }) {
    const { data } = await api.put<IUser>(`/usuario/${user.id}`, {
      ...user,
      cargaHorariaDiaria: 8
    })

    return data
  }
}
