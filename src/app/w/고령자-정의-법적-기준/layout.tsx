import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고령자 정의와 법적 기준: 복지 65세, 고용 55세",
  description: "고령자 나이 기준이 법마다 달라요. 노인복지법 65세 이상, 고령자고용촉진법 55세 이상, 준고령자 50세 이상. 나이별 받을 수 있는 혜택 정리.",
  openGraph: {
    title: "고령자 법적 기준: 복지는 65세, 고용 지원은 55세부터",
    description: "법마다 다른 고령자 나이 기준과 나이별 혜택을 정리했어요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
