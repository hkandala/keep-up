import { NowRequest, NowResponse } from "@vercel/node";

import { getRedditControversialItems } from "../../../lib/reddit/reddit.parser";
import { getDurationFromQuery, sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  const { subreddit } = req.query;
  sendResponse(
    await getRedditControversialItems(
      subreddit as string,
      getDurationFromQuery(req.query)
    ),
    res
  );
}
