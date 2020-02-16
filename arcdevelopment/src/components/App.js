import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "./ui/theme";
import Header from "../components/ui/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Ciao ciao
    </ThemeProvider>
  );
}

export default App;
