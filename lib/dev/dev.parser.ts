import Axios from "axios";
import { Duration } from "../types/duration.enum";
import { NewsItem } from "../types/news-item.interface";

const DEV_ARTICLES_API = "https://dev.to/api/articles";
const ITEM_COUNT = 30;

export async function getDevFeaturedItems(): Promise<NewsItem[]> {
  return fetchResponse(DevListType.FEATURED);
}

export async function getDevRisingItems(): Promise<NewsItem[]> {
  return fetchResponse(DevListType.RISING);
}

export async function getDevFreshItems(): Promise<NewsItem[]> {
  return fetchResponse(DevListType.FRESH);
}

export async function getDevTopItems(duration: Duration): Promise<NewsItem[]> {
  return fetchResponse(DevListType.TOP, duration);
}

async function fetchResponse(
  type: DevListType,
  duration?: Duration
): Promise<NewsItem[]> {
  try {
    const response = await Axios.get(generateUrl(type, duration));
    return transformToNewsItems(response.data);
  } catch (e) {
    console.error("Error while fetching data from Dev.to API", e);
  }
  return [];
}

function transformToNewsItems(data: any): NewsItem[] {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((item) => {
      return {
        title: item.title,
        url: item.url,
        description: item.description,
        score: item.public_reactions_count,
      } as NewsItem;
    });
  }
  return [];
}

function generateUrl(type: DevListType, duration?: Duration): string {
  if (type === DevListType.RISING) {
    return DEV_ARTICLES_API + `?state=rising&per_page=${ITEM_COUNT}`;
  }

  if (type === DevListType.FRESH) {
    return DEV_ARTICLES_API + `?state=fresh&per_page=${ITEM_COUNT}`;
  }

  if (type === DevListType.TOP) {
    let topCount;
    switch (duration) {
      case Duration.DAY:
        topCount = 1;
        break;
      case Duration.WEEK:
        topCount = 7;
        break;
      case Duration.MONTH:
        topCount = 30;
        break;
      case Duration.YEAR:
        topCount = 365;
        break;
      case Duration.ALL:
        topCount = 999999;
        break;
      default:
        topCount = 1;
    }

    return DEV_ARTICLES_API + `?top=${topCount}&per_page=${ITEM_COUNT}`;
  }

  return DEV_ARTICLES_API + `?per_page=${ITEM_COUNT}`;
}

enum DevListType {
  FEATURED,
  RISING,
  FRESH,
  TOP,
}
