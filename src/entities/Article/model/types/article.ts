import type { User } from "entities/User";

export enum ArticleBlockType {
  CODE = "CODE",
  IMAGE = "IMAGE",
  TEXT = "TEXT",
}

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}
export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}
export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  title?: string;
  paragraphs: string[];
}

export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleImageBlock
  | ArticleTextBlock;

export enum ArticleType {
  IT = "IT",
  BUSINESS = "BUSINESS",
  SCIENCE = "SCIENCE",
  TECHNOLOGY = "TECHNOLOGY",
  POLITICS = "POLITICS",
  ENTERTAINMENT = "ENTERTAINMENT",
  SPORTS = "SPORTS",
  LIFE = "LIFE",
  HEALTH = "HEALTH",
  TRAVEL = "TRAVEL",
  OTHER = "OTHER",
  ART = "ART",
  POETRY = "POETRY",
  MUSIC = "MUSIC",
  CULTURE = "CULTURE",
  RELIGION = "RELIGION",
  FASHION = "FASHION",
  FOOD = "FOOD",
  ENVIRONMENT = "ENVIRONMENT",
  ARTICLE = "ARTICLE",
  NEWS = "NEWS",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  user: User;
  type: ArticleType[];
  blocks: ArticleBlock[];
}

export enum ArticleView {
  GRID = "grid",
  LIST = "list",
}
