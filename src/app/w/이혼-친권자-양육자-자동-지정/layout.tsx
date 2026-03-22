import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 시 친권자·양육자 자동 지정? 결정 방법과 변경 절차 | 머니위키",
  description: "자동 지정은 없어요. 부부 합의 또는 법원 결정으로 정해야 하고, 미지정 시 이혼 불가해요. 친권과 양육권 차이와 결정 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-친권자-양육자-자동-지정" },
  openGraph: {
    title: "이혼 시 친권자·양육자 자동 지정? 결정 방법과 변경 절차 | 머니위키",
    description: "자동 지정은 없어요. 부부 합의 또는 법원 결정으로 정해야 하고, 미지정 시 이혼 불가해요. 친권과 양육권 차이와 결정 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이혼-친권자-양육자-자동-지정",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
