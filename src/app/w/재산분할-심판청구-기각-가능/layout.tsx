export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재산분할 심판청구 기각 사유 3가지와 대응 | 머니위키",
  description: "재산분할 심판청구가 기각되는 3가지 사유: 2년 제척기간 경과, 협력재산 부재, 초과보유. 기각 방지법과 즉시항고 방법을 정리했어요.",
  openGraph: {
    title: "재산분할 심판청구 기각 사유 3가지와 대응",
    description: "2년 안에 청구해야 하고, 함께 이룬 재산이 있어야 해요.",
    url: "https://jjyu.co.kr/w/재산분할-심판청구-기각-가능",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/재산분할-심판청구-기각-가능" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
