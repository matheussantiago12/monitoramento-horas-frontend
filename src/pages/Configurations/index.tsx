import React from 'react'
import { PageTitle, Panel } from '../../styles/shared'
import { ConfigurationsForm } from '../../forms/Configurations'

const Configurations = () => {
  return (
    <div>
      <PageTitle>Configurações</PageTitle>
      <Panel>
        <ConfigurationsForm />
      </Panel>
    </div>
  )
}

export { Configurations }
