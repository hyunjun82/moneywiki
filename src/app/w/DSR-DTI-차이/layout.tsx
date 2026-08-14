import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DSR DTI 차이, 내 대출 한도에 적용되는 기준은?",
  description: "DTI는 주담대 원리금과 기타 대출 이자만 보고, DSR은 모든 대출 원리금을 전부 계산해요. 같은 연봉이라도 DSR이 더 까다로워서 대출 한도가 적게 나와요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/DSR-DTI-차이" },
  openGraph: {
    title: "DSR DTI 차이, 내 대출 한도에 적용되는 기준은? | 머니위키",
    description: "DTI는 주담대 원리금과 기타 대출 이자만 보고, DSR은 모든 대출 원리금을 전부 계산해요. 같은 연봉이라도 DSR이 더 까다로워서 대출 한도가 적게 나와요.",
    url: "https://www.jjyu.co.kr/w/DSR-DTI-차이",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
