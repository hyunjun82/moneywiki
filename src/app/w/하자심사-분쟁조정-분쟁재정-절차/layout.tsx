import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "하자심사 분쟁조정 분쟁재정 절차 | 머니위키",
  description: "아파트 하자보수 분쟁이 생겼을 때 하자심사, 분쟁조정, 분쟁재정 중 어떤 절차를 밟아야 하는지 궁금하시죠?",
  alternates: { canonical: "https://www.jjyu.co.kr/w/하자심사-분쟁조정-분쟁재정-절차" },
  openGraph: {
    title: "하자심사 분쟁조정 분쟁재정 절차",
    description: "아파트 하자보수 분쟁이 생겼을 때 하자심사, 분쟁조정, 분쟁재정 중 어떤 절차를 밟아야 하는지 궁금하시죠?",
    url: "https://www.jjyu.co.kr/w/하자심사-분쟁조정-분쟁재정-절차",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
