import Axios from "axios";
import cheerio from "cheerio";

import { NewsItem } from "../types/news-item.interface";

const HACKERNEWS_HOME = "https://news.ycombinator.com/";
const HACKERNEWS_ASK = "https://news.ycombinator.com/ask";
const HACKERNEWS_SHOW = "https://news.ycombinator.com/show";
const HACKERNEWS_SHOWNEW = "https://news.ycombinator.com/shownew";
const HACKERNEWS_NEW = "https://news.ycombinator.com/newest";

export async function getHNTrendingItems(): Promise<NewsItem[]> {
  return fetchResponse(HACKERNEWS_HOME);
}

export async function getAskHNItems(): Promise<NewsItem[]> {
  return fetchResponse(HACKERNEWS_ASK);
}

export async function getShowHNItems(): Promise<NewsItem[]> {
  return fetchResponse(HACKERNEWS_SHOW);
}

export async function getShowHNNewItems(): Promise<NewsItem[]> {
  return fetchResponse(HACKERNEWS_SHOWNEW);
}

export async function getHNNewItems(): Promise<NewsItem[]> {
  return fetchResponse(HACKERNEWS_NEW);
}

async function fetchResponse(url: string): Promise<NewsItem[]> {
  try {
    return parseResponse((await Axios.get(url)).data);
  } catch (e) {
    console.error("Error while fetching data from HN page", e);
    return [];
  }
}

function parseResponse(rawHtml: string): NewsItem[] {
  let response: NewsItem[] = [];

  try {
    const $ = cheerio.load(rawHtml);
    const linkList = $(".itemlist .athing .title .titlelink");
    const subtextList = $(".itemlist .subtext");

    linkList.each((index, element) => {
      const link = $(element);
      const hasLink = link.next().hasClass("sitebit");
      const subtext = $(subtextList.get(index));
      const commentLink = subtext.find("a").last();
      const score = subtext.find(".score");

      response.push({
        title: link.text(),
        url: hasLink ? link.attr("href") : HACKERNEWS_HOME + link.attr("href"),
        alternativeUrl: HACKERNEWS_HOME + commentLink.attr("href"),
        score: Number(score.text().split(" ")[0]),
      });
    });
  } catch (e) {
    console.error("Error while parsing HN html response", e);
  }

  return response;
}
