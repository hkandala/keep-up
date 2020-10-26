import { useEffect, useState } from "react";
import { Settings, ExternalLink, Github, X } from "@geist-ui/react-icons";
import {
  GeistProvider,
  CssBaseline,
  Modal,
  Radio,
  Divider,
  useModal,
  Link,
} from "@geist-ui/react";

import "../styles/globals.css";
import lightTheme from "../themes/light";
import darkTheme from "../themes/dark";

function MyApp({ Component, pageProps }) {
  const [themeType, setThemeType] = useState("light");

  const setTheme = (theme) => {
    if ((theme === "light" || theme === "dark") && themeType !== theme) {
      window.localStorage.setItem("theme", theme);
      setThemeType(theme);
    }
  };

  useEffect(() => {
    const isSystemDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = window.localStorage.getItem("theme");
    if ((!storedTheme && isSystemDarkMode) || storedTheme == "dark") {
      setTheme("dark");
    }
  }, []);

  const { visible, setVisible, bindings } = useModal();

  return (
    <GeistProvider theme={themeType == "dark" ? darkTheme : lightTheme}>
      <CssBaseline />

      <Link href="/" className="logo">
        <img src="/icons/icon-192x192.png" alt="keepup logo" />
      </Link>

      <div className="settings-icon" onClick={() => setVisible(true)}>
        <Settings size={20} />
      </div>

      <Modal {...bindings}>
        <Modal.Title>Settings</Modal.Title>

        <Modal.Content>
          <Divider />
          <Radio.Group
            size="small"
            className="center"
            value={themeType}
            onChange={setTheme}
            useRow
          >
            <Radio value="light">Light</Radio>
            <Radio value="dark">Dark</Radio>
          </Radio.Group>
        </Modal.Content>

        <Modal.Action>
          <Link href="https://hkandala.dev/" target="_blank">
            <ExternalLink size={20} className="button-link" />
          </Link>
        </Modal.Action>
        <Modal.Action>
          <Link href="https://github.com/hkandala/keep-up" target="_blank">
            <Github size={20} className="button-link" />
          </Link>
        </Modal.Action>
        <Modal.Action onClick={() => setVisible(false)}>
          <X />
        </Modal.Action>
      </Modal>

      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
