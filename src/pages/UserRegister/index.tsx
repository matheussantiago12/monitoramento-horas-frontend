import React from 'react'
import { RegisterForm } from '../../forms/Register'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'

const UserRegister = () => {
  return (
    <Container>
      <PageTitle>Cadastro de usuários</PageTitle>
      <Panel>
        <RegisterForm />
      </Panel>
    </Container>
  )
}

export { UserRegister }
