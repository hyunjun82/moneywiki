import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "단독주택, 허가받아야 하나요 신고만 하면 되나요? 지역·규모별 기준",
  description: "관리·농림·자연환경보전지역에서 연면적 200㎡ 미만, 3층 미만이면 건축신고로 가능해요. 도시지역이나 기준 초과 시 건축허가가 필요하고, 무허가 시 5천만원 이하 벌금이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/단독주택-건축허가-건축신고-기준",
  },
  openGraph: {
    title: "단독주택 건축허가 vs 건축신고 기준",
    description: "200㎡ 미만·3층 미만·비도시지역이면 신고로 가능. 기준과 절차 정리.",
    url: "https://www.jjyu.co.kr/w/단독주택-건축허가-건축신고-기준",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
