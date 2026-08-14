import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "머니위키(jjyu.co.kr)의 개인정보처리방침입니다. 수집 항목, 쿠키·광고(Google AdSense)·분석 도구 사용 내역을 안내합니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-14 text-[#3C424A]">
      <h1 className="text-3xl font-extrabold text-[#1A1D21]">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-[#6C727B]">시행일: 2026-08-12</p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">1. 수집하는 개인정보</h2>
      <p className="mt-4 leading-7">
        머니위키는 회원가입 없이 이용하는 정보 사이트로, 이름·연락처 등 개인정보를 직접
        수집하지 않습니다. 이메일 문의 시 회신 목적으로만 이메일 주소를 이용하며 별도로
        보관하지 않습니다.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">2. 쿠키 및 광고</h2>
      <p className="mt-4 leading-7">
        본 사이트는 Google AdSense 광고를 게재합니다. Google을 포함한 제3자 광고 사업자는
        쿠키를 사용하여 이용자의 이전 방문 기록을 바탕으로 광고를 게재할 수 있습니다.
        이용자는{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline">
          Google 광고 설정
        </a>
        에서 맞춤 광고를 해제할 수 있습니다.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">3. 웹 분석 도구</h2>
      <p className="mt-4 leading-7">
        서비스 개선을 위해 방문 통계 도구(Microsoft Clarity, 웹 애널리틱스 등)를 사용할 수
        있습니다. 이 도구들은 비식별 정보(방문 페이지, 기기 유형 등)만을 수집합니다.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#1A1D21]">4. 개인정보 보호 문의</h2>
      <p className="mt-4 leading-7">개인정보 관련 문의: 33han58@gmail.com</p>

      <p className="mt-10 leading-7 text-sm text-[#6C727B]">
        본 방침은 관련 법령 또는 서비스 변경에 따라 개정될 수 있으며, 개정 시 본 페이지에
        게시합니다.
      </p>
    </main>
  );
}
