import React, { useEffect, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container, TimeCard } from './styles'
import { Doughnut } from 'react-chartjs-2'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'
import { ISector } from '../../services/sector/ISector'
import { SectorService } from '../../services/sector/SectorService'
import { TeamService } from '../../services/team/TeamService'
import { ITeam } from '../../services/team/ITeam'
import { IUser } from '../../services/user/IUser'
import { UserService } from '../../services/user/UserService'
import { TrackingService } from '../../services/tracking/TrackingService'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import moment from 'moment'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const [sector, setSector] = useState<ISector>()
  const [team, setTeam] = useState<ITeam>()
  const [person, setPerson] = useState<IUser>()
  const [period, setPeriod] = useState<string>('1 semana')

  const [sectorOptions, setSectorOptions] = useState<ISector[]>()
  const [teamOptions, setTeamOptions] = useState<ITeam[]>()
  const [personOptions, setPersonOptions] = useState<IUser[]>()

  const [chartData, setChartData] = useState<any>()

  const [personTrackings, setPersonTrackings] = useState<{ tempoInicialOciosidade: number, tempoFinalOciosidade: number }[]>()
  const [personTotalTime, setPersonTotalTime] = useState<number>()

  const [pageTitle, setPageTitle] = useState('')

  const fetchSectorOptions = async () => {
    const sectors = await SectorService.getAll()
    setSectorOptions(sectors)
  }

  const fetchTeamsBySectorId = async (id: number) => {
    const teams = await TeamService.getBySectorId(id)
    setTeamOptions(teams)
  }

  const fetchPeopleByTeamId = async (id: number) => {
    const users = await UserService.getByTeamId(id)
    setPersonOptions(users)
  }

  const handleChangeSector = async (e: DropdownChangeParams) => {
    const sector: ISector = e.target.value
    setSector(sector)
    await fetchTeamsBySectorId(sector.id)
  }

  const handleChangeTeam = async (e: DropdownChangeParams) => {
    const team: ITeam = e.target.value
    setTeam(team)
    await fetchPeopleByTeamId(team.id)
  }

  const clearFilter = () => {
    setSector(undefined)
    setTeam(undefined)
    setPerson(undefined)
    setPeriod('1 semana')
  }

  const handleFilter = () => {
    if (!sector) {
      loadDefaultChart()
    }

    if (sector && !team && !person) {
      loadTeamsChart()
    }

    if (team && !person) {
      loadPeopleChart()
    }

    if (person) {
      loadPersonData()
    }
  }

  const loadDefaultChart = async () => {
    const tracking = await TrackingService.getSectors(period)

    setChartData({
      labels: tracking.map(t => t.setor.descricao),
      datasets: [
        {
          label: 'Média de tempo ocioso por setor',
          data: tracking.map(t => t.mediaMinutosOciosos),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    })

    setPageTitle('Média de minutos ociosos por pessoa em cada setor')
  }

  const loadTeamsChart = async () => {
    const tracking = await TrackingService.getTeams(sector!.id, period)

    setChartData({
      labels: tracking.map(t => t.equipe.nome),
      datasets: [
        {
          label: 'Média de tempo ocioso por equipe',
          data: tracking.map(t => t.mediaMinutosOciosos),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    })

    setPageTitle('Média de minutos ociosos por pessoa em cada equipe')
  }

  const loadPeopleChart = async (teamId?: number) => {
    const tracking = await TrackingService.getPeople(teamId || team!.id, period)

    setChartData({
      labels: tracking.map(t => t.pessoa.nomeCompleto),
      datasets: [
        {
          label: 'Média de tempo ocioso por equipe',
          data: tracking.map(t => t.tempoOcioso),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    })

    setPageTitle('Média de minutos ociosos por pessoa')
  }

  const loadPersonData = async () => {
    const { rastreamentos, tempoOcioso } = await TrackingService.getPerson(person!.pessoaId, period)
    setPersonTrackings(rastreamentos)
    setPersonTotalTime(tempoOcioso)

    setPageTitle(`Informações de ${rastreamentos[0]?.pessoa?.nomeCompleto}`)
  }

  const getTimeCardBackgroundColor = (minutes: number) => {
    if (minutes > 59) {
      return '#ffa8b6'
    }

    if (minutes > 14) {
      return '#b5d1ff'
    }

    return '#89d0ba'
  }

  const { user } = useAuth()

  useEffect(() => {
    const fetch = async () => {
      if (user?.pessoa?.tipoPessoaId === 2) {
        setTeam(user.pessoa.equipe)
        await fetchPeopleByTeamId(user.pessoa.equipeId)
        loadPeopleChart(user.pessoa.equipeId)
      } else if (user?.pessoa?.tipoPessoaId === 1) {
        fetchSectorOptions()
        loadDefaultChart()
      }
    }

    fetch()
  }, [user?.pessoa?.tipoPessoaId])

  return (
    <Container>
        <PageTitle>Dashboard {user?.pessoa?.tipoPessoaId === 2 ? ` - Equipe ${user.pessoa.equipe?.nome}` : ''}</PageTitle>
        <Panel>
          <div className="dashboard-title-container">
            <div className="dashboard-title">{pageTitle}</div>
          </div>
          <div className="formgrid grid filter-container">
            {(user?.pessoa?.tipoPessoaId === 1) && (
              <div className="col-4 field">
                <label htmlFor="">Setor</label>
                <Dropdown
                  placeholder="Selecione o setor..."
                  className="w-full inputfield"
                  value={sector}
                  optionLabel="descricao"
                  options={sectorOptions}
                  onChange={handleChangeSector}
                />
              </div>
            )}
            {(user?.pessoa?.tipoPessoaId === 1) && (
              <div className="col-4 field">
              <label htmlFor="">Equipe</label>
                <Dropdown
                  placeholder="Selecione a equipe..."
                  className="w-full inputfield"
                  value={team}
                  optionLabel="nome"
                  options={teamOptions}
                  onChange={handleChangeTeam}
                  disabled={!sector}
                />
              </div>
            )}
            <div className="col-4 field">
            <label htmlFor="">Pessoa</label>
              <Dropdown
                placeholder="Selecione a pessoa..."
                className="w-full inputfield"
                value={person}
                optionLabel="pessoa.nomeCompleto"
                options={personOptions}
                onChange={e => setPerson(e.target.value)}
                disabled={user?.pessoa?.tipoPessoaId === 2 ? false : !team}
              />
            </div>
            <div className="col-12 field">
              <label htmlFor="">Período</label>
              <SelectButton
                options={['1 semana', '1 mês', '3 meses', '6 meses', '1 ano']}
                value={period}
                onChange={e => setPeriod(e.target.value)}
                className="w-full inputfield"
              />
            </div>
          </div>
          <div className="flex justify-content-end">
            {user?.pessoa?.tipoPessoaId === 1 && (
              <Button
                label="Limpar"
                className="mr-2 p-button-outlined"
                onClick={clearFilter}
              />
            )}
            <Button label="Filtrar" onClick={handleFilter} />
          </div>
            {(!personTrackings && chartData) && (
              <div style={{
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '75px'
              }}>
                <Doughnut
                  data={chartData}
                />
              </div>
            )}
            {personTrackings && (
              <>
                <h2 style={{ marginBottom: '26px' }}>
                  Tempo total no período:&nbsp;
                  <span style={{ fontWeight: 400 }}>{moment.utc(Number(personTotalTime) * 60000).format('HH:mm:ss')}</span>
                </h2>
                <DataTable value={personTrackings}>
                  <Column
                    header="Horário início ociosidade"
                    field="tempoInicialOciosidade"
                    body={(data) => moment(data.tempoInicialOciosidade).format('DD/MM/YYYY - HH:mm')}
                  />
                  <Column
                    header="Horário final ociosidade"
                    field="tempoFinalOciosidade"
                    body={(data) => moment(data.tempoFinalOciosidade).format('DD/MM/YYYY - HH:mm')}
                  />
                  <Column
                    header="Tempo (minutos)"
                    style={{ textAlign: 'center' }}
                    body={(data) => {
                      const minutes = moment(data.tempoFinalOciosidade).diff(data.tempoInicialOciosidade, 'minutes')
                      return (
                        <TimeCard backgroundColor={getTimeCardBackgroundColor(minutes)}>
                          {minutes}
                        </TimeCard>
                      )
                    }}
                  />
                </DataTable>
              </>
            )}
        </Panel>
    </Container>
  )
}

export { Dashboard }
