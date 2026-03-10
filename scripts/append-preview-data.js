const fs = require("fs");
const fp = "src/components/forms/FormPreview.tsx";

const addition = `

// ===== 신규 양식 DATA (2026-03-10 추가) =====

export const 급여대장_DATA = [
  { fields: [{ label: "급여 지급 대장", colspan: 7, isHeader: true }] },
  { fields: [{ label: "번호", isHeader: true }, { label: "성명", isHeader: true }, { label: "직급", isHeader: true }, { label: "기본급", isHeader: true }, { label: "수당합계", isHeader: true }, { label: "공제합계", isHeader: true }, { label: "실지급액", isHeader: true }] },
  { fields: [{ placeholder: "1", exampleValue: "1" }, { placeholder: "홍길동", exampleValue: "홍길동" }, { placeholder: "대리", exampleValue: "대리" }, { placeholder: "2,500,000", exampleValue: "2,500,000" }, { placeholder: "300,000", exampleValue: "300,000" }, { placeholder: "180,000", exampleValue: "180,000" }, { placeholder: "2,620,000", exampleValue: "2,620,000" }] },
  { fields: [{ placeholder: "2", exampleValue: "2" }, { placeholder: "김영희", exampleValue: "김영희" }, { placeholder: "사원", exampleValue: "사원" }, { placeholder: "2,200,000", exampleValue: "2,200,000" }, { placeholder: "200,000", exampleValue: "200,000" }, { placeholder: "150,000", exampleValue: "150,000" }, { placeholder: "2,250,000", exampleValue: "2,250,000" }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "____년 __월", exampleValue: "2026년 3월", colspan: 5 }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }] },
];

export const 급여지급명세서_DATA = [
  { fields: [{ label: "급여 지급 명세서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "사원번호", isHeader: true }, { placeholder: "EMP-001", exampleValue: "EMP-001" }, { label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }, { label: "지급기간", isHeader: true }, { placeholder: "2026.03.01~03.31", exampleValue: "2026.03.01~03.31" }] },
  { fields: [{ label: "기본급", isHeader: true }, { placeholder: "2,500,000원", exampleValue: "2,500,000원", colspan: 3 }] },
  { fields: [{ label: "식대", isHeader: true }, { placeholder: "100,000원", exampleValue: "100,000원" }, { label: "교통비", isHeader: true }, { placeholder: "100,000원", exampleValue: "100,000원" }] },
  { fields: [{ label: "연장근로수당", isHeader: true }, { placeholder: "150,000원", exampleValue: "150,000원" }, { label: "총지급액", isHeader: true }, { placeholder: "2,850,000원", exampleValue: "2,850,000원" }] },
  { fields: [{ label: "국민연금", isHeader: true }, { placeholder: "112,500원", exampleValue: "112,500원" }, { label: "건강보험", isHeader: true }, { placeholder: "91,350원", exampleValue: "91,350원" }] },
  { fields: [{ label: "공제합계", isHeader: true }, { placeholder: "272,300원", exampleValue: "272,300원" }, { label: "실수령액", isHeader: true }, { placeholder: "2,577,700원", exampleValue: "2,577,700원" }] },
];

export const 연차휴가사용계획서_DATA = [
  { fields: [{ label: "연차휴가 사용계획서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }, { label: "직급", isHeader: true }, { placeholder: "대리", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "총 연차일수", isHeader: true }, { placeholder: "15일", exampleValue: "15일" }] },
  { fields: [{ label: "기 사용일수", isHeader: true }, { placeholder: "5일", exampleValue: "5일" }, { label: "잔여일수", isHeader: true }, { placeholder: "10일", exampleValue: "10일" }] },
  { fields: [{ label: "사용 예정일 1", isHeader: true }, { placeholder: "____년 __월 __일 ~ __월 __일", exampleValue: "2026년 7월 20일 ~ 7월 24일 (5일)", colspan: 3 }] },
  { fields: [{ label: "사용 예정일 2", isHeader: true }, { placeholder: "____년 __월 __일 ~ __월 __일", exampleValue: "2026년 12월 28일 ~ 12월 31일 (4일)", colspan: 3 }] },
  { fields: [{ label: "미사용 예정일수", isHeader: true }, { placeholder: "__일", exampleValue: "1일", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 4월 1일" }, { label: "서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }] },
];

export const 연차휴가사용지정통보서_DATA = [
  { fields: [{ label: "연차휴가 사용지정 통보서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "수신", isHeader: true }, { placeholder: "홍길동 귀중", exampleValue: "홍길동 귀중", colspan: 3 }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }] },
  { fields: [{ label: "총 연차일수", isHeader: true }, { placeholder: "15일", exampleValue: "15일" }, { label: "기 사용일수", isHeader: true }, { placeholder: "7일", exampleValue: "7일" }] },
  { fields: [{ label: "지정 사용일", isHeader: true }, { placeholder: "____년 __월 __일 ~ __월 __일 (__일간)", exampleValue: "2026년 12월 22일 ~ 12월 24일 (3일간)", colspan: 3 }] },
  { fields: [{ label: "통보일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 12월 10일" }, { label: "대표이사", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 연차휴가사용시기지정요청서_DATA = [
  { fields: [{ label: "연차휴가 사용시기 지정 요청서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "수신", isHeader: true }, { placeholder: "홍길동 귀중", exampleValue: "홍길동 귀중", colspan: 3 }] },
  { fields: [{ label: "총 연차일수", isHeader: true }, { placeholder: "15일", exampleValue: "15일" }, { label: "기 사용일수", isHeader: true }, { placeholder: "5일", exampleValue: "5일" }] },
  { fields: [{ label: "미사용 연차", isHeader: true }, { placeholder: "__일", exampleValue: "10일", colspan: 3 }] },
  { fields: [{ label: "사용계획 제출기한", isHeader: true }, { placeholder: "____년 __월 __일까지", exampleValue: "2026년 10월 10일까지", colspan: 3 }] },
  { fields: [{ label: "발송일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 9월 30일" }, { label: "대표이사", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 업무보고서_DATA = [
  { fields: [{ label: "업무보고서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "작성자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서/직급", isHeader: true }, { placeholder: "영업팀/대리", exampleValue: "영업팀/대리" }] },
  { fields: [{ label: "보고 기간", isHeader: true }, { placeholder: "____년 __월 __일 ~ __월 __일", exampleValue: "2026년 3월 3일 ~ 3월 7일", colspan: 3 }] },
  { fields: [{ label: "완료 업무", isHeader: true }, { placeholder: "업무 내용 입력", exampleValue: "1. A거래처 제안서 제출 완료  2. 3월 매출 마감 보고", colspan: 3 }] },
  { fields: [{ label: "진행 중 업무", isHeader: true }, { placeholder: "업무 내용 입력", exampleValue: "1. B프로젝트 계약서 검토 중 (3/14 완료 예정)", colspan: 3 }] },
  { fields: [{ label: "차주 계획", isHeader: true }, { placeholder: "예정 업무 입력", exampleValue: "1. 신규 거래처 미팅 (3/11)  2. 분기 실적 자료 작성", colspan: 3 }] },
  { fields: [{ label: "특이사항", isHeader: true }, { placeholder: "특이사항 없음", exampleValue: "A거래처 계약 조건 변경 요청 — 팀장 보고 완료", colspan: 3 }] },
];

export const 업무인수인계서_DATA = [
  { fields: [{ label: "업무 인수인계서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "인계자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "인수자", isHeader: true }, { placeholder: "김영희", exampleValue: "김영희" }] },
  { fields: [{ label: "인계일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 14일" }, { label: "부서", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }] },
  { fields: [{ label: "업무명", isHeader: true }, { label: "진행현황", isHeader: true }, { label: "관련서류", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "A거래처 관리", exampleValue: "A거래처 관리" }, { placeholder: "월 2회 정기 미팅", exampleValue: "월 2회 정기 미팅" }, { placeholder: "거래처 파일 폴더", exampleValue: "거래처 파일 폴더" }, { placeholder: "담당자 연락처 인계", exampleValue: "담당자 연락처 인계" }] },
  { fields: [{ label: "인계자 서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }, { label: "인수자 서명", isHeader: true }, { placeholder: "(인)", exampleValue: "김영희 (인)" }] },
];

export const 업무일지_DATA = [
  { fields: [{ label: "업무일지", colspan: 4, isHeader: true }] },
  { fields: [{ label: "날짜", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 10일" }, { label: "작성자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }] },
  { fields: [{ label: "업무항목", isHeader: true }, { label: "내용", isHeader: true }, { label: "소요시간", isHeader: true }, { label: "상태", isHeader: true }] },
  { fields: [{ placeholder: "A거래처 미팅", exampleValue: "A거래처 미팅" }, { placeholder: "계약 조건 협의", exampleValue: "계약 조건 협의" }, { placeholder: "2h", exampleValue: "2h" }, { placeholder: "완료", exampleValue: "완료" }] },
  { fields: [{ placeholder: "보고서 작성", exampleValue: "보고서 작성" }, { placeholder: "3월 주간보고서 작성", exampleValue: "3월 주간보고서 작성" }, { placeholder: "1h", exampleValue: "1h" }, { placeholder: "완료", exampleValue: "완료" }] },
  { fields: [{ label: "특이사항", isHeader: true }, { placeholder: "없음", exampleValue: "A거래처 담당자 변경 확인 필요", colspan: 3 }] },
];

export const 여비교통비지출품의서_DATA = [
  { fields: [{ label: "여비교통비 지출품의서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "기안자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "기안일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 10일" }] },
  { fields: [{ label: "출장 목적", isHeader: true }, { placeholder: "출장 목적 입력", exampleValue: "부산 A거래처 계약 협의", colspan: 3 }] },
  { fields: [{ label: "출장 기간", isHeader: true }, { placeholder: "____년 __월 __일 ~ __월 __일", exampleValue: "2026년 3월 12일 ~ 3월 13일 (1박 2일)", colspan: 3 }] },
  { fields: [{ label: "항목", isHeader: true }, { label: "내용", isHeader: true }, { label: "금액", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "교통비", exampleValue: "교통비" }, { placeholder: "KTX 왕복", exampleValue: "KTX 왕복" }, { placeholder: "120,000원", exampleValue: "120,000원" }, { placeholder: "영수증 첨부", exampleValue: "영수증 첨부" }] },
  { fields: [{ placeholder: "숙박비", exampleValue: "숙박비" }, { placeholder: "호텔 1박", exampleValue: "호텔 1박" }, { placeholder: "80,000원", exampleValue: "80,000원" }, { placeholder: "영수증 첨부", exampleValue: "영수증 첨부" }] },
  { fields: [{ label: "합계", isHeader: true }, { placeholder: "총 금액", exampleValue: "240,000원", colspan: 3 }] },
];

export const 인사기록카드_DATA = [
  { fields: [{ label: "인사기록카드", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "1990.01.15", exampleValue: "1990.01.15" }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소 입력", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 }] },
  { fields: [{ label: "학력", isHeader: true }, { placeholder: "최종 학력", exampleValue: "OO대학교 경영학과 졸업 (2014.02)" }, { label: "전공", isHeader: true }, { placeholder: "전공명", exampleValue: "경영학" }] },
  { fields: [{ label: "입사일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2016년 3월 2일" }, { label: "현 직급", isHeader: true }, { placeholder: "직급", exampleValue: "대리" }] },
  { fields: [{ label: "현 부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "담당 업무", isHeader: true }, { placeholder: "업무명", exampleValue: "법인 영업" }] },
];

export const 임금계산서_DATA = [
  { fields: [{ label: "임금계산서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "산정기간", isHeader: true }, { placeholder: "2026.03.01~03.31", exampleValue: "2026.03.01~03.31" }] },
  { fields: [{ label: "기본급", isHeader: true }, { placeholder: "2,500,000원", exampleValue: "2,500,000원" }, { label: "근무일수", isHeader: true }, { placeholder: "22일", exampleValue: "22일" }] },
  { fields: [{ label: "연장근로시간", isHeader: true }, { placeholder: "__시간", exampleValue: "10시간" }, { label: "연장수당", isHeader: true }, { placeholder: "__원", exampleValue: "179,688원" }] },
  { fields: [{ label: "주휴수당", isHeader: true }, { placeholder: "__원", exampleValue: "500,000원" }, { label: "식대", isHeader: true }, { placeholder: "__원", exampleValue: "100,000원" }] },
  { fields: [{ label: "총 임금", isHeader: true }, { placeholder: "합계금액", exampleValue: "3,279,688원", colspan: 3 }] },
];

export const 임금대장_DATA = [
  { fields: [{ label: "임금대장", colspan: 6, isHeader: true }] },
  { fields: [{ label: "번호", isHeader: true }, { label: "성명", isHeader: true }, { label: "직종", isHeader: true }, { label: "근무일수", isHeader: true }, { label: "총지급액", isHeader: true }, { label: "실지급액", isHeader: true }] },
  { fields: [{ placeholder: "1", exampleValue: "1" }, { placeholder: "홍길동", exampleValue: "홍길동" }, { placeholder: "사무직", exampleValue: "사무직" }, { placeholder: "22", exampleValue: "22" }, { placeholder: "2,800,000", exampleValue: "2,800,000" }, { placeholder: "2,580,000", exampleValue: "2,580,000" }] },
  { fields: [{ placeholder: "2", exampleValue: "2" }, { placeholder: "김영희", exampleValue: "김영희" }, { placeholder: "사무직", exampleValue: "사무직" }, { placeholder: "22", exampleValue: "22" }, { placeholder: "2,500,000", exampleValue: "2,500,000" }, { placeholder: "2,300,000", exampleValue: "2,300,000" }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "____년 __월", exampleValue: "2026년 3월", colspan: 4 }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 조퇴결근신청서_DATA = [
  { fields: [{ label: "조퇴 · 결근 신청서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }, { label: "직급", isHeader: true }, { placeholder: "대리", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "신청일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 10일" }] },
  { fields: [{ label: "구분", isHeader: true }, { placeholder: "조퇴 / 결근", exampleValue: "조퇴" }, { label: "일시", isHeader: true }, { placeholder: "____년 __월 __일 __시", exampleValue: "2026년 3월 10일 15시" }] },
  { fields: [{ label: "사유", isHeader: true }, { placeholder: "사유 입력", exampleValue: "두통 및 발열로 인한 조기 퇴근", colspan: 3 }] },
  { fields: [{ label: "서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }, { label: "승인", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 직원근무평가서_DATA = [
  { fields: [{ label: "직원 근무평가서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "평가대상자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "평가기간", isHeader: true }, { placeholder: "2026년 상반기", exampleValue: "2026년 상반기" }] },
  { fields: [{ label: "부서/직급", isHeader: true }, { placeholder: "영업팀/대리", exampleValue: "영업팀/대리" }, { label: "평가자", isHeader: true }, { placeholder: "부서장", exampleValue: "박팀장" }] },
  { fields: [{ label: "평가항목", isHeader: true }, { label: "배점", isHeader: true }, { label: "득점", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "직무능력", exampleValue: "직무능력" }, { placeholder: "30점", exampleValue: "30점" }, { placeholder: "__점", exampleValue: "25점" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "근무태도", exampleValue: "근무태도" }, { placeholder: "30점", exampleValue: "30점" }, { placeholder: "__점", exampleValue: "28점" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "목표달성도", exampleValue: "목표달성도" }, { placeholder: "40점", exampleValue: "40점" }, { placeholder: "__점", exampleValue: "35점" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "총점", isHeader: true }, { placeholder: "100점", exampleValue: "100점" }, { placeholder: "__점", exampleValue: "88점" }, { placeholder: "우수", exampleValue: "우수" }] },
];

export const 차량운행일지_DATA = [
  { fields: [{ label: "차량 운행일지", colspan: 6, isHeader: true }] },
  { fields: [{ label: "날짜", isHeader: true }, { label: "차량번호", isHeader: true }, { label: "운전자", isHeader: true }, { label: "출발→도착", isHeader: true }, { label: "주행거리", isHeader: true }, { label: "운행목적", isHeader: true }] },
  { fields: [{ placeholder: "2026.03.10", exampleValue: "2026.03.10" }, { placeholder: "12가3456", exampleValue: "12가3456" }, { placeholder: "홍길동", exampleValue: "홍길동" }, { placeholder: "본사→A거래처", exampleValue: "본사→A거래처" }, { placeholder: "45km", exampleValue: "45km" }, { placeholder: "영업 미팅", exampleValue: "영업 미팅" }] },
  { fields: [{ placeholder: "2026.03.11", exampleValue: "2026.03.11" }, { placeholder: "12가3456", exampleValue: "12가3456" }, { placeholder: "김영희", exampleValue: "김영희" }, { placeholder: "본사→B협력사", exampleValue: "본사→B협력사" }, { placeholder: "30km", exampleValue: "30km" }, { placeholder: "자재 수령", exampleValue: "자재 수령" }] },
];

export const 채용면접기록표_DATA = [
  { fields: [{ label: "채용 면접기록표", colspan: 4, isHeader: true }] },
  { fields: [{ label: "응시자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "지원직종", isHeader: true }, { placeholder: "영업 사원", exampleValue: "영업 사원" }] },
  { fields: [{ label: "면접일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 15일" }, { label: "면접관", isHeader: true }, { placeholder: "면접관 성명", exampleValue: "박팀장" }] },
  { fields: [{ label: "평가항목", isHeader: true }, { label: "배점", isHeader: true }, { label: "득점", isHeader: true }, { label: "평가의견", isHeader: true }] },
  { fields: [{ placeholder: "외모·태도", exampleValue: "외모·태도" }, { placeholder: "20점", exampleValue: "20점" }, { placeholder: "__점", exampleValue: "17점" }, { placeholder: "단정하고 적극적", exampleValue: "단정하고 적극적" }] },
  { fields: [{ placeholder: "전문지식", exampleValue: "전문지식" }, { placeholder: "30점", exampleValue: "30점" }, { placeholder: "__점", exampleValue: "25점" }, { placeholder: "영업 경험 풍부", exampleValue: "영업 경험 풍부" }] },
  { fields: [{ placeholder: "의사소통", exampleValue: "의사소통" }, { placeholder: "30점", exampleValue: "30점" }, { placeholder: "__점", exampleValue: "28점" }, { placeholder: "표현력 우수", exampleValue: "표현력 우수" }] },
  { fields: [{ label: "합계", isHeader: true }, { placeholder: "100점", exampleValue: "100점" }, { placeholder: "__점", exampleValue: "88점" }, { placeholder: "합격 추천 / 불합격", exampleValue: "합격 추천" }] },
];

export const 퇴직휴직신고서_DATA = [
  { fields: [{ label: "퇴직 · 휴직 신고서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }, { label: "직급", isHeader: true }, { placeholder: "대리", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "신고구분", isHeader: true }, { placeholder: "퇴직 / 휴직", exampleValue: "퇴직" }] },
  { fields: [{ label: "발령일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 4월 1일" }, { label: "입사일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2016년 3월 2일" }] },
  { fields: [{ label: "사유", isHeader: true }, { placeholder: "퇴직/휴직 사유 입력", exampleValue: "개인사유 (타사 이직)", colspan: 3 }] },
  { fields: [{ label: "신고일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 5일" }, { label: "서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }] },
];

export const 퇴직금지급품의서_DATA = [
  { fields: [{ label: "퇴직금 지급품의서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }] },
  { fields: [{ label: "입사일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2016년 3월 2일" }, { label: "퇴사일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 31일" }] },
  { fields: [{ label: "근속연수", isHeader: true }, { placeholder: "__년 __개월", exampleValue: "10년 1개월" }, { label: "지급기한", isHeader: true }, { placeholder: "퇴직일 후 14일 이내", exampleValue: "2026년 4월 14일" }] },
  { fields: [{ label: "퇴직금", isHeader: true }, { placeholder: "1일 평균임금 × 30 × 근속연수", exampleValue: "93,333 × 30 × 10.083 = 28,232,100원", colspan: 3 }] },
  { fields: [{ label: "결재", isHeader: true }, { placeholder: "담당자 (인)", exampleValue: "홍인사 (인)" }, { label: "대표이사", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 퇴직급여충당금조정명세서_DATA = [
  { fields: [{ label: "퇴직급여충당금 조정명세서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "사업연도", isHeader: true }, { placeholder: "____년 1월 1일 ~ 12월 31일", exampleValue: "2026년 1월 1일 ~ 12월 31일", colspan: 3 }] },
  { fields: [{ label: "기초잔액", isHeader: true }, { placeholder: "__원", exampleValue: "50,000,000원", colspan: 3 }] },
  { fields: [{ label: "당기 설정액", isHeader: true }, { placeholder: "__원", exampleValue: "10,000,000원" }, { label: "한도액 (총급여×5%)", isHeader: true }, { placeholder: "__원", exampleValue: "12,000,000원" }] },
  { fields: [{ label: "당기 사용액", isHeader: true }, { placeholder: "__원", exampleValue: "5,000,000원", colspan: 3 }] },
  { fields: [{ label: "기말잔액", isHeader: true }, { placeholder: "__원", exampleValue: "55,000,000원" }, { label: "손금산입액", isHeader: true }, { placeholder: "__원", exampleValue: "10,000,000원" }] },
];

export const 피보험자신규자격취득신고서_DATA = [
  { fields: [{ label: "피보험자 신규자격 취득 신고서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "사업장명", isHeader: true }, { placeholder: "OO주식회사", exampleValue: "OO주식회사" }, { label: "사업자번호", isHeader: true }, { placeholder: "123-45-67890", exampleValue: "123-45-67890" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "1990.01.15", exampleValue: "1990.01.15" }] },
  { fields: [{ label: "자격취득일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 2일" }, { label: "직종", isHeader: true }, { placeholder: "직종코드/명칭", exampleValue: "사무직 (코드: 02)" }] },
  { fields: [{ label: "월평균보수", isHeader: true }, { placeholder: "____원", exampleValue: "2,800,000원" }, { label: "주소정근로시간", isHeader: true }, { placeholder: "__시간", exampleValue: "40시간" }] },
  { fields: [{ label: "신고일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 5일" }, { label: "신고인", isHeader: true }, { placeholder: "(인)", exampleValue: "OO주식회사 (인)" }] },
];

export const 피복지급대장_DATA = [
  { fields: [{ label: "피복 지급대장", colspan: 6, isHeader: true }] },
  { fields: [{ label: "번호", isHeader: true }, { label: "성명", isHeader: true }, { label: "직급", isHeader: true }, { label: "품목", isHeader: true }, { label: "지급일", isHeader: true }, { label: "수령 서명", isHeader: true }] },
  { fields: [{ placeholder: "1", exampleValue: "1" }, { placeholder: "홍길동", exampleValue: "홍길동" }, { placeholder: "대리", exampleValue: "대리" }, { placeholder: "하복 상의 1벌", exampleValue: "하복 상의 1벌" }, { placeholder: "2026.03.10", exampleValue: "2026.03.10" }, { placeholder: "(서명)", exampleValue: "(서명)" }] },
  { fields: [{ placeholder: "2", exampleValue: "2" }, { placeholder: "김영희", exampleValue: "김영희" }, { placeholder: "사원", exampleValue: "사원" }, { placeholder: "동복 상하 1벌", exampleValue: "동복 상하 1벌" }, { placeholder: "2026.03.10", exampleValue: "2026.03.10" }, { placeholder: "(서명)", exampleValue: "(서명)" }] },
];

export const 학자금지급신청서_DATA = [
  { fields: [{ label: "학자금 지급 신청서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "신청자 성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }] },
  { fields: [{ label: "자녀 성명", isHeader: true }, { placeholder: "홍길순", exampleValue: "홍길순" }, { label: "재학 학교", isHeader: true }, { placeholder: "OO대학교 2학년", exampleValue: "OO대학교 2학년" }] },
  { fields: [{ label: "등록금", isHeader: true }, { placeholder: "____원", exampleValue: "4,200,000원" }, { label: "신청금액", isHeader: true }, { placeholder: "____원", exampleValue: "1,000,000원" }] },
  { fields: [{ label: "신청일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 5일" }, { label: "서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }] },
];

export const 해외훈련이수자관리기록카드_DATA = [
  { fields: [{ label: "해외훈련 이수자 관리기록카드", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서/직급", isHeader: true }, { placeholder: "마케팅팀/과장", exampleValue: "마케팅팀/과장" }] },
  { fields: [{ label: "훈련기관", isHeader: true }, { placeholder: "훈련 기관명", exampleValue: "Stanford Online Marketing Institute" }, { label: "국가", isHeader: true }, { placeholder: "훈련 국가", exampleValue: "미국" }] },
  { fields: [{ label: "훈련기간", isHeader: true }, { placeholder: "____년 __월 __일 ~ __년 __월 __일", exampleValue: "2026년 2월 1일 ~ 2026년 2월 28일", colspan: 3 }] },
  { fields: [{ label: "훈련과정명", isHeader: true }, { placeholder: "과정명 입력", exampleValue: "디지털 마케팅 전략 심화 과정", colspan: 3 }] },
  { fields: [{ label: "훈련비용", isHeader: true }, { placeholder: "____원", exampleValue: "5,000,000원" }, { label: "의무복무기간", isHeader: true }, { placeholder: "__개월", exampleValue: "24개월" }] },
  { fields: [{ label: "이수결과", isHeader: true }, { placeholder: "이수/미이수", exampleValue: "이수 (수료증 첨부)" }, { label: "귀국일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 1일" }] },
];

export const 현장실습일지_DATA = [
  { fields: [{ label: "현장실습일지", colspan: 4, isHeader: true }] },
  { fields: [{ label: "실습생명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "실습기관", isHeader: true }, { placeholder: "OO주식회사", exampleValue: "OO주식회사" }] },
  { fields: [{ label: "날짜", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 10일" }, { label: "실습시간", isHeader: true }, { placeholder: "09:00~18:00", exampleValue: "09:00~18:00" }] },
  { fields: [{ label: "실습 내용", isHeader: true }, { placeholder: "수행한 실습 내용을 기재", exampleValue: "고객 문의 전화 응대 실습, CRM 시스템 사용법 교육 참여", colspan: 3 }] },
  { fields: [{ label: "배운 점", isHeader: true }, { placeholder: "새로 배우거나 느낀 점", exampleValue: "고객 응대 시 공감 표현의 중요성을 배움", colspan: 3 }] },
  { fields: [{ label: "지도자 확인", isHeader: true }, { placeholder: "(서명)", exampleValue: "박지도 (서명)" }, { label: "실습생 서명", isHeader: true }, { placeholder: "(서명)", exampleValue: "홍길동 (서명)" }] },
];

export const 회람_DATA = [
  { fields: [{ label: "회람", colspan: 4, isHeader: true }] },
  { fields: [{ label: "제목", isHeader: true }, { placeholder: "회람 제목 입력", exampleValue: "2026년 상반기 전직원 건강검진 안내", colspan: 3 }] },
  { fields: [{ label: "발신부서", isHeader: true }, { placeholder: "총무팀", exampleValue: "총무팀" }, { label: "발신일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 10일" }] },
  { fields: [{ label: "내용", isHeader: true }, { placeholder: "회람 내용 입력", exampleValue: "2026년 상반기 전직원 건강검진 실시 안내. 기간: 4월 1~15일, 장소: 1층 의무실, 대상: 전 직원", colspan: 3 }] },
  { fields: [{ label: "확인 (순서대로)", isHeader: true }, { placeholder: "1. 대표이사 (서명)", exampleValue: "1. 대표이사 (서명)" }, { placeholder: "2. 본부장 (서명)", exampleValue: "2. 본부장 (서명)" }, { placeholder: "3. 팀장 (서명)", exampleValue: "3. 팀장 (서명)" }] },
];

export const 공가신청서_DATA = [
  { fields: [{ label: "공가신청서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }, { label: "직급", isHeader: true }, { placeholder: "대리", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "신청일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 8일" }] },
  { fields: [{ label: "공가 사유", isHeader: true }, { placeholder: "공가 사유 입력", exampleValue: "예비군 훈련 (3박 4일 동미참)", colspan: 3 }] },
  { fields: [{ label: "공가 기간", isHeader: true }, { placeholder: "____년 __월 __일 ~ __월 __일 (__일간)", exampleValue: "2026년 3월 12일 ~ 3월 15일 (4일간)", colspan: 3 }] },
  { fields: [{ label: "증빙서류", isHeader: true }, { placeholder: "소집 통지서 등", exampleValue: "예비군 훈련 소집 통지서 첨부", colspan: 3 }] },
  { fields: [{ label: "서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }, { label: "승인", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 휴직자퇴직자관리명세서_DATA = [
  { fields: [{ label: "휴직자 · 퇴직자 관리명세서", colspan: 6, isHeader: true }] },
  { fields: [{ label: "번호", isHeader: true }, { label: "성명", isHeader: true }, { label: "구분", isHeader: true }, { label: "사유", isHeader: true }, { label: "시작일", isHeader: true }, { label: "종료/퇴직일", isHeader: true }] },
  { fields: [{ placeholder: "1", exampleValue: "1" }, { placeholder: "홍길동", exampleValue: "홍길동" }, { placeholder: "육아휴직", exampleValue: "육아휴직" }, { placeholder: "출산", exampleValue: "출산" }, { placeholder: "2026.01.01", exampleValue: "2026.01.01" }, { placeholder: "2026.12.31", exampleValue: "2026.12.31" }] },
  { fields: [{ placeholder: "2", exampleValue: "2" }, { placeholder: "김영희", exampleValue: "김영희" }, { placeholder: "퇴직", exampleValue: "퇴직" }, { placeholder: "개인사유", exampleValue: "개인사유" }, { placeholder: "2026.03.31", exampleValue: "2026.03.31" }, { placeholder: "2026.03.31", exampleValue: "2026.03.31" }] },
];

export const 휴가원_DATA = [
  { fields: [{ label: "휴가원", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }, { label: "직급", isHeader: true }, { placeholder: "대리", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "신청일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 8일" }] },
  { fields: [{ label: "휴가 종류", isHeader: true }, { placeholder: "연차 / 경조사 / 포상 등", exampleValue: "연차" }, { label: "일수", isHeader: true }, { placeholder: "__일", exampleValue: "3일" }] },
  { fields: [{ label: "휴가 기간", isHeader: true }, { placeholder: "____년 __월 __일 ~ __월 __일", exampleValue: "2026년 3월 20일 ~ 3월 22일", colspan: 3 }] },
  { fields: [{ label: "사유", isHeader: true }, { placeholder: "사유 입력", exampleValue: "개인 용무 (가족 행사)", colspan: 3 }] },
  { fields: [{ label: "업무 대행자", isHeader: true }, { placeholder: "대행자 성명", exampleValue: "김영희" }, { label: "서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }] },
];

export const 시간외근무신청서_DATA = [
  { fields: [{ label: "시간외근무 신청서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }, { label: "직급", isHeader: true }, { placeholder: "대리", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "신청일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 10일" }] },
  { fields: [{ label: "근무 구분", isHeader: true }, { placeholder: "연장 / 야간 / 휴일", exampleValue: "연장근무" }, { label: "근무일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 12일" }] },
  { fields: [{ label: "근무 시간", isHeader: true }, { placeholder: "__시 ~ __시 (__시간)", exampleValue: "18:00 ~ 22:00 (4시간)" }, { label: "수당 여부", isHeader: true }, { placeholder: "지급 / 대휴", exampleValue: "지급" }] },
  { fields: [{ label: "근무 사유", isHeader: true }, { placeholder: "사유 입력", exampleValue: "A프로젝트 마감 납품 준비", colspan: 3 }] },
  { fields: [{ label: "서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }, { label: "승인", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 휴직원_DATA = [
  { fields: [{ label: "휴직원", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "영업팀", exampleValue: "영업팀" }, { label: "직급", isHeader: true }, { placeholder: "대리", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "입사일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2016년 3월 2일" }] },
  { fields: [{ label: "휴직 사유", isHeader: true }, { placeholder: "사유 입력", exampleValue: "질병 치료 (허리 디스크 수술)", colspan: 3 }] },
  { fields: [{ label: "휴직 기간", isHeader: true }, { placeholder: "____년 __월 __일 ~ __년 __월 __일", exampleValue: "2026년 4월 1일 ~ 2026년 9월 30일 (6개월)", colspan: 3 }] },
  { fields: [{ label: "복직 예정일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 10월 1일" }, { label: "서명", isHeader: true }, { placeholder: "(인)", exampleValue: "홍길동 (인)" }] },
];

export const 거래명세표_DATA = [
  { fields: [{ label: "거래명세표", colspan: 5, isHeader: true }] },
  { fields: [{ label: "공급자", isHeader: true }, { placeholder: "OO주식회사", exampleValue: "OO주식회사" }, { label: "공급받는자", isHeader: true }, { placeholder: "AA주식회사", exampleValue: "AA주식회사", colspan: 2 }] },
  { fields: [{ label: "거래일", isHeader: true }, { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 10일" }, { label: "작성번호", isHeader: true }, { placeholder: "No. 2026-001", exampleValue: "No. 2026-031", colspan: 2 }] },
  { fields: [{ label: "품목", isHeader: true }, { label: "규격", isHeader: true }, { label: "수량", isHeader: true }, { label: "단가", isHeader: true }, { label: "금액", isHeader: true }] },
  { fields: [{ placeholder: "A제품", exampleValue: "A제품" }, { placeholder: "규격A", exampleValue: "500ml" }, { placeholder: "100", exampleValue: "100" }, { placeholder: "1,000원", exampleValue: "1,000원" }, { placeholder: "100,000원", exampleValue: "100,000원" }] },
  { fields: [{ placeholder: "B제품", exampleValue: "B제품" }, { placeholder: "규격B", exampleValue: "1L" }, { placeholder: "50", exampleValue: "50" }, { placeholder: "2,000원", exampleValue: "2,000원" }, { placeholder: "100,000원", exampleValue: "100,000원" }] },
  { fields: [{ label: "합계", isHeader: true, colspan: 4 }, { placeholder: "200,000원", exampleValue: "200,000원" }] },
];
`;

const current = fs.readFileSync(fp, "utf8");
fs.writeFileSync(fp, current + addition, "utf8");
console.log("FormPreview.tsx에 DATA 31개 추가 완료");
