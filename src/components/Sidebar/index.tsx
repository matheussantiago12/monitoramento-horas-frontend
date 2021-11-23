import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Menu,
  MenuGroup,
  MenuGroupItem,
  MenuGroupTitle,
  SidebarHeader
} from './styles'

const Sidebar = () => {
  return (
    <Container>
      <SidebarHeader>
        <span>Logo</span>
      </SidebarHeader>
      <Menu>
        <MenuGroup>
          <MenuGroupTitle>MENU</MenuGroupTitle>
          <MenuGroupItem>
            <i className="pi pi-chart-bar"></i>
            <span><Link to="/dashboard">Dashboard</Link></span>
          </MenuGroupItem>
          <MenuGroupItem>
            <i className="pi pi-cog"></i>
            <span>Configurações</span>
          </MenuGroupItem>
        </MenuGroup>
        <MenuGroup>
          <MenuGroupTitle>CADASTROS</MenuGroupTitle>
          <MenuGroupItem>
            <i className="pi pi-user"></i>
            <span><Link to="/usuarios">Usuários</Link></span>
          </MenuGroupItem>
        </MenuGroup>
      </Menu>
    </Container>
  )
}

export { Sidebar }
