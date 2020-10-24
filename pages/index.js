import { useEffect } from "react";
import ReactGA from "react-ga";
import SimpleBar from "simplebar-react";
import { Text, useMediaQuery, useToasts } from "@geist-ui/react";

import Metadata from "../components/Metadata";
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
      <Metadata metadata={metadata} />

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
