export const dynamic = "force-static";

export const metadata = {
  title: "실업급여 부정수급 반환 및 징수 기준 | 자진신고 면제 조건까지",
  description: "부정수급 적발 시 단독이면 최대 2배, 사업주 공모면 최대 5배 추가 징수돼요. 적발 전 자진신고하면 추가 징수가 면제되고 전액 반환만 하면 돼요.",
  openGraph: {
    title: "실업급여 부정수급 반환 및 징수 기준 | 자진신고 면제 조건까지",
    description: "부정수급 적발 시 단독이면 최대 2배, 사업주 공모면 최대 5배 추가 징수돼요. 적발 전 자진신고하면 추가 징수가 면제되고 전액 반환만 하면 돼요.",
    type: "article",
  },
  alternates: {
    canonical: "/w/실업급여-부정수급-반환-및-징수-기준",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
