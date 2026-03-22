import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "파견근로 2년 넘으면 정규직? 직접고용 요구 조건과 절차",
  description: "파견법 제6조의2에 따라 2년 초과 파견근로자는 사용사업주가 직접고용해야 해요. 거부 시 3천만원 과태료, 직접고용 요구 절차를 안내해요.",
  openGraph: {
    title: "파견근로 2년 넘으면 정규직? 직접고용 요구 조건과 절차",
    description: "파견법 제6조의2에 따라 2년 초과 파견근로자는 사용사업주가 직접고용해야 해요. 거부 시 3천만원 과태료, 직접고용 요구 절차를 안내해요.",
    type: "article",
  },
  alternates: { canonical: "/w/파견근로자-기간-제한" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
