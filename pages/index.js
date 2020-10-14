import { useEffect } from "react";
import Head from "next/head";
import SimpleBar from "simplebar-react";
import { Text, useToasts } from "@geist-ui/react";

import FeedCard from "../components/FeedCard";

export default function Home() {
  const [toasts, setToast] = useToasts();
  useEffect(() => {
    const status = window.localStorage.getItem("scroll-notification");
    if (!status) {
      setToast({ text: "Try scrolling this way 👉", delay: 5000 });
      window.localStorage.setItem("scroll-notification", true);
    }
  });

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
          <div className="feed-item">
            <FeedCard
              title="Hacker News"
              url="/api/hackernews/trending"
            ></FeedCard>
          </div>
          <div className="feed-item">
            <FeedCard title="Dev.to" url="/api/dev/featured"></FeedCard>
          </div>
          <div className="feed-item">
            <FeedCard
              title="r/programming"
              url="/api/reddit/hot?subreddit=programming"
            ></FeedCard>
          </div>
          <div className="feed-item">
            <FeedCard
              title="r/javascript"
              url="/api/reddit/hot?subreddit=javascript"
            ></FeedCard>
          </div>
          <div className="feed-item">
            <FeedCard
              title="r/java"
              url="/api/reddit/hot?subreddit=java"
            ></FeedCard>
          </div>
          <div className="feed-item">
            <FeedCard
              title="r/machinelearning"
              url="/api/reddit/hot?subreddit=machinelearning"
            ></FeedCard>
          </div>
        </div>
      </SimpleBar>
    </>
  );
}
