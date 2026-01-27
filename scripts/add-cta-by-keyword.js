/**
 * 키워드 기반 CTA 자동 추가 스크립트
 *
 * - 외부링크 없는 파일도 키워드로 적절한 공공기관 링크 자동 매칭
 * - 계산기 파일 제외
 * - frontmatter 없는 파일 스킵
 */

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

// 키워드 → CTA 매핑 (딥링크 - 실제 서비스 페이지로 바로 연결)
const KEYWORD_CTA_MAP = [
  // 실업급여/고용보험 - 실업급여 인터넷 신청 페이지
  {
    keywords: ['실업급여', '고용보험', '구직급여', '취업지원'],
    cta: {
      url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do',
      badge: '고용보험 공식',
      text: '실업급여 인터넷 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 퇴직금/퇴직연금 - 퇴직연금 적립금 조회
  {
    keywords: ['퇴직금', '퇴직연금', 'IRP', 'DB형', 'DC형'],
    cta: {
      url: 'https://100lifeplan.fss.or.kr/retire/retireInfo.do',
      badge: '금감원 통합연금포털',
      text: '내 퇴직연금 조회',
      action: '조회하기',
      color: 'green'
    }
  },
  // 연말정산/세금 - 연말정산 간소화 서비스
  {
    keywords: ['연말정산', '세액공제', '소득공제', '원천징수'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3',
      badge: '홈택스 공식',
      text: '연말정산 간소화 서비스',
      action: '바로가기',
      color: 'green'
    }
  },
  // 양도소득세 - 양도소득세 신고
  {
    keywords: ['양도소득세', '양도세', '비과세'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=UTXPPBAA01',
      badge: '홈택스 공식',
      text: '양도소득세 신고하기',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 부동산/임대차 - 임대차계약 신고
  {
    keywords: ['임대차', '전세', '월세', '보증금', '계약갱신', '대항력'],
    cta: {
      url: 'https://www.gov.kr/portal/service/serviceInfo/PTR000050545',
      badge: '정부24 공식',
      text: '임대차계약 신고하기',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 청약/주택 - 청약홈 청약신청
  {
    keywords: ['청약', '분양', '아파트', '주택'],
    cta: {
      url: 'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do',
      badge: '청약홈 공식',
      text: '아파트 청약 신청',
      action: '신청하기',
      color: 'dark'
    }
  },
  // 경매 - 법원경매 물건검색
  {
    keywords: ['경매', '낙찰', '입찰'],
    cta: {
      url: 'https://www.courtauction.go.kr/RetrieveRealEstMulDetailList.laf',
      badge: '대법원 공식',
      text: '경매 물건 검색',
      action: '검색하기',
      color: 'dark'
    }
  },
  // 국민연금 - 내 연금 알아보기
  {
    keywords: ['국민연금', '노령연금', '유족연금'],
    cta: {
      url: 'https://www.nps.or.kr/jsppage/cyber/confirm/npspension.jsp',
      badge: '국민연금 공식',
      text: '내 연금 조회하기',
      action: '조회하기',
      color: 'green'
    }
  },
  // 건강보험 - 보험료 조회
  {
    keywords: ['건강보험', '의료보험', '건보료'],
    cta: {
      url: 'https://www.nhis.or.kr/nhis/minwon/retrievePaymentInfoExam.do',
      badge: '건강보험 공식',
      text: '건강보험료 조회',
      action: '조회하기',
      color: 'green'
    }
  },
  // 4대보험 - 가입내역 조회
  {
    keywords: ['4대보험', '사대보험', '사회보험'],
    cta: {
      url: 'https://www.4insure.or.kr/ins4/ptl/data/calc/forwardInsuFeeMock.do',
      badge: '4대보험 공식',
      text: '4대보험료 모의계산',
      action: '계산하기',
      color: 'green'
    }
  },
  // 근로기준법/노동 - 고용노동부 민원신청
  {
    keywords: ['근로기준법', '야근', '휴일', '연장근로', '휴가', '연차', '근로계약', '해고', '임금'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '노동 민원 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 가압류/법률 - 나의 사건검색
  {
    keywords: ['가압류', '압류', '가처분', '강제집행', '소송'],
    cta: {
      url: 'https://www.scourt.go.kr/portal/information/events/search/search.jsp',
      badge: '대법원 공식',
      text: '나의 사건 검색',
      action: '검색하기',
      color: 'dark'
    }
  },
  // 복지/지원금 - 복지서비스 모아보기
  {
    keywords: ['지원금', '수당', '급여', '복지', '바우처', '부모급여', '아동수당'],
    cta: {
      url: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do',
      badge: '복지로 공식',
      text: '나에게 맞는 복지 찾기',
      action: '찾기',
      color: 'green'
    }
  },
  // 출산/육아 - 육아휴직급여 신청
  {
    keywords: ['출산', '육아', '육아휴직', '출산휴가', '배우자출산'],
    cta: {
      url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do',
      badge: '고용보험 공식',
      text: '육아휴직급여 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 창업/법인 - 법인설립 원스톱
  {
    keywords: ['창업', '법인', '사업자', '개인사업'],
    cta: {
      url: 'https://www.startbiz.go.kr/lnka/selectOSSStep1.do',
      badge: '정부 공식',
      text: '온라인 법인설립 신청',
      action: '신청하기',
      color: 'dark'
    }
  },
  // 등기/부동산 - 등기부등본 발급
  {
    keywords: ['등기', '소유권', '등기부등본'],
    cta: {
      url: 'https://www.iros.go.kr/pos1/pfrontservlet?cmd=PIMIP001M01&a=PSJ',
      badge: '인터넷등기소',
      text: '등기부등본 열람/발급',
      action: '발급하기',
      color: 'dark'
    }
  },
  // 대출/금융 - 대출금리 비교
  {
    keywords: ['대출', 'DSR', 'DTI', 'LTV', '금리'],
    cta: {
      url: 'https://finlife.fss.or.kr/finlife/ldng/ldngPrdtList.do?menuNo=700020',
      badge: '금융감독원 공식',
      text: '대출상품 금리비교',
      action: '비교하기',
      color: 'dark'
    }
  },
  // 환급금 - 미환급금 조회 (정부24 딥링크)
  {
    keywords: ['환급', '미환급', '숨은돈'],
    cta: {
      url: 'https://www.gov.kr/portal/service/serviceInfo/174100000054',
      badge: '정부24 공식',
      text: '미환급금 조회/신청',
      action: '조회하기',
      color: 'green'
    }
  },
  // 신용/카드 - 신용점수 조회
  {
    keywords: ['신용카드', '신용점수', '신용등급', '카드발급', '카드거부', '체크카드'],
    cta: {
      url: 'https://www.credit.co.kr/cb/man/CBICC0101M.nhpe',
      badge: '무료 조회',
      text: '내 신용점수 확인하기',
      action: '조회하기',
      color: 'dark'
    }
  },
  // 종합소득세 - 홈택스 신고
  {
    keywords: ['종합소득세', '종소세', '사업소득', '프리랜서세금'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=UTXPPBAA52',
      badge: '홈택스 공식',
      text: '종합소득세 신고하기',
      action: '신고하기',
      color: 'green'
    }
  },
  // 증여세/상속세
  {
    keywords: ['증여세', '상속세', '증여', '상속'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=UTXPPBAA40',
      badge: '홈택스 공식',
      text: '증여세 신고하기',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 취득세/재산세
  {
    keywords: ['취득세', '재산세', '부동산세금'],
    cta: {
      url: 'https://www.wetax.go.kr/main/',
      badge: '위택스 공식',
      text: '지방세 납부하기',
      action: '납부하기',
      color: 'dark'
    }
  },
  // 건강검진
  {
    keywords: ['건강검진', '무료검진', '국가검진'],
    cta: {
      url: 'https://www.nhis.or.kr/nhis/healthin/wbhaca04700m01.do',
      badge: '건강보험 공식',
      text: '건강검진 대상자 조회',
      action: '조회하기',
      color: 'green'
    }
  },
  // 공무원연금
  {
    keywords: ['공무원연금', '군인연금', '사학연금'],
    cta: {
      url: 'https://www.geps.or.kr/g/index.do',
      badge: '공무원연금 공식',
      text: '연금정보 조회',
      action: '조회하기',
      color: 'dark'
    }
  },
  // 자동차세/자동차등록
  {
    keywords: ['자동차세', '자동차등록', '자동차취득세'],
    cta: {
      url: 'https://www.wetax.go.kr/main/',
      badge: '위택스 공식',
      text: '자동차세 납부하기',
      action: '납부하기',
      color: 'dark'
    }
  },
  // 근로장려금/자녀장려금
  {
    keywords: ['근로장려금', '자녀장려금', 'EITC'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=UTXPPBAA70',
      badge: '홈택스 공식',
      text: '근로장려금 신청하기',
      action: '신청하기',
      color: 'green'
    }
  },
  // 의료비/진료비
  {
    keywords: ['의료비', '진료비', '병원비', '본인부담금'],
    cta: {
      url: 'https://www.nhis.or.kr/nhis/minwon/retrievePaymentInfoExam.do',
      badge: '건강보험 공식',
      text: '의료비 내역 조회',
      action: '조회하기',
      color: 'green'
    }
  },
  // 주민등록
  {
    keywords: ['주민등록', '전입신고', '주소이전'],
    cta: {
      url: 'https://www.gov.kr/portal/service/serviceInfo/551000000016',
      badge: '정부24 공식',
      text: '전입신고 하기',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 묵시적갱신/확정일자/우선변제권
  {
    keywords: ['묵시적갱신', '확정일자', '우선변제권', '소액임차인', '임차인', '임대인', '권리금', '원상복구', '무단전대', '집주인'],
    cta: {
      url: 'https://www.gov.kr/portal/service/serviceInfo/PTR000050545',
      badge: '정부24 공식',
      text: '임대차계약 신고하기',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 산재보험/산재보상
  {
    keywords: ['산재보험', '산재보상', '산재처리', '산업재해', '요양급여'],
    cta: {
      url: 'https://www.comwel.or.kr/comwel/paym/insu/insu1.jsp',
      badge: '근로복지공단 공식',
      text: '산재보험 급여 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 요양보호사/장기요양
  {
    keywords: ['요양보호사', '장기요양', '노인장기요양'],
    cta: {
      url: 'https://www.longtermcare.or.kr/npbs/e/b/101/npeb101m01.web?menuId=npe0000000030',
      badge: '장기요양 공식',
      text: '장기요양 등급 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 기초연금
  {
    keywords: ['기초연금', '노인복지', '경로연금'],
    cta: {
      url: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do',
      badge: '복지로 공식',
      text: '기초연금 자격 조회',
      action: '조회하기',
      color: 'green'
    }
  },
  // 고령자 고용
  {
    keywords: ['고령자', '60세', '시니어'],
    cta: {
      url: 'https://www.work.go.kr/senior/main.do',
      badge: '워크넷 공식',
      text: '고령자 일자리 찾기',
      action: '찾기',
      color: 'green'
    }
  },
  // 노동위원회/근로감독관
  {
    keywords: ['노동위원회', '근로감독관', '징계', '체불임금', '노동조합', '단체협약', '취업규칙', '사직서', '경업금지', '전직금지', '비밀유지'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '노동 민원 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 부가가치세
  {
    keywords: ['부가가치세', '부가세', '원천징수영수증'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml',
      badge: '홈택스 공식',
      text: '홈택스 세금신고',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 지방소득세/주민세
  {
    keywords: ['지방소득세', '주민세', '지방세'],
    cta: {
      url: 'https://www.wetax.go.kr/main/',
      badge: '위택스 공식',
      text: '지방세 납부하기',
      action: '납부하기',
      color: 'dark'
    }
  },
  // 배당/이자소득세
  {
    keywords: ['배당소득세', '이자소득', '금융소득', '금융투자소득세'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml',
      badge: '홈택스 공식',
      text: '금융소득 세금신고',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 가상자산/해외주식
  {
    keywords: ['가상자산', '해외주식', '암호화폐', '비트코인'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml',
      badge: '홈택스 공식',
      text: '가상자산 세금신고',
      action: '신고하기',
      color: 'dark'
    }
  },
  // ETF/MMF/CMA 투자
  {
    keywords: ['ETF', 'MMF', 'CMA', '펀드', '투자', '수익률'],
    cta: {
      url: 'https://finlife.fss.or.kr/finlife/main/main.do?menuNo=700001',
      badge: '금융감독원 공식',
      text: '금융상품 비교하기',
      action: '비교하기',
      color: 'dark'
    }
  },
  // 문화누리카드
  {
    keywords: ['문화누리카드', '문화바우처'],
    cta: {
      url: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do',
      badge: '복지로 공식',
      text: '문화누리카드 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 청년도약계좌
  {
    keywords: ['청년도약계좌', '청년저축', '청년희망적금'],
    cta: {
      url: 'https://ylaccount.kinfa.or.kr/',
      badge: '서민금융 공식',
      text: '청년도약계좌 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 특별공급/재개발
  {
    keywords: ['특별공급', '재개발', '재건축'],
    cta: {
      url: 'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do',
      badge: '청약홈 공식',
      text: '청약 신청하기',
      action: '신청하기',
      color: 'dark'
    }
  },
  // 연봉협상/경력증명서
  {
    keywords: ['연봉협상', '경력증명서', '근로자대표', '근로자의날'],
    cta: {
      url: 'https://www.moel.go.kr/info/lawinfo/instruction/instrucList.do',
      badge: '고용노동부 공식',
      text: '근로기준 안내',
      action: '확인하기',
      color: 'dark'
    }
  },
  // OTP/보안카드/공동인증서
  {
    keywords: ['OTP', '보안카드', '공동인증서', '인증서'],
    cta: {
      url: 'https://www.yessign.or.kr/',
      badge: '금융결제원 공식',
      text: '공동인증서 발급',
      action: '발급하기',
      color: 'dark'
    }
  },
  // 파견근로자/플랫폼노동자
  {
    keywords: ['파견근로자', '파견직', '플랫폼노동자', '배달앱', '플랫폼'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '노동 권익 상담',
      action: '상담하기',
      color: 'green'
    }
  },
  // 장애인 고용
  {
    keywords: ['장애인고용', '장애인의무고용', '장애인직업훈련'],
    cta: {
      url: 'https://www.kead.or.kr/',
      badge: '장애인고용공단',
      text: '장애인 취업 지원',
      action: '신청하기',
      color: 'green'
    }
  },
  // 세무조사
  {
    keywords: ['세무조사', '국세청'],
    cta: {
      url: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2377&cntntsId=7751',
      badge: '국세청 공식',
      text: '납세자 권리헌장',
      action: '확인하기',
      color: 'dark'
    }
  },
  // 가족요양비
  {
    keywords: ['가족요양비', '가족돌봄'],
    cta: {
      url: 'https://www.longtermcare.or.kr/',
      badge: '장기요양 공식',
      text: '가족요양비 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 직장내 괴롭힘
  {
    keywords: ['직장내괴롭힘', '성희롱', '폭언', '갑질', '고객폭언', '고객성희롱'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '직장 내 괴롭힘 신고',
      action: '신고하기',
      color: 'green'
    }
  },
  // 기부금공제/교육비공제/부양가족공제
  {
    keywords: ['기부금공제', '교육비공제', '부양가족공제', '인적공제'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3',
      badge: '홈택스 공식',
      text: '연말정산 간소화 서비스',
      action: '바로가기',
      color: 'green'
    }
  },
  // 마이너스통장/할부이자
  {
    keywords: ['마이너스통장', '마통', '할부이자'],
    cta: {
      url: 'https://finlife.fss.or.kr/finlife/ldng/ldngPrdtList.do?menuNo=700020',
      badge: '금융감독원 공식',
      text: '대출상품 금리비교',
      action: '비교하기',
      color: 'dark'
    }
  },
  // 고속도로통행료/KTX환불
  {
    keywords: ['고속도로', '통행료', 'KTX', 'SRT', '승차권'],
    cta: {
      url: 'https://www.letskorail.com/',
      badge: '코레일 공식',
      text: 'KTX 예매/환불',
      action: '바로가기',
      color: 'dark'
    }
  },
  // 선택근로제/탄력근로제
  {
    keywords: ['선택근로제', '탄력근로제', '유연근무'],
    cta: {
      url: 'https://www.moel.go.kr/info/lawinfo/instruction/instrucList.do',
      badge: '고용노동부 공식',
      text: '근로시간 제도 안내',
      action: '확인하기',
      color: 'dark'
    }
  },
  // 휴대폰소액결제
  {
    keywords: ['소액결제', '휴대폰결제'],
    cta: {
      url: 'https://www.paybooc.co.kr/',
      badge: '결제 안내',
      text: '소액결제 한도 확인',
      action: '확인하기',
      color: 'dark'
    }
  },
  // 가사근로자/가사서비스
  {
    keywords: ['가사근로자', '가사서비스', '입주가사'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '노동 민원 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 청년/취업
  {
    keywords: ['청년취업', '취업연계', '직업훈련'],
    cta: {
      url: 'https://www.work.go.kr/empSpt/empSptMain.do',
      badge: '워크넷 공식',
      text: '취업 지원 프로그램',
      action: '신청하기',
      color: 'green'
    }
  },
  // 쿠팡/온라인쇼핑
  {
    keywords: ['쿠팡', '보상쿠폰', '온라인쇼핑'],
    cta: {
      url: 'https://www.coupang.com/',
      badge: '쿠팡',
      text: '쿠팡 고객센터',
      action: '바로가기',
      color: 'dark'
    }
  },
  // 광역구직활동비
  {
    keywords: ['광역구직활동비', '이주비', '구직활동비'],
    cta: {
      url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do',
      badge: '고용보험 공식',
      text: '구직활동비 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 달라지는 제도/정책 변경
  {
    keywords: ['달라지는', '제도변경', '정책변경', '개정'],
    cta: {
      url: 'https://www.gov.kr/portal/service/serviceList',
      badge: '정부24 공식',
      text: '정부 서비스 전체보기',
      action: '보기',
      color: 'dark'
    }
  },
  // 고객응대근로자/감정노동
  {
    keywords: ['고객응대', '감정노동', '콜센터'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '직장 내 괴롭힘 신고',
      action: '신고하기',
      color: 'green'
    }
  },
  // 마이너스통장/신용대출
  {
    keywords: ['마이너스통장', '마이너스', '신용대출한도'],
    cta: {
      url: 'https://finlife.fss.or.kr/finlife/main/main.do?menuNo=700001',
      badge: '금감원 공식',
      text: '금융상품 비교하기',
      action: '비교하기',
      color: 'dark'
    }
  },
  // 무급휴무/피보험기간
  {
    keywords: ['무급휴무', '피보험기간', '근무일수'],
    cta: {
      url: 'https://www.ei.go.kr/ei/eih/cm/hm/main.do',
      badge: '고용보험 공식',
      text: '고용보험 자격조회',
      action: '조회하기',
      color: 'green'
    }
  },
  // 문화예술인/예술인 복지
  {
    keywords: ['문화예술인', '예술인', '문화예술'],
    cta: {
      url: 'https://www.kawf.kr/',
      badge: '예술인복지재단 공식',
      text: '예술인 복지 안내',
      action: '안내받기',
      color: 'green'
    }
  },
  // 사업장 점거/파업
  {
    keywords: ['사업장점거', '점거', '파업', '쟁의행위'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '노동 민원 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 실업신고/실업인정
  {
    keywords: ['실업신고', '실업인정', '구직급여신청'],
    cta: {
      url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do',
      badge: '고용보험 공식',
      text: '실업급여 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 장애인 의무고용
  {
    keywords: ['장애인의무고용', '의무고용률', '장애인고용'],
    cta: {
      url: 'https://www.kead.or.kr/',
      badge: '한국장애인고용공단 공식',
      text: '장애인 고용 안내',
      action: '안내받기',
      color: 'green'
    }
  },
  // 중소기업 취업자 소득세 감면
  {
    keywords: ['중소기업취업자', '중소기업감면', '소득세감면'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3',
      badge: '홈택스 공식',
      text: '연말정산 간소화 서비스',
      action: '바로가기',
      color: 'dark'
    }
  },
  // 직장내 괴롭힘
  {
    keywords: ['직장내괴롭힘', '괴롭힘', '직장갑질'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '직장 내 괴롭힘 신고',
      action: '신고하기',
      color: 'green'
    }
  }
];

// frontmatter 파싱 (CRLF/LF 둘 다 지원)
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatterRaw: null, body: content };
  return {
    frontmatterRaw: match[1],
    body: content.slice(match[0].length)
  };
}

// CTA 있는지 확인
function hasCta(frontmatterRaw) {
  return frontmatterRaw.includes('cta:');
}

// 파일명/제목에서 키워드 매칭
function findMatchingCta(filename, frontmatterRaw) {
  const titleMatch = frontmatterRaw.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = titleMatch ? titleMatch[1] : '';
  const searchText = (filename + ' ' + title).toLowerCase();

  for (const mapping of KEYWORD_CTA_MAP) {
    for (const keyword of mapping.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return mapping.cta;
      }
    }
  }
  return null;
}

// category 추출
function getCategory(frontmatterRaw) {
  const match = frontmatterRaw.match(/category:\s*["']?([^"'\n]+)["']?/);
  return match ? match[1].trim() : '';
}

// CTA 추가
function addCtaToFrontmatter(content, cta) {
  const { frontmatterRaw, body } = parseFrontmatter(content);
  if (!frontmatterRaw) return null;

  const ctaYaml = `cta:
  - url: "${cta.url}"
    badge: "${cta.badge}"
    text: "${cta.text}"
    action: "${cta.action}"
    color: "${cta.color}"`;

  const newFrontmatter = frontmatterRaw.trim() + '\n' + ctaYaml;
  return `---\n${newFrontmatter}\n---${body}`;
}

// 메인 실행
function main() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  let processed = 0;
  let skipped = 0;
  let noMatch = 0;
  let calculatorSkipped = 0;
  const results = [];

  console.log(`\n📂 총 ${files.length}개 파일 스캔 (키워드 기반)...\n`);

  for (const file of files) {
    // 계산기 파일 제외
    if (file.includes('계산기') || file.includes('calculator')) {
      calculatorSkipped++;
      continue;
    }

    const filePath = path.join(WIKI_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatterRaw, body } = parseFrontmatter(content);

    if (!frontmatterRaw) {
      skipped++;
      continue;
    }

    // 이미 CTA 있으면 스킵
    if (hasCta(frontmatterRaw)) {
      skipped++;
      continue;
    }

    // 키워드 매칭
    const cta = findMatchingCta(file, frontmatterRaw);

    if (!cta) {
      noMatch++;
      continue;
    }

    const newContent = addCtaToFrontmatter(content, cta);

    if (newContent) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      processed++;
      results.push({
        file,
        url: cta.url,
        text: cta.text
      });
      console.log(`✅ ${file}: ${cta.text}`);
    }
  }

  console.log(`\n========== 결과 ==========`);
  console.log(`✅ CTA 추가: ${processed}개`);
  console.log(`⏭️ 이미 있음/frontmatter 없음: ${skipped}개`);
  console.log(`🔢 계산기 제외: ${calculatorSkipped}개`);
  console.log(`❓ 매칭 안됨: ${noMatch}개`);
  console.log(`📊 총: ${files.length}개\n`);

  // 결과 저장
  if (results.length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'cta-keyword-report.json'),
      JSON.stringify(results, null, 2),
      'utf-8'
    );
    console.log(`📄 상세 리포트: scripts/cta-keyword-report.json\n`);
  }
}

main();
