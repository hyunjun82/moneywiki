import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 장기수선충당금 사용 용도, 못 쓰는 것은? | 머니위키",
  description: "장기수선충당금은 승강기·외벽·배관 등 시설 교체·보수에만 써요. 관리비 충당에 쓰면 횡령죄예요. 쓸 수 있는 것, 못 쓰는 것, 내역 확인 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-장기수선충당금-사용-용도" },
  openGraph: {
    title: "아파트 장기수선충당금 사용 용도, 못 쓰는 것은? | 머니위키",
    description: "장기수선충당금은 승강기·외벽·배관 등 시설 교체·보수에만 써요. 관리비 충당에 쓰면 횡령죄예요. 쓸 수 있는 것, 못 쓰는 것, 내역 확인 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/아파트-장기수선충당금-사용-용도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
