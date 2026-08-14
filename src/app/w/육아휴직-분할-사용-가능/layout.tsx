import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "육아휴직 분할 사용: 횟수·신청·기간 계산",
  description: "육아휴직 2024년부터 2회 분할 사용 가능해서 자녀 1명당 최대 3번 나눠 쓸 수 있고 각 분할 기간은 최소 30일 이상이라는 거 아시나요? 신청 방법과 급여 계산까지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직-분할-사용-가능" },
  openGraph: { title: "육아휴직 분할 사용: 횟수·신청·기간 계산 | 머니위키", description: "육아휴직 2024년부터 2회 분할 사용 가능해서 자녀 1명당 최대 3번 나눠 쓸 수 있고 각 분할 기간은 최소 30일 이상이라는 거 아시나요? 신청 방법과 급여 계산까지 알려드려요", url: "https://www.jjyu.co.kr/w/육아휴직-분할-사용-가능", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
