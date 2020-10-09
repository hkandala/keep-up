import { NowRequest, NowResponse } from "@vercel/node";

import { getRedditRisingItems } from "../../../lib/reddit/reddit.parser";
import { sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  const { subreddit } = req.query;
  sendResponse(await getRedditRisingItems(subreddit as string), res);
}
