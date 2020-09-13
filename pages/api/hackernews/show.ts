import { NowRequest, NowResponse } from "@vercel/node";
import { getShowHNItems } from "../../../lib/hackernews/hackernews.parser";

export default async function (req: NowRequest, res: NowResponse) {
  res.json(await getShowHNItems());
}
