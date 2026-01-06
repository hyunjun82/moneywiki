import { getAllWikiDocuments } from "@/lib/wiki";

export async function GET() {
  const docs = await getAllWikiDocuments();
  const siteUrl = "https://jjyu.co.kr";

  // 최근 50개만
  const recentDocs = docs
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 50);

  const rssItems = recentDocs
    .map((doc) => {
      const url = `${siteUrl}/w/${encodeURIComponent(doc.slug)}`;
      const pubDate = new Date(doc.datePublished).toUTCString();

      return `
    <item>
      <title><![CDATA[${doc.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${doc.description || ""}]]></description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>머니위키</title>
    <link>${siteUrl}</link>
    <description>세금, 부동산, 경제 정보를 쉽게 알려드려요</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
