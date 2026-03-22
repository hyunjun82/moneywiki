import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "비거주자 원천징수 세율 소득유형별 정리와 조세조약 적용 | 머니위키",
  description: "비거주자 원천징수 세율은 소득 유형별로 달라요. 사업소득 20%, 이자·배당 20%이고 조세조약 적용 시 감면돼요.",
  openGraph: {
    title: "비거주자 원천징수 세율 소득유형별 정리와 조세조약 적용 | 머니위키",
    description: "비거주자 소득 유형별 원천징수 세율과 조세조약 적용 방법이에요.",
    url: "https://www.jjyu.co.kr/w/비거주자-원천징수-세율",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/비거주자-원천징수-세율" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
