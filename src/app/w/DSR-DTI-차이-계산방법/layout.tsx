import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DSR DTI 차이와 계산 방법, 40% 규제 의미 | 머니위키",
  description: "DSR은 모든 대출 원리금, DTI는 주담대 원리금+기타 이자만 봐요. 40% 규제 의미와 내 대출 한도 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/DSR-DTI-차이-계산방법" },
  openGraph: {
    title: "DSR DTI 차이와 계산 방법, 40% 규제 의미 | 머니위키",
    description: "DSR은 모든 대출 원리금, DTI는 주담대 원리금+기타 이자만 봐요. 40% 규제 의미와 내 대출 한도 계산법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/DSR-DTI-차이-계산방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
