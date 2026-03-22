import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보증금에서 뭘 공제할 수 있나요? 정당한 공제와 부당한 공제 구분법 | 머니위키",
  description: "연체 월세와 임차인 과실 파손은 공제 가능하지만 벽지 변색·장판 마모 같은 자연 노후는 공제 불가예요. 감가상각 계산법과 분쟁 대응 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/보증금-일부반환",
  },
  openGraph: {
    title: "보증금에서 뭘 공제할 수 있나요? 정당한 공제와 부당한 공제 구분법",
    description: "임차인 과실은 공제 가능, 자연 노후는 불가. 감가상각 적용 필수.",
    url: "https://www.jjyu.co.kr/w/보증금-일부반환",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
