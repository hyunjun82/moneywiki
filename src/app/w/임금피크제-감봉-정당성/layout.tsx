import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임금피크제 감봉 정당성 판단 기준과 부당 대응법 | 머니위키",
  description: "임금피크제 적용에는 근로자 동의가 필수예요. 동의 없는 감봉은 무효이고 체불 임금으로 청구할 수 있어요. 정당성 판단 기준과 대응법을 정리했어요.",
  openGraph: {
    title: "임금피크제 감봉 정당성 판단 기준과 부당 대응법 | 머니위키",
    description: "임금피크제 정당성 판단 기준과 부당 감봉 시 대응 방법이에요.",
    url: "https://www.jjyu.co.kr/w/임금피크제-감봉-정당성",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금피크제-감봉-정당성" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
