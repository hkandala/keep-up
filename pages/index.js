import Head from "next/head";
import { Grid, Text } from "@geist-ui/react";

import FeedCard from "../components/FeedCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>keepup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text h1 style={{ textAlign: "center", marginTop: 20, marginBottom: 40 }}>
        keepup
      </Text>

      <Grid.Container justify="space-evenly">
        <Grid xs={22} md={11} style={{ marginBottom: 40 }}>
          <FeedCard
            title="Hacker News"
            url="/api/hackernews/trending"
          ></FeedCard>
        </Grid>
        <Grid xs={22} md={11} style={{ marginBottom: 40 }}>
          <FeedCard title="Dev.to" url="/api/dev/featured"></FeedCard>
        </Grid>
        <Grid xs={22} md={11} style={{ marginBottom: 40 }}>
          <FeedCard
            title="r/programming"
            url="/api/reddit/hot?subreddit=programming"
          ></FeedCard>
        </Grid>
        <Grid xs={22} md={11} style={{ marginBottom: 40 }}>
          <FeedCard
            title="r/machinelearning"
            url="/api/reddit/hot?subreddit=machinelearning"
          ></FeedCard>
        </Grid>
      </Grid.Container>
    </>
  );
}
