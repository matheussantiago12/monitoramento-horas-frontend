import styled from 'styled-components'

export const Container = styled.div`
    .filter-container {
        padding-top: 15px;
        padding-left: 7px;
        padding-right: 7px;
        background-color: rgb(240, 242, 243);
        border-radius: 9px;
        margin-bottom: 20px;
        transition: height 0.3s;
        overflow: hidden;
    }

    .dashboard-title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;

        .dashboard-title {
            font-weight: 500;
            color: rgb(60, 67, 74);
            font-size: 1.25em;
            display: flex;
            align-items: center;
        }

        .dashboard-title-filter {
            background-color: rgb(245, 245, 247);
            color: rgb(75, 75, 75);
            padding: 5px;
            padding-left: 9px;
            padding-right: 9px;
            border-radius: 15px;
        }
    }
`

export const TimeCard = styled.span<{ backgroundColor?: string }>`
    background-color: ${props => props.backgroundColor || 'white'};
    padding: 3px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    color: black;
`
