import React, { FC } from 'react'
import { Sidebar } from '../Sidebar'
import { Topbar } from '../Topbar'
import { Container, StyledSidebar, StyledTopbar } from './styles'

interface IPageProps {
    component: FC
}

const Page = ({ component: Component }: IPageProps) => {
  return (
      <Container>
          <StyledSidebar>
              <Sidebar />
          </StyledSidebar>
          <StyledTopbar>
            <Topbar />
          </StyledTopbar>
          <Component />
      </Container>
  )
}

export { Page }
