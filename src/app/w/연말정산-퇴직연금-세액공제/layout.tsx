import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 퇴직연금 세액공제",
  description: "DC형이나 IRP에 추가로 넣으면 연말정산 때 최대 148만원 돌려받아요. 회사가 넣어주는 건 안 되고 본인이 넣은 것만 돼요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-퇴직연금-세액공제" },
  openGraph: { title: "연말정산 퇴직연금 세액공제 | 머니위키", description: "DC형이나 IRP에 추가로 넣으면 연말정산 때 최대 148만원 돌려받아요. 회사가 넣어주는 건 안 되고 본인이 넣은 것만 돼요", url: "https://www.jjyu.co.kr/w/연말정산-퇴직연금-세액공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
