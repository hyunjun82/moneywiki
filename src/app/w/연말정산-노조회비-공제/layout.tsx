import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "노조회비 연말정산 공제, 15% 세액공제 신청 방법 | 머니위키",
  description: "노동조합 회비는 지정기부금으로 납부액의 15%를 세금에서 빼줘요. 급여에서 자동 공제됐어도 세액공제는 별도로 신청해야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-노조회비-공제" },
  openGraph: {
    title: "노조회비 연말정산 공제, 15% 세액공제 신청 방법 | 머니위키",
    description: "노동조합 회비는 지정기부금으로 납부액의 15%를 세금에서 빼줘요. 급여에서 자동 공제됐어도 세액공제는 별도로 신청해야 해요.",
    url: "https://www.jjyu.co.kr/w/연말정산-노조회비-공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
