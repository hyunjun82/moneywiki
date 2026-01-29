import { Metadata } from 'next';
import Link from 'next/link';

// Pure SSG - CPU 0%
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '미환급금 조회 - 국세·건보·연금 환급금 바로 찾기',
  description: '정부24에서 7가지 환급금을 한번에 조회하세요. 국세, 지방세, 건강보험, 국민연금, 통신 환급금까지. 평균 15만원, 30초면 확인.',
  keywords: ['미환급금 조회', '환급금 찾기', '국세환급금', '건강보험 환급금', '정부24'],
};

export default function RefundHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            미환급금 찾기
          </h1>
          <p className="text-lg text-gray-600">
            내 이름으로 쌓인 환급금, 5년 지나면 못 받아요.
          </p>
        </header>

        {/* Stats */}
        <div className="flex gap-8 mb-12 pb-12 border-b border-gray-200">
          <div>
            <div className="text-3xl font-bold text-gray-900">15만원</div>
            <div className="text-sm text-gray-500">1인당 평균</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">30초</div>
            <div className="text-sm text-gray-500">조회 시간</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">7종류</div>
            <div className="text-sm text-gray-500">환급금 종류</div>
          </div>
        </div>

        {/* Main Content */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            어떤 환급금을 찾을 수 있나요?
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-gray-900">국세 환급금</strong>
                <span className="text-gray-600"> - 종합소득세, 부가세, 양도세 과납분</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-gray-900">지방세 환급금</strong>
                <span className="text-gray-600"> - 재산세, 자동차세, 취득세 과납분</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-gray-900">건강보험료</strong>
                <span className="text-gray-600"> - 보험료 과오납, 본인부담상한액 초과금</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">4</span>
              <div>
                <strong className="text-gray-900">국민연금</strong>
                <span className="text-gray-600"> - 연금보험료 과다납부분</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">5</span>
              <div>
                <strong className="text-gray-900">법원 보관금</strong>
                <span className="text-gray-600"> - 소송 후 미수령 송달료</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">6</span>
              <div>
                <strong className="text-gray-900">유료방송</strong>
                <span className="text-gray-600"> - 케이블, IPTV 미환급금</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">7</span>
              <div>
                <strong className="text-gray-900">통신 환급금</strong>
                <span className="text-gray-600"> - 휴대폰, 인터넷 해지 미정산금</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Buttons - 고용노동부 스타일 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            조회하기
          </h2>

          <div className="space-y-4">
            {/* 정부24 통합조회 - 메인 CTA */}
            <a
              href="https://www.gov.kr/mw/AA040OfferMainFrm.do?capp_biz_cd=PG4CADM4005"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-6 py-4 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-50 transition-colors group"
            >
              <span className="font-medium text-gray-900">정부24 통합조회 (7가지 한번에)</span>
              <span className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            {/* 정부24 서비스 안내 */}
            <a
              href="https://www.gov.kr/portal/service/serviceInfo/174100000054"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-6 py-4 bg-white border border-gray-300 rounded-full hover:border-gray-400 transition-colors group"
            >
              <span className="text-gray-700">정부24 서비스 안내 페이지</span>
              <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
        </section>

        {/* Notice */}
        <section className="mb-12 p-6 bg-gray-50 rounded-2xl">
          <h3 className="font-bold text-gray-900 mb-4">알아두세요</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span>환급 청구권은 <strong className="text-gray-900">5년</strong>이 지나면 소멸됩니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span>본인인증이 필요합니다. (공동인증서 또는 간편인증)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">•</span>
              <span>조회 및 신청은 <strong className="text-gray-900">무료</strong>입니다.</span>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mb-12 pb-12 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">문의</h3>
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div>
              <span className="text-gray-500">정부24</span>
              <strong className="ml-2 text-gray-900">1588-2188</strong>
            </div>
            <div>
              <span className="text-gray-500">정부민원</span>
              <strong className="ml-2 text-gray-900">110</strong>
            </div>
          </div>
        </section>

        {/* Related */}
        <section>
          <h3 className="font-bold text-gray-900 mb-4">관련 정보</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/category/정부지원금"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              2026년 정부지원금
            </Link>
            <Link
              href="/w/연말정산"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              연말정산 가이드
            </Link>
            <Link
              href="/w/종합소득세-신고-대상"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              종합소득세 신고
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
