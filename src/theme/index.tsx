import { ThemeProvider } from "styled-components";
import useTheme from "./useTheme";

const ThemeWrapper: React.FC = ({children}) => {
  const obj = useTheme();
  return <ThemeProvider theme={{}}>{children}</ThemeProvider>
}