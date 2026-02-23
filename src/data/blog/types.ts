import type { ComponentType } from "react";

export interface BlogMeta {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  datePublished: string;
  lastUpdated: string;
  category: string;
  faq?: { question: string; answer: string }[];
}

export interface BlogEntry {
  slug: string;
  meta: BlogMeta;
  Component: ComponentType;
}
