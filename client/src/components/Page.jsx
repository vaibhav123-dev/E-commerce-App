import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import AOS from "aos";
import getTheme from "../theme/index.js";

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
  const [themeMode, setTheme] = useState("light");
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode) => {
    try {
      window.localStorage.setItem("themeMode", mode);
    } catch {
      /* do nothing */
    }

    setTheme(mode);
  };

  const themeToggler = () => {
    themeMode === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem("themeMode");
      localTheme ? setTheme(localTheme) : setMode("light");
    } catch {
      setMode("light");
    }

    setMountedComponent(true);
  }, []);

  return [themeMode, themeToggler, mountedComponent];
};

export default function Page({ children }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    AOS.init({
      once: true,
      delay: 0,
      duration: 800,
      offset: 0,
      easing: "ease-in-out",
    });
  }, []);

  const [themeMode, themeToggler, mountedComponent] = useDarkMode();

  useEffect(() => {
    AOS.refresh();
  }, [mountedComponent, themeMode]);

  return (
    <ThemeProvider theme={getTheme(themeMode, themeToggler)}>
      <CssBaseline />
      <Paper elevation={0}>{children}</Paper>
    </ThemeProvider>
  );
}
