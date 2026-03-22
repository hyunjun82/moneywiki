import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 도서공연비 공제 조건과 한도 | 머니위키",
  description: "도서·공연·영화 관람료는 30% 공제율로 추가공제 받을 수 있어요. 총급여 7,000만원 이하 조건과 한도를 정리했어요.",
  openGraph: { title: "연말정산 도서공연비 공제 조건과 한도 | 머니위키", description: "도서공연비 소득공제 조건과 한도예요.", url: "https://www.jjyu.co.kr/w/연말정산-도서공연비", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-도서공연비" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
