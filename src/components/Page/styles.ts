import styled from 'styled-components'

interface IStyledSidebarProps {
    expandedSidebar: boolean;
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`

const StyledTopbar = styled.div`
    margin-bottom: 35px;
`

const StyledSidebar = styled.div<IStyledSidebarProps>`
    width: ${(props) => props.expandedSidebar ? '265px' : '0px'};
    overflow: hidden;
    transition: width 0.3s;
`

const Frame = styled.div`
    width: 100%;
    height: 100%;
`

const PageContent = styled.div`
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 40px;
`

export { Container, StyledTopbar, StyledSidebar, Frame, PageContent }
