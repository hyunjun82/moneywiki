import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업신고 지연·늦게·소급·가능 여부",
  description: "실업신고 늦게 해도 괜찮아요. 퇴사 후 12개월 이내 소급 신청 가능하며, 지연된 기간만큼 받을 수 있어요.",
  openGraph: { title: "실업신고 지연·늦게·소급·가능 여부", description: "실업신고 늦게 해도 괜찮아요. 퇴사 후 12개월 이내 소급 신청 가능하며, 지연된 기간만큼 받을 수 있어요.", url: "https://jjyu.co.kr/w/실업신고-지연-후-가능-여부" },
  alternates: { canonical: "https://jjyu.co.kr/w/실업신고-지연-후-가능-여부" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
