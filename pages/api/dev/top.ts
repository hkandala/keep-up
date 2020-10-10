import { NowRequest, NowResponse } from "@vercel/node";

import { getDevTopItems } from "../../../lib/dev/dev.parser";
import { getDurationFromQuery, sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  sendResponse(await getDevTopItems(getDurationFromQuery(req.query)), res);
}
