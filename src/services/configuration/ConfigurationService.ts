import { api } from '../api'
import { IConfiguration } from './IConfiguration'

export class ConfigurationService {
  static async getConfiguration () {
    const { data } = await api.get<IConfiguration>('/configuracao/1')

    return data
  }

  static async update (timeLimit: number) {
    await api.put('/configuracao/1', {
      tempoLimiteOciosidade: timeLimit,
      pausaPeriodo: 1
    })
  }
}
