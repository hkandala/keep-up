import { NowRequest, NowRequestQuery, NowResponse } from "@vercel/node";

import { getHNTopItems } from "../../../lib/hackernews/hn-algolia.parser";
import { Duration } from "../../../lib/types/duration.enum";
import { sendResponse } from "../../../lib/util/api.util";

export default async function (req: NowRequest, res: NowResponse) {
  sendResponse(await getHNTopItems(getDurationFromQuery(req.query)), res);
}

function getDurationFromQuery(query: NowRequestQuery): Duration {
  const { duration } = query;
  switch (duration) {
    case "day":
      return Duration.DAY;
    case "week":
      return Duration.WEEK;
    case "month":
      return Duration.MONTH;
    case "year":
      return Duration.YEAR;
    default:
      return Duration.ALL;
  }
}
