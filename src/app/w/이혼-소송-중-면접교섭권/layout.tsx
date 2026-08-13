import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이혼 소송 중 면접교섭권 | 이혼 전에 아이를 만나는 방법 | 머니위키",
  description:
    "이혼 소송이 진행 중이어도 아이를 만날 권리는 있습니다. 면접교섭 사전처분 신청 방법, 법원 결정 기준, 상대방이 거부할 때의 대응을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-소송-중-면접교섭권" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
