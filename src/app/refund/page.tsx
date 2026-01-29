import { Metadata } from 'next';
import Link from 'next/link';

// Pure SSG - CPU 0%
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '미환급금 조회 - 국세·건보·연금 환급금 바로 찾기',
  description: '정부24 기준 7가지 환급금을 한번에 조회하세요. 국세, 지방세, 건강보험, 국민연금, 통신 환급금까지. 평균 15만원, 30초면 확인 가능해요.',
  keywords: ['미환급금 조회', '환급금 찾기', '국세환급금', '건강보험 환급금', '정부24'],
};

export default function RefundHubPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300">정부24 공식 서비스 연동</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              내 이름으로 쌓인
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                숨은 환급금
              </span>
              을 찾으세요
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              5년 지나면 국가로 귀속되는 세금·보험료 환급금.
              <br className="hidden md:block" />
              지금 바로 조회하고 돌려받으세요.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">15만원</div>
                <div className="text-sm text-gray-500 mt-1">1인당 평균</div>
              </div>
              <div className="w-px h-12 bg-gray-700 hidden md:block" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">30초</div>
                <div className="text-sm text-gray-500 mt-1">조회 시간</div>
              </div>
              <div className="w-px h-12 bg-gray-700 hidden md:block" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">7가지</div>
                <div className="text-sm text-gray-500 mt-1">환급금 종류</div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://www.gov.kr/portal/service/serviceInfo/174100000054"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-white/25"
            >
              무료로 조회하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <p className="text-sm text-gray-500 mt-4">
              공동인증서 또는 간편인증으로 본인확인
            </p>
          </div>
        </div>
      </section>

      {/* What */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              어떤 환급금을 찾을 수 있나요?
            </h2>
            <p className="text-gray-600 text-lg">
              대부분의 사람들이 모르고 있는 7가지 환급금
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '국세 환급금', desc: '종합소득세·부가세 과납분', avg: '15만원', site: '홈택스' },
              { title: '지방세 환급금', desc: '재산세·자동차세 과납분', avg: '5만원', site: '위택스' },
              { title: '건강보험료', desc: '보험료 이중납부·과오납', avg: '8만원', site: '건보공단' },
              { title: '국민연금', desc: '연금보험료 과다납부', avg: '10만원', site: '연금공단' },
              { title: '법원 보관금', desc: '소송 후 미수령 송달료', avg: '3만원', site: '대법원' },
              { title: '통신 환급금', desc: '해지 후 미정산 요금', avg: '1만원', site: '통신사' },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {item.site}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{item.avg}</span>
                  <span className="text-sm text-gray-500">평균 환급액</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              3단계로 간단하게
            </h2>
            <p className="text-gray-600 text-lg">
              복잡한 절차 없이 빠르게 확인하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: '본인인증', desc: '공동인증서 또는 카카오·네이버 간편인증' },
              { step: '02', title: '통합조회', desc: '7가지 환급금을 한 화면에서 확인' },
              { step: '03', title: '환급신청', desc: '계좌 입력 후 즉시 신청 완료' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-amber-900 text-xl mb-2">
                5년이 지나면 영영 받을 수 없어요
              </h3>
              <p className="text-amber-800">
                환급 청구권은 발생일로부터 5년이 지나면 소멸됩니다.
                소멸된 환급금은 국고로 귀속되어 본인이 청구할 수 없게 됩니다.
                지금 바로 조회해서 내 돈을 찾아가세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="text-center">
              <div className="font-semibold text-gray-700">정부24</div>
              <div className="text-xs text-gray-500">공식 연동</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">홈택스</div>
              <div className="text-xs text-gray-500">국세청</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">건보공단</div>
              <div className="text-xs text-gray-500">건강보험</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">연금공단</div>
              <div className="text-xs text-gray-500">국민연금</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0F172A] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            내 환급금, 지금 확인하세요
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            조회는 무료이고, 30초면 끝납니다
          </p>
          <a
            href="https://www.gov.kr/portal/service/serviceInfo/174100000054"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
          >
            정부24에서 조회하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          {/* Contact */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm mb-4">문의가 필요하신가요?</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="text-gray-400">정부24 <strong className="text-white">110</strong></span>
              <span className="text-gray-400">국세청 <strong className="text-white">126</strong></span>
              <span className="text-gray-400">건보공단 <strong className="text-white">1577-1000</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-gray-600">환급금 조회 끝났나요?</span>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/category/정부지원금"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                2026년 정부지원금 보기
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/w/연말정산"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                연말정산 가이드
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
