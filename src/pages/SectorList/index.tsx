import React, { useEffect, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { SectorService } from '../../services/sector/SectorService'
import { ISector } from '../../services/sector/ISector'

const SectorList = () => {
  const [sectors, setSectors] = useState<ISector[]>()

  const history = useHistory()

  const handleEditClick = (id: number) => {
    history.push(`/setores/${id}`)
  }

  const fetchUsers = async () => {
    const users = await SectorService.getAll()
    setSectors(users)
  }

  const handleClickRegister = () => {
    history.push('/setor')
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
      <Container>
        <PageTitle style={{ width: '100%' }} className="flex align-items-center justify-content-between">
          <span>Lista de setores</span>
          <Button icon="pi pi-plus" label="Novo" onClick={handleClickRegister} />
        </PageTitle>
        <Panel>
          <div className="formgrid grid mb-4">
            <div className="col-12 md:col-11 field">
              <InputText placeholder="Buscar setor" className="w-full inputfield" />
            </div>
            <div className="col-12 md:col-1 field">
              <Button icon="pi pi-search" className="w-full h-full inputfield" />
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

export { SectorList }
