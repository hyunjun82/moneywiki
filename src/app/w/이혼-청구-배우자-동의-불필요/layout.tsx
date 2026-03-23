export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "이혼은 상대방 동의 없이도 할 수 있나요? 재판이혼 청구 조건 | 머니위키",
  description: "재판이혼은 배우자 동의 없이도 가능해요. 혼인파탄 사유가 있으면 법원에 청구할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-청구-배우자-동의-불필요" },
  openGraph: { title: "이혼은 상대방 동의 없이도 할 수 있나요? 재판이혼 청구 조건 | 머니위키", description: "재판이혼은 배우자 동의 없이도 가능해요. 혼인파탄 사유가 있으면 법원에 청구할 수 있어요.", url: "https://www.jjyu.co.kr/w/이혼-청구-배우자-동의-불필요", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
