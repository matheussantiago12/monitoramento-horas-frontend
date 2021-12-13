import { IPerson } from './IPerson'

const people: IPerson[] = [
  {
    id: 1,
    cargo: 'Cargo',
    horasTrabalhoDiario: 3,
    nomeCompleto: 'Matheus Santiago',
    equipeId: 1,
    tipoPessoaId: 1
  },
  {
    id: 2,
    cargo: 'Cargo',
    horasTrabalhoDiario: 8,
    nomeCompleto: 'Gustavo Souza',
    equipeId: 1,
    tipoPessoaId: 1
  },
  {
    id: 3,
    cargo: 'Cargo',
    horasTrabalhoDiario: 24,
    nomeCompleto: 'Vitor Leite',
    equipeId: 2,
    tipoPessoaId: 1
  }
]

export class PersonService {
  static async findByTeamId (id: number) {
    return people.filter(person => person.equipeId === id)
  }
}
