import { ISector } from './ISector'

const fakeSectors: ISector[] = [
  { id: 1, descricao: 'Setor 1' },
  { id: 1, descricao: 'Setor 2' }
]

export class SectorService {
  static async getAll (): Promise<ISector[]> {
    return fakeSectors
  }
}
