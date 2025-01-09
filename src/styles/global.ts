import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-family: 'Roboto', sans-serif;
    }

    body {
        background-color: "#FFFFF";
        color: "#000000";
        -webkit-font-smoothing: antialiased;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button {
        cursor: pointer;
    }

    button, input, text-area {
        font-family: inherit;
    }

   .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 10px;
    }

    .containerButtons {
        display: flex;
        justify-content: end;
        width: 500px;
    }

   
`;
