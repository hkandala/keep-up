import { NowRequest, NowResponse } from "@vercel/node";
import { Endpoint } from "../../../lib/types/endpoint.interface";

export default function (req: NowRequest, res: NowResponse) {
  res.json([
    {
      type: "Hot",
      url: "/api/reddit/hot?subreddit={}",
    },
    {
      type: "New",
      url: "/api/reddit/new?subreddit={}",
    },
    {
      type: "Rising",
      url: "/api/reddit/rising?subreddit={}",
    },
    {
      type: "Top (Last Hour)",
      url: "/api/reddit/top?subreddit={}&duration=hour",
    },
    {
      type: "Top (Last 24 Hours)",
      url: "/api/reddit/top?subreddit={}&duration=day",
    },
    {
      type: "Top (Last Week)",
      url: "/api/reddit/top?subreddit={}&duration=week",
    },
    {
      type: "Top (Last Month)",
      url: "/api/reddit/top?subreddit={}&duration=month",
    },
    {
      type: "Top (Last Year)",
      url: "/api/reddit/top?subreddit={}&duration=year",
    },
    {
      type: "Top (All Time)",
      url: "/api/reddit/top?subreddit={}&duration=all",
    },
    {
      type: "Controversial (Last Hour)",
      url: "/api/reddit/controversial?subreddit={}&duration=hour",
    },
    {
      type: "Controversial (Last 24 Hours)",
      url: "/api/reddit/controversial?subreddit={}&duration=day",
    },
    {
      type: "Controversial (Last Week)",
      url: "/api/reddit/controversial?subreddit={}&duration=week",
    },
    {
      type: "Controversial (Last Month)",
      url: "/api/reddit/controversial?subreddit={}&duration=month",
    },
    {
      type: "Controversial (Last Year)",
      url: "/api/reddit/controversial?subreddit={}&duration=year",
    },
    {
      type: "Controversial (All Time)",
      url: "/api/reddit/controversial?subreddit={}&duration=all",
    },
  ] as Endpoint[]);
}
