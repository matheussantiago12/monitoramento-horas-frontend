import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        border: 0px;
        box-sizing: border-box;
        font-family: var(--font-family);
    }

    html {
        font-size: 13px;
    }
    
    html, body {
        color: var(--text-color);
        background-color: rgb(246, 246, 248);
    }

    body > #root > div {
        min-height: 100vh;
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

    /** Primereact theming */
    .p-inputtext, .p-dropdown {
        border-color: rgb(190, 190, 190) !important;
    }

    .p-inputnumber-input {
        max-width: 100% !important;
    }
`
