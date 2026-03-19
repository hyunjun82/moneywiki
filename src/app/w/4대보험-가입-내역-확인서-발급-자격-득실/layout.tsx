import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "4대보험 가입 내역 확인서 발급 자격 득실 조회 방법 | 머니위키",
  description: "4대사회보험 정보연계센터(4insure.or.kr)에서 한 번에 발급. 간편인증으로 당일 즉시 발급. 자격 득실 조회와 실업급여 수급 자격 확인법.",
  openGraph: {
    title: "4대보험 가입 내역 확인서 발급 방법 (자격 득실 포함)",
    description: "4insure.or.kr에서 5분이면 발급 완료. 취업·실업급여·퇴직금 분쟁 시 필요한 서류예요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
