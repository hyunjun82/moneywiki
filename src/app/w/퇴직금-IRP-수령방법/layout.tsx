import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "IRP에 퇴직금이 들어왔는데 어떻게 꺼내야 하죠? | 머니위키",
  description: "연금 vs 일시금 세금 차이와 IRP 수령 신청 4단계를 정리했어요. 퇴직소득세 30% 감면 조건(55세·5년·10년)부터 서류까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-IRP-수령방법" },
  openGraph: {
    title: "IRP에 퇴직금이 들어왔는데 어떻게 꺼내야 하죠? | 머니위키",
    description: "연금 vs 일시금 세금 차이와 IRP 수령 신청 4단계를 정리했어요. 퇴직소득세 30% 감면 조건(55세·5년·10년)부터 서류까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-IRP-수령방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
