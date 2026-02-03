export type Blog = {
  draft?: boolean;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};
