import { NowRequest, NowResponse } from "@vercel/node";

export default function (req: NowRequest, res: NowResponse) {
  res.json([
    {
      type: "Trending",
      url: "/api/hackernews/trending",
    },
    {
      type: "Ask HN",
      url: "/api/hackernews/ask",
    },
    {
      type: "Show HN",
      url: "/api/hackernews/show",
    },
    {
      type: "Show HN (New)",
      url: "/api/hackernews/shownew",
    },
    {
      type: "New",
      url: "/api/hackernews/new",
    },
    {
      type: "Top (Today)",
      url: "/api/hackernews/top?duration=day",
    },
    {
      type: "Top (Last Week)",
      url: "/api/hackernews/top?duration=week",
    },
    {
      type: "Top (Last Month)",
      url: "/api/hackernews/top?duration=month",
    },
    {
      type: "Top (Last Year)",
      url: "/api/hackernews/top?duration=year",
    },
    {
      type: "Top (All Time)",
      url: "/api/hackernews/top?duration=all",
    },
  ]);
}
