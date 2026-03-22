import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재산분할 명의 일방 청구권: 명의 효과, 청구 가능성 및 법적 기준 | 머니위키",
  description: "재산이 배우자 한쪽 명의로만 되어 있어도 재산분할을 청구할 수 있어요. 명의와 상관없이 혼인 중 함께 모은 재산은 분할 대상이 되고, 2년 안에 청구해야 해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재산분할-명의-일방-청구권" },
  openGraph: { title: "재산분할 명의 일방 청구권: 명의 효과, 청구 가능성 및 법적 기준 | 머니위키", description: "재산이 배우자 한쪽 명의로만 되어 있어도 재산분할을 청구할 수 있어요. 명의와 상관없이 혼인 중 함께 모은 재산은 분할 대상이 되고, 2년 안에 청구해야 해요", url: "https://www.jjyu.co.kr/w/재산분할-명의-일방-청구권", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
