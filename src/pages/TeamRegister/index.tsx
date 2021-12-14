import React from 'react'
import { TeamRegisterForm } from '../../forms/TeamRegister'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'

const TeamRegister = () => {
  return (
    <Container>
      <PageTitle>Cadastro de equipes</PageTitle>
      <Panel>
        <TeamRegisterForm />
      </Panel>
    </Container>
  )
}

export { TeamRegister }
