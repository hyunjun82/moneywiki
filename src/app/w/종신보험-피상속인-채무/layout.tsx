import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종신보험 상속 채무: 갚을 수 있나요 | 머니위키",
  description: "부모님 돌아가신 후 빚이 남았는데 종신보험으로 갚을 수 있을까요? 사망보험금으로 채무 변제 가능하고, 상속포기해도 보험금 받을 수 있어요. 방법과 조건을 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/종신보험-피상속인-채무" },
  openGraph: { title: "종신보험 상속 채무: 갚을 수 있나요", description: "부모님 돌아가신 후 빚이 남았는데 종신보험으로 갚을 수 있을까요? 사망보험금으로 채무 변제 가능하고, 상속포기해도 보험금 받을 수 있어요. 방법", url: "https://www.jjyu.co.kr/w/종신보험-피상속인-채무", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
