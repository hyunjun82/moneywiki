import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "빚이 감당이 안 된다면? 개인파산 면책 신청 절차와 기간",
  description: "개인파산 면책 동시신청으로 빚을 법적으로 탕감받을 수 있어요. 동시폐지면 3~4개월, 관재인 선임 시 6개월~1년 걸려요. 신청 절차, 비용, 필요 서류를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/개인파산-면책절차-신청방법-법원-심리",
  },
  openGraph: {
    title: "빚이 감당이 안 된다면? 개인파산 면책 신청 절차와 기간",
    description: "파산+면책 동시신청 절차, 비용, 기간을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/개인파산-면책절차-신청방법-법원-심리",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
