import { api } from '../api'
import { ISector } from '../sector/ISector'
import moment from 'moment'
import { ITeam } from '../team/ITeam'
import { IPerson } from '../person/IPerson'

interface ITrackingSectors {
  mediaMinutosOciosos: number
  setor: ISector
}

interface ITrackingTeams {
  mediaMinutosOciosos: number
  equipe: ITeam
}

interface ITrackingPeople {
  tempoOcioso: number
  pessoa: IPerson
}

interface ITrackingPerson {
  tempoOcioso: number
  rastreamentos: {
    tempoInicialOciosidade: number
    tempoFinalOciosidade: number
  }[]
}

const getDates = (period: string) => {
  const tomorrow = (new Date()).getDate() + 1
  const tomorrowDate = new Date((new Date()).setDate(tomorrow))

  if (period === '1 semana') {
    const oneWeekAgo = (new Date()).getDate() - 7
    const oneWeekAgoDate = new Date((new Date()).setDate(oneWeekAgo))

    return `?dataInicio=${moment(oneWeekAgoDate).format('YYYY-MM-DD')}&dataFim=${moment(tomorrowDate).format('YYYY-MM-DD')}`
  }

  if (period === '1 mês') {
    const oneMonthAgo = (new Date()).getDate() - 31
    const oneMonthAgoDate = new Date((new Date()).setDate(oneMonthAgo))

    return `?dataInicio=${moment(oneMonthAgoDate).format('YYYY-MM-DD')}&dataFim=${moment(tomorrowDate).format('YYYY-MM-DD')}`
  }

  if (period === '3 meses') {
    const threeMonthsAgo = (new Date()).getDate() - 90
    const threeMonthsAgoDate = new Date((new Date()).setDate(threeMonthsAgo))

    return `?dataInicio=${moment(threeMonthsAgoDate).format('YYYY-MM-DD')}&dataFim=${moment(tomorrowDate).format('YYYY-MM-DD')}`
  }

  if (period === '6 meses') {
    const sixMonthsAgo = (new Date()).getDate() - 180
    const sixMonthsAgoDate = new Date((new Date()).setDate(sixMonthsAgo))

    return `?dataInicio=${moment(sixMonthsAgoDate).format('YYYY-MM-DD')}&dataFim=${moment(tomorrowDate).format('YYYY-MM-DD')}`
  }

  if (period === '1 ano') {
    const oneYearAgo = (new Date()).getDate() - 365
    const oneYearAgoDate = new Date((new Date()).setDate(oneYearAgo))

    return `?dataInicio=${moment(oneYearAgoDate).format('YYYY-MM-DD')}&dataFim=${moment(tomorrowDate).format('YYYY-MM-DD')}`
  }
}

export class TrackingService {
  static async getSectors (period: string) {
    const { data } = await api.get<ITrackingSectors[]>(`/rastreamento/dashboard${getDates(period)}`)

    return data
  }

  static async getTeams (sectorId: number, period: string) {
    const { data } = await api.get<ITrackingTeams[]>(`/rastreamento/dashboard/PorSetor${getDates(period)}&setorId=${sectorId}`)

    return data
  }

  static async getPeople (teamId: number, period: string) {
    const { data } = await api.get<ITrackingPeople[]>(`/rastreamento/dashboard/PorEquipe${getDates(period)}&equipeId=${teamId}`)

    return data
  }

  static async getPerson (personId: number, period: string) {
    const { data } = await api.get<ITrackingPerson>(`/rastreamento/dashboard/PorPessoa${getDates(period)}&pessoaId=${personId}`)

    return data
  }
}
