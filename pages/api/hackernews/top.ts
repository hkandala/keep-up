import { NowRequest, NowResponse } from "@vercel/node";

import { getHNTopItems } from "../../../lib/hackernews/hn-algolia.parser";
import { getDurationFromQuery, sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  sendResponse(await getHNTopItems(getDurationFromQuery(req.query)), res);
}
