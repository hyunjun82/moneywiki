import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아휴직 불리한 대우 금지, 처벌 기준과 구제 신청 방법 | 머니위키",
  description: "육아휴직 썼다고 해고·감봉·승진 누락하면 불법. 사업주 3년 이하 징역 또는 3천만원 이하 벌금. 고용노동부 신고와 부당해고 구제 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직-불리한-대우-보호" },
  openGraph: {
    title: "육아휴직 불리한 대우 금지, 처벌 기준과 구제 신청 방법 | 머니위키",
    description: "육아휴직 썼다고 해고·감봉·승진 누락하면 불법. 사업주 3년 이하 징역 또는 3천만원 이하 벌금.",
    url: "https://www.jjyu.co.kr/w/육아휴직-불리한-대우-보호",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
