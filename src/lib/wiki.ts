import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const wikiDirectory = path.join(process.cwd(), "content/wiki");

export interface WikiDocument {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  lastUpdated: string;
  content: string;
  htmlContent?: string;
}

// 모든 위키 문서 목록 가져오기
export function getAllWikiSlugs(): string[] {
  if (!fs.existsSync(wikiDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(wikiDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// 특정 위키 문서 가져오기
export async function getWikiDocument(
  slug: string
): Promise<WikiDocument | null> {
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(wikiDirectory, `${decodedSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // 마크다운을 HTML로 변환
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    slug: decodedSlug,
    title: data.title || decodedSlug,
    description: data.description || "",
    category: data.category || "일반",
    keywords: data.keywords || [],
    lastUpdated: data.lastUpdated || new Date().toISOString().split("T")[0],
    content,
    htmlContent,
  };
}

// 모든 위키 문서 메타데이터 가져오기
export function getAllWikiDocuments(): Omit<WikiDocument, "content" | "htmlContent">[] {
  const slugs = getAllWikiSlugs();

  return slugs.map((slug) => {
    const fullPath = path.join(wikiDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "일반",
      keywords: data.keywords || [],
      lastUpdated: data.lastUpdated || new Date().toISOString().split("T")[0],
    };
  });
}
