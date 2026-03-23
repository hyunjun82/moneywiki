import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경조휴가, 며칠 쓸 수 있나? — 결혼·출산·사망 등 부여 기준 | 머니위키",
  description: "경조휴가는 본인 결혼 5일, 부모 사망 5일이 일반적이에요. 배우자 출산휴가 10일만 법정 유급. 부여 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경조휴가-부여기준" },
  openGraph: { title: "경조휴가, 며칠 쓸 수 있나? — 결혼·출산·사망 등 부여 기준", description: "경조휴가는 본인 결혼 5일, 부모 사망 5일이 일반적이에요. 배우자 출산휴가 10일만 법정 유급. 부여 기준을 정리했어요.", url: "https://www.jjyu.co.kr/w/경조휴가-부여기준", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
