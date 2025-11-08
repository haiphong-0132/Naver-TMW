declare module "newsapi" {
  export interface NewsAPISource {
    id: string | null;
    name: string;
  }

  export interface NewsAPIArticle {
    source: NewsAPISource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }

  export interface NewsAPIResponse {
    status: string;
    totalResults?: number;
    articles?: NewsAPIArticle[];
    sources?: NewsAPISource[];
    code?: string;
    message?: string;
  }

  export interface NewsAPIOptions {
    q?: string;
    from?: string;
    to?: string;
    language?: string;
    sortBy?: "relevancy" | "popularity" | "publishedAt";
    sources?: string;
    domains?: string;
    excludeDomains?: string;
    page?: number;
    pageSize?: number;
  }

  export interface NewsAPISourcesOptions {
    category?: string;
    language?: string;
    country?: string;
  }

  export default class NewsAPI {
    constructor(apiKey: string);

    v2: {
      topHeadlines(options?: NewsAPIOptions): Promise<NewsAPIResponse>;
      everything(options: NewsAPIOptions): Promise<NewsAPIResponse>;
      sources(options?: NewsAPISourcesOptions): Promise<NewsAPIResponse>;
    };
  }
}
