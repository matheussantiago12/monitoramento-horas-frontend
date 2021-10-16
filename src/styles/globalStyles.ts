import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        border: 0px;
        box-sizing: border-box;
        font-family: var(--font-family);
    }
    
    html, body {
        color: var(--text-color);
        background-color: var(--surface-0);
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        
        label {
            margin-top: 8px;
        }
    }

    a {
        text-decoration: none;
        color: grey;
    }
`
