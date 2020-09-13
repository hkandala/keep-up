import { NowRequest, NowResponse } from "@vercel/node";
import { getAskHNItems } from "../../../lib/hackernews/hackernews.parser";

export default async function (req: NowRequest, res: NowResponse) {
  res.json(await getAskHNItems());
}
