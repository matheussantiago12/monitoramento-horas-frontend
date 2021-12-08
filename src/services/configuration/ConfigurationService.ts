import { IConfiguration } from './IConfiguration'

const configuration: IConfiguration = {
  tempoLimiteOciosidade: 5
}

export class ConfigurationService {
  static async getConfiguration () {
    return configuration
  }
}
