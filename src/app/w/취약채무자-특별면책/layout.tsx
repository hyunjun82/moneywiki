import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "취약채무자 특별면책 조건: 5천만원 탕감 신청 | 머니위키",
  description: "기초수급자·중증장애인·고령자라면 빚 90%를 탕감받을 수 있어요. 2026년 1월 30일부터 5천만 원까지 확대됐어요. 자격과 신청 방법을 확인하고 빚 독촉에서 벗어나세요.",
  openGraph: { title: "취약채무자 특별면책 조건: 5천만원 탕감 신청", description: "기초수급자·중증장애인·고령자라면 빚 90%를 탕감받을 수 있어요. 2026년 1월 30일부터 5천만 원까지 확대됐어요. 자격과 신청 방법을 확인하고 빚 독촉에서 벗어나세요.", url: "https://jjyu.co.kr/w/취약채무자-특별면책" },
  alternates: { canonical: "https://jjyu.co.kr/w/취약채무자-특별면책" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
