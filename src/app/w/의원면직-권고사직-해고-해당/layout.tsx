export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "의원면직·권고사직·해고, 뭐가 다를까? 퇴사 유형별 실업급여 수급 기준 | 머니위키",
  description: "의원면직은 원칙 불가, 권고사직·해고는 실업급여 수급 가능해요. 퇴직사유 한 글자 차이로 수백만원이 달라지니 서류 작성법을 꼭 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/의원면직-권고사직-해고-해당" },
  openGraph: {
    title: "의원면직·권고사직·해고, 뭐가 다를까? 퇴사 유형별 실업급여 수급 기준 | 머니위키",
    description: "의원면직은 원칙 불가, 권고사직·해고는 실업급여 수급 가능해요. 퇴직사유 한 글자 차이로 수백만원이 달라지니 서류 작성법을 꼭 확인하세요.",
    url: "https://www.jjyu.co.kr/w/의원면직-권고사직-해고-해당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
