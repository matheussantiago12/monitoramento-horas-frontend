import React, { useEffect, useRef, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { SectorService } from '../../services/sector/SectorService'
import { ISector } from '../../services/sector/ISector'
import Swal from 'sweetalert2'
import { Toast } from 'primereact/toast'

const SectorList = () => {
  const [sectors, setSectors] = useState<ISector[]>()
  const [search, setSearch] = useState('')

  const history = useHistory()

  const toast = useRef<any>()

  const handleEditClick = (id: number) => {
    history.push(`/setores/${id}`)
  }

  const fetchUsers = async (search?: string) => {
    const users = await SectorService.getAll(search)
    setSectors(users)
  }

  const handleClickRegister = () => {
    history.push('/setor')
  }

  const handleDelete = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Você tem certeza que deseja excluir este setor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(63,81,181)',
      cancelButtonColor: 'rgb(211,47,47)',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    })

    if (isConfirmed) {
      try {
        await SectorService.delete(id)

        setSectors(sectors?.filter((sector) => sector.id !== id))

        toast.current!.show({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Setor excluído com sucesso!',
          life: 2500
        })
      } catch (error) {
        toast.current!.show({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Não é possível excluir este setor pois ele já está sendo utilizado!',
          life: 2500
        })
      }
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
      <Container>
        <Toast ref={toast} />
        <PageTitle style={{ width: '100%' }} className="flex align-items-center justify-content-between">
          <span>Lista de setores</span>
          <Button icon="pi pi-plus" label="Novo" onClick={handleClickRegister} />
        </PageTitle>
        <Panel>
          <div className="formgrid grid mb-4">
            <div className="col-12 md:col-11 field">
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar setor"
                className="w-full inputfield"
              />
            </div>
            <div className="col-12 md:col-1 field">
              <Button
                icon="pi pi-search"
                className="w-full h-full inputfield"
                onClick={() => fetchUsers(search)}
              />
            </div>
          </div>
          <DataTable value={sectors} showGridlines={true}>
            <Column
              field="descricao"
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

export { SectorList }
