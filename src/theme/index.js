import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }
  
    html {
        font-size: 62.5%;
        color: #eee;
        background: #121212;
    }
  
    body {
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        font-family: sans-serif;
    }
  
    :focus {
        outline: 0;
    }
    
    ::-webkit-scrollbar {
        display: none;
    }
    
    input::-webkit-calendar-picker-indicator {
        display: none;
    }
    
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export default GlobalStyle;