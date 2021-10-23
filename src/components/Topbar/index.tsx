import React from 'react'
import { Container, SidebarExpander, TopbarContent } from './styles'

interface ITopbarProps {
  expandedSidebar: boolean;
  setExpandedSidebar(value: boolean): any;
}

const Topbar = ({ expandedSidebar, setExpandedSidebar }: ITopbarProps) => {
  return (
    <Container>
        <SidebarExpander onClick={() => setExpandedSidebar(!expandedSidebar)}>
          <i className="pi pi-align-left"></i>
        </SidebarExpander>
        <TopbarContent>
          Administrador
        </TopbarContent>
    </Container>
  )
}

export { Topbar }
