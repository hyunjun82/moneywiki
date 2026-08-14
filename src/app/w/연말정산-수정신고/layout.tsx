import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 공제 빠뜨렸다면? 수정신고와 경정청구 방법",
  description: "연말정산 후 공제를 빠뜨렸으면 경정청구로 5년 이내 환급받을 수 있어요. 잘못 공제받았으면 수정신고로 추가 납부하고 가산세를 줄이세요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-수정신고",
  },
  openGraph: {
    title: "연말정산 공제 빠뜨렸다면? 수정신고와 경정청구 방법",
    description: "경정청구로 환급, 수정신고로 추가 납부. 홈택스에서 5년 이내 직접 신청 가능.",
    url: "https://www.jjyu.co.kr/w/연말정산-수정신고",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
