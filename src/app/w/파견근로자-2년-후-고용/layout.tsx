import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "파견근로자 2년 후 직접 고용 의무 | 정규직 전환 지원금 조건 | 머니위키",
  description: "파견 2년이 넘으면 사용업체에서 직접 고용해야 한다는 거 아시나요? 직접 고용 의무 조건과 전환지원금 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/파견근로자-2년-후-고용" },
  openGraph: { title: "파견근로자 2년 후 직접 고용 의무 | 정규직 전환 지원금 조건 | 머니위키", description: "파견 2년이 넘으면 사용업체에서 직접 고용해야 한다는 거 아시나요? 직접 고용 의무 조건과 전환지원금 신청 방법을 알려드려요.", url: "https://www.jjyu.co.kr/w/파견근로자-2년-후-고용", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
