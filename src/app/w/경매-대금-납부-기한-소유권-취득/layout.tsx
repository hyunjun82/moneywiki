import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경매 대금 납부 기한 소유권 취득",
  description: "경매 낙찰받고 돈 언제까지 내야 하는지 궁금하시죠. 법원이 정한 기한 안에 잔금 다 내야 소유권이 넘어와요. 하루라도 늦으면 보증금 날리고 낙찰 취소예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-대금-납부-기한-소유권-취득" },
  openGraph: { title: "경매 대금 납부 기한 소유권 취득", description: "경매 낙찰받고 돈 언제까지 내야 하는지 궁금하시죠. 법원이 정한 기한 안에 잔금 다 내야 소유권이 넘어와요. 하루라도 늦으면 보증금 날리고 낙찰", url: "https://www.jjyu.co.kr/w/경매-대금-납부-기한-소유권-취득", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
