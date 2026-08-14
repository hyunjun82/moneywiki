import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부동산 취득세, 얼마나 내야 할까? 세율부터 감면·신고 절차까지",
  description: "부동산 취득세는 잔금일부터 60일 이내에 신고·납부해야 해요. 1주택 1~3%, 다주택은 최대 12%까지 세율이 달라지고 생애최초 감면으로 최대 200만원을 줄일 수 있어요.",
  openGraph: {
    title: "부동산 취득세, 얼마나 내야 할까? 세율부터 감면·신고 절차까지 | 머니위키",
    description: "부동산 취득세 세율, 감면 제도, 신고 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/부동산-취득세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산-취득세" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
