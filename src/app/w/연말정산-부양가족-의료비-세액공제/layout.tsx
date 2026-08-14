import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부양가족 의료비 세액공제, 얼마 돌려받을까?",
  description: "부양가족 의료비는 나이·소득 무관 15% 세액공제 대상이에요. 6세 이하 한도 폐지, 맞벌이 전략, 실손 차감까지 2026년 연말정산 기준으로 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-부양가족-의료비-세액공제",
  },
  openGraph: {
    title: "부양가족 의료비 세액공제, 얼마 돌려받을까?",
    description: "나이·소득 무관 15% 세액공제. 맞벌이 전략과 공제 한도까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-부양가족-의료비-세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
