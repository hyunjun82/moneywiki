import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "배우자 출산휴가 10일 유급, 신청 방법과 급여 지원 | 머니위키",
  description: "배우자가 출산하면 10일 유급휴가 받을 수 있어요. 분할 사용 가능하고 중소기업은 정부 지원금도 나와요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배우자-출산휴가" },
  openGraph: { title: "배우자 출산휴가 10일 유급, 신청 방법과 급여 지원", description: "배우자가 출산하면 10일 유급휴가 받을 수 있어요. 분할 사용 가능하고 중소기업은 정부 지원금도 나와요.", url: "https://www.jjyu.co.kr/w/배우자-출산휴가", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
