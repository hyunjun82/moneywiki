import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "오피스텔 임차인 관리인 선임 자격 | 머니위키",
  description: "오피스텔에 거주하는 임차인이 관리인 선임을 위한 관리단 집회에서 관리인이 될 수 있는지 알아봐요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/오피스텔-임차인-관리인-자격" },
  openGraph: {
    title: "오피스텔 임차인 관리인 선임 자격",
    description: "오피스텔에 거주하는 임차인이 관리인 선임을 위한 관리단 집회에서 관리인이 될 수 있는지 알아봐요.",
    url: "https://www.jjyu.co.kr/w/오피스텔-임차인-관리인-자격",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
