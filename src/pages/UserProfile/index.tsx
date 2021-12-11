import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RegisterForm } from '../../forms/Register'
import { IUser } from '../../services/user/IUser'
import { UserService } from '../../services/user/UserService'
import { PageTitle, Panel } from '../../styles/shared'

const UserProfile = () => {
  const [user, setUser] = useState<IUser>()
  const { id } = useParams<{ id: string | undefined }>()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.get(Number(id))
      setUser(user)
    }

    fetchUser()
  }, [])

  return (
    <div>
      <PageTitle>Perfil do usuário</PageTitle>
      <Panel>
        <RegisterForm data={user} />
      </Panel>
    </div>
  )
}

export { UserProfile }
