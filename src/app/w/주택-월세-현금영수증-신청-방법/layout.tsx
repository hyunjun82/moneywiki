import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택 월세 현금영수증 신청 방법 임대인 동의 없이 홈택스 | 머니위키",
  description: "집주인 동의 없이 홈택스에서 직접 신청 가능. 임대사업자 아닌 개인도 가능. 한 번 신청으로 계약기간 매월 자동 발급.",
  openGraph: {
    title: "월세 현금영수증 임대인 동의 없이 홈택스 신청",
    description: "집주인이 거절해도 임차인이 직접 신청 가능. 서류 3가지만 준비하면 돼요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
