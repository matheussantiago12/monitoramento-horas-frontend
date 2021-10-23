import React from 'react'
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
        <span>Gupelino</span>
      </SidebarHeader>
      <Menu>
        <MenuGroup>
          <MenuGroupTitle>MENU</MenuGroupTitle>
          <MenuGroupItem>
            <i className="pi pi-chart-bar"></i>
            <span>Dashboard</span>
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
            <span>Usuários</span>
          </MenuGroupItem>
        </MenuGroup>
      </Menu>
    </Container>
  )
}

export { Sidebar }
