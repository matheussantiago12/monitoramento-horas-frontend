import React from 'react'
import { SectorRegisterForm } from '../../forms/SectorRegister'
import { PageTitle, Panel } from '../../styles/shared'
import { Container } from './styles'

const SectorRegister = () => {
  return (
    <Container>
      <PageTitle>Cadastro de setores</PageTitle>
      <Panel>
        <SectorRegisterForm />
      </Panel>
    </Container>
  )
}

export { SectorRegister }
