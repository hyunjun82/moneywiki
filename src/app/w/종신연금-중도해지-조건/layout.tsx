import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종신연금 중도해지, 가능한가요? 해지 조건과 손실 계산 | 머니위키",
  description: "종신연금은 중도해지 가능하지만 해약환급금이 납입액보다 적어요. 해지 전 확인할 사항을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/종신연금-중도해지-조건" },
  openGraph: { title: "종신연금 중도해지, 가능한가요? 해지 조건과 손실 계산 | 머니위키", description: "종신연금은 중도해지 가능하지만 해약환급금이 납입액보다 적어요. 해지 전 확인할 사항을 정리했어요.", url: "https://www.jjyu.co.kr/w/종신연금-중도해지-조건", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
