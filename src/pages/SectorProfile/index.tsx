import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SectorRegisterForm } from '../../forms/SectorRegister'
import { ISector } from '../../services/sector/ISector'
import { SectorService } from '../../services/sector/SectorService'
import { PageTitle, Panel } from '../../styles/shared'

const SectorProfile = () => {
  const [sector, setSector] = useState<ISector>()
  const { id } = useParams<{ id: string | undefined }>()

  useEffect(() => {
    const fetchSector = async () => {
      const sector = await SectorService.get(Number(id))
      setSector(sector)
    }

    fetchSector()
  }, [])

  return (
    <div>
      <PageTitle>Perfil do setor</PageTitle>
      <Panel>
        <SectorRegisterForm data={sector} />
      </Panel>
    </div>
  )
}

export { SectorProfile }
