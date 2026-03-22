import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재건축할 때 주민 의견은 어떻게 반영되나요? 주민 의견 반영 절차와 동의율 | 머니위키",
  description: "재건축은 조합원 75% 이상 동의로 진행돼요. 주민 의견 반영 절차와 반대 시 대응을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재건축-주민-의견반영-절차" },
  openGraph: { title: "재건축할 때 주민 의견은 어떻게 반영되나요? 주민 의견 반영 절차와 동의율 | 머니위키", description: "재건축은 조합원 75% 이상 동의로 진행돼요. 주민 의견 반영 절차와 반대 시 대응을 정리했어요.", url: "https://www.jjyu.co.kr/w/재건축-주민-의견반영-절차", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
