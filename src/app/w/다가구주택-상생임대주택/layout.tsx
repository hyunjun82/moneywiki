import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "다가구주택 상생임대 특례 요건 호별 양도",
  description: "다가구주택 상생임대 특례는 모든 호가 요건을 충족해야 해요. 미충족 시 호별 양도로 대응 가능. 직전계약 1년6개월 + 상생 2년 조건.",
  openGraph: {
    title: "다가구주택 상생임대 특례 요건 호별 양도",
    description: "모든 호 요건 충족 필수. 미충족 시 호별 양도 대안.",
    url: "https://jjyu.co.kr/w/다가구주택-상생임대주택",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/다가구주택-상생임대주택" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
