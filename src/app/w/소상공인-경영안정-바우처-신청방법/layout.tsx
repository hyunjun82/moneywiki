import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "소상공인 경영안정바우처 25만원, 신청 대상과 방법 | 머니위키",
  description: "소상공인 경영안정바우처는 연매출 1억 400만원 미만 소상공인에게 25만원을 지원해요. 전기요금, 가스비, 4대보험료 등 고정비에 사용 가능하고 소상공인24에서 온라인 신청해요.",
  openGraph: {
    title: "소상공인 경영안정바우처 25만원, 신청 대상과 방법 | 머니위키",
    description: "소상공인 경영안정바우처 25만원 신청 조건과 사용처를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/소상공인-경영안정-바우처-신청방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/소상공인-경영안정-바우처-신청방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
