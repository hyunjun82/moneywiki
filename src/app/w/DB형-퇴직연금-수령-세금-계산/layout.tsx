import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "DB형 퇴직연금 받으면 세금이 얼마나 나오나요? 퇴직소득세 계산 방법",
  description: "DB형 퇴직연금 수령 시 퇴직소득세를 내요. 근속연수가 길수록 세금이 줄어드는 구조예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/DB형-퇴직연금-수령-세금-계산" },
  openGraph: { title: "DB형 퇴직연금 받으면 세금이 얼마나 나오나요? 퇴직소득세 계산 방법 | 머니위키", description: "DB형 퇴직연금 수령 시 퇴직소득세를 내요. 근속연수가 길수록 세금이 줄어드는 구조예요.", url: "https://www.jjyu.co.kr/w/DB형-퇴직연금-수령-세금-계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
