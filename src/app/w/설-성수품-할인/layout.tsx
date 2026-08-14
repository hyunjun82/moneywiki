import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026 설 성수품, 최대 50% 할인받는 법 정부 쿠폰부터 전통시장까지",
  description: "2026년 설 정부 910억 투입, 16대 성수품 최대 50% 할인. 대형마트 앱 쿠폰 30%, 온라인 40%, 전통시장 온누리상품권 50%. 쿠폰 소진 전 미리 다운받으세요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/설-성수품-할인",
  },
  openGraph: {
    title: "2026 설 성수품, 최대 50% 할인받는 법",
    description: "정부 910억 투입. 대형마트 30%, 온라인 40%, 전통시장 50% 할인.",
    url: "https://www.jjyu.co.kr/w/설-성수품-할인",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
