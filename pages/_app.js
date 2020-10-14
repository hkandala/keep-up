import { useEffect, useState } from "react";
import { GeistProvider, CssBaseline, Toggle } from "@geist-ui/react";
import { Moon, Sun } from "@geist-ui/react-icons";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [themeType, setThemeType] = useState("light");

  const switchThemes = () => {
    setThemeType((lastThemeType) => {
      const newThemeType = lastThemeType === "dark" ? "light" : "dark";
      window.localStorage.setItem("theme", newThemeType);
      return newThemeType;
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("theme") == "dark") {
      switchThemes();
    }
  }, []);

  return (
    <GeistProvider theme={{ type: themeType }}>
      <CssBaseline />

      <div className="theme-toggle-wrapper">
        <Sun size={20} className="theme-icon" />
        <Toggle
          onChange={switchThemes}
          checked={themeType == "dark"}
          className="theme-toggle"
        />
        <Moon size={20} className="theme-icon" />
      </div>

      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
