import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #3d3d3d;
    };

    h1 {
        font-size: 20px;
        margin: 0 0 8px 0;
        transition: 0.5s ease-out;
    };

    input {
        height: 24px;
        border-radius: 5px;
        outline: none;
        padding: 2px 6px;
        transition: 0.5s ease-out;
    };

    label {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 4px;
        transition: 0.5s ease-out;
    };

    ul {
        list-style: none;
        padding: 0;
    };

    #root {
        height: 100vh;
        background: #fafbfc;
    };
`;
