import React, { FC, useState } from 'react'
import { Sidebar } from '../Sidebar'
import { Topbar } from '../Topbar'
import { Container, Frame, PageContent, StyledSidebar, StyledTopbar } from './styles'

interface IPageProps {
    component: FC
}

const Page = ({ component: Component }: IPageProps) => {
  const [expandedSidebar, setExpandedSidebar] = useState(true)

  return (
      <Container>
          <StyledSidebar expandedSidebar={expandedSidebar}>
              <Sidebar />
          </StyledSidebar>
          <Frame>
            <StyledTopbar>
              <Topbar
                expandedSidebar={expandedSidebar}
                setExpandedSidebar={setExpandedSidebar}
              />
            </StyledTopbar>
            <PageContent>
              <Component />
            </PageContent>
          </Frame>
      </Container>
  )
}

export { Page }
