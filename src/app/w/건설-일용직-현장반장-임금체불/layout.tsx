import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "현장반장이 일당 안 주고 잠적했다면? 원청 청구 방법",
  description: "건설 일용직 임금체불 시 원청 건설사에 직접 청구할 수 있어요. 건설산업기본법 연대책임 근거, 노동청 진정 절차, 필요 증거를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/건설-일용직-현장반장-임금체불",
  },
  openGraph: {
    title: "건설 일용직 임금체불, 원청 청구부터 강제집행까지",
    description: "현장반장 잠적해도 원청 연대책임으로 청구 가능. 노동청 진정 절차 정리.",
    url: "https://www.jjyu.co.kr/w/건설-일용직-현장반장-임금체불",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
