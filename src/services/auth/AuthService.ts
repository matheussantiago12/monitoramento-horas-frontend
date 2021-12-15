import { api } from '../api'
import { IUser } from '../user/IUser'

interface ILoginResponse {
  token: string;
}

export class AuthService {
  static async login (email: string, password: string) {
    const { data } = await api.post<ILoginResponse>('/usuario/validar-credenciais', {
      email,
      senha: password
    })

    return data
  }

  static async getCurrentUser () {
    const { data } = await api.get<IUser>('/usuario/logado')

    return data
  }
}
