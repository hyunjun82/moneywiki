import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "2030년 135만호 공급계획이 뭔가요? 수도권 27만호 연간 일정과 지역별 배분",
  description: "2030년까지 수도권에 135만호가 공급돼요. 연간 27만호씩 착공하고 과거 대비 1.7배 많은 수준이에요. 공급 일정과 지역별 배분 알려드려요.",
  openGraph: { title: "2030년 135만호 공급계획이 뭔가요? 수도권 27만호 연간 일정과 지역별 배분 | 머니위키", description: "2030년까지 수도권에 135만호가 공급돼요. 연간 27만호씩 착공하고 과거 대비 1.7배 많은 수준이에요. 공급 일정과 지역별 배분 알려드려요.", url: "https://www.jjyu.co.kr/w/2030년-135만호-공급계획", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/2030년-135만호-공급계획" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
