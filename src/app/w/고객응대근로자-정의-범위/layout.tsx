import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고객응대근로자, 나도 해당될까? 보호 범위와 폭언 대응법",
  description: "콜센터·판매직·상담원 등 고객 응대 업무 종사자라면 산업안전보건법 제41조로 보호받아요. 폭언 시 업무 중단 가능하고, 사업주 미조치 시 1천만원 과태료예요.",
  openGraph: {
    title: "고객응대근로자, 나도 해당될까? 보호 범위와 폭언 대응법",
    description: "콜센터·판매직·상담원 등 고객 응대 업무 종사자라면 산업안전보건법 제41조로 보호받아요. 폭언 시 업무 중단 가능하고, 사업주 미조치 시 1천만원 과태료예요.",
    type: "article",
  },
  alternates: { canonical: "/w/고객응대근로자-정의-범위" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
