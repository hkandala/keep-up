import { NowRequest, NowRequestQuery, NowResponse } from "@vercel/node";

import { getHNTopItems } from "../../../lib/hackernews/hn-algolia.parser";
import { Duration } from "../../../lib/types/duration.enum";
import { NewsItem } from "../../../lib/types/news-item.interface";

export default async function (req: NowRequest, res: NowResponse) {
  let response: NewsItem[];
  let error = false;
  try {
    response = await getHNTopItems(getDurationFromQuery(req.query));
    if (!response?.length) {
      throw new Error("Parser returned empty response");
    }
  } catch (e) {
    console.error("Exception while fetching data from parsers", e);
    error = true;
  }

  if (!error) {
    res.json(response);
  } else {
    res.status(500);
    res.json([]);
  }
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
