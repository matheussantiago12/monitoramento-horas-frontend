import React, { useEffect, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { UserService } from '../../services/user/UserService'
import { IUser } from '../../services/user/IUser'

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>()

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
                <Column field="pessoa.nomeCompleto" header="Nome" />
                <Column field="pessoa.cargo" header="Cargo" />
                <Column field="pessoa.equipe.nome" header="Equipe" />
            </DataTable>
        </Panel>
      </Container>
  )
}

export { UserList }
