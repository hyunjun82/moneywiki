import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보험설계사 등록 후 교육, 4년 주기 16시간 이수 기준 | 머니위키",
  description: "보험설계사 의무교육은 매년이 아니라 4년마다 16시간이에요. 미이수 시 등록취소 가능. 온라인 수강과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험설계사-등록후-교육" },
  openGraph: {
    title: "보험설계사 등록 후 교육, 4년 주기 16시간 이수 기준 | 머니위키",
    description: "보험설계사 의무교육은 매년이 아니라 4년마다 16시간이에요. 미이수 시 등록취소 가능.",
    url: "https://www.jjyu.co.kr/w/보험설계사-등록후-교육",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
