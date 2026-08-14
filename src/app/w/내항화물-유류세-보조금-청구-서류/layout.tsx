import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "내항화물 유류세 보조금 청구 서류 5가지와 절차",
  description: "청구서·세금계산서·운항일지·등록증·국적증서 5가지 서류가 필요해요. 지방해양수산청 제출 절차와 기한을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/내항화물-유류세-보조금-청구-서류" },
  openGraph: {
    title: "내항화물 유류세 보조금 청구 서류 5가지와 절차 | 머니위키",
    description: "청구서·세금계산서·운항일지·등록증·국적증서 5가지 서류가 필요해요. 지방해양수산청 제출 절차와 기한을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/내항화물-유류세-보조금-청구-서류",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
