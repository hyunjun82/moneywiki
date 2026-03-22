import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "접대비 한도, 법인은 얼마까지 경비 처리될까? 손금산입 기준 | 머니위키",
  description: "중소기업 접대비 기본한도 연 3,600만 원, 일반 법인 1,200만 원이에요. 3만 원 초과 시 적격증빙 필수이고 초과분은 경비 불인정돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/접대비-한도-법인-손금산입-기준" },
  openGraph: {
    title: "접대비 한도, 법인은 얼마까지 경비 처리될까? 손금산입 기준 | 머니위키",
    description: "법인 접대비 기본한도와 추가한도, 3만 원 적격증빙 규칙, 문화접대비 20% 추가 인정까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/접대비-한도-법인-손금산입-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
