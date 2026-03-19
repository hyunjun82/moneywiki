import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 부녀자 추가공제 50만원 요건 | 머니위키",
  description: "배우자 있는 여성 또는 부양가족 있는 여성 세대주, 총급여 4,100만원 이하. 한부모 공제와 중복 불가. 신청 방법 안내.",
  openGraph: {
    title: "연말정산 부녀자 추가공제 50만원 요건",
    description: "총급여 4,100만원 이하 여성 50만원 추가공제. 한부모 공제와 비교.",
    url: "https://jjyu.co.kr/w/연말정산-부녀자-추가공제",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/연말정산-부녀자-추가공제",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
