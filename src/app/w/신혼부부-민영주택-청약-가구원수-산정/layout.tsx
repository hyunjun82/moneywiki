import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "신혼부부 청약, 가구원 수는 어떻게 계산하나요? 민영주택 가구원 수 산정 기준",
  description: "신혼부부 특별공급에서 가구원은 본인+배우자+직계존비속이에요. 태아도 가구원에 포함돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/신혼부부-민영주택-청약-가구원수-산정" },
  openGraph: { title: "신혼부부 청약, 가구원 수는 어떻게 계산하나요? 민영주택 가구원 수 산정 기준 | 머니위키", description: "신혼부부 특별공급에서 가구원은 본인+배우자+직계존비속이에요. 태아도 가구원에 포함돼요.", url: "https://www.jjyu.co.kr/w/신혼부부-민영주택-청약-가구원수-산정", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
