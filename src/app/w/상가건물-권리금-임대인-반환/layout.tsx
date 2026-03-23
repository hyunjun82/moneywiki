import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상가 권리금 임대인 반환 불가, 회수 방법과 보호 의무 | 머니위키",
  description: "상가 권리금은 임대인에게 반환 청구할 수 없어요. 신규 임차인에게 회수하는 절차와 임대인의 회수기회 보호 의무, 방해 시 손해배상을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가건물-권리금-임대인-반환" },
  openGraph: {
    title: "상가 권리금 임대인 반환 불가, 회수 방법과 보호 의무 | 머니위키",
    description: "상가 권리금은 임대인에게 반환 청구할 수 없어요. 신규 임차인에게 회수하는 절차와 임대인의 회수기회 보호 의무, 방해 시 손해배상을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/상가건물-권리금-임대인-반환",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
