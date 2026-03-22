import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자손 자상 중복: 동시 가입 되나요 | 머니위키",
  description: "자손과 자상을 둘 다 가입하면 보상을 2배로 받을 수 있을까요? 두 보장은 중복 가입이 불가능해요. 둘 중 하나만 선택해야 하는 이유를 알려드려요",
  openGraph: { title: "자손 자상 중복: 동시 가입 되나요", description: "자손과 자상을 둘 다 가입하면 보상을 2배로 받을 수 있을까요? 두 보장은 중복 가입이 불가능해요. 둘 중 하나만 선택해야 하는 이유를 알려드려요", url: "https://jjyu.co.kr/w/자손-자상-동시-가입" },
  alternates: { canonical: "https://jjyu.co.kr/w/자손-자상-동시-가입" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
