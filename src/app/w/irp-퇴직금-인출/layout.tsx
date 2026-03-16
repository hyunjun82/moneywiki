import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "IRP 퇴직금 인출, 어떤 방법이 세금을 줄여주나요? | 머니위키",
  description: "IRP 퇴직금 인출 방법별 세금 차이를 비교했어요. 중도 인출 사유, 연금 인출 절세, 인출 전 확인 사항까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/irp-퇴직금-인출" },
  openGraph: { title: "IRP 퇴직금 인출, 어떤 방법이 세금을 줄여주나요? | 머니위키", description: "IRP 퇴직금 인출 방법별 세금 차이를 비교했어요. 중도 인출 사유, 연금 인출 절세, 인출 전 확인 사항까지 안내해요.", url: "https://www.jjyu.co.kr/w/irp-퇴직금-인출", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
