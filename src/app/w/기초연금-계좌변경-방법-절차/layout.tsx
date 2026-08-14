import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 입금 계좌 바꾸려면? 계좌 변경 방법과 절차",
  description: "기초연금 입금 계좌는 주민센터 방문이나 복지로에서 변경할 수 있어요. 본인 명의 계좌만 가능하고, 변경 후 다음 달부터 적용돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-계좌변경-방법-절차" },
  openGraph: { title: "기초연금 입금 계좌 바꾸려면? 계좌 변경 방법과 절차 | 머니위키", description: "기초연금 입금 계좌는 주민센터 방문이나 복지로에서 변경할 수 있어요. 본인 명의 계좌만 가능하고, 변경 후 다음 달부터 적용돼요.", url: "https://www.jjyu.co.kr/w/기초연금-계좌변경-방법-절차", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
