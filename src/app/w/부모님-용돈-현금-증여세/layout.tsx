import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부모님 용돈 현금 증여세 과세 기준 및 면제 한도 | 머니위키",
  description: "명절에 부모님께 드리는 용돈은 사회통념상 비과세예요. 그런데 몇백만원씩 정기적으로 드리면 증여세 대상이 될 수 있어요.",
  openGraph: { title: "부모님 용돈 현금 증여세 과세 기준 및 면제 한도", description: "명절에 부모님께 드리는 용돈은 사회통념상 비과세예요. 그런데 몇백만원씩 정기적으로 드리면 증여세 대상이 될 수 있어요.", url: "https://jjyu.co.kr/w/부모님-용돈-현금-증여세" },
  alternates: { canonical: "https://jjyu.co.kr/w/부모님-용돈-현금-증여세" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
