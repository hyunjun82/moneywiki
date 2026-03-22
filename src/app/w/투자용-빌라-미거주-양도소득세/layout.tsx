import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "투자용 빌라, 안 살았는데 세금은? 미거주 양도소득세 계산 | 머니위키",
  description: "미거주 투자용 빌라는 조정대상지역 취득 시 비과세 불가예요. 양도소득세 6~45% 기본세율에 단기 보유·다주택 중과가 추가되고, 장기보유특별공제로 절세할 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/투자용-빌라-미거주-양도소득세",
  },
  openGraph: {
    title: "투자용 빌라, 안 살았는데 세금은?",
    description: "미거주 비과세 불가 조건, 양도세 세율, 장기보유특별공제 절세법.",
    url: "https://www.jjyu.co.kr/w/투자용-빌라-미거주-양도소득세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
