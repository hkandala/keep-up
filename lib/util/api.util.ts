import { NowRequestQuery, NowResponse } from "@vercel/node";

import { Duration } from "../types/duration.enum";
import { NewsItem } from "../types/news-item.interface";

export function sendResponse(
  apiResponse: NewsItem[],
  response: NowResponse
): void {
  if (apiResponse.length > 0) {
    response.json(apiResponse);
  } else {
    response.status(500);
    response.json([]);
  }
}

export function getDurationFromQuery(query: NowRequestQuery): Duration {
  const { duration } = query;
  switch (duration) {
    case "hour":
      return Duration.HOUR;
    case "day":
      return Duration.DAY;
    case "week":
      return Duration.WEEK;
    case "month":
      return Duration.MONTH;
    case "year":
      return Duration.YEAR;
    case "all":
      return Duration.ALL;
    default:
      return Duration.DAY;
  }
}
