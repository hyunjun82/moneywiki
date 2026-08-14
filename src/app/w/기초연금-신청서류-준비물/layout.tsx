import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 신청할 때 뭘 가져갈까? 필수 서류와 준비물",
  description: "기초연금 신청에 필요한 서류는 신분증, 통장 사본, 금융정보 제공 동의서예요. 상황별로 추가 서류가 달라지니 미리 챙겨가세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-신청서류-준비물" },
  openGraph: { title: "기초연금 신청할 때 뭘 가져갈까? 필수 서류와 준비물 | 머니위키", description: "기초연금 신청에 필요한 서류는 신분증, 통장 사본, 금융정보 제공 동의서예요. 상황별로 추가 서류가 달라지니 미리 챙겨가세요.", url: "https://www.jjyu.co.kr/w/기초연금-신청서류-준비물", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
