export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 전 재산 빼돌림 대비, 가압류·가처분 신청 방법 | 머니위키",
  description: "배우자가 재산을 빼돌릴까 걱정되시나요? 가압류·처분금지가처분으로 예금과 부동산을 보호하는 방법. 이혼 전에도 신청 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-전-재산-빼돌림-대비" },
  openGraph: {
    title: "이혼 전 재산 빼돌림 대비, 가압류·가처분 신청 방법 | 머니위키",
    description: "배우자가 재산을 빼돌릴까 걱정되시나요? 가압류·처분금지가처분으로 예금과 부동산을 보호하는 방법.",
    url: "https://www.jjyu.co.kr/w/이혼-전-재산-빼돌림-대비",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
