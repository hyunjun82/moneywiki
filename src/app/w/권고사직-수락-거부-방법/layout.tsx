import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "권고사직을 받았는데, 수락해야 하나요? 수락·거부 시 실업급여와 퇴직금",
  description: "권고사직 수락 시 실업급여 수급 가능. 거부 시 해고로 전환되면 부당해고 구제 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/권고사직-수락-거부-방법" },
  openGraph: { title: "권고사직을 받았는데, 수락해야 하나요? 수락·거부 시 실업급여와 퇴직금 | 머니위키", description: "권고사직 수락 시 실업급여 수급 가능. 거부 시 해고로 전환되면 부당해고 구제 가능해요.", url: "https://www.jjyu.co.kr/w/권고사직-수락-거부-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
