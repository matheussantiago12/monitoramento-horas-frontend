import { api } from '../api'
import { ISector } from './ISector'

// const fakeSectors: ISector[] = [
//   { id: 1, descricao: 'Setor 1' },
//   { id: 2, descricao: 'Setor 2' }
// ]

export class SectorService {
  static async getAll (search?: string): Promise<ISector[]> {
    const { data } = await api.get<ISector[]>(search ? `/setor/PorNome?nome=${search}` : '/setor')

    return data
  }

  static async get (id: number) {
    const { data } = await api.get<ISector>(`/setor/${id}`)

    return data
  }

  static async create (sector: Omit<ISector, 'id'>) {
    const { data } = await api.post<ISector>('/setor', sector)

    return data
  }

  static async update (sector: ISector) {
    const { data } = await api.put(`/setor/${sector.id}`, {
      descricao: sector.descricao
    })

    return data
  }

  static async delete (id: number) {
    await api.delete(`/setor/${id}`)
  }
}
