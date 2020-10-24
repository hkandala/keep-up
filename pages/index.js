import { useEffect } from "react";
import Head from "next/head";
import ReactGA from "react-ga";
import SimpleBar from "simplebar-react";
import { Text, useMediaQuery, useTheme, useToasts } from "@geist-ui/react";

import FeedCard from "../components/FeedCard";

export default function Home(props) {
  const metadata = {
    title: "keepup",
    description: "A place to keep up with daily tech trends",
    keywords: "news, feed, technology, trending, aggregator",
    manifestFile: "manifest.webmanifest",
    theme: "#ffffff",
    lightStatusColor: "#ffffff",
    darkStatusColor: "#000000",
    favicon: "/favicon.ico",
    favicon16: "/favicon-16x16.png",
    favicon32: "/favicon-32x32.png",
    icon192: "/icons/icon-192x192.png",
    appleIcon: "/icons/apple-touch-icon.png",
    gaId: "UA-176784721-2",
  };

  const theme = useTheme();
  const isDesktop = useMediaQuery("md", { match: "up" });
  const [toasts, setToast] = useToasts();

  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      ReactGA.initialize(metadata.gaId);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    if (!isDesktop) {
      const status = window.localStorage.getItem("scroll-notification");
      if (!status) {
        setToast({ text: "Try scrolling this way 👉", delay: 10000 });
        window.localStorage.setItem("scroll-notification", true);
      }
    }
  }, []);

  return (
    <>
      <Head>
        {/* Manifest Link */}
        <link rel="manifest" href={metadata.manifestFile} />

        {/* Common Meta Tags */}
        <meta charset="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
        <link
          rel="apple-touch-icon"
          href={metadata.appleIcon}
          sizes="180x180"
        />
      </Head>

      <div className="center">
        <Text h1 className="title">
          {metadata.title}
        </Text>
      </div>

      <SimpleBar autoHide={false}>
        <div className="feed-wrapper">
          {props.feed.map((item) => (
            <div className="feed-item" key={item.title}>
              <FeedCard {...item}></FeedCard>
            </div>
          ))}
        </div>
      </SimpleBar>
    </>
  );
}

export async function getStaticProps(context) {
  const host = "https://keepup.hkandala.dev";

  const hnResponse = await fetch(host + "/api/hackernews");
  const hnApiData = await hnResponse.json();

  const devResponse = await fetch(host + "/api/dev");
  const devApiData = await devResponse.json();

  const redditResponse = await fetch(host + "/api/reddit");
  const redditApiData = await redditResponse.json();

  return {
    props: {
      feed: [
        {
          title: "Hacker News",
          endpoints: hnApiData,
        },
        {
          title: "Dev.to",
          endpoints: devApiData,
        },
        {
          title: "r/programming",
          endpoints: getEndpointListFromSubType("programming", redditApiData),
        },
        {
          title: "r/javascript",
          endpoints: getEndpointListFromSubType("javascript", redditApiData),
        },
        {
          title: "r/java",
          endpoints: getEndpointListFromSubType("java", redditApiData),
        },
        {
          title: "r/machinelearning",
          endpoints: getEndpointListFromSubType(
            "machinelearning",
            redditApiData
          ),
        },
      ],
    },
  };
}

function getEndpointListFromSubType(subtype, endpointList) {
  return endpointList.map((endpoint) => {
    return {
      type: endpoint.type,
      url: endpoint.url.replace("{}", subtype),
    };
  });
}
