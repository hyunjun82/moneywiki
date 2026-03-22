import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주식 배당금 미지급 주주권리 상법 이익배당청구권 | 머니위키",
  description: "1년 동안 주식 보유했는데 회사가 올해는 배당 안 준다고 해요. 회사에 이익이 발생해도 배당금을 안 줘도 되는 건가요? 주주 권리를 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주식-배당금-미지급-주주권리" },
  openGraph: {
    title: "주식 배당금 미지급 주주권리 상법 이익배당청구권",
    description: "1년 동안 주식 보유했는데 회사가 올해는 배당 안 준다고 해요. 회사에 이익이 발생해도 배당금을 안 줘도 되는 건가요? 주주 권리를 알려드릴게요.",
    url: "https://www.jjyu.co.kr/w/주식-배당금-미지급-주주권리",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
