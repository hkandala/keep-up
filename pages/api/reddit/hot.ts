import { NowRequest, NowResponse } from "@vercel/node";

import { getRedditHotItems } from "../../../lib/reddit/reddit.parser";
import { sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  const { subreddit } = req.query;
  sendResponse(await getRedditHotItems(subreddit as string), res);
}
