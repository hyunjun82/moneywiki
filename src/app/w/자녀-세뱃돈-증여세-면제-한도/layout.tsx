import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자녀 세뱃돈 증여세 면제 한도, 얼마까지 괜찮을까? | 머니위키",
  description: "미성년 자녀는 10년간 2천만원, 성인 자녀는 5천만원까지 증여세 면제예요. 초과 시 신고 방법과 세율을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자녀-세뱃돈-증여세-면제-한도" },
  openGraph: {
    title: "자녀 세뱃돈 증여세 면제 한도, 얼마까지 괜찮을까? | 머니위키",
    description: "미성년 자녀는 10년간 2천만원, 성인 자녀는 5천만원까지 증여세 면제예요.",
    url: "https://www.jjyu.co.kr/w/자녀-세뱃돈-증여세-면제-한도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
