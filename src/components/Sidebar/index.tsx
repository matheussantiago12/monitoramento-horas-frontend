import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Container,
  Menu,
  MenuGroup,
  MenuGroupItem,
  MenuGroupTitle,
  SidebarHeader
} from './styles'

const Sidebar = () => {
  const { user, logout } = useAuth()

  return (
    <Container>
      <SidebarHeader>
        <span></span>
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
          {(user?.pessoa?.tipoPessoaId === 1) && (
            <Link to="configuracoes">
              <MenuGroupItem>
                <i className="pi pi-cog"></i>
                <span>Configurações</span>
              </MenuGroupItem>
            </Link>
          )}
        </MenuGroup>
        {(user?.pessoa?.tipoPessoaId === 1) && (
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
        )}
        <MenuGroupItem style={{ marginLeft: '20px', marginTop: '25px' }} onClick={logout}>
          <i className="pi pi-power-off"></i>
          <span>Sair</span>
        </MenuGroupItem>
      </Menu>
    </Container>
  )
}

export { Sidebar }
