import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "채권자가 없는데 어떻게 갚지? 변제공탁 사유와 절차 | 머니위키",
  description: "채권자가 부재하거나 수령 거부 시 법원에 돈을 맡겨서 채무를 소멸시킬 수 있어요. 변제공탁 3가지 사유와 공탁 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/채권자-부재-변제공탁-방법" },
  openGraph: {
    title: "채권자가 없는데 어떻게 갚지? 변제공탁 사유와 절차 | 머니위키",
    description: "변제공탁 사유 3가지, 관할 법원 공탁서 신청 절차, 공탁금 계산 시 주의사항을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/채권자-부재-변제공탁-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
