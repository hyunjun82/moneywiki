import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "착오송금 반환청구 방법 부당이득 예금보험공사 | 머니위키",
  description: "계좌번호 잘못 입력해서 엉뚱한 사람한테 7천만 원을 보냈어요. 돌려받을 수 있을까요? 착오송금 반환 절차와 예금보험공사 지원제도를 알려드릴게요.",
  openGraph: { title: "착오송금 반환청구 방법 부당이득 예금보험공사 | 머니위키", description: "계좌번호 잘못 입력해서 엉뚱한 사람한테 7천만 원을 보냈어요. 돌려받을 수 있을까요? 착오송금 반환 절차와 예금보험공사 지원제도를 알려드릴게요.", url: "https://www.jjyu.co.kr/w/착오송금-반환청구-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/착오송금-반환청구-방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
