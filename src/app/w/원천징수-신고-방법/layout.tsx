import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "원천세 신고, 어떻게 하나요? 매달 10일까지 홈택스 신고 절차 정리",
  description: "원천세는 급여 지급 다음 달 10일까지 홈택스에서 신고·납부해야 해요. 세액이 0원이어도 신고 필수, 무신고 시 납부세액의 20% 가산세가 붙어요. 4단계 신고 절차 정리.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/원천징수-신고-방법",
  },
  openGraph: {
    title: "원천세 신고, 어떻게 하나요? 매달 10일까지 홈택스 신고 절차 정리",
    description: "원천세는 급여 지급 다음 달 10일까지 홈택스에서 신고·납부해야 해요. 세액 0원이어도 신고 필수.",
    url: "https://www.jjyu.co.kr/w/원천징수-신고-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
