import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 담보대출 조건 금리 DSR | 머니위키",
  description: "퇴직연금 담보대출은 법으로 금지돼요. 적립금 담보 설정이 안 돼서 공식 상품이 없어요. 대신 중도인출이나 신용대출로 해결할 수 있어요",
  openGraph: { title: "퇴직연금 담보대출 조건 금리 DSR", description: "퇴직연금 담보대출은 법으로 금지돼요. 적립금 담보 설정이 안 돼서 공식 상품이 없어요. 대신 중도인출이나 신용대출로 해결할 수 있어요", url: "https://jjyu.co.kr/w/퇴직연금-담보대출" },
  alternates: { canonical: "https://jjyu.co.kr/w/퇴직연금-담보대출" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
