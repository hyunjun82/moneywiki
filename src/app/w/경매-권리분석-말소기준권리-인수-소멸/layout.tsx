import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 권리분석, 뭐가 넘어오고 뭐가 없어지나요? 말소기준권리로 인수·소멸 판단하는 법",
  description: "경매 권리분석의 핵심은 말소기준권리예요. 저당권·압류·담보가등기 중 가장 먼저 등기된 것을 기준으로 인수와 소멸이 갈려요. 유치권·법정지상권은 무조건 인수되니 주의하세요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/경매-권리분석-말소기준권리-인수-소멸",
  },
  openGraph: {
    title: "경매 권리분석, 뭐가 넘어오고 뭐가 없어지나요? 말소기준권리로 인수·소멸 판단하는 법",
    description: "말소기준권리 기준으로 인수/소멸 판단. 유치권·법정지상권 무조건 인수 주의.",
    url: "https://www.jjyu.co.kr/w/경매-권리분석-말소기준권리-인수-소멸",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
