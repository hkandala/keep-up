import { NowRequest, NowResponse } from "@vercel/node";

import { getRedditTopItems } from "../../../lib/reddit/reddit.parser";
import { getDurationFromQuery, sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  const { subreddit } = req.query;
  sendResponse(
    await getRedditTopItems(
      subreddit as string,
      getDurationFromQuery(req.query)
    ),
    res
  );
}
