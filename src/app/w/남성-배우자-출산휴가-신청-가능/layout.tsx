import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "남편도 출산휴가 20일 받을 수 있나요? 신청 방법과 급여까지",
  description: "배우자 출산휴가 20일 유급, 출산일로부터 120일 이내 사용, 최대 4회 분할 가능해요. 회사 승인 없이 고지만 하면 되고 급여는 월 최대 160만원까지 지원돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/남성-배우자-출산휴가-신청-가능",
  },
  openGraph: {
    title: "남편도 출산휴가 20일 받을 수 있나요? 신청 방법과 급여까지",
    description: "20일 유급, 4회 분할, 급여 월 최대 160만원. 신청 방법 정리.",
    url: "https://www.jjyu.co.kr/w/남성-배우자-출산휴가-신청-가능",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
