import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "머니위키(jjyu.co.kr) 이용약관입니다. 콘텐츠의 성격, 책임 한계, 저작권 정책을 안내합니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-14 text-[#3C424A]">
      <h1 className="text-3xl font-extrabold text-[#1A1D21]">이용약관</h1>
      <p className="mt-2 text-sm text-[#6C727B]">시행일: 2026-08-12</p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">1. 서비스의 성격</h2>
      <p className="mt-4 leading-7">
        머니위키는 경제·금융·법률 관련 일반 정보를 제공하는 사이트입니다. 게재된 내용은
        법률·세무·투자 자문이 아니며, 개별 사안에 대한 판단은 관할 기관 또는 전문가의
        확인을 거쳐야 합니다.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">2. 책임의 한계</h2>
      <p className="mt-4 leading-7">
        모든 문서는 작성 시점의 공식 출처를 기준으로 하나, 제도 변경·개정으로 실제와 다를
        수 있습니다. 사이트 이용으로 발생한 손해에 대해 머니위키는 법적 책임을 지지
        않습니다. 계산기 결과는 참고용 추정치입니다.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">3. 저작권</h2>
      <p className="mt-4 leading-7">
        머니위키의 문서와 계산기는 머니위키에 저작권이 있습니다. 출처(링크)를 표기한 부분
        인용은 허용하며, 전문 복제·재게시는 금지합니다. 인용된 법령·고시 원문의 저작권은
        해당 기관에 있습니다.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">4. 문의</h2>
      <p className="mt-4 leading-7">약관 관련 문의: 33han58@gmail.com</p>
    </main>
  );
}
