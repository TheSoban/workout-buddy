import { createGlobalStyle, ThemeProvider } from "styled-components";
import {useTheme} from "./useTheme";

const GlobalStyle = createGlobalStyle`

`;

const ThemeWrapper: React.FC = ({children}) => {
  const {theme} = useTheme();
  return <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
}

export default ThemeWrapper;
