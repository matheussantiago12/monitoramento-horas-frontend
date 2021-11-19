import React, { useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { Doughnut } from 'react-chartjs-2'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'

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

interface Model {
  id: number;
  string: string;
}

const sectorOptions = [
  { id: 1, name: 'Setor 1' },
  { id: 1, name: 'Setor 2' }
]

const teamOptions = [
  { id: 1, name: 'Equipe 1' },
  { id: 1, name: 'Equipe 2' }

]

const personOptions = [
  { id: 1, name: 'Pessoa 1' },
  { id: 1, name: 'Pessoa 2' }

]

const Dashboard = () => {
  const [sector, setSector] = useState<Model>()
  const [team, setTeam] = useState<Model>()
  const [person, setPerson] = useState<Model>()

  return (
    <Container>
        <PageTitle>Dashboard</PageTitle>
        <Panel>
          <div className="formgrid grid filter-container">
            <div className="col-4 field">
              <label htmlFor="">Setor</label>
              <Dropdown
                placeholder="Selecione o setor..."
                className="w-full inputfield"
                value={sector}
                optionLabel="name"
                options={sectorOptions}
                onChange={e => setSector(e.target.value)}
              />
            </div>
            <div className="col-4 field">
            <label htmlFor="">Equipe</label>
              <Dropdown
                placeholder="Selecione a equipe..."
                className="w-full inputfield"
                value={team}
                optionLabel="name"
                options={teamOptions}
                onChange={e => setTeam(e.target.value)}
                disabled={!sector}
              />
            </div>
            <div className="col-4 field">
            <label htmlFor="">Pessoa</label>
              <Dropdown
                placeholder="Selecione a pessoa..."
                className="w-full inputfield"
                value={person}
                optionLabel="name"
                options={personOptions}
                onChange={e => setPerson(e.target.value)}
                disabled={!team}
              />
            </div>
            <div className="col-12 field">
              <label htmlFor="">Período</label>
              <SelectButton
                options={['1 semana', '1 mês', '3 meses', '6 meses', '1 ano']}
                className="w-full inputfield"
              />
            </div>
          </div>
          <div className="flex justify-content-end">
            <Button className="mr-2 p-button-outlined" label="Limpar" />
            <Button label="Filtrar" />
          </div>
        </Panel>
        <Panel style={{ marginTop: '40px' }}>
            <Doughnut
                data={data}
            />
        </Panel>
    </Container>
  )
}

export { Dashboard }
