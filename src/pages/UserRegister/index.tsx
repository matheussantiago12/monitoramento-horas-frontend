import React from 'react'
import { UserRegisterForm } from '../../forms/UserRegister'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'

const UserRegister = () => {
  return (
    <Container>
      <PageTitle>Cadastro de usuários</PageTitle>
      <Panel>
        <UserRegisterForm />
      </Panel>
    </Container>
  )
}

export { UserRegister }
