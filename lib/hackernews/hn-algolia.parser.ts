import Axios from "axios";
import { getTime, sub } from "date-fns";

import { Duration } from "../types/duration.enum";
import { NewsItem } from "../types/news-item.interface";

const ALGOLIA_API_KEY = "8ece23f8eb07cd25d40262a1764599b1";
const ALGOLIA_APPLICATION_ID = "UJ5WYC0L7X";
const ALGOLIA_API_URL = `https://uj5wyc0l7x-dsn.algolia.net/1/indexes/Item_production_ordered/query?x-algolia-api-key=${ALGOLIA_API_KEY}&x-algolia-application-id=${ALGOLIA_APPLICATION_ID}`;

const HACKERNEWS_COMMENT_URL_PREFIX = "https://news.ycombinator.com/item?id=";
const ITEM_COUNT = 30;

export async function getHNTopItems(duration: Duration): Promise<NewsItem[]> {
  try {
    const response = await Axios.post(
      ALGOLIA_API_URL,
      getAlgoliaRequestPayload(duration)
    );
    return transformToNewsItems(response.data);
  } catch (e) {
    console.error("Error while fetching data from HN Algolia API", e);
    return [];
  }
}

function transformToNewsItems(data: any): NewsItem[] {
  if (data?.hits) {
    return data.hits.map((hit: any) => {
      return {
        title: hit.title,
        url: hit.url ? hit.url : getHNCommmentsUrl(hit.objectID),
        alternativeUrl: getHNCommmentsUrl(hit.objectID),
        score: hit.points,
      } as NewsItem;
    });
  }
  return [];
}

function getHNCommmentsUrl(itemId: string): string {
  return `${HACKERNEWS_COMMENT_URL_PREFIX}${itemId}`;
}

function getAlgoliaRequestPayload(duration: Duration): any {
  const page = 0;
  const hitsPerPage = ITEM_COUNT;
  const tagFilters = ["story", []];
  const getRankingInfo = false;

  let numericFilters;
  switch (duration) {
    case Duration.HOUR:
      numericFilters = [
        `created_at_i>${getTime(sub(new Date(), { hours: 1 })) / 1000}`,
      ];
      break;
    case Duration.DAY:
      numericFilters = [
        `created_at_i>${getTime(sub(new Date(), { days: 1 })) / 1000}`,
      ];
      break;
    case Duration.WEEK:
      numericFilters = [
        `created_at_i>${getTime(sub(new Date(), { weeks: 1 })) / 1000}`,
      ];
      break;
    case Duration.MONTH:
      numericFilters = [
        `created_at_i>${getTime(sub(new Date(), { months: 1 })) / 1000}`,
      ];
      break;
    case Duration.YEAR:
      numericFilters = [
        `created_at_i>${getTime(sub(new Date(), { years: 1 })) / 1000}`,
      ];
      break;
    case Duration.ALL:
      numericFilters = [];
  }

  return {
    page,
    hitsPerPage,
    tagFilters,
    numericFilters,
    getRankingInfo,
  };
}
