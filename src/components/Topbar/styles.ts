import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  border-bottom: 1px solid rgb(234, 235, 236);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SidebarExpander = styled.div`
  padding: 20px;
  cursor: pointer;

  i {
    font-size: 1.2em;
  }
`

const TopbarContent = styled.div`
  display: flex;
  justify-content: end;
  padding: 20px;
  font-weight: 500;
`

export { Container, SidebarExpander, TopbarContent }
