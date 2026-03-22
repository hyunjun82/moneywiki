import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 환급금 지급일 시기 조회 방법 | 머니위키",
  description: "연말정산 환급금은 2~3월 급여에 포함 지급돼요. 홈택스에서 결정세액과 기납부세액 비교하면 환급액을 미리 확인할 수 있어요.",
  openGraph: {
    title: "연말정산 환급금 지급일 시기 조회 방법",
    description: "환급금 지급 시기, 홈택스 조회 방법, 환급 vs 추가납부 기준 정리.",
    url: "https://jjyu.co.kr/w/연말정산-환급금-지급일",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-환급금-지급일" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
