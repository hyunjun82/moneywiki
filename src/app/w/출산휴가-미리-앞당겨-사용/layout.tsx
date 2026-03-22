import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산휴가, 출산 전에 미리 쓸 수 있을까? 분할 사용 조건과 방법 | 머니위키",
  description: "유산 경험, 만 40세 이상, 유산 위험 진단 등 법정 사유가 있으면 출산휴가를 출산 전에 분할 사용할 수 있어요. 출산 후 45일은 연속 사용 의무이고, 사업주는 거부할 수 없어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/출산휴가-미리-앞당겨-사용",
  },
  openGraph: {
    title: "출산휴가, 출산 전에 미리 쓸 수 있을까?",
    description: "법정 사유 있으면 분할 사용 가능. 유산 경험·40세 이상·유산 위험 진단 등.",
    url: "https://www.jjyu.co.kr/w/출산휴가-미리-앞당겨-사용",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
