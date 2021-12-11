import { ISector } from './ISector'

const fakeSectors: ISector[] = [
  { id: 1, descricao: 'Setor 1' },
  { id: 2, descricao: 'Setor 2' }
]

export class SectorService {
  static async getAll (): Promise<ISector[]> {
    return fakeSectors
  }

  static async get (id: number) {
    return fakeSectors.find((sector) => sector.id === id)
  }
}
