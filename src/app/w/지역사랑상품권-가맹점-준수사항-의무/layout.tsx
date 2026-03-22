import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지역사랑상품권 가맹점, 뭘 지켜야 하나? 준수사항부터 과태료까지 | 머니위키",
  description: "결제 거부 한 번에 등록 취소될 수 있어요. 가맹점 준수사항 5가지와 위반 시 과태료·제재 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지역사랑상품권-가맹점-준수사항-의무" },
  openGraph: {
    title: "지역사랑상품권 가맹점, 뭘 지켜야 하나? 준수사항부터 과태료까지 | 머니위키",
    description: "결제 거부 한 번에 등록 취소될 수 있어요. 가맹점 준수사항 5가지와 위반 시 과태료·제재 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/지역사랑상품권-가맹점-준수사항-의무",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
