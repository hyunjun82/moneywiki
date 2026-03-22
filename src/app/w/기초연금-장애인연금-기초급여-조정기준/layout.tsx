import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금이랑 장애인연금 같이 받을 수 있을까? 기초급여 조정 기준 | 머니위키",
  description: "65세 이상 중증장애인은 기초연금과 장애인연금이 중복되는데, 장애인연금 기초급여가 기초연금으로 대체돼요. 조정 기준과 실수령액을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-장애인연금-기초급여-조정기준" },
  openGraph: {
    title: "기초연금이랑 장애인연금 같이 받을 수 있을까? 기초급여 조정 기준 | 머니위키",
    description: "65세 이상 중증장애인은 기초연금과 장애인연금이 중복되는데, 장애인연금 기초급여가 기초연금으로 대체돼요. 조정 기준과 실수령액을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-장애인연금-기초급여-조정기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
