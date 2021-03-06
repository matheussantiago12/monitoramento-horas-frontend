import { api } from '../api'
import { IUser } from './IUser'

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
    const { data } = await api.post<IUser>('/usuario', {
      ...user,
      cargaHorariaDiaria: 8,
      mudarSenha: true
    })

    return data
  }

  static async update (user: ICreateUserDTO & { id: number }) {
    const { data } = await api.put<IUser>(`/usuario/${user.id}`, {
      ...user,
      cargaHorariaDiaria: 8
    })

    return data
  }

  static async getByTeamId (id: number) {
    const { data } = await api.get<IUser[]>(`/usuario/buscar-equipe/${id}`)

    return data
  }

  static async delete (id: number) {
    const { data } = await api.delete(`/usuario/${id}`)

    return data
  }
}
