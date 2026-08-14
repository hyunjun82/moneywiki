import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이혼 전 재산 빼돌림 대비 | 처분금지가처분·가압류·사해행위취소",
  description:
    "배우자가 재산을 처분하기 전에 묶는 방법과, 이미 넘어간 재산을 되돌리는 방법을 나눠 정리했습니다. 처분금지가처분과 가압류 신청, 사해행위취소소송 절차를 설명합니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-전-재산-빼돌림" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
