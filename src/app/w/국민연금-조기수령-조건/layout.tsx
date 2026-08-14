import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국민연금 조기수령 조건",
  description: "국민연금 조기수령은 언제부터 가능한가요? 조기수령 조건과 감액률까지 정리했어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민연금-조기수령-조건" },
  openGraph: { title: "국민연금 조기수령 조건 | 머니위키", description: "국민연금 조기수령은 언제부터 가능한가요? 조기수령 조건과 감액률까지 정리했어요", url: "https://www.jjyu.co.kr/w/국민연금-조기수령-조건", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
