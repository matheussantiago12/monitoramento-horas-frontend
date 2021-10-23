import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-right: 1px solid rgb(234, 235, 236);
  z-index: 100000;
`

const SidebarHeader = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(234, 235, 236);

  span {
    font-size: 25px;
    font-weight: bold;
  }
`

const Menu = styled.div`
  height: calc(100% - 60px);
`

const MenuGroup = styled.div`
  padding: 18px;
  padding-bottom: 0px;
`

const MenuGroupTitle = styled.span`
  margin-bottom: 25px;
  color: rgb(90, 90, 90);
  font-weight: bold;
  font-size: 0.82em;
`

const MenuGroupItem = styled.div`
  display: flex;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 4px;
  color: rgb(100, 100, 100);
  cursor: pointer;

  i {
    padding-left: 8px;
    padding-right: 10px;
  }

  span {
    font-size: 1.08em;
  }

  &:hover {
    background-color: rgb(243, 248, 251);
    border-radius: 10px;
    color: rgb(60, 60, 65);
  }
`

export {
  Container,
  SidebarHeader,
  Menu,
  MenuGroup,
  MenuGroupTitle,
  MenuGroupItem
}
