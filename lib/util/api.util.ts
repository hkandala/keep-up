import { NowResponse } from "@vercel/node";
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
