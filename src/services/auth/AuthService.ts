import { api } from '../api'

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
}
