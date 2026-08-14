import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "유학생 자녀 연말정산, 인적공제와 교육비 조건",
  description: "유학생 자녀는 만 20세 이하면 인적공제 150만원, 해외 대학 등록금은 연 300만원까지 15% 세액공제돼요. 어학연수는 공제 불가, 증빙 서류 준비 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-유학생",
  },
  openGraph: {
    title: "유학생 자녀 연말정산, 인적공제와 교육비 조건",
    description: "만 20세 이하 인적공제 150만원, 해외 교육비 300만원 한도 15% 세액공제. 어학연수 불가.",
    url: "https://www.jjyu.co.kr/w/연말정산-유학생",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
