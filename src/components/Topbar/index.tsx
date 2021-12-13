import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Container, SidebarExpander, TopbarContent } from './styles'

interface ITopbarProps {
  expandedSidebar: boolean;
  setExpandedSidebar(value: boolean): any;
}

const Topbar = ({ expandedSidebar, setExpandedSidebar }: ITopbarProps) => {
  const auth = useAuth()

  return (
    <Container>
        <SidebarExpander onClick={() => setExpandedSidebar(!expandedSidebar)}>
          <i className="pi pi-align-left"></i>
        </SidebarExpander>
        <TopbarContent>
          {auth.user?.pessoa?.nomeCompleto}
        </TopbarContent>
    </Container>
  )
}

export { Topbar }
