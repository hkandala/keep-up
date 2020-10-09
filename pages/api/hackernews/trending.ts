import { NowRequest, NowResponse } from "@vercel/node";

import { getHNTrendingItems } from "../../../lib/hackernews/hackernews.parser";
import { sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  sendResponse(await getHNTrendingItems(), res);
}
