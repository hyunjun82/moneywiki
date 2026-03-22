import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "산지전용 복구비 재산정 추가 납부 의무 | 머니위키",
  description: "산지전용신고로 복구비 예치했는데, 매년 재산정해서 추가로 내야 하는지 궁금하시죠. 어떤 경우에 추가 납부하는지 알아봐요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산지전용-복구비-재산정-추가납부" },
  openGraph: { title: "산지전용 복구비 재산정 추가 납부 의무 | 머니위키", description: "산지전용신고로 복구비 예치했는데, 매년 재산정해서 추가로 내야 하는지 궁금하시죠. 어떤 경우에 추가 납부하는지 알아봐요", url: "https://www.jjyu.co.kr/w/산지전용-복구비-재산정-추가납부", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
