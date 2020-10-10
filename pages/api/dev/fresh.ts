import { NowRequest, NowResponse } from "@vercel/node";

import { getDevFreshItems } from "../../../lib/dev/dev.parser";
import { sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  sendResponse(await getDevFreshItems(), res);
}
