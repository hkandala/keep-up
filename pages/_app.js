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

      <div style={{ marginTop: 25, marginRight: 25, textAlign: "right" }}>
        <Sun />
        <Toggle
          onChange={switchThemes}
          initialChecked={defaultTheme == "dark"}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        <Moon />
      </div>

      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
