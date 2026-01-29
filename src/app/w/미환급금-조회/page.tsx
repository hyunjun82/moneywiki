import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '미환급금 조회 - 숨은 환급금 찾기',
  description: '정부24에서 7가지 환급금을 한번에 조회하세요. 국세, 지방세, 건강보험, 국민연금 환급금. 평균 15만원.',
  keywords: ['미환급금 조회', '환급금 찾기', '국세환급금', '건강보험 환급금', '정부24'],
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            정부24 공식 서비스
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            내 이름으로 쌓인
            <br />
            <span className="text-blue-600">숨은 환급금</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10">
            세금, 보험료를 더 냈는데 모르고 계셨나요?
            <br />
            <strong className="text-slate-900">5년이 지나면 국고로 귀속</strong>됩니다.
          </p>

          {/* CTA */}
          <a
            href="https://www.gov.kr/mw/AA040OfferMainFrm.do?capp_biz_cd=PG4CADM4005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            내 환급금 조회하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <p className="text-sm text-slate-500 mt-4">
            무료 · 30초 · 본인인증 필요
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900">15만원</div>
              <div className="text-sm text-slate-500 mt-1">1인당 평균</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900">30초</div>
              <div className="text-sm text-slate-500 mt-1">조회 시간</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900">7종</div>
              <div className="text-sm text-slate-500 mt-1">환급금 종류</div>
            </div>
          </div>
        </div>
      </section>

      {/* What */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            어떤 환급금을 찾을 수 있나요?
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: '국세 환급금', desc: '종합소득세, 부가세, 양도세 과납분' },
              { name: '지방세 환급금', desc: '재산세, 자동차세, 취득세 과납분' },
              { name: '건강보험료', desc: '보험료 과오납, 본인부담상한액 초과금' },
              { name: '국민연금', desc: '연금보험료 과다납부분' },
              { name: '법원 보관금', desc: '소송 후 미수령 송달료' },
              { name: '통신/방송', desc: '해지 후 미정산 요금' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            조회 방법
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {[
              { step: '1', title: '본인인증', desc: '공동인증서 또는 간편인증' },
              { step: '2', title: '통합조회', desc: '7가지 환급금 한번에' },
              { step: '3', title: '환급신청', desc: '계좌 입력 후 신청' },
            ].map((item, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <div className="font-semibold text-slate-900 mb-1">{item.title}</div>
                <div className="text-sm text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="https://www.gov.kr/mw/AA040OfferMainFrm.do?capp_biz_cd=PG4CADM4005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              정부24에서 조회하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-amber-900 mb-2">5년 소멸시효</div>
                <p className="text-amber-800 text-sm">
                  환급 청구권은 발생일로부터 <strong>5년</strong>이 지나면 소멸됩니다.
                  소멸된 환급금은 국고로 귀속되어 돌려받을 수 없습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <span>정부24</span>
            <span>홈택스</span>
            <span>위택스</span>
            <span>건강보험공단</span>
            <span>국민연금공단</span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-sm text-slate-500 mb-3">문의</div>
          <div className="flex justify-center gap-8 text-slate-700">
            <span>정부24 <strong>1588-2188</strong></span>
            <span>정부민원 <strong>110</strong></span>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-2xl mx-auto">
          <div className="text-sm text-slate-500 mb-4 text-center">관련 정보</div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/category/정부지원금"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
            >
              정부지원금
            </Link>
            <Link
              href="/w/연말정산"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
            >
              연말정산
            </Link>
            <Link
              href="/w/종합소득세-신고-대상"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
            >
              종합소득세
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
