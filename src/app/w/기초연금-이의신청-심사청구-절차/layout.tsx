import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금 탈락, 억울하다면? 이의신청과 심사청구 절차",
  description: "기초연금 탈락이 억울하면 90일 이내에 이의신청할 수 있어요. 심사청구 절차와 준비 서류, 재심사까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-이의신청-심사청구-절차" },
  openGraph: {
    title: "기초연금 탈락, 억울하다면? 이의신청과 심사청구 절차 | 머니위키",
    description: "기초연금 탈락이 억울하면 90일 이내에 이의신청할 수 있어요. 심사청구 절차와 준비 서류, 재심사까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-이의신청-심사청구-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
