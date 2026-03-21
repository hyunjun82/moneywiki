import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "일조 확보 주택 높이 제한 기준 — 이격거리 계산부터 이의 제기까지",
  description: "건축법 제61조에 따라 전용·일반주거지역 건물은 정북방향으로 높이 10m 이하 1.5m, 초과 시 높이 절반 이상 띄워야 해요. 위반이면 최대 5억원 벌금이에요.",
  openGraph: {
    title: "일조 확보 주택 높이 제한 기준 — 이격거리 계산부터 이의 제기까지",
    description: "건축법 제61조에 따라 전용·일반주거지역 건물은 정북방향으로 높이 10m 이하 1.5m, 초과 시 높이 절반 이상 띄워야 해요. 위반이면 최대 5억원 벌금이에요.",
    type: "article",
  },
  alternates: {
    canonical: "/w/일조-확보-주택-높이-제한-기준",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
