import { NowRequest, NowResponse } from "@vercel/node";

export default function (req: NowRequest, res: NowResponse) {
  res.json([
    {
      type: "Featured",
      url: "/api/dev/featured",
    },
    {
      type: "Rising",
      url: "/api/dev/rising",
    },
    {
      type: "Fresh",
      url: "/api/dev/fresh",
    },
    {
      type: "Top (Last 24 Hours)",
      url: "/api/dev/top?duration=day",
    },
    {
      type: "Top (Last Week)",
      url: "/api/dev/top?duration=week",
    },
    {
      type: "Top (Last Month)",
      url: "/api/dev/top?duration=month",
    },
    {
      type: "Top (Last Year)",
      url: "/api/dev/top?duration=year",
    },
    {
      type: "Top (All Time)",
      url: "/api/dev/top?duration=all",
    },
  ]);
}
