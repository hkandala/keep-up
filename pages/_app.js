import { useEffect, useState } from "react";
import { GeistProvider, CssBaseline, Toggle } from "@geist-ui/react";
import { Moon, Sun } from "@geist-ui/react-icons";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [themeType, setThemeType] = useState("light");

  const customDarkTheme = {
    type: "custom-dark",
    palette: {
      accents_1: "#111",
      accents_2: "#333",
      accents_3: "#444",
      accents_4: "#666",
      accents_5: "#888",
      accents_6: "#999",
      accents_7: "#eaeaea",
      accents_8: "#fafafa",
      background: "#333",
      foreground: "#fff",
      selection: "#f81ce5",
      secondary: "#888",
      code: "#79ffe1",
      border: "#666",
      link: "#3291ff",
    },
    expressiveness: {
      dropdownBoxShadow: "0 0 0 1px #666",
      shadowSmall: "0 0 0 1px #666",
      shadowMedium: "0 0 0 1px #666",
      shadowLarge: "0 0 0 1px #666",
      portalOpacity: 0.75,
    },
  };

  const switchThemes = () => {
    setThemeType((lastThemeType) => {
      const newThemeType = lastThemeType === "dark" ? "light" : "dark";
      window.localStorage.setItem("theme", newThemeType);
      return newThemeType;
    });
  };

  useEffect(() => {
    let isSystemDarkMode = false;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      isSystemDarkMode = true;
    }

    const storedTheme = window.localStorage.getItem("theme");

    if ((!storedTheme && isSystemDarkMode) || storedTheme == "dark") {
      switchThemes();
    }
  }, []);

  return (
    <GeistProvider theme={themeType == "dark" ? customDarkTheme : {}}>
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
