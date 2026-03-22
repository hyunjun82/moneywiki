import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년형 장기펀드 소득공제 한도와 가입 조건 | 머니위키",
  description: "청년형 장기펀드 납입액의 40%를 소득공제 받아요. 연 600만원 한도, 만 19~34세, 총급여 5,000만원 이하 조건이에요.",
  openGraph: {
    title: "청년형 장기펀드 소득공제 한도와 가입 조건 | 머니위키",
    description: "청년형 장기펀드 소득공제 혜택과 가입 조건이에요.",
    url: "https://www.jjyu.co.kr/w/연말정산-청년형-장기펀드",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-청년형-장기펀드" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
