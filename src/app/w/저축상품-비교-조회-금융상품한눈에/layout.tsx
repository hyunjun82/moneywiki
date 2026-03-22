import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "예·적금 금리 어디가 제일 높을까? 금융상품한눈에 비교 조회 방법 | 머니위키",
  description: "금융감독원 금융상품한눈에(finlife.fss.or.kr)에서 140여 개 금융기관의 예금·적금 금리를 한 번에 비교할 수 있어요. 조회 방법과 비교 체크포인트를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/저축상품-비교-조회-금융상품한눈에",
  },
  openGraph: {
    title: "예·적금 금리 비교, 금융상품한눈에 조회 방법",
    description: "140여 개 금융기관 금리를 한 번에 비교하는 법.",
    url: "https://www.jjyu.co.kr/w/저축상품-비교-조회-금융상품한눈에",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
