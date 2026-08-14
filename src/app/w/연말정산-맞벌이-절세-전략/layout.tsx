import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "맞벌이 연말정산 절세 전략, 공제 분담 방법",
  description: "맞벌이 부부는 부양가족은 소득 높은 쪽, 의료비·신용카드는 소득 낮은 쪽이 유리해요. 항목별 분담 전략과 중복 공제 주의사항을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-맞벌이-절세-전략",
  },
  openGraph: {
    title: "맞벌이 연말정산 절세 전략, 공제 분담 방법",
    description: "부양가족은 소득 높은 쪽, 의료비 3%·신용카드 25%는 소득 낮은 쪽이 유리. 항목별 분담 가이드.",
    url: "https://www.jjyu.co.kr/w/연말정산-맞벌이-절세-전략",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
