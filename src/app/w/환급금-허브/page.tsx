import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '미환급금 조회 - 국세·건보·연금 환급금 바로 찾기',
  description: '정부24 기준 7가지 환급금을 한번에 조회하세요. 국세, 지방세, 건강보험, 국민연금, 통신 환급금까지. 평균 15만원, 30초면 확인 가능해요.',
  keywords: ['미환급금 조회', '환급금 찾기', '국세환급금', '건강보험 환급금', '정부24'],
};

// 환급금 종류별 정보
const refundServices = [
  {
    id: 'gov24',
    title: '정부24 통합조회',
    description: '7가지 환급금 한번에 확인',
    url: 'https://www.gov.kr/portal/service/serviceInfo/174100000054',
    badge: '추천',
    badgeColor: 'bg-red-500',
    buttonText: '바로 조회하기',
    icon: '🏛️',
    highlight: true,
  },
  {
    id: 'nts',
    title: '국세 환급금',
    description: '종합소득세·부가세·양도세',
    url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=41&tm2lIdx=4105010000&tm3lIdx=4105010100',
    badge: '평균 15만원',
    badgeColor: 'bg-blue-500',
    buttonText: '홈택스 조회',
    icon: '💵',
    target: '개인/법인',
  },
  {
    id: 'wetax',
    title: '지방세 환급금',
    description: '재산세·자동차세·취득세',
    url: 'https://www.wetax.go.kr/main/?cmd=LPTIIA0R0',
    badge: '평균 5만원',
    badgeColor: 'bg-green-500',
    buttonText: '위택스 조회',
    icon: '🏠',
    target: '개인/법인',
  },
  {
    id: 'nhis',
    title: '건강보험 환급금',
    description: '보험료 과오납·중복납부',
    url: 'https://www.nhis.or.kr/nhis/minwon/retrieveOlpaplApplList.do',
    badge: '평균 8만원',
    badgeColor: 'bg-teal-500',
    buttonText: '건보공단 조회',
    icon: '🏥',
    target: '개인/법인',
  },
  {
    id: 'nps',
    title: '국민연금 과오납금',
    description: '연금보험료 중복·과다납부',
    url: 'https://www.nps.or.kr/jsppage/info/easy/easy_04_01.jsp',
    badge: '평균 10만원',
    badgeColor: 'bg-purple-500',
    buttonText: '연금공단 조회',
    icon: '👴',
    target: '개인/법인',
  },
  {
    id: 'court',
    title: '법원 보관금·송달료',
    description: '소송 종료 후 남은 금액',
    url: 'https://safemoney.scourt.go.kr/psafe/psafe/prf/selectPsafePrfRetrieve.do',
    badge: '평균 3만원',
    badgeColor: 'bg-gray-500',
    buttonText: '대법원 조회',
    icon: '⚖️',
    target: '개인/법인',
  },
  {
    id: 'telecom',
    title: '통신 미환급금',
    description: '휴대폰·인터넷 해지 환급',
    url: 'https://www.msit.go.kr/web/msipContents/contentsView.do?cateId=mssw311&artId=1388950',
    badge: '평균 1만원',
    badgeColor: 'bg-orange-500',
    buttonText: '조회 안내',
    icon: '📱',
    target: '개인만',
  },
];

// 정보 카드 데이터
const infoCards = [
  {
    icon: '💡',
    title: '왜 조회해야 하나요?',
    content: '과납·중복납부된 세금과 보험료가 내 이름으로 쌓여 있어요. 5년 지나면 국고로 귀속돼서 못 받아요.',
  },
  {
    icon: '📋',
    title: '뭘 받을 수 있나요?',
    content: '국세, 지방세, 건강보험, 국민연금, 법원 보관금, 통신·방송 환급금까지 7가지를 조회할 수 있어요.',
  },
  {
    icon: '⚡',
    title: '어떻게 받나요?',
    content: '정부24에서 본인인증 후 30초면 조회 완료. 환급금 있으면 계좌 입력하고 바로 신청하면 돼요.',
  },
];

export default function RefundHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-3">미환급금 조회</h1>
          <p className="text-blue-100 text-lg">
            국세·건보·연금 환급금을 한번에 찾아보세요
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm">
            <span>✅ 정부24 공식 서비스</span>
            <span>•</span>
            <span>평균 15만원</span>
            <span>•</span>
            <span>30초면 조회</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* 정보 카드 섹션 */}
        <div className="grid gap-4 mb-8">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4"
            >
              <div className="text-3xl">{card.icon}</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 메인 CTA - 정부24 통합조회 */}
        <div className="mb-8">
          <a
            href={refundServices[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{refundServices[0].icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      {refundServices[0].badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">{refundServices[0].title}</h2>
                  <p className="text-blue-200 text-sm">{refundServices[0].description}</p>
                </div>
              </div>
              <div className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
                {refundServices[0].buttonText} →
              </div>
            </div>
          </a>
        </div>

        {/* 구분선 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">또는 개별 조회</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* 개별 환급금 버튼 그리드 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {refundServices.slice(1).map((service) => (
            <a
              key={service.id}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{service.icon}</span>
                <span className={`${service.badgeColor} text-white text-[10px] px-2 py-0.5 rounded-full`}>
                  {service.badge}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">{service.title}</h3>
              <p className="text-gray-500 text-xs mb-3 line-clamp-1">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{service.target}</span>
                <span className="text-blue-600 text-xs font-medium group-hover:translate-x-1 transition-transform">
                  {service.buttonText} →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 주의사항 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
            <span>⚠️</span> 주의사항
          </h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 환급 청구권은 <strong>5년</strong>이 지나면 소멸돼요</li>
            <li>• 본인인증 필수 (가족 대리조회 불가)</li>
            <li>• 사칭 사이트 주의 - gov.kr 주소만 신뢰하세요</li>
          </ul>
        </div>

        {/* 지원금 연결 배너 */}
        <Link
          href="/category/정부지원금"
          className="block bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-emerald-100 mb-1">환급금 조회 끝났나요?</div>
              <div className="text-lg font-bold">🎁 2026년 정부지원금도 확인하세요</div>
              <div className="text-sm text-emerald-200 mt-1">청년·소상공인·주거 지원금 30개+</div>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        {/* 고객센터 정보 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-2">문의가 필요하신가요?</p>
          <div className="flex justify-center gap-4">
            <span>정부24: <strong>110</strong></span>
            <span>국세청: <strong>126</strong></span>
            <span>건보공단: <strong>1577-1000</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
