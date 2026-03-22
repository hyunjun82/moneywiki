import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전입신고와 확정일자, 뭐가 다르나요? 대항력·우선변제권 차이 | 머니위키",
  description: "전입신고+입주로 대항력이 생기고, 확정일자까지 받으면 우선변제권이 추가돼요. 대항력은 계약 유지, 우선변제권은 경매 시 보증금 우선 회수. 확정일자 없으면 보증금 못 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전입신고-확정일자-대항력-우선변제권",
  },
  openGraph: {
    title: "전입신고와 확정일자, 뭐가 다르나요? 대항력·우선변제권 차이",
    description: "전입신고=대항력, +확정일자=우선변제권. 둘 다 해야 보증금이 안전해요.",
    url: "https://www.jjyu.co.kr/w/전입신고-확정일자-대항력-우선변제권",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
