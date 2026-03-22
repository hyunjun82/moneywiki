import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "파업 참여 해고 정당성: 보호 범위 및 구제 절차 | 머니위키",
  description: "정당한 파업 참여만으로는 해고할 수 없고 단순 참여로 해고 시 부당해고 되지만 폭력·업무방해 동반 시 정당 해고 된다는 거 아시나요? 노조 활동 보호 범위와 구제 방법까지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/파업-참여-이유-해고-정당성" },
  openGraph: {
    title: "파업 참여 해고 정당성: 보호 범위 및 구제 절차",
    description: "정당한 파업 참여만으로는 해고할 수 없고 단순 참여로 해고 시 부당해고 되지만 폭력·업무방해 동반 시 정당 해고 된다는 거 아시나요? 노조 활동 보호 범위와 구제 방법까지 알려드려요",
    url: "https://www.jjyu.co.kr/w/파업-참여-이유-해고-정당성",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
