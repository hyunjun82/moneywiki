import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연차촉진 통보 받았는데, 수당 못 받나? 유효 조건과 대응법",
  description: "회사의 연차촉진이 서면이 아니거나 절차가 빠졌으면 무효예요. 유효 조건과 미사용수당 청구법을 근로기준법 제61조 기준으로 안내해요.",
  openGraph: {
    title: "연차촉진 통보 받았는데, 수당 못 받나? 유효 조건과 대응법",
    description: "회사의 연차촉진이 서면이 아니거나 절차가 빠졌으면 무효예요. 유효 조건과 미사용수당 청구법을 근로기준법 제61조 기준으로 안내해요.",
    type: "article",
  },
  alternates: { canonical: "/w/연차촉진-제도-절차" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
