import { Metadata } from "next";

export const metadata: Metadata = {
  title: "햇살론유스 자격·한도·신청 방법 | 청년 저금리 대출",
  description: "만 19~34세 청년 대상 햇살론유스. 연소득 3,500만원 이하, 최대 1,200만원 한도, 최저 연 2%~5% 금리. 신용불량도 신청 가능. 자격 확인 후 1397이나 서민금융 잇다 앱으로 신청하세요.",
  openGraph: {
    title: "햇살론유스 자격·한도·신청 방법",
    description: "청년을 위한 저금리 대출. 신용 불량이어도 신청 가능. 최저 2%부터 시작해요.",
    type: "article",
    url: "https://jjyu.co.kr/w/햇살론유스-자격-한도-신청",
  },
  keywords: ["햇살론유스", "청년대출", "서민금융", "저금리대출", "신용불량대출"],
};

export const generateStaticParams = () => [{}];
export const revalidate = 3600; // 1시간

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
