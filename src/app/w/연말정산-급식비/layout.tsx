import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 급식비 공제 어린이집 유치원 초중고 차이 | 머니위키",
  description: "어린이집·유치원 급식비는 교육비 세액공제 15%. 초중고 급식비는 교육비 공제 불가, 카드 공제만 가능. 연 300만원 한도.",
  openGraph: {
    title: "연말정산 급식비 공제 어린이집 유치원 초중고 차이",
    description: "취학 전 아동 급식비만 교육비 공제. 초중고는 카드 공제만.",
    url: "https://jjyu.co.kr/w/연말정산-급식비",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-급식비" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
