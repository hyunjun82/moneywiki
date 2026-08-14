import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "내 실수로 다쳐도 산재 되나요? — 본인 과실 산재 인정 기준",
  description: "본인 과실이어도 업무 수행 중 사고면 산재 인정돼요. 산재보험은 과실이 아니라 업무 관련성으로 판단해요. 인정·불인정 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산재보상-자신-실수-사고-가능" },
  openGraph: {
    title: "내 실수로 다쳐도 산재 되나요? — 본인 과실 산재 인정 기준",
    description: "본인 과실 산재 인정 기준, 불인정 사유, 회사 거부 시 직접 신청법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/산재보상-자신-실수-사고-가능",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
