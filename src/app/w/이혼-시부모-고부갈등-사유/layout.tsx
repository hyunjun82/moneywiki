export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고부갈등, 이혼 사유가 될까? 법적 기준과 위자료 청구 | 머니위키",
  description: "시부모와의 갈등이 이혼 사유로 인정되려면 지속적 부당대우와 배우자 방치가 입증돼야 해요. 증거 준비부터 위자료 청구까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-시부모-고부갈등-사유" },
  openGraph: {
    title: "고부갈등, 이혼 사유가 될까? 법적 기준과 위자료 청구 | 머니위키",
    description: "시부모와의 갈등이 이혼 사유로 인정되려면 지속적 부당대우와 배우자 방치가 입증돼야 해요.",
    url: "https://www.jjyu.co.kr/w/이혼-시부모-고부갈등-사유",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
