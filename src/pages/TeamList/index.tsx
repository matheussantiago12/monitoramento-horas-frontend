import React, { useEffect, useRef, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { TeamService } from '../../services/team/TeamService'
import { ITeam } from '../../services/team/ITeam'
import Swal from 'sweetalert2'
import { Toast } from 'primereact/toast'

const TeamList = () => {
  const [teams, setTeams] = useState<ITeam[]>()
  const [search, setSearch] = useState('')

  const history = useHistory()
  const toast = useRef<any>(null)

  const handleEditClick = (id: number) => {
    history.push(`/equipes/${id}`)
  }

  const fetchTeams = async (search?: string) => {
    const teams = await TeamService.getAll(search)
    setTeams(teams)
  }

  const handleClickRegister = () => {
    history.push('/equipe')
  }

  const handleDelete = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Você tem certeza que deseja excluir esta equipe?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(63,81,181)',
      cancelButtonColor: 'rgb(211,47,47)',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    })

    if (isConfirmed) {
      try {
        await TeamService.delete(id)

        setTeams(teams?.filter((team) => team.id !== id))

        toast.current!.show({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Equipe excluída com sucesso!',
          life: 2500
        })
      } catch (error) {
        toast.current!.show({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Não é possível excluir esta equipe pois ela já está sendo utilizada!',
          life: 2500
        })
      }
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  return (
      <Container>
        <Toast ref={toast} />
        <PageTitle style={{ width: '100%' }} className="flex align-items-center justify-content-between">
          <span>Lista de equipes</span>
          <Button icon="pi pi-plus" label="Novo" onClick={handleClickRegister} />
        </PageTitle>
        <Panel>
          <div className="formgrid grid mb-4">
            <div className="col-12 md:col-11 field">
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar equipe"
                className="w-full inputfield"
              />
            </div>
            <div className="col-12 md:col-1 field">
              <Button
                icon="pi pi-search"
                className="w-full h-full inputfield"
                onClick={() => fetchTeams(search)}
              />
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
              body={(data) => (
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => handleDelete(data.id)}
                />
              )}
            />
          </DataTable>
        </Panel>
      </Container>
  )
}

export { TeamList }
