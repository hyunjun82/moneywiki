import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아휴직 후 연차, 정말 생기나요? 발생 기준과 사용법",
  description: "육아휴직 기간은 출근으로 인정돼서 복직 후 연차 15개가 정상 발생해요. 회사가 거부하면 근로기준법 위반이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직-후-연차-발생-여부" },
  openGraph: {
    title: "육아휴직 후 연차, 정말 생기나요? 발생 기준과 사용법 | 머니위키",
    description: "육아휴직 기간은 출근으로 인정돼서 복직 후 연차 15개가 정상 발생해요.",
    url: "https://www.jjyu.co.kr/w/육아휴직-후-연차-발생-여부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
