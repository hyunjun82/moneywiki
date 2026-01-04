import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.jjyu.co.kr";

  // 정적 페이지들
  const staticPages = [
    "",
    "/calc",
    "/calc/severance",
    "/calc/salary",
    "/calc/rent",
    "/calc/loan",
  ];

  // 카테고리 페이지들
  const categories = ["경제", "부동산", "세금", "법률", "금융", "근로"];

  // 위키 문서들 (나중에 동적으로 가져올 수 있음)
  const wikiPages = [
    "퇴직금",
    "퇴직금 계산법",
    "종합소득세 신고 방법",
    "전세자금대출 조건",
    "청년도약계좌 가입 방법",
    "실업급여 수급 조건",
    "연말정산 공제 항목",
    "2026년 최저임금 가이드",
    "청년내일채움공제 변경사항",
    "연말정산 간소화 서비스",
    "주택임대차보호법 핵심 정리",
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1 : 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const wikiUrls = wikiPages.map((page) => ({
    url: `${baseUrl}/w/${encodeURIComponent(page)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticUrls, ...categoryUrls, ...wikiUrls];
}
