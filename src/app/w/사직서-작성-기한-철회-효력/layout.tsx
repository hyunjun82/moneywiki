import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "사직서 작성·기한·철회·효력 발생 시기 | 머니위키",
  description: "사직서는 2주에서 한 달 전에 제출하면 돼요. 철회는 회사가 받기 전이면 가능하지만, 받은 후엔 특별한 사정 없이 철회 못 해요.",
  openGraph: { title: "사직서 작성·기한·철회·효력 발생 시기", description: "사직서는 2주에서 한 달 전에 제출하면 돼요. 철회는 회사가 받기 전이면 가능하지만, 받은 후엔 특별한 사정 없이 철회 못 해요.", url: "https://jjyu.co.kr/w/사직서-작성-기한-철회-효력" },
  alternates: { canonical: "https://jjyu.co.kr/w/사직서-작성-기한-철회-효력" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
