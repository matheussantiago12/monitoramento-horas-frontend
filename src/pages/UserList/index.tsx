import React, { useEffect, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { UserService } from '../../services/user/UserService'
import { IUser } from '../../services/user/IUser'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>()

  const history = useHistory()

  const handleEditClick = (id: number) => {
    history.push(`/usuarios/${id}`)
  }

  const fetchUsers = async () => {
    const users = await UserService.getAll()
    setUsers(users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
      <Container>
        <PageTitle>Lista de usuários</PageTitle>
        <Panel>
            <DataTable value={users} showGridlines={true}>
                <Column
                  field="pessoa.nomeCompleto"
                  header="Nome"
                />
                <Column
                  field="pessoa.cargo"
                  header="Cargo"
                />
                <Column
                  field="pessoa.equipe.nome"
                  header="Equipe"
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

export { UserList }
