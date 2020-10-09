import Axios from "axios";
import { Duration } from "../types/duration.enum";
import { NewsItem } from "../types/news-item.interface";

const REDDIT_HOME = "https://www.reddit.com";
const ITEM_COUNT = 30;

export async function getRedditHotItems(
  subreddit: string
): Promise<NewsItem[]> {
  return fetchResponse(subreddit, RedditListType.HOT);
}

export async function getRedditNewItems(
  subreddit: string
): Promise<NewsItem[]> {
  return fetchResponse(subreddit, RedditListType.NEW);
}

export async function getRedditRisingItems(
  subreddit: string
): Promise<NewsItem[]> {
  return fetchResponse(subreddit, RedditListType.RISING);
}

export async function getRedditTopItems(
  subreddit: string,
  duration: Duration
): Promise<NewsItem[]> {
  return fetchResponse(subreddit, RedditListType.TOP, duration);
}

export async function getRedditControversialItems(
  subreddit: string,
  duration: Duration
): Promise<NewsItem[]> {
  return fetchResponse(subreddit, RedditListType.CONTROVERSIAL, duration);
}

async function fetchResponse(
  subreddit: string,
  type: RedditListType,
  duration?: Duration
): Promise<NewsItem[]> {
  if (subreddit != undefined) {
    try {
      const response = await Axios.get(generateUrl(subreddit, type, duration));
      return transformToNewsItems(response.data);
    } catch (e) {
      console.error("Error while fetching data from Reddit API", e);
    }
  }
  return [];
}

function transformToNewsItems(resp: any): NewsItem[] {
  if (resp?.data?.children) {
    return resp.data.children
      .filter((item) => !item.data.stickied)
      .map((item) => {
        return {
          title: item.data.title,
          url: item.data.url,
          alternativeUrl: REDDIT_HOME + item.data.permalink,
          description: item.data.selftext,
          score: item.data.score,
        } as NewsItem;
      });
  }
  return [];
}

function generateUrl(
  subreddit: string,
  type: RedditListType,
  duration?: Duration
): string {
  if (subreddit == undefined) {
    return null;
  }

  let typeUrl;
  switch (type) {
    case RedditListType.HOT:
      typeUrl = "hot";
      break;
    case RedditListType.NEW:
      typeUrl = "new";
      break;
    case RedditListType.RISING:
      typeUrl = "rising";
      break;
    case RedditListType.CONTROVERSIAL:
      typeUrl = "controversial";
      break;
    case RedditListType.TOP:
      typeUrl = "top";
      break;
    default:
      typeUrl = "hot";
  }

  let durationUrl;
  switch (duration) {
    case Duration.HOUR:
      durationUrl = "hour";
      break;
    case Duration.DAY:
      durationUrl = "day";
      break;
    case Duration.WEEK:
      durationUrl = "week";
      break;
    case Duration.MONTH:
      durationUrl = "month";
      break;
    case Duration.YEAR:
      durationUrl = "year";
      break;
    case Duration.ALL:
      durationUrl = "all";
      break;
    default:
      durationUrl = "day";
  }

  if (RedditListType.TOP || RedditListType.CONTROVERSIAL) {
    return `${REDDIT_HOME}/r/${subreddit}/${typeUrl}.json?t=${durationUrl}&limit=${ITEM_COUNT}`;
  } else {
    return `${REDDIT_HOME}/r/${subreddit}/${typeUrl}.json?limit=${ITEM_COUNT}`;
  }
}

enum RedditListType {
  HOT,
  NEW,
  RISING,
  CONTROVERSIAL,
  TOP,
}
