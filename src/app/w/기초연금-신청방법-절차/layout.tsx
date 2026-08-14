import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 신청, 어디서 어떻게? 신청 방법과 절차",
  description: "기초연금 신청은 주민센터 방문이나 복지로 온라인으로 할 수 있어요. 65세 생일 한 달 전부터 가능하고, 필요한 서류와 단계별 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-신청방법-절차" },
  openGraph: { title: "기초연금 신청, 어디서 어떻게? 신청 방법과 절차 | 머니위키", description: "기초연금 신청은 주민센터 방문이나 복지로 온라인으로 할 수 있어요. 65세 생일 한 달 전부터 가능하고, 필요한 서류와 단계별 절차를 정리했어요.", url: "https://www.jjyu.co.kr/w/기초연금-신청방법-절차", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
