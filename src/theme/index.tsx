import { createGlobalStyle, ThemeProvider } from "styled-components";
import {useTheme} from "./useTheme";

const GlobalStyle = createGlobalStyle`
  *, *::after , *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const ThemeWrapper: React.FC = ({children}) => {
  const {theme} = useTheme();
  return <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
}

export default ThemeWrapper;
