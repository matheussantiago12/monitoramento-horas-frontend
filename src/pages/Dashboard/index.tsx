import React, { useEffect, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { Doughnut } from 'react-chartjs-2'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'
import { ISector } from '../../services/sector/ISector'
import { SectorService } from '../../services/sector/SectorService'
import { TeamService } from '../../services/team/TeamService'
import { ITeam } from '../../services/team/ITeam'
import { PersonService } from '../../services/person/PersonService'
import { IPerson } from '../../services/person/IPerson'

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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
}

const Dashboard = () => {
  const [sector, setSector] = useState<ISector>()
  const [team, setTeam] = useState<ITeam>()
  const [person, setPerson] = useState<IPerson>()
  const [period, setPeriod] = useState<string>('1 semana')

  const [sectorOptions, setSectorOptions] = useState<ISector[]>()
  const [teamOptions, setTeamOptions] = useState<ITeam[]>()
  const [personOptions, setPersonOptions] = useState<IPerson[]>()

  const fetchSectorOptions = async () => {
    const sectors = await SectorService.getAll()
    setSectorOptions(sectors)
  }

  const fetchTeamsBySectorId = async (id: number) => {
    const teams = await TeamService.findBySectorId(id)
    setTeamOptions(teams)
  }

  const fetchPeopleByTeamId = async (id: number) => {
    const people = await PersonService.findByTeamId(id)
    setPersonOptions(people)
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
    setSectorOptions(undefined)
    setTeamOptions(undefined)
    setPersonOptions(undefined)
  }

  useEffect(() => {
    fetchSectorOptions()
  }, [])

  return (
    <Container>
        <PageTitle>Dashboard</PageTitle>
        <Panel>
          <div className="dashboard-title-container">
            <div className="dashboard-title">Gráfico de tempo ocioso</div>
          </div>
          <div className="formgrid grid filter-container">
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
            <div className="col-4 field">
            <label htmlFor="">Pessoa</label>
              <Dropdown
                placeholder="Selecione a pessoa..."
                className="w-full inputfield"
                value={person}
                optionLabel="nomeCompleto"
                options={personOptions}
                onChange={e => setPerson(e.target.value)}
                disabled={!team}
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
            <Button
              label="Limpar"
              className="mr-2 p-button-outlined"
              onClick={clearFilter}
            />
            <Button label="Filtrar" />
          </div>
            <Doughnut
                data={data}
            />
        </Panel>
    </Container>
  )
}

export { Dashboard }
