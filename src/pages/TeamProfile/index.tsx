import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TeamRegisterForm } from '../../forms/TeamRegister'
import { ITeam } from '../../services/team/ITeam'
import { TeamService } from '../../services/team/TeamService'
import { PageTitle, Panel } from '../../styles/shared'

const TeamProfile = () => {
  const [team, setTeam] = useState<ITeam>()
  const { id } = useParams<{ id: string | undefined }>()

  useEffect(() => {
    const fetchTeam = async () => {
      const team = await TeamService.get(Number(id))
      setTeam(team)
    }

    fetchTeam()
  }, [])

  return (
    <div>
      <PageTitle>Perfil do setor</PageTitle>
      <Panel>
        <TeamRegisterForm data={team} />
      </Panel>
    </div>
  )
}

export { TeamProfile }
