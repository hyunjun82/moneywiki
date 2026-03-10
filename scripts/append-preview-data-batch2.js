const fs = require("fs");
const fp = "src/components/forms/FormPreview.tsx";

const addition = `
// ===== 배치2: 노동OK 신규 양식 35개 =====

export const 개인면담표_DATA = [
  { fields: [{ label: "개인 면담표", colspan: 4, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "사번", isHeader: true }, { placeholder: "사번", exampleValue: "2019-0042" }] },
  { fields: [{ label: "면담일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }, { label: "면담자", isHeader: true }, { placeholder: "면담자 성명", exampleValue: "김부장" }] },
  { fields: [{ label: "면담 내용", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "면담 내용을 기록합니다.", exampleValue: "업무 성과 및 애로사항 청취", colspan: 4 }] },
  { fields: [{ label: "조치 사항", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "조치 사항을 기록합니다.", exampleValue: "업무량 조정 및 교육 지원 예정", colspan: 4 }] },
];

export const 개인별시간외근무기록표_DATA = [
  { fields: [{ label: "개인별 시간외근무 기록표", colspan: 6, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서", isHeader: true }, { placeholder: "부서", exampleValue: "개발팀" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "과장" }] },
  { fields: [{ label: "날짜", isHeader: true }, { label: "시작시간", isHeader: true }, { label: "종료시간", isHeader: true }, { label: "시간외 시간", isHeader: true }, { label: "업무내용", isHeader: true }, { label: "승인자", isHeader: true }] },
  { fields: [{ placeholder: "03/10", exampleValue: "03/10" }, { placeholder: "18:00", exampleValue: "18:00" }, { placeholder: "21:00", exampleValue: "21:00" }, { placeholder: "3시간", exampleValue: "3시간" }, { placeholder: "업무 내용", exampleValue: "월말 결산 처리" }, { placeholder: "서명", exampleValue: "김부장" }] },
  { fields: [{ placeholder: "03/11", exampleValue: "03/11" }, { placeholder: "18:00", exampleValue: "18:00" }, { placeholder: "20:30", exampleValue: "20:30" }, { placeholder: "2.5시간", exampleValue: "2.5시간" }, { placeholder: "업무 내용", exampleValue: "보고서 작성" }, { placeholder: "서명", exampleValue: "김부장" }] },
];

export const 개인별연간결근휴가기록표_DATA = [
  { fields: [{ label: "개인별 연간 결근·휴가 기록표", colspan: 6, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서", isHeader: true }, { placeholder: "개발팀", exampleValue: "개발팀" }, { label: "연도", isHeader: true }, { placeholder: "2026", exampleValue: "2026" }] },
  { fields: [{ label: "구분", isHeader: true }, { label: "1월", isHeader: true }, { label: "2월", isHeader: true }, { label: "3월", isHeader: true }, { label: "4월", isHeader: true }, { label: "합계", isHeader: true }] },
  { fields: [{ label: "연차휴가", isHeader: true }, { placeholder: "0", exampleValue: "2" }, { placeholder: "0", exampleValue: "1" }, { placeholder: "0", exampleValue: "0" }, { placeholder: "0", exampleValue: "1" }, { placeholder: "합계", exampleValue: "4" }] },
  { fields: [{ label: "결근", isHeader: true }, { placeholder: "0", exampleValue: "0" }, { placeholder: "0", exampleValue: "0" }, { placeholder: "0", exampleValue: "0" }, { placeholder: "0", exampleValue: "0" }, { placeholder: "합계", exampleValue: "0" }] },
];

export const 개인별휴가관리카드_DATA = [
  { fields: [{ label: "개인별 휴가관리 카드", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서/직위", isHeader: true }, { placeholder: "개발팀 과장", exampleValue: "개발팀 과장" }] },
  { fields: [{ label: "입사일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2019-03-04" }, { label: "연도", isHeader: true }, { placeholder: "2026", exampleValue: "2026" }] },
  { fields: [{ label: "연차 부여일수", isHeader: true }, { placeholder: "15일", exampleValue: "15일" }, { label: "사용일수", isHeader: true }, { placeholder: "0일", exampleValue: "4일" }] },
  { fields: [{ label: "잔여일수", isHeader: true }, { placeholder: "15일", exampleValue: "11일" }, { label: "비고", isHeader: true }, { placeholder: "비고", exampleValue: "" }] },
];

export const 개인별인사기록카드_DATA = [
  { fields: [{ label: "개인별 인사기록 카드", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "1990-05-15" }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "대리" }] },
  { fields: [{ label: "입사일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2019-03-04" }, { label: "학력", isHeader: true }, { placeholder: "최종학력", exampleValue: "○○대학교 경영학과 졸업" }] },
  { fields: [{ label: "경력사항", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "이전 직장 및 담당 업무", exampleValue: "△△회사 영업사원 (2017~2019)", colspan: 4 }] },
];

export const 결근계_DATA = [
  { fields: [{ label: "결 근 계", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "사번", isHeader: true }, { placeholder: "사번", exampleValue: "2019-0042" }] },
  { fields: [{ label: "결근 일자", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }, { label: "결근 일수", isHeader: true }, { placeholder: "1일", exampleValue: "1일" }] },
  { fields: [{ label: "결근 사유", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "결근 사유를 기재해주세요.", exampleValue: "개인 사정으로 인한 결근", colspan: 4 }] },
  { fields: [{ label: "위와 같이 결근하였음을 신고합니다.", colspan: 4 }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 10일" }, { label: "신청인", isHeader: true }, { placeholder: "홍길동 (인)", exampleValue: "홍길동 (인)" }, { placeholder: "", exampleValue: "" }] },
];

export const 경고장_DATA = [
  { fields: [{ label: "경 고 장", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "발행일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }] },
  { fields: [{ label: "경고 사유", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "경고 사유를 구체적으로 기재합니다.", exampleValue: "2026년 3월 5일 무단지각으로 인해 경고 조치합니다.", colspan: 4 }] },
  { fields: [{ label: "재발 시 불이익", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "재발 시 조치를 기재합니다.", exampleValue: "재발 시 징계위원회에 회부될 수 있습니다.", colspan: 4 }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 10일" }, { label: "대표이사", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }, { placeholder: "", exampleValue: "" }] },
];

export const 근무성적평정표_DATA = [
  { fields: [{ label: "근무성적 평정표", colspan: 6, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "개발팀" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "과장" }, { label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }] },
  { fields: [{ label: "평가 항목", isHeader: true, colspan: 2 }, { label: "배점", isHeader: true }, { label: "득점", isHeader: true }, { label: "평가 의견", isHeader: true, colspan: 2 }] },
  { fields: [{ placeholder: "업무 실적", exampleValue: "업무 실적", colspan: 2 }, { placeholder: "30점", exampleValue: "30점" }, { placeholder: "25점", exampleValue: "25점" }, { placeholder: "우수한 업무 성과", exampleValue: "목표 초과 달성", colspan: 2 }] },
  { fields: [{ placeholder: "직무 능력", exampleValue: "직무 능력", colspan: 2 }, { placeholder: "30점", exampleValue: "30점" }, { placeholder: "27점", exampleValue: "27점" }, { placeholder: "의견", exampleValue: "전문성 우수", colspan: 2 }] },
  { fields: [{ placeholder: "근무 태도", exampleValue: "근무 태도", colspan: 2 }, { placeholder: "20점", exampleValue: "20점" }, { placeholder: "18점", exampleValue: "18점" }, { placeholder: "의견", exampleValue: "성실하고 적극적", colspan: 2 }] },
  { fields: [{ label: "합계", isHeader: true, colspan: 2 }, { placeholder: "80점", exampleValue: "80점" }, { placeholder: "70점", exampleValue: "70점" }, { placeholder: "종합 의견", exampleValue: "우수", colspan: 2 }] },
];

export const 근무일지_DATA = [
  { fields: [{ label: "근무일지", colspan: 4, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "개발팀" }, { label: "작성일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "과장" }] },
  { fields: [{ label: "금일 업무 내용", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "오늘 수행한 업무 내용을 기재합니다.", exampleValue: "시스템 개선 작업 (70% 완료), 팀 회의 참석", colspan: 4 }] },
  { fields: [{ label: "내일 업무 예정", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "내일 수행 예정 업무를 기재합니다.", exampleValue: "시스템 개선 작업 마무리 및 테스트", colspan: 4 }] },
  { fields: [{ label: "특이사항", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "특이사항이 있으면 기재합니다.", exampleValue: "없음", colspan: 4 }] },
];

export const 급여수령증_DATA = [
  { fields: [{ label: "급여 수령증", colspan: 4, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "사번", isHeader: true }, { placeholder: "사번", exampleValue: "2019-0042" }] },
  { fields: [{ label: "귀속 연월", isHeader: true }, { placeholder: "YYYY년 MM월분", exampleValue: "2026년 03월분" }, { label: "지급일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-25" }] },
  { fields: [{ label: "지급 내역", isHeader: true }, { placeholder: "금액", exampleValue: "금액" }, { label: "공제 내역", isHeader: true }, { placeholder: "금액", exampleValue: "금액" }] },
  { fields: [{ placeholder: "기본급", exampleValue: "기본급" }, { placeholder: "3,000,000원", exampleValue: "3,000,000원" }, { placeholder: "국민연금", exampleValue: "국민연금" }, { placeholder: "135,000원", exampleValue: "135,000원" }] },
  { fields: [{ placeholder: "식대", exampleValue: "식대" }, { placeholder: "200,000원", exampleValue: "200,000원" }, { placeholder: "건강보험", exampleValue: "건강보험" }, { placeholder: "106,350원", exampleValue: "106,350원" }] },
  { fields: [{ label: "실수령액", isHeader: true, colspan: 2 }, { placeholder: "금액", exampleValue: "2,751,190원", colspan: 2 }] },
  { fields: [{ label: "위 금액을 정히 수령하였습니다.", colspan: 4 }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 25일" }, { placeholder: "", exampleValue: "" }, { label: "수령인", isHeader: true }, { placeholder: "홍길동 (인)", exampleValue: "홍길동 (인)" }] },
];

export const 기안서_DATA = [
  { fields: [{ label: "기 안 서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "기안일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }, { label: "기안자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "기획팀" }, { label: "결재", isHeader: true }, { placeholder: "결재", exampleValue: "결재" }] },
  { fields: [{ label: "제목", isHeader: true }, { placeholder: "기안 제목", exampleValue: "신규 프로젝트 예산 집행 건", colspan: 3 }] },
  { fields: [{ label: "내용", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "기안 내용을 상세히 기재합니다.", exampleValue: "1. 사업명: 신규 ERP 도입\n2. 예산: 50,000,000원\n3. 목적: 업무 효율화", colspan: 4 }] },
  { fields: [{ label: "첨부서류", isHeader: true }, { placeholder: "첨부서류를 기재합니다.", exampleValue: "견적서 1부", colspan: 3 }] },
];

export const 노무수령거부통지서_DATA = [
  { fields: [{ label: "노무수령 거부 통지서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "수신", isHeader: true }, { placeholder: "수신자 (근로자)", exampleValue: "홍길동 귀하", colspan: 3 }] },
  { fields: [{ label: "발신", isHeader: true }, { placeholder: "회사명", exampleValue: "(주)○○회사 대표이사 김○○", colspan: 3 }] },
  { fields: [{ label: "통지 내용", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "노무수령 거부 사유를 기재합니다.", exampleValue: "귀하가 제출한 복직 신청에 대해 현재 귀하의 담당 업무가 폐지되어 노무를 수령할 수 없음을 통지합니다.", colspan: 4 }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 10일" }, { placeholder: "", exampleValue: "" }, { label: "대표이사", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 대근신청원_DATA = [
  { fields: [{ label: "대 근 신 청 원", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소속", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위", isHeader: true }, { placeholder: "직위", exampleValue: "대리" }] },
  { fields: [{ label: "신청인", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "대근자", isHeader: true }, { placeholder: "이철수", exampleValue: "이철수" }] },
  { fields: [{ label: "대근 일자", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-12" }, { label: "대근 시간", isHeader: true }, { placeholder: "HH:MM ~ HH:MM", exampleValue: "09:00 ~ 18:00" }] },
  { fields: [{ label: "대근 사유", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "대근이 필요한 사유를 기재합니다.", exampleValue: "당일 개인 사정으로 인해 이철수 대리에게 대근을 요청합니다.", colspan: 4 }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 10일" }, { label: "신청인", isHeader: true }, { placeholder: "홍길동 (인)", exampleValue: "홍길동 (인)" }, { placeholder: "", exampleValue: "" }] },
];

export const 민간인신원진술서_DATA = [
  { fields: [{ label: "민간인 신원진술서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "1990-05-15" }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "현주소", exampleValue: "서울시 강남구 ○○로 123", colspan: 3 }] },
  { fields: [{ label: "최종학력", isHeader: true }, { placeholder: "최종학력", exampleValue: "○○대학교 경영학과 졸업 (2015)" }, { label: "직업", isHeader: true }, { placeholder: "현직업", exampleValue: "회사원" }] },
  { fields: [{ label: "신원 진술 내용", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "신원 관련 사실을 진술합니다.", exampleValue: "본인은 위의 기재 사항이 사실임을 확인하며, 국가보안 관련 법령을 준수할 것을 서약합니다.", colspan: 4 }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 10일" }, { placeholder: "", exampleValue: "" }, { label: "진술인", isHeader: true }, { placeholder: "홍길동 (인)", exampleValue: "홍길동 (인)" }] },
];

export const 부문별직종별인원요구표_DATA = [
  { fields: [{ label: "부문별·직종별 인원요구표", colspan: 6, isHeader: true }] },
  { fields: [{ label: "부문", isHeader: true }, { label: "직종", isHeader: true }, { label: "현인원", isHeader: true }, { label: "요구인원", isHeader: true }, { label: "채용시기", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "영업부", exampleValue: "영업부" }, { placeholder: "영업사원", exampleValue: "영업사원" }, { placeholder: "10명", exampleValue: "10명" }, { placeholder: "2명", exampleValue: "2명" }, { placeholder: "2026-04", exampleValue: "2026-04" }, { placeholder: "경력 2년↑", exampleValue: "경력 2년↑" }] },
  { fields: [{ placeholder: "개발부", exampleValue: "개발부" }, { placeholder: "개발자", exampleValue: "개발자" }, { placeholder: "8명", exampleValue: "8명" }, { placeholder: "3명", exampleValue: "3명" }, { placeholder: "2026-05", exampleValue: "2026-05" }, { placeholder: "Java 가능자", exampleValue: "Java 가능자" }] },
];

export const 부양가족신고서_DATA = [
  { fields: [{ label: "부양가족 신고서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "신고인 성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "사번", isHeader: true }, { placeholder: "사번", exampleValue: "2019-0042" }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "신고일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }] },
  { fields: [{ label: "부양가족 현황", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "성명", isHeader: true }, { label: "관계", isHeader: true }, { label: "생년월일", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "배우자 성명", exampleValue: "김○○" }, { placeholder: "관계", exampleValue: "배우자" }, { placeholder: "YYYY-MM-DD", exampleValue: "1992-08-20" }, { placeholder: "비고", exampleValue: "소득 없음" }] },
  { fields: [{ placeholder: "자녀 성명", exampleValue: "홍○○" }, { placeholder: "관계", exampleValue: "자녀" }, { placeholder: "YYYY-MM-DD", exampleValue: "2020-03-15" }, { placeholder: "비고", exampleValue: "미취학" }] },
];

export const 설비투자계획서_DATA = [
  { fields: [{ label: "설비투자 계획서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }, { label: "작성자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }] },
  { fields: [{ label: "설비명", isHeader: true }, { placeholder: "설비 명칭", exampleValue: "생산라인 자동화 설비" }, { label: "도입 목적", isHeader: true }, { placeholder: "도입 목적", exampleValue: "생산 효율 30% 향상" }] },
  { fields: [{ label: "투자 금액", isHeader: true }, { placeholder: "금액", exampleValue: "150,000,000원" }, { label: "도입 시기", isHeader: true }, { placeholder: "YYYY-MM", exampleValue: "2026-06" }] },
  { fields: [{ label: "기대 효과", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "투자 기대 효과를 기재합니다.", exampleValue: "연간 인건비 절감 30,000,000원, 생산량 20% 증가 예상", colspan: 4 }] },
];

export const 신상명세서_DATA = [
  { fields: [{ label: "신상명세서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "1990-05-15" }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "현주소", exampleValue: "서울시 강남구 ○○로 123", colspan: 3 }] },
  { fields: [{ label: "최종학력", isHeader: true }, { placeholder: "최종학력", exampleValue: "○○대학교 경영학과 졸업" }, { label: "전공", isHeader: true }, { placeholder: "전공", exampleValue: "경영학" }] },
  { fields: [{ label: "경력", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "이전 경력을 기재합니다.", exampleValue: "△△회사 영업팀 (2017.03 ~ 2019.02)", colspan: 4 }] },
  { fields: [{ label: "특기사항", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "특기 또는 자격증을 기재합니다.", exampleValue: "운전면허 1종, 컴퓨터활용능력 2급", colspan: 4 }] },
];

export const 인사고과표_DATA = [
  { fields: [{ label: "인사고과표 (일반용)", colspan: 6, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "개발팀", exampleValue: "개발팀" }, { label: "직위", isHeader: true }, { placeholder: "과장", exampleValue: "과장" }, { label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }] },
  { fields: [{ label: "평가기간", isHeader: true }, { placeholder: "YYYY-01-01 ~ YYYY-12-31", exampleValue: "2025-01-01 ~ 2025-12-31" }, { label: "평가자", isHeader: true }, { placeholder: "평가자 성명", exampleValue: "김부장" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "평가 항목", isHeader: true, colspan: 3 }, { label: "배점", isHeader: true }, { label: "득점", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "업무 달성도", exampleValue: "업무 달성도", colspan: 3 }, { placeholder: "40", exampleValue: "40" }, { placeholder: "36", exampleValue: "36" }, { placeholder: "우수", exampleValue: "우수" }] },
  { fields: [{ placeholder: "직무 전문성", exampleValue: "직무 전문성", colspan: 3 }, { placeholder: "30", exampleValue: "30" }, { placeholder: "27", exampleValue: "27" }, { placeholder: "양호", exampleValue: "양호" }] },
  { fields: [{ placeholder: "협력·소통", exampleValue: "협력·소통", colspan: 3 }, { placeholder: "30", exampleValue: "30" }, { placeholder: "25", exampleValue: "25" }, { placeholder: "보통", exampleValue: "보통" }] },
  { fields: [{ label: "합계", isHeader: true, colspan: 3 }, { placeholder: "100", exampleValue: "100" }, { placeholder: "88", exampleValue: "88" }, { placeholder: "A등급", exampleValue: "A등급" }] },
];

export const 인사기록부_DATA = [
  { fields: [{ label: "인사기록부", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "사번", isHeader: true }, { placeholder: "2019-0042", exampleValue: "2019-0042" }] },
  { fields: [{ label: "입사일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2019-03-04" }, { label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }] },
  { fields: [{ label: "발령 이력", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "발령일", isHeader: true }, { label: "발령 내용", isHeader: true }, { label: "발령 부서", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "2019-03-04", exampleValue: "2019-03-04" }, { placeholder: "신규 채용", exampleValue: "신규 채용" }, { placeholder: "영업팀", exampleValue: "영업팀" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "2022-01-01", exampleValue: "2022-01-01" }, { placeholder: "승진", exampleValue: "승진 (사원→대리)" }, { placeholder: "영업팀", exampleValue: "영업팀" }, { placeholder: "비고", exampleValue: "" }] },
];

export const 인적사항_DATA = [
  { fields: [{ label: "인적사항", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "1990-05-15" }] },
  { fields: [{ label: "성별", isHeader: true }, { placeholder: "남/여", exampleValue: "남" }, { label: "국적", isHeader: true }, { placeholder: "국적", exampleValue: "대한민국" }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "현주소", exampleValue: "서울시 강남구 ○○로 123", colspan: 3 }] },
  { fields: [{ label: "연락처", isHeader: true }, { placeholder: "010-XXXX-XXXX", exampleValue: "010-1234-5678" }, { label: "이메일", isHeader: true }, { placeholder: "이메일 주소", exampleValue: "hong@example.com" }] },
  { fields: [{ label: "긴급연락처", isHeader: true }, { placeholder: "이름 / 관계 / 연락처", exampleValue: "홍아버지 / 부 / 010-9876-5432", colspan: 3 }] },
];

export const 입사지원서_DATA = [
  { fields: [{ label: "입사지원서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "지원 부서", isHeader: true }, { placeholder: "지원 부서명", exampleValue: "마케팅팀" }, { label: "지원 직위", isHeader: true }, { placeholder: "지원 직위", exampleValue: "대리" }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "1995-08-22" }] },
  { fields: [{ label: "최종학력", isHeader: true }, { placeholder: "최종학력", exampleValue: "○○대학교 마케팅학과 졸업 (2020)" }, { label: "경력", isHeader: true }, { placeholder: "경력연수", exampleValue: "3년" }] },
  { fields: [{ label: "지원 동기", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "지원 동기를 기재합니다.", exampleValue: "귀사의 디지털 마케팅 분야 성장 가능성에 매력을 느껴 지원하였습니다.", colspan: 4 }] },
  { fields: [{ label: "경력 사항", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "경력 사항을 기재합니다.", exampleValue: "△△회사 마케팅팀 (2020.03 ~ 2023.02) - SNS 마케팅 담당", colspan: 4 }] },
];

export const 직원채용품의서_DATA = [
  { fields: [{ label: "직원채용 품의서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }, { label: "작성부서", isHeader: true }, { placeholder: "부서명", exampleValue: "인사팀" }] },
  { fields: [{ label: "채용 부서", isHeader: true }, { placeholder: "채용 요청 부서", exampleValue: "개발팀" }, { label: "채용 인원", isHeader: true }, { placeholder: "채용 인원수", exampleValue: "2명" }] },
  { fields: [{ label: "채용 직위", isHeader: true }, { placeholder: "채용 직위", exampleValue: "선임 개발자" }, { label: "채용 사유", isHeader: true }, { placeholder: "채용 사유", exampleValue: "업무 확장에 따른 인력 보충" }] },
  { fields: [{ label: "채용 자격 요건", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "채용 자격 요건을 기재합니다.", exampleValue: "Java 개발 경력 3년 이상, Spring Boot 숙련자, 관련 학과 졸업자", colspan: 4 }] },
  { fields: [{ label: "채용 예정일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-04-01" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
];

export const 징계경고처분요구서_DATA = [
  { fields: [{ label: "징계·경고 처분요구서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "피징계자", isHeader: true }, { placeholder: "성명", exampleValue: "홍길동" }, { label: "부서/직위", isHeader: true }, { placeholder: "부서/직위", exampleValue: "영업팀 대리" }] },
  { fields: [{ label: "징계 요청 사유", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "징계 사유를 구체적으로 기재합니다.", exampleValue: "2026년 3월 5일 회사 내규를 위반하여 업무상 비밀을 외부에 유출한 사실이 확인됨", colspan: 4 }] },
  { fields: [{ label: "요청 처분 내용", isHeader: true }, { placeholder: "요청하는 징계 종류", exampleValue: "감봉 3개월" }, { label: "요청자", isHeader: true }, { placeholder: "요청자 성명", exampleValue: "김부장 (인)" }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 10일" }, { placeholder: "", exampleValue: "" }, { label: "부서장", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 추천서_DATA = [
  { fields: [{ label: "추 천 서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "추천 대상자", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "1995-08-22" }] },
  { fields: [{ label: "추천 목적", isHeader: true }, { placeholder: "추천 목적", exampleValue: "○○회사 마케팅팀 채용 지원" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "추천 내용", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "피추천인의 능력과 인품을 기재합니다.", exampleValue: "홍길동 씨는 재직 기간 동안 뛰어난 기획력과 성실함을 보여주었으며, 마케팅 분야에서 탁월한 성과를 거두었습니다. 조직 적응력이 뛰어나고 팀원들과의 협력도 원활합니다.", colspan: 4 }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 10일" }, { placeholder: "", exampleValue: "" }, { label: "추천인", isHeader: true }, { placeholder: "○○회사 대표이사 (인)", exampleValue: "○○회사 대표이사 (인)" }] },
];

export const 출장업무보고서_DATA = [
  { fields: [{ label: "출장 업무보고서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위/성명", isHeader: true }, { placeholder: "직위/성명", exampleValue: "대리 홍길동" }] },
  { fields: [{ label: "출장지", isHeader: true }, { placeholder: "출장 장소", exampleValue: "부산시 해운대구 ○○회사" }, { label: "출장 기간", isHeader: true }, { placeholder: "YYYY-MM-DD ~ YYYY-MM-DD", exampleValue: "2026-03-10 ~ 2026-03-11" }] },
  { fields: [{ label: "출장 목적", isHeader: true }, { placeholder: "출장 목적", exampleValue: "신규 거래처 영업 미팅 및 계약 체결", colspan: 3 }] },
  { fields: [{ label: "출장 결과", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "출장 성과를 기재합니다.", exampleValue: "거래처 담당자와 미팅 후 3개월 납품 계약 체결. 계약 금액 1억 5천만원.", colspan: 4 }] },
  { fields: [{ label: "후속 조치", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "후속 조치 사항을 기재합니다.", exampleValue: "다음 달 중 납품 일정 조율 및 계약서 작성 완료 예정", colspan: 4 }] },
];

export const 출장여비선급신청서_DATA = [
  { fields: [{ label: "출장여비 선급신청서 및 정산서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위/성명", isHeader: true }, { placeholder: "직위/성명", exampleValue: "대리 홍길동" }] },
  { fields: [{ label: "출장지", isHeader: true }, { placeholder: "출장 장소", exampleValue: "부산시 해운대구" }, { label: "출장 기간", isHeader: true }, { placeholder: "YYYY-MM-DD ~ YYYY-MM-DD", exampleValue: "2026-03-10 ~ 2026-03-11" }] },
  { fields: [{ label: "비용 항목", isHeader: true }, { label: "선급 신청액", isHeader: true }, { label: "실지출액", isHeader: true }, { label: "정산액", isHeader: true }] },
  { fields: [{ placeholder: "교통비", exampleValue: "교통비" }, { placeholder: "100,000원", exampleValue: "100,000원" }, { placeholder: "95,000원", exampleValue: "95,000원" }, { placeholder: "-5,000원", exampleValue: "-5,000원" }] },
  { fields: [{ placeholder: "숙박비", exampleValue: "숙박비" }, { placeholder: "80,000원", exampleValue: "80,000원" }, { placeholder: "80,000원", exampleValue: "80,000원" }, { placeholder: "0원", exampleValue: "0원" }] },
  { fields: [{ placeholder: "식비", exampleValue: "식비" }, { placeholder: "30,000원", exampleValue: "30,000원" }, { placeholder: "28,000원", exampleValue: "28,000원" }, { placeholder: "-2,000원", exampleValue: "-2,000원" }] },
  { fields: [{ label: "합계", isHeader: true }, { placeholder: "210,000원", exampleValue: "210,000원" }, { placeholder: "203,000원", exampleValue: "203,000원" }, { placeholder: "-7,000원 반납", exampleValue: "-7,000원 반납" }] },
];

export const 취학자녀신고서_DATA = [
  { fields: [{ label: "취학자녀 신고서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "신고인 성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }] },
  { fields: [{ label: "사번", isHeader: true }, { placeholder: "사번", exampleValue: "2019-0042" }, { label: "신고일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }] },
  { fields: [{ label: "자녀 성명", isHeader: true }, { placeholder: "홍○○", exampleValue: "홍○○" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2019-11-25" }] },
  { fields: [{ label: "취학 학교", isHeader: true }, { placeholder: "학교명", exampleValue: "○○초등학교" }, { label: "학년/반", isHeader: true }, { placeholder: "학년/반", exampleValue: "1학년 2반" }] },
  { fields: [{ label: "학자금 지원 신청 여부", isHeader: true }, { placeholder: "신청/미신청", exampleValue: "신청" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
];

export const 통지서_DATA = [
  { fields: [{ label: "통 지 서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "수신", isHeader: true }, { placeholder: "수신자 성명", exampleValue: "홍길동 귀하", colspan: 3 }] },
  { fields: [{ label: "발신", isHeader: true }, { placeholder: "회사명 및 직책", exampleValue: "(주)○○회사 대표이사 김○○", colspan: 3 }] },
  { fields: [{ label: "통지 제목", isHeader: true }, { placeholder: "통지 제목", exampleValue: "근무지 변경 통지", colspan: 3 }] },
  { fields: [{ label: "통지 내용", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "통지 내용을 기재합니다.", exampleValue: "귀하의 근무지를 아래와 같이 변경하오니 양지하시기 바랍니다.\n변경일: 2026년 4월 1일\n변경 전: 서울 본사 → 변경 후: 부산 지사", colspan: 4 }] },
  { fields: [{ placeholder: "YYYY년 MM월 DD일", exampleValue: "2026년 03월 10일" }, { placeholder: "", exampleValue: "" }, { label: "발신인", isHeader: true }, { placeholder: "(인)", exampleValue: "(인)" }] },
];

export const 해외위탁교육지원자신상조사서_DATA = [
  { fields: [{ label: "해외위탁교육 지원자 신상조사서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "1990-05-15" }] },
  { fields: [{ label: "부서/직위", isHeader: true }, { placeholder: "부서/직위", exampleValue: "개발팀 과장" }, { label: "입사일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2015-03-02" }] },
  { fields: [{ label: "교육 과정명", isHeader: true }, { placeholder: "교육 과정명", exampleValue: "AI 기술 해외 연수 프로그램" }, { label: "교육 국가", isHeader: true }, { placeholder: "교육 국가", exampleValue: "미국" }] },
  { fields: [{ label: "교육 기간", isHeader: true }, { placeholder: "YYYY-MM-DD ~ YYYY-MM-DD", exampleValue: "2026-06-01 ~ 2026-07-31" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "지원 동기", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "지원 동기를 기재합니다.", exampleValue: "AI 기술 역량 강화를 통해 회사 신사업에 기여하고자 합니다.", colspan: 4 }] },
];

export const 해외출장신청서_DATA = [
  { fields: [{ label: "해외출장 신청서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }, { label: "직위/성명", isHeader: true }, { placeholder: "직위/성명", exampleValue: "부장 김○○" }] },
  { fields: [{ label: "출장 국가", isHeader: true }, { placeholder: "출장 국가", exampleValue: "일본, 도쿄" }, { label: "출장 기간", isHeader: true }, { placeholder: "YYYY-MM-DD ~ YYYY-MM-DD", exampleValue: "2026-04-10 ~ 2026-04-13" }] },
  { fields: [{ label: "출장 목적", isHeader: true }, { placeholder: "출장 목적", exampleValue: "일본 거래처 △△社 영업 미팅 및 계약 협의", colspan: 3 }] },
  { fields: [{ label: "출장 인원", isHeader: true }, { placeholder: "인원 및 명단", exampleValue: "2명 (부장 김○○, 대리 이○○)" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "예상 비용", isHeader: true }, { placeholder: "예상 총 비용", exampleValue: "항공 600,000원 / 숙박 400,000원 / 기타 200,000원" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
];

export const 학자금지급사항_DATA = [
  { fields: [{ label: "학자금 지급사항", colspan: 4, isHeader: true }] },
  { fields: [{ label: "직원 성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "부서", isHeader: true }, { placeholder: "부서명", exampleValue: "영업팀" }] },
  { fields: [{ label: "사번", isHeader: true }, { placeholder: "사번", exampleValue: "2019-0042" }, { label: "지급 연도", isHeader: true }, { placeholder: "YYYY", exampleValue: "2026" }] },
  { fields: [{ label: "자녀 성명", isHeader: true }, { label: "학교명", isHeader: true }, { label: "학년", isHeader: true }, { label: "지급액", isHeader: true }] },
  { fields: [{ placeholder: "홍○○", exampleValue: "홍○○" }, { placeholder: "○○초등학교", exampleValue: "○○초등학교" }, { placeholder: "1학년", exampleValue: "1학년" }, { placeholder: "300,000원", exampleValue: "300,000원" }] },
  { fields: [{ placeholder: "홍△△", exampleValue: "홍△△" }, { placeholder: "○○중학교", exampleValue: "○○중학교" }, { placeholder: "2학년", exampleValue: "2학년" }, { placeholder: "500,000원", exampleValue: "500,000원" }] },
  { fields: [{ label: "합계", isHeader: true, colspan: 3 }, { placeholder: "800,000원", exampleValue: "800,000원" }] },
];

export const 학자금지급카드_DATA = [
  { fields: [{ label: "학자금 지급 카드", colspan: 4, isHeader: true }] },
  { fields: [{ label: "직원 성명", isHeader: true }, { placeholder: "홍길동", exampleValue: "홍길동" }, { label: "사번", isHeader: true }, { placeholder: "2019-0042", exampleValue: "2019-0042" }] },
  { fields: [{ label: "자녀 성명", isHeader: true }, { placeholder: "홍○○", exampleValue: "홍○○" }, { label: "생년월일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2019-11-25" }] },
  { fields: [{ label: "재학 학교", isHeader: true }, { placeholder: "학교명", exampleValue: "○○초등학교" }, { label: "학년", isHeader: true }, { placeholder: "학년", exampleValue: "1학년" }] },
  { fields: [{ label: "지급 내역", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "지급 연도", isHeader: true }, { label: "학기", isHeader: true }, { label: "지급액", isHeader: true }, { label: "지급일", isHeader: true }] },
  { fields: [{ placeholder: "2026", exampleValue: "2026" }, { placeholder: "1학기", exampleValue: "1학기" }, { placeholder: "300,000원", exampleValue: "300,000원" }, { placeholder: "2026-03-10", exampleValue: "2026-03-10" }] },
];

export const 회사행사예정표_DATA = [
  { fields: [{ label: "회사행사 예정표", colspan: 4, isHeader: true }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "YYYY-MM-DD", exampleValue: "2026-03-10" }, { label: "작성자", isHeader: true }, { placeholder: "총무팀 홍길동", exampleValue: "총무팀 홍길동" }] },
  { fields: [{ label: "대상 기간", isHeader: true }, { placeholder: "YYYY-MM ~ YYYY-MM", exampleValue: "2026-04 ~ 2026-06" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "일자", isHeader: true }, { label: "행사명", isHeader: true }, { label: "장소", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "2026-04-10", exampleValue: "2026-04-10" }, { placeholder: "행사명", exampleValue: "전직원 워크숍" }, { placeholder: "장소", exampleValue: "제주도 ○○리조트" }, { placeholder: "비고", exampleValue: "1박 2일" }] },
  { fields: [{ placeholder: "2026-05-15", exampleValue: "2026-05-15" }, { placeholder: "행사명", exampleValue: "창립기념식" }, { placeholder: "장소", exampleValue: "본사 대강당" }, { placeholder: "비고", exampleValue: "전직원 참석" }] },
  { fields: [{ placeholder: "2026-06-20", exampleValue: "2026-06-20" }, { placeholder: "행사명", exampleValue: "하반기 전략회의" }, { placeholder: "장소", exampleValue: "본사 회의실" }, { placeholder: "비고", exampleValue: "임원 이상" }] },
];

export const 회의의사록_DATA = [
  { fields: [{ label: "회의 의사록", colspan: 4, isHeader: true }] },
  { fields: [{ label: "회의명", isHeader: true }, { placeholder: "회의 명칭", exampleValue: "2026년 1분기 영업팀 회의" }, { label: "일시", isHeader: true }, { placeholder: "YYYY-MM-DD HH:MM", exampleValue: "2026-03-10 14:00" }] },
  { fields: [{ label: "장소", isHeader: true }, { placeholder: "회의 장소", exampleValue: "본사 3층 대회의실" }, { label: "사회자", isHeader: true }, { placeholder: "사회자 성명", exampleValue: "영업팀장 김○○" }] },
  { fields: [{ label: "참석자", isHeader: true }, { placeholder: "참석자 명단", exampleValue: "홍길동, 이철수, 박영희 외 5명", colspan: 3 }] },
  { fields: [{ label: "안건", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "안건 1", exampleValue: "안건 1. 1분기 영업 실적 검토" }, { placeholder: "처리 내용", exampleValue: "목표 대비 105% 달성, 우수 직원 포상 예정" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "안건 2", exampleValue: "안건 2. 2분기 영업 전략 논의" }, { placeholder: "처리 내용", exampleValue: "신규 지역 확장 및 신제품 판촉 계획 수립" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "결정 사항", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "결정 사항을 기재합니다.", exampleValue: "2분기 목표: 전년 동기 대비 120% 달성. 담당자: 홍길동 대리", colspan: 4 }] },
];
`;

const current = fs.readFileSync(fp, "utf8");
fs.writeFileSync(fp, current + addition, "utf8");
console.log("FormPreview.tsx에 배치2 DATA 35개 추가 완료");
