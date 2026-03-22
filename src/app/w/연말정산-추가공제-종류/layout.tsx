import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기본공제 외에 더 받을 수 있는 건? 추가공제 4종류 금액과 조건 | 머니위키",
  description: "경로우대 100만원, 장애인 200만원, 부녀자 50만원, 한부모 100만원. 기본공제에 추가로 받는 소득공제 요건과 중복 적용 가능 여부를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-추가공제-종류",
  },
  openGraph: {
    title: "기본공제 외에 더 받을 수 있는 건? 추가공제 4종류 금액과 조건",
    description: "경로우대 100만, 장애인 200만, 부녀자 50만, 한부모 100만. 중복 적용 가능.",
    url: "https://www.jjyu.co.kr/w/연말정산-추가공제-종류",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
