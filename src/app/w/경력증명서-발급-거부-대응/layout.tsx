import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경력증명서 발급 거부 대응 — 노동청 신고로 받아내는 방법",
  description: "30일 이상 근무했고 퇴직 후 3년 이내면 회사는 근로기준법 제39조에 따라 반드시 발급해야 해요. 거부하면 최대 500만원 과태료, 노동청 신고 절차 안내해요.",
  openGraph: {
    title: "경력증명서 발급 거부 대응 — 노동청 신고로 받아내는 방법",
    description: "30일 이상 근무했고 퇴직 후 3년 이내면 회사는 근로기준법 제39조에 따라 반드시 발급해야 해요. 거부하면 최대 500만원 과태료, 노동청 신고 절차 안내해요.",
    type: "article",
  },
  alternates: {
    canonical: "/w/경력증명서-발급-거부-대응",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
