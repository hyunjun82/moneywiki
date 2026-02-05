// 청구서 양식 미리보기 데이터 (5개 - 실제 DOC 파일 기반)
// 실제 DOC 파일에서 추출한 정확한 양식 구조

interface FormField {
  label?: string;
  value?: string;
  placeholder?: string;
  colspan?: number;
  rowspan?: number;
  isHeader?: boolean;
  exampleValue?: string;
}

interface FormRow {
  fields: FormField[];
}

// ========================================
// 1. 청구서(물품).doc
// ========================================
export const 청구서_물품_DATA: FormRow[] = [
  {
    fields: [
      { label: "문서 제목", isHeader: true },
      { placeholder: "청구서", exampleValue: "청구서", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "청구일", isHeader: true },
      { placeholder: "년월일", exampleValue: "2026년 2월 5일", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "거래처명", exampleValue: "(주)ABC상사 귀하", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "합계금액", isHeader: true },
      { placeholder: "공급가액+세액", exampleValue: "일금 팔백이십오만원정 (8,250,000원)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "품명", isHeader: true },
      { label: "규격", isHeader: true },
      { label: "수량", isHeader: true },
      { label: "단가", isHeader: true },
      { label: "공급가액", isHeader: true },
      { label: "세액", isHeader: true },
      { label: "비고", isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "품목1", exampleValue: "사무용 의자" },
      { placeholder: "규격", exampleValue: "OO-2000" },
      { placeholder: "수량", exampleValue: "50EA" },
      { placeholder: "단가", exampleValue: "150,000" },
      { placeholder: "공급가액", exampleValue: "7,500,000" },
      { placeholder: "세액", exampleValue: "750,000" },
      { placeholder: "", exampleValue: "" }
    ]
  },
  {
    fields: [
      { placeholder: "품목2", exampleValue: "사무용 책상" },
      { placeholder: "규격", exampleValue: "OO-3000" },
      { placeholder: "수량", exampleValue: "30EA" },
      { placeholder: "단가", exampleValue: "250,000" },
      { placeholder: "공급가액", exampleValue: "7,500,000" },
      { placeholder: "세액", exampleValue: "750,000" },
      { placeholder: "", exampleValue: "" }
    ]
  },
  {
    fields: [
      { label: "계", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
      { placeholder: "공급가액 합계", exampleValue: "15,000,000" },
      { placeholder: "세액 합계", exampleValue: "1,500,000" },
      { placeholder: "", exampleValue: "" }
    ]
  },
  {
    fields: [
      { label: "공급자", isHeader: true },
      { placeholder: "회사 정보", exampleValue: "(주)XYZ산업\n대표이사: 김철수\n사업자번호: 123-45-67890\n주소: 서울시 강남구 테헤란로 123\n전화: 02-1234-5678", colspan: 3 }
    ]
  }
];

// ========================================
// 2. 공사대금 청구서.doc
// ========================================
export const 공사대금청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "문서 제목", isHeader: true },
      { placeholder: "청구서", exampleValue: "청구서 (공사대금)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "1. 계약 내역", isHeader: true, colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "계약건명", isHeader: true },
      { placeholder: "공사명", exampleValue: "서울시 강남구 OO아파트 신축공사", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "계약금액", isHeader: true },
      { placeholder: "총 계약금액", exampleValue: "금 일십억원정 (₩1,000,000,000)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "계약년월일", isHeader: true },
      { placeholder: "계약일", exampleValue: "2025년 6월 1일", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "준공(납품)기한", isHeader: true },
      { placeholder: "예정일", exampleValue: "2026년 12월 31일", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "준공(납품)년월일", isHeader: true },
      { placeholder: "실제 준공일", exampleValue: "2026년 11월 30일 (※ 미완료 시 공란)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "2. 청구 내역", isHeader: true, colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "청구구분", isHeader: true },
      { placeholder: "구분", exampleValue: "제3회 기성금 (선금/기성금/준공금/납품금 중 선택)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "청구금액", isHeader: true },
      { placeholder: "청구액", exampleValue: "금 일억오천만원정 (₩150,000,000)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "송금계좌", isHeader: true },
      { placeholder: "계좌 정보", exampleValue: "예금주: (주)△△건업\n은행: 국민은행 강남지점\n계좌번호: 123-45-67890", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "청구일", isHeader: true },
      { placeholder: "날짜", exampleValue: "2026년 2월 5일", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "위 청구인", isHeader: true },
      { placeholder: "청구인 정보", exampleValue: "주소: 경기도 성남시 분당구 OO로 123\n상호: (주)△△건업\n대표자: 박시공 (인)\n전화번호: 031-1234-5678", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "발주처", exampleValue: "OO건설(주) 귀하", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "※ 주의사항", isHeader: true },
      { placeholder: "안내", exampleValue: "계약도장과 청구서의 도장이 상이할 시는 인감증명 및 사용인감신고서 첨부", colspan: 3 }
    ]
  }
];

// ========================================
// 3. 기성고 청구서.doc
// ========================================
export const 기성고청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "문서 제목", isHeader: true },
      { placeholder: "기성고 청구 내역서", exampleValue: "기성고 청구 내역서", colspan: 6 }
    ]
  },
  {
    fields: [
      { label: "번호", isHeader: true },
      { label: "공사명", isHeader: true },
      { label: "총 계약금액", isHeader: true },
      { label: "전회 기성금", isHeader: true },
      { label: "금회 기성금", isHeader: true },
      { label: "잔여 기성금", isHeader: true },
      { label: "비고", isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "1", exampleValue: "1" },
      { placeholder: "공사명", exampleValue: "서울시 강남구 OO아파트 신축공사" },
      { placeholder: "총액", exampleValue: "1,000,000,000" },
      { placeholder: "전회", exampleValue: "300,000,000" },
      { placeholder: "금회", exampleValue: "150,000,000" },
      { placeholder: "잔액", exampleValue: "550,000,000" },
      { placeholder: "", exampleValue: "진행률 45%" }
    ]
  },
  {
    fields: [
      { placeholder: "2", exampleValue: "2" },
      { placeholder: "공사명", exampleValue: "경기도 성남시 OO빌딩 리모델링" },
      { placeholder: "총액", exampleValue: "500,000,000" },
      { placeholder: "전회", exampleValue: "200,000,000" },
      { placeholder: "금회", exampleValue: "100,000,000" },
      { placeholder: "잔액", exampleValue: "200,000,000" },
      { placeholder: "", exampleValue: "진행률 60%" }
    ]
  },
  {
    fields: [
      { placeholder: "3", exampleValue: "3" },
      { placeholder: "공사명", exampleValue: "인천시 부평구 OO상가 건축" },
      { placeholder: "총액", exampleValue: "800,000,000" },
      { placeholder: "전회", exampleValue: "400,000,000" },
      { placeholder: "금회", exampleValue: "200,000,000" },
      { placeholder: "잔액", exampleValue: "200,000,000" },
      { placeholder: "", exampleValue: "진행률 75%" }
    ]
  },
  {
    fields: [
      { label: "합계", isHeader: true },
      { placeholder: "", exampleValue: "" },
      { placeholder: "총액", exampleValue: "2,300,000,000" },
      { placeholder: "전회 합계", exampleValue: "900,000,000" },
      { placeholder: "금회 합계", exampleValue: "450,000,000" },
      { placeholder: "잔액 합계", exampleValue: "950,000,000" },
      { placeholder: "", exampleValue: "" }
    ]
  },
  {
    fields: [
      { label: "청구인", isHeader: true },
      { placeholder: "회사 정보", exampleValue: "(주)△△건업\n대표이사: 박시공\n주소: 경기도 성남시 분당구 OO로 123\n전화: 031-1234-5678", colspan: 6 }
    ]
  },
  {
    fields: [
      { label: "※ 단위", isHeader: true },
      { placeholder: "안내", exampleValue: "금액 단위: 원", colspan: 6 }
    ]
  }
];

// ========================================
// 4. 납품 청구서.doc
// ========================================
export const 납품청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "문서 제목", isHeader: true },
      { placeholder: "납품 청구서", exampleValue: "납품 청구서", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "청구 내용", isHeader: true, colspan: 4 }
    ]
  },
  {
    fields: [
      { placeholder: "본문", exampleValue: "당사는 귀사에 대해 2025년 12월 15일부로 귀사의 제품 '사무용 의자(모델: OO-2000)' 50개를 납품기한 2026년 1월 31일까지 납품하기로 하고 발주했습니다만, 상기의 납품기한을 지난 현재까지도 납품이 이루어지지 않는 관계로 당사가 매우 곤란한 처지에 놓였습니다.\n\n따라서 위 내용을 즉시 이행하여주시기 바라며 본 청구서를 귀사에 보내드립니다.", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "청구일", isHeader: true },
      { placeholder: "날짜", exampleValue: "2026년 2월 5일", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "청구인", isHeader: true },
      { placeholder: "청구인 정보", exampleValue: "주소: 서울시 강남구 테헤란로 123\n성명: (주)ABC상사 대표이사 김철수 (인)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "수취인", isHeader: true },
      { placeholder: "납품업체", exampleValue: "주소: 경기도 성남시 분당구 OO로 456\n성명: (주)XYZ산업 대표이사 이민수 귀하", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "※ 참고", isHeader: true },
      { placeholder: "안내", exampleValue: "• 발주일: 2025년 12월 15일\n• 납품 예정일: 2026년 1월 31일\n• 납품 품목: 사무용 의자(모델: OO-2000) 50개\n• 미납 상태: 2026년 2월 5일 현재 미납품", colspan: 3 }
    ]
  }
];

// ========================================
// 5. 임대료 증액청구서.doc
// ========================================
export const 임대료증액청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "문서 제목", isHeader: true },
      { placeholder: "임대료 증액 청구서", exampleValue: "임대료 증액 청구서", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "※ 임대부동산의 표시", isHeader: true, colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "주소", exampleValue: "서울시 강남구 역삼동 123번지 (OO아파트 101동 202호)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "토지", isHeader: true },
      { placeholder: "토지 정보", exampleValue: "대지면적: 100㎡", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "기존 임대료", isHeader: true },
      { placeholder: "현재 임대료", exampleValue: "월 1,000,000원" }
    ]
  },
  {
    fields: [
      { label: "증액후 임대료", isHeader: true },
      { placeholder: "증액 후 금액", exampleValue: "월 1,050,000원 (5% 증액)" }
    ]
  },
  {
    fields: [
      { label: "적용시기", isHeader: true },
      { placeholder: "적용 시작일", exampleValue: "2026년 3월 1일분부터" }
    ]
  },
  {
    fields: [
      { label: "증액 사유", isHeader: true },
      { placeholder: "사유", exampleValue: "• 물가상승률 반영 (최근 1년간 소비자물가 상승률 3.5%)\n• 인근 시세 고려 (인근 동일 평형 시세 대비 저렴)\n• 주택임대차보호법 제7조에 따라 5% 이내 증액", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "청구일", isHeader: true },
      { placeholder: "날짜", exampleValue: "2026년 2월 5일", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "임대인", isHeader: true },
      { placeholder: "임대인 정보", exampleValue: "주소: 서울시 송파구 OO로 456\n성명: 이민대 (인)", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "임차인", isHeader: true },
      { placeholder: "임차인", exampleValue: "주소: 서울시 강남구 역삼동 123번지 (OO아파트 101동 202호)\n성명: 김임차 귀하", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "※ 참고", isHeader: true },
      { placeholder: "법적 근거", exampleValue: "주택임대차보호법 제7조(차임 등의 증감청구권)\n임대인은 약정한 차임이나 보증금이 임차주택에 관한 조세, 공과금, 그 밖의 부담의 증감이나 경제 사정의 변동으로 인하여 상당하지 아니하게 된 때에는 장래에 대하여 그 증감을 청구할 수 있다. 다만, 증액의 경우에는 대통령령으로 정하는 기준에 따른 비율을 초과하지 못한다. (현행 5% 상한)", colspan: 3 }
    ]
  }
];

// Export all forms
export const DOC_FORMS_DATA = {
  "청구서(물품)": 청구서_물품_DATA,
  "공사대금 청구서": 공사대금청구서_DATA,
  "기성고 청구서": 기성고청구서_DATA,
  "납품 청구서": 납품청구서_DATA,
  "임대료 증액청구서": 임대료증액청구서_DATA,
};
