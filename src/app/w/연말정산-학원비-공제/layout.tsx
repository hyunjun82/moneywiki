import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "학원비도 연말정산 공제 되나요? 취학전 아동만 300만원 한도로 공제",
  description: "취학전 아동 학원비는 연 300만원 한도로 15% 세액공제돼요. 태권도, 영어, 미술 학원 등 정식 학원이면 공제 대상. 초등학생 학원비는 불가.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-학원비-공제",
  },
  openGraph: {
    title: "학원비도 연말정산 공제 되나요? 취학전 아동만 300만원 한도로 공제",
    description: "취학전 아동 학원비 300만원 한도, 15% 세액공제. 최대 45만원 환급.",
    url: "https://www.jjyu.co.kr/w/연말정산-학원비-공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
