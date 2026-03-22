import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "책·영화·공연비로 세금 돌려받을 수 있나요? 문화비 소득공제 30% 조건 | 머니위키",
  description: "도서·공연·영화·박물관 관람비는 30% 소득공제예요. 총급여 7천만원 이하 대상이고, 2025년 7월부터 헬스장·수영장도 포함돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-문화비",
  },
  openGraph: {
    title: "문화비 소득공제 30% 조건과 대상 항목",
    description: "도서·공연·영화 30% 공제. 헬스장도 포함됨.",
    url: "https://www.jjyu.co.kr/w/연말정산-문화비",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
