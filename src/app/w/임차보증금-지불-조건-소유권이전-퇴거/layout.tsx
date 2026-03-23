export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임차보증금 소유권이전 퇴거 — 집 팔렸을 때 보증금 보호 방법 | 머니위키",
  description: "집이 팔려도 전입신고와 거주 중이면 대항력으로 보증금이 보호돼요. 새 집주인에게 반환 요구하는 방법과 퇴거 거부 권리를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임차보증금-지불-조건-소유권이전-퇴거" },
  openGraph: {
    title: "임차보증금 소유권이전 퇴거 — 보증금 보호 방법",
    description: "대항력 있으면 보증금 반환 전 퇴거 거부 가능. 대응 절차 정리.",
    url: "https://www.jjyu.co.kr/w/임차보증금-지불-조건-소유권이전-퇴거",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
