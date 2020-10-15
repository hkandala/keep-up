import { useEffect } from "react";
import Head from "next/head";
import ReactGA from "react-ga";
import SimpleBar from "simplebar-react";
import { Text, useToasts } from "@geist-ui/react";

import FeedCard from "../components/FeedCard";

export default function Home(props) {
  const [toasts, setToast] = useToasts();

  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      ReactGA.initialize("UA-176784721-2");
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    if (window.innerWidth < 1280) {
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
        <title>keepup</title>
        <link rel="icon" href="/favicon.ico" />
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
