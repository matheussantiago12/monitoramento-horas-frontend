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
          <Link to="/dashboard">
            <MenuGroupItem>
              <i className="pi pi-chart-bar"></i>
              <span>Dashboard</span>
            </MenuGroupItem>
          </Link>
          <Link to="configuracoes">
            <MenuGroupItem>
              <i className="pi pi-cog"></i>
              <span>Configurações</span>
            </MenuGroupItem>
          </Link>
        </MenuGroup>
        <MenuGroup>
          <MenuGroupTitle>CADASTROS</MenuGroupTitle>
          <Link to="/usuarios">
            <MenuGroupItem>
              <i className="pi pi-user"></i>
              <span>Usuários</span>
            </MenuGroupItem>
          </Link>
          <Link to="/setores">
            <MenuGroupItem>
              <i className="pi pi-users"></i>
              <span>Setores</span>
            </MenuGroupItem>
          </Link>
          <Link to="/equipes">
            <MenuGroupItem>
              <i className="pi pi-users"></i>
              <span>Equipes</span>
            </MenuGroupItem>
          </Link>
        </MenuGroup>
      </Menu>
    </Container>
  )
}

export { Sidebar }
