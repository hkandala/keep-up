import { useTheme } from "@geist-ui/react";
import Head from "next/head";

export default function Metadata(props) {
  const theme = useTheme();
  const metadata = props.metadata;

  return (
    <Head>
      {/* Manifest Link */}
      <link rel="manifest" href={metadata.manifestFile} />

      {/* Common Meta Tags */}
      <meta charSet="utf-8" />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="screen-orientation" content="portrait" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      />

      {/* Android Meta Tags*/}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="theme-color"
        content={
          theme.type === "dark"
            ? metadata.darkStatusColor
            : metadata.lightStatusColor
        }
      />

      {/* iOS Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={metadata.title} />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* Windows Meta Tags */}
      <meta name="msapplication-TileImage" content={metadata.icon192} />
      <meta name="msapplication-TileColor" content={metadata.theme} />
      <meta
        name="msapplication-navbutton-color"
        content={
          theme.type === "dark"
            ? metadata.darkStatusColor
            : metadata.lightStatusColor
        }
      />

      {/* Pinned Sites */}
      <meta name="application-name" content={metadata.title} />
      <meta name="msapplication-tooltip" content={metadata.description} />
      <meta name="msapplication-starturl" content="/" />

      {/* UC Mobile Browser */}
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />

      {/* Tap Highlighting */}
      <meta name="msapplication-tap-highlight" content="no" />

      {/* Icon Links */}
      <link rel="icon" href={metadata.favicon} />
      <link
        rel="icon"
        href={metadata.favicon16}
        type="image/png"
        sizes="16x16"
      />
      <link
        rel="icon"
        href={metadata.favicon32}
        type="image/png"
        sizes="32x32"
      />
      <link
        rel="icon"
        href={metadata.icon192}
        type="image/png"
        sizes="192x192"
      />
      <link rel="apple-touch-icon" href={metadata.appleIcon} sizes="180x180" />
    </Head>
  );
}
