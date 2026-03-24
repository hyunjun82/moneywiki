import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 취소 가능 여부 사기 강박 시 3개월 청구 | 머니위키",
  description: "협의이혼은 사기·강박이 있었다면 3개월 안에 취소 가능해요. 재판상이혼은 판결 확정 후 불가. 취소 조건과 소송 절차를 정리했어요.",
  openGraph: {
    title: "이혼 취소 가능 여부 사기 강박 시 3개월 청구",
    description: "이혼 취소 가능 조건, 3개월 기한, 소송 절차까지 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-취소-가능-여부",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/이혼-취소-가능-여부" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
