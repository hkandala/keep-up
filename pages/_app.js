import { useState } from "react";
import { GeistProvider, CssBaseline, Toggle } from "@geist-ui/react";
import { Moon, Sun } from "@geist-ui/react-icons";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const defaultTheme = "light";
  const [themeType, setThemeType] = useState(defaultTheme);
  const switchThemes = () => {
    setThemeType((lastThemeType) =>
      lastThemeType === "dark" ? "light" : "dark"
    );
  };

  return (
    <GeistProvider theme={{ type: themeType }}>
      <CssBaseline />

      <div className="theme-toggle-wrapper">
        <Sun size={20} className="theme-icon" />
        <Toggle
          onChange={switchThemes}
          initialChecked={defaultTheme == "dark"}
          className="theme-toggle"
        />
        <Moon size={20} className="theme-icon" />
      </div>

      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
