import { useEffect } from "react";
import Head from "next/head";
import ReactGA from "react-ga";
import SimpleBar from "simplebar-react";
import { Text, useMediaQuery, useTheme, useToasts } from "@geist-ui/react";

import FeedCard from "../components/FeedCard";

export default function Home(props) {
  const theme = useTheme();
  const isDesktop = useMediaQuery("md", { match: "up" });
  const [toasts, setToast] = useToasts();

  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      ReactGA.initialize("UA-176784721-2");
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

  const metadata = {
    title: "keepup",
    description: "A place to keep up with daily tech trends",
    theme: "#ffffff",
  };

  return (
    <>
      <Head>
        {/* Manifest Link */}
        <link rel="manifest" href="manifest.webmanifest" />

        {/* Common Meta Tags */}
        <title>{metadata.title}</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="screen-orientation" content="portrait" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />

        {/* Android Meta Tags*/}
        <meta
          name="theme-color"
          content={theme.type === "dark" ? "#000" : "#fff"}
        />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* iOS Meta Tags */}
        <meta name="apple-mobile-web-app-title" content={metadata.title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Windows Meta Tags */}
        <meta
          name="msapplication-navbutton-color"
          content={theme.type === "dark" ? "#000" : "#fff"}
        />
        <meta name="msapplication-TileColor" content={metadata.theme} />
        <meta
          name="msapplication-TileImage"
          content="/icons/icon-192x192.png"
        />

        {/* Pinned Sites */}
        <meta name="application-name" content={metadata.title} />
        <meta name="msapplication-tooltip" content={metadata.description} />
        <meta name="msapplication-starturl" content="/" />

        {/* Tap Highlighting */}
        <meta name="msapplication-tap-highlight" content="no" />

        {/* UC Mobile Browser */}
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />

        {/* Icon Links */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/icons/icon-192x192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/apple-touch-icon.png"
          sizes="180x180"
        />
      </Head>

      <div className="center">
        <Text h1 className="title">
          keepup
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
