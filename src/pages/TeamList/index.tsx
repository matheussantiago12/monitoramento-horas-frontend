import React, { useEffect, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { TeamService } from '../../services/team/TeamService'
import { ITeam } from '../../services/team/ITeam'

const TeamList = () => {
  const [teams, setTeams] = useState<ITeam[]>()

  const history = useHistory()

  const handleEditClick = (id: number) => {
    history.push(`/equipes/${id}`)
  }

  const fetchTeams = async () => {
    const teams = await TeamService.getAll()
    setTeams(teams)
  }

  const handleClickRegister = () => {
    history.push('/equipe')
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  return (
      <Container>
        <PageTitle style={{ width: '100%' }} className="flex align-items-center justify-content-between">
          <span>Lista de equipes</span>
          <Button icon="pi pi-plus" label="Novo" onClick={handleClickRegister} />
        </PageTitle>
        <Panel>
          <div className="formgrid grid mb-4">
            <div className="col-12 md:col-11 field">
              <InputText placeholder="Buscar equipe" className="w-full inputfield" />
            </div>
            <div className="col-12 md:col-1 field">
              <Button icon="pi pi-search" className="w-full h-full inputfield" />
            </div>
          </div>
          <DataTable value={teams} showGridlines={true}>
            <Column
              field="nome"
              header="Equipe"
            />
            <Column
              field="setor.descricao"
              header="Setor"
            />
            <Column
              style={{ width: '7.5%', textAlign: 'center' }}
              field=""
              header=""
              body={(data) => (
                <Button
                  icon="pi pi-pencil"
                  onClick={() => handleEditClick(data.id)}
                />
              )}
            />
            <Column
              style={{ width: '7.5%', textAlign: 'center' }}
              field=""
              header=""
              body={() => (
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => alert('Teste')}
                />
              )}
            />
          </DataTable>
        </Panel>
      </Container>
  )
}

export { TeamList }
