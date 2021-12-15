import React, { useEffect, useRef, useState } from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { UserService } from '../../services/user/UserService'
import { IUser } from '../../services/user/IUser'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import Swal from 'sweetalert2'
import { Toast } from 'primereact/toast'

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>()

  const history = useHistory()
  const toast = useRef<any>(null)

  const handleEditClick = (id: number) => {
    history.push(`/usuarios/${id}`)
  }

  const fetchUsers = async () => {
    const users = await UserService.getAll()
    setUsers(users)
  }

  const handleClickRegister = () => {
    history.push('/usuario')
  }

  const handleDelete = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Você tem certeza que deseja excluir este usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(63,81,181)',
      cancelButtonColor: 'rgb(211,47,47)',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    })

    if (isConfirmed) {
      try {
        await UserService.delete(id)

        setUsers(users?.filter((user) => user.id !== id))

        toast.current!.show({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Usuário excluído com sucesso!',
          life: 2500
        })
      } catch (error) {
        toast.current!.show({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Não é possível excluir este usuário pois ele já está sendo utilizado!',
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
          <span>Lista de usuários</span>
          <Button icon="pi pi-plus" label="Novo" onClick={handleClickRegister} />
        </PageTitle>
        <Panel>
          <div className="formgrid grid mb-4">
            <div className="col-12 md:col-11 field">
              <InputText placeholder="Buscar usuário" className="w-full inputfield" />
            </div>
            <div className="col-12 md:col-1 field">
              <Button icon="pi pi-search" className="w-full h-full inputfield" />
            </div>
          </div>
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

export { UserList }
