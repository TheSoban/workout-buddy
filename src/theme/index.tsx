import { createGlobalStyle, ThemeProvider } from "styled-components";
import {useTheme} from "./useTheme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
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

  .App {
    background-color: red;
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
