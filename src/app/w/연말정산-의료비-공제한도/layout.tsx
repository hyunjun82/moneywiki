import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "의료비 공제한도, 누가 한도 없이 받나요? 대상별 한도와 공제율 비교 | 머니위키",
  description: "본인·65세 이상·장애인·산정특례자·6세 이하 자녀 의료비는 한도 없이 공제돼요. 일반 부양가족은 700만원 한도. 난임 시술비 30%, 미숙아 20% 공제율.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-의료비-공제한도",
  },
  openGraph: {
    title: "의료비 공제한도, 누가 한도 없이 받나요? 대상별 한도와 공제율 비교",
    description: "본인·65세 이상·장애인·산정특례자 한도 없음. 일반 부양가족 700만원 한도.",
    url: "https://www.jjyu.co.kr/w/연말정산-의료비-공제한도",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
