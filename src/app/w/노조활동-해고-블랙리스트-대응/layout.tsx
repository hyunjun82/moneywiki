import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "노조활동 해고 부당노동행위 신고 | 블랙리스트 손해배상 청구 대응",
  description: "노조활동으로 해고당하면 부당노동행위로 신고할 수 있다는 거 아시나요? 블랙리스트 대응 방법과 노동위원회 구제 신청 절차를 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/노조활동-해고-블랙리스트-대응" },
  openGraph: { title: "노조활동 해고 부당노동행위 신고 | 블랙리스트 손해배상 청구 대응 | 머니위키", description: "노조활동으로 해고당하면 부당노동행위로 신고할 수 있다는 거 아시나요? 블랙리스트 대응 방법과 노동위원회 구제 신청 절차를 알려드려요.", url: "https://www.jjyu.co.kr/w/노조활동-해고-블랙리스트-대응", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
