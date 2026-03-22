import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 위탁관리회사, 어떻게 뽑나요? 선정 절차와 입주자 동의 | 머니위키",
  description: "아파트 관리회사 선정은 전자입찰이 원칙이에요. K-apt 공고, 입주자 과반수 동의, 감사 참관권 보장 등 절차를 순서대로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/위탁관리회사-선정" },
  openGraph: {
    title: "아파트 위탁관리회사, 어떻게 뽑나요? 선정 절차와 입주자 동의 | 머니위키",
    description: "아파트 관리회사 선정은 전자입찰이 원칙이에요. K-apt 공고, 입주자 과반수 동의, 감사 참관권 보장 등 절차를 순서대로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/위탁관리회사-선정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
