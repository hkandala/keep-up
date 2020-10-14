import { useEffect } from "react";
import Head from "next/head";
import ReactGA from "react-ga";
import SimpleBar from "simplebar-react";
import { Text, useToasts } from "@geist-ui/react";

import FeedCard from "../components/FeedCard";

export default function Home() {
  if (window.location.hostname !== "localhost") {
    ReactGA.initialize("UA-176784721-2");
  }

  const [toasts, setToast] = useToasts();

  useEffect(() => {
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
          {getFeedListData().map((item) => (
            <div className="feed-item" key={item.title}>
              <FeedCard {...item}></FeedCard>
            </div>
          ))}
        </div>
      </SimpleBar>
    </>
  );
}

function getFeedListData() {
  return [
    {
      title: "Hacker News",
      url: "/api/hackernews/trending",
    },
    {
      title: "Dev.to",
      url: "/api/dev/featured",
    },
    {
      title: "r/programming",
      url: "/api/reddit/hot?subreddit=programming",
    },
    {
      title: "r/javascript",
      url: "/api/reddit/hot?subreddit=javascript",
    },
    {
      title: "r/java",
      url: "/api/reddit/hot?subreddit=java",
    },
    {
      title: "r/machinelearning",
      url: "/api/reddit/hot?subreddit=machinelearning",
    },
  ];
}
