"use client";

interface FormField {
  label?: string;
  value?: string;
  placeholder?: string;
  colspan?: number;
  rowspan?: number;
  isHeader?: boolean;
  // 작성 예시 모드용 필드
  exampleValue?: string; // 빨간색으로 표시될 작성 예시 값
}

interface FormRow {
  fields: FormField[];
}

interface FormPreviewProps {
  title: string;
  rows: FormRow[];
  className?: string;
  mode?: "preview" | "example"; // preview: 빈 양식, example: 작성 예시 (빨간색)
}

export default function FormPreview({ title, rows, className = "", mode = "preview" }: FormPreviewProps) {
  const isExampleMode = mode === "example";

  return (
    <div className={`bg-white border border-neutral-200 rounded-lg overflow-hidden ${className}`}>
      {/* 제목 바 */}
      <div className={`px-4 py-3 border-b border-neutral-200 ${isExampleMode ? "bg-blue-50" : "bg-neutral-50"}`}>
        <h3 className="font-semibold text-neutral-800">
          {title}
          {isExampleMode && <span className="ml-2 text-sm text-blue-600 font-normal">(작성 예시)</span>}
        </h3>
      </div>

      {/* 양식 미리보기 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-neutral-200 last:border-b-0">
                {row.fields.map((field, fieldIndex) => (
                  <td
                    key={fieldIndex}
                    colSpan={field.colspan || 1}
                    rowSpan={field.rowspan || 1}
                    className={`
                      border-r border-neutral-200 last:border-r-0 px-3 py-2.5
                      ${field.isHeader
                        ? "bg-neutral-50 font-medium text-neutral-700 text-sm w-32"
                        : "bg-white text-neutral-600 text-sm"
                      }
                    `}
                  >
                    {field.isHeader ? (
                      field.label
                    ) : isExampleMode && field.exampleValue ? (
                      // 작성 예시 모드: 파란색으로 예시 값 표시 (한국 문화상 이름에 빨간색 기피)
                      <span className="text-blue-600 font-medium">{field.exampleValue}</span>
                    ) : field.value ? (
                      <span className="text-neutral-800">{field.value}</span>
                    ) : (
                      <span className="text-neutral-400 italic">{field.placeholder || "입력란"}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 작성 예시 모드일 때 범례 */}
      {isExampleMode && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 text-xs text-blue-600">
          <span className="font-medium text-blue-600">파란색 텍스트</span> = 실제 작성 예시 (본인 상황에 맞게 수정하세요)
        </div>
      )}
    </div>
  );
}

// 표준근로계약서 미리보기 데이터 (고용노동부 표준양식 기준)
export const 표준근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 근로개시일", isHeader: true },
      { placeholder: "____년 __월 __일부터", exampleValue: "2026년 1월 15일부터", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 근무장소", isHeader: true },
      { placeholder: "(입력란)", exampleValue: "서울특별시 강남구 테헤란로 123, OO빌딩 5층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 업무의 내용", isHeader: true },
      { placeholder: "(입력란)", exampleValue: "마케팅 기획 및 SNS 콘텐츠 제작", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 소정근로시간", isHeader: true },
      { placeholder: "__시 __분 ~ __시 __분 (휴게: __시 __분 ~ __시 __분)", exampleValue: "09시 00분 ~ 18시 00분 (휴게: 12시 00분 ~ 13시 00분)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "5. 근무일/휴일", isHeader: true },
      { placeholder: "매주 __일 근무, 주휴일 매주 __요일", exampleValue: "매주 5일 근무 (월~금), 주휴일 매주 일요일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "6. 임금", isHeader: true },
      { placeholder: "월(일, 시간)급: ________원", exampleValue: "월급: 2,800,000원 (세전)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )", exampleValue: "있음 (연 200만원, 설/추석)" },
      { label: "기타 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]", exampleValue: "식대 10만원/월, 교통비 10만원/월" },
    ],
  },
  {
    fields: [
      { label: "임금지급일", isHeader: true },
      { placeholder: "매월(매주) __일", exampleValue: "매월 25일" },
      { label: "지급방법", isHeader: true },
      { placeholder: "직접지급 [  ] / 계좌입금 [  ]", exampleValue: "계좌입금 [V]" },
    ],
  },
  {
    fields: [
      { label: "7. 연차유급휴가", isHeader: true },
      { placeholder: "근로기준법에서 정하는 바에 따라 부여", exampleValue: "근로기준법에서 정하는 바에 따라 부여 (1년 미만: 월 1일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "8. 사회보험", isHeader: true },
      { placeholder: "4대 보험 (고용/산재/국민연금/건강보험) 적용", exampleValue: "4대 보험 전부 적용 (입사일로부터)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명:          대표자:          (서명)", exampleValue: "사업체명: (주)OO컴퍼니 | 대표자: 홍길동 (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "성명:              연락처:          (서명)", exampleValue: "성명: 김철수 | 연락처: 010-1234-5678 (서명)", colspan: 3 },
    ],
  },
];

// 단시간근로계약서 (알바) 미리보기 데이터 (고용노동부 표준양식 기준)
export const 단시간근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 근로개시일", isHeader: true },
      { placeholder: "____년 __월 __일부터", exampleValue: "2026년 2월 1일부터", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 근무장소", isHeader: true },
      { placeholder: "(입력란)", exampleValue: "서울시 마포구 홍대입구역 OO카페", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 업무의 내용", isHeader: true },
      { placeholder: "(입력란)", exampleValue: "카페 홀서빙 및 음료 제조 보조", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 근로일별 근로시간", isHeader: true },
      { placeholder: "요일별 시작/종료/휴게시간 기재 (표 형태)", exampleValue: "월/수/금 14:00~20:00 (휴게 30분)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주휴일", isHeader: true },
      { placeholder: "매주 __요일", exampleValue: "매주 일요일" },
      { label: "공휴일", isHeader: true },
      { placeholder: "근로기준법에 따름", exampleValue: "근로기준법에 따름" },
    ],
  },
  {
    fields: [
      { label: "5. 임금", isHeader: true },
      { placeholder: "시간(일, 월)급: ________원", exampleValue: "시간급: 10,320원 (2026년 최저임금)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )", exampleValue: "없음" },
      { label: "기타 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]", exampleValue: "식대 제공" },
    ],
  },
  {
    fields: [
      { label: "초과근로 가산임금률", isHeader: true },
      { placeholder: "______% (통상임금의 50% 이상)", exampleValue: "50% (통상임금의 50% 이상)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임금지급일", isHeader: true },
      { placeholder: "매월(매주) __일", exampleValue: "매월 10일" },
      { label: "지급방법", isHeader: true },
      { placeholder: "직접지급 [  ] / 계좌입금 [  ]", exampleValue: "계좌입금 [V]" },
    ],
  },
  {
    fields: [
      { label: "6. 연차유급휴가", isHeader: true },
      { placeholder: "통상근로자 근로시간에 비례하여 부여", exampleValue: "통상근로자 근로시간에 비례하여 부여", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "7. 사회보험", isHeader: true },
      { placeholder: "4대 보험 (고용/산재/국민연금/건강보험) 적용", exampleValue: "4대 보험 적용 (주 15시간 이상 근무 시)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명:          대표자:          (서명)", exampleValue: "사업체명: OO카페 | 대표자: 박영희 (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "성명:              연락처:          (서명)", exampleValue: "성명: 이민수 | 연락처: 010-9876-5432 (서명)", colspan: 3 },
    ],
  },
];

// 기간제근로계약서 (계약직) 미리보기 데이터 (고용노동부 표준양식 기준)
export const 기간제근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 근로계약기간", isHeader: true },
      { placeholder: "____년 __월 __일부터 ____년 __월 __일까지", exampleValue: "2026년 3월 1일부터 2027년 2월 28일까지 (1년)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 근무장소", isHeader: true },
      { placeholder: "(입력란)", exampleValue: "서울시 영등포구 여의도동 OO증권 본사", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 업무의 내용", isHeader: true },
      { placeholder: "(입력란)", exampleValue: "프로젝트 기반 데이터 분석 및 보고서 작성", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 소정근로시간", isHeader: true },
      { placeholder: "__시 __분 ~ __시 __분 (휴게: __시 __분 ~ __시 __분)", exampleValue: "09시 00분 ~ 18시 00분 (휴게: 12시 00분 ~ 13시 00분)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "5. 근무일/휴일", isHeader: true },
      { placeholder: "매주 __일 근무, 주휴일 매주 __요일", exampleValue: "매주 5일 근무 (월~금), 주휴일 매주 토/일요일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "6. 임금", isHeader: true },
      { placeholder: "월(일, 시간)급: ________원", exampleValue: "월급: 3,200,000원 (세전)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )", exampleValue: "없음 (계약 종료 시 성과급 별도 협의)" },
      { label: "기타 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]", exampleValue: "식대 15만원/월" },
    ],
  },
  {
    fields: [
      { label: "임금지급일", isHeader: true },
      { placeholder: "매월(매주) __일", exampleValue: "매월 25일" },
      { label: "지급방법", isHeader: true },
      { placeholder: "직접지급 [  ] / 계좌입금 [  ]", exampleValue: "계좌입금 [V]" },
    ],
  },
  {
    fields: [
      { label: "7. 연차유급휴가", isHeader: true },
      { placeholder: "근로기준법에서 정하는 바에 따라 부여", exampleValue: "근로기준법에 따라 부여 (1년 미만: 월 1일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "8. 사회보험", isHeader: true },
      { placeholder: "4대 보험 (고용/산재/국민연금/건강보험) 적용", exampleValue: "4대 보험 전부 적용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명:          대표자:          (서명)", exampleValue: "사업체명: (주)OO증권 | 대표자: 최현우 (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "성명:              연락처:          (서명)", exampleValue: "성명: 정수현 | 연락처: 010-5555-1234 (서명)", colspan: 3 },
    ],
  },
];

// 임대차계약서 미리보기 데이터 (법무부 표준양식 기준)
export const 임대차계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "부동산의 표시", isHeader: true },
      { placeholder: "소재지: (주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 101동 1001호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임대할 부분", isHeader: true },
      { placeholder: "건물 __층 __호 (면적 __㎡)", exampleValue: "건물 10층 1001호 (전용면적 84.5㎡)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "보증금", isHeader: true },
      { placeholder: "금 ________원정", exampleValue: "금 삼억원정 (₩300,000,000)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약금", isHeader: true },
      { placeholder: "금 ________원정 (계약 시)", exampleValue: "금 삼천만원정 (계약 시 지급)" },
      { label: "잔금", isHeader: true },
      { placeholder: "금 ________원정", exampleValue: "금 이억칠천만원 (입주일 지급)" },
    ],
  },
  {
    fields: [
      { label: "월세 (차임)", isHeader: true },
      { placeholder: "금 ________원 (매월 __일 지급)", exampleValue: "해당없음 (전세)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임대차 기간", isHeader: true },
      { placeholder: "____년 __월 __일부터 ____년 __월 __일까지", exampleValue: "2026년 2월 1일부터 2028년 1월 31일까지 (2년)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true },
      { placeholder: "(당사자 간 합의 사항)", exampleValue: "1. 도배, 장판 신규 교체 후 입주\n2. 에어컨 2대 포함\n3. 관리비 별도 (약 15만원/월)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임대인 (갑)", isHeader: true },
      { placeholder: "성명:          주민등록번호:          (인)", exampleValue: "성명: 홍길동 | 주민등록번호: 700101-1****** (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임차인 (을)", isHeader: true },
      { placeholder: "성명:          주민등록번호:          (인)", exampleValue: "성명: 김철수 | 주민등록번호: 900515-1****** (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "중개업자", isHeader: true },
      { placeholder: "상호:          등록번호:          (인)", exampleValue: "상호: OO공인중개사 | 등록번호: 11680-2024-00123 (인)", colspan: 3 },
    ],
  },
];

// 사직서 미리보기 데이터
export const 사직서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "사 직 서", exampleValue: "사 직 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동", colspan: 1 },
      { label: "소속", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "개발팀" },
    ],
  },
  {
    fields: [
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "대리", colspan: 1 },
      { label: "입사일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2022년 3월 2일" },
    ],
  },
  {
    fields: [
      { label: "퇴직 희망일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 28일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사직 사유", isHeader: true },
      { placeholder: "(사직 사유를 기재하세요)", exampleValue: "일신상의 사유로 사직합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 홍길동 (인)", colspan: 3 },
    ],
  },
];

// 위임장 미리보기 데이터
export const 위임장_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "위 임 장", exampleValue: "위 임 장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "위임인", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "800101-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123" },
    ],
  },
  {
    fields: [
      { label: "수임인 (대리인)", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김철수" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "900515-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 서초구 서초대로 456" },
    ],
  },
  {
    fields: [
      { label: "위임 내용", isHeader: true },
      { placeholder: "(위임하는 업무 내용)", exampleValue: "주민등록등본 발급 업무 일체", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "위임인", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 홍길동 (인)", colspan: 3 },
    ],
  },
];

// 내용증명 양식
export const 내용증명_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "내 용 증 명", exampleValue: "내 용 증 명", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발신인", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "홍길동", exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "서울시 강남구 역삼동 123-45", exampleValue: "서울시 강남구 역삼동 123-45" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "010-1234-5678", exampleValue: "010-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "수신인", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "김철수", exampleValue: "김철수" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "서울시 서초구 서초동 456-78", exampleValue: "서울시 서초구 서초동 456-78" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "010-9876-5432", exampleValue: "010-9876-5432" },
    ],
  },
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "임대차보증금 반환 청구의 건", exampleValue: "임대차보증금 반환 청구의 건", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      {
        placeholder: "1. 귀하와 본인은 2024년 1월 15일 아래 부동산에 대하여 임대차계약을 체결하였습니다.\n\n2. 계약 내용:\n   - 소재지: 서울시 강남구 역삼동 123-45\n   - 보증금: 5,000만원\n   - 계약기간: 2024.1.15 ~ 2026.1.14\n\n3. 본인은 계약 만료일인 2026년 1월 14일까지 위 부동산을 명도할 예정이오니, 귀하는 계약 만료일에 보증금 5,000만원을 반환하여 주시기 바랍니다.\n\n4. 만약 정당한 사유 없이 보증금 반환을 지체할 경우, 법적 조치를 취할 것임을 통보합니다.",
        exampleValue: "1. 귀하와 본인은 2024년 1월 15일 아래 부동산에 대하여 임대차계약을 체결하였습니다.\n\n2. 계약 내용:\n   - 소재지: 서울시 강남구 역삼동 123-45\n   - 보증금: 5,000만원\n   - 계약기간: 2024.1.15 ~ 2026.1.14\n\n3. 본인은 계약 만료일인 2026년 1월 14일까지 위 부동산을 명도할 예정이오니, 귀하는 계약 만료일에 보증금 5,000만원을 반환하여 주시기 바랍니다.\n\n4. 만약 정당한 사유 없이 보증금 반환을 지체할 경우, 법적 조치를 취할 것임을 통보합니다.",
        colspan: 2,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "발신인", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 홍길동 (인)", colspan: 2 },
    ],
  },
];

// 견적서 양식
export const 견적서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "견 적 서", exampleValue: "견 적 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "견적번호", isHeader: true },
      { placeholder: "QT-2026-001", exampleValue: "QT-2026-0115" },
      { label: "견적일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true, rowspan: 3 },
      { label: "상호", isHeader: true },
      { placeholder: "(거래처명)", exampleValue: "(주)한국무역", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "담당자", isHeader: true },
      { placeholder: "(담당자명)", exampleValue: "김담당 과장", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "010-0000-0000", exampleValue: "02-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "발신", isHeader: true, rowspan: 4 },
      { label: "상호", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니위키솔루션", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "사업자번호", isHeader: true },
      { placeholder: "000-00-00000", exampleValue: "123-45-67890", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "홍길동", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "000-0000-0000", exampleValue: "02-9876-5432", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "품목", isHeader: true },
      { label: "수량", isHeader: true },
      { label: "단가", isHeader: true },
      { label: "금액", isHeader: true },
    ],
  },
  {
    fields: [
      { placeholder: "(품목명)", exampleValue: "홈페이지 제작" },
      { placeholder: "1", exampleValue: "1" },
      { placeholder: "0", exampleValue: "3,000,000" },
      { placeholder: "0", exampleValue: "3,000,000" },
    ],
  },
  {
    fields: [
      { placeholder: "(품목명)", exampleValue: "서버 호스팅 (1년)" },
      { placeholder: "1", exampleValue: "1" },
      { placeholder: "0", exampleValue: "500,000" },
      { placeholder: "0", exampleValue: "500,000" },
    ],
  },
  {
    fields: [
      { placeholder: "(품목명)", exampleValue: "유지보수 (월)" },
      { placeholder: "12", exampleValue: "12" },
      { placeholder: "0", exampleValue: "100,000" },
      { placeholder: "0", exampleValue: "1,200,000" },
    ],
  },
  {
    fields: [
      { label: "공급가액", isHeader: true, colspan: 3 },
      { placeholder: "0", exampleValue: "4,700,000" },
    ],
  },
  {
    fields: [
      { label: "부가세 (10%)", isHeader: true, colspan: 3 },
      { placeholder: "0", exampleValue: "470,000" },
    ],
  },
  {
    fields: [
      { label: "합계금액", isHeader: true, colspan: 3 },
      { placeholder: "0", exampleValue: "5,170,000" },
    ],
  },
  {
    fields: [
      { label: "유효기간", isHeader: true },
      { placeholder: "발행일로부터 30일", exampleValue: "발행일로부터 30일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "비고", isHeader: true },
      { placeholder: "(특이사항 기재)", exampleValue: "계약금 30% 선입금 시 착수", colspan: 3 },
    ],
  },
];

// 각서 양식
export const 각서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "각    서", exampleValue: "각    서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000", exampleValue: "850101-1234567", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼동 123-45", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "상대방", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김철수", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000", exampleValue: "900515-2345678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 서초동 456-78", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "각서 내용", isHeader: true },
      {
        placeholder: "본인 홍길동은 아래 내용을 확약하며, 이를 위반할 경우 민·형사상 책임을 지겠습니다.\n\n1. 본인은 2026년 2월 28일까지 상대방 김철수에게 금 1,000만원을 변제하겠습니다.\n\n2. 변제 방법은 상대방 계좌(신한은행 110-123-456789)로 입금합니다.\n\n3. 위 기한 내 변제하지 못할 경우, 연 20%의 지연이자를 가산하여 지급하겠습니다.\n\n4. 위 약속을 어길 경우 법적 조치에 이의를 제기하지 않겠습니다.",
        exampleValue: "본인 홍길동은 아래 내용을 확약하며, 이를 위반할 경우 민·형사상 책임을 지겠습니다.\n\n1. 본인은 2026년 2월 28일까지 상대방 김철수에게 금 1,000만원을 변제하겠습니다.\n\n2. 변제 방법은 상대방 계좌(신한은행 110-123-456789)로 입금합니다.\n\n3. 위 기한 내 변제하지 못할 경우, 연 20%의 지연이자를 가산하여 지급하겠습니다.\n\n4. 위 약속을 어길 경우 법적 조치에 이의를 제기하지 않겠습니다.",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 홍길동 (인)", colspan: 3 },
    ],
  },
];

// 경위서 양식
export const 경위서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "경 위 서", exampleValue: "경 위 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true, rowspan: 3 },
      { label: "소속", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "영업팀", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "직위", isHeader: true },
      { placeholder: "(직급)", exampleValue: "대리", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "발생일시", isHeader: true },
      { placeholder: "____년 __월 __일 __시", exampleValue: "2026년 1월 10일 14시 30분", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발생장소", isHeader: true },
      { placeholder: "(장소)", exampleValue: "본사 3층 회의실", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "관련자", isHeader: true },
      { placeholder: "(관련된 사람들)", exampleValue: "영업팀 김과장, 재무팀 이대리", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사건 경위", isHeader: true },
      {
        placeholder: "1. 발생 배경\n   (사건이 발생하게 된 배경을 기술합니다)\n\n2. 사건 경과\n   - __시 __분: (발생 내용)\n   - __시 __분: (후속 상황)\n   - __시 __분: (조치 내용)\n\n3. 현재 상황\n   (현재 어떤 상태인지 기술합니다)\n\n4. 향후 조치 계획\n   (재발 방지 등 향후 계획을 기술합니다)",
        exampleValue: "1. 발생 배경\n   고객사 A사와의 계약 관련 회의 중 계약조건 변경 요청이 있었습니다.\n\n2. 사건 경과\n   - 14시 30분: 고객사 담당자가 납기일 단축을 요청\n   - 14시 45분: 본인이 팀장 승인 없이 납기 단축 구두 합의\n   - 15시 30분: 생산팀 확인 결과 납기 단축 불가 통보 받음\n\n3. 현재 상황\n   고객사에 납기일 재조정 요청 중이며, 담당자와 협의 진행 중입니다.\n\n4. 향후 조치 계획\n   향후 계약조건 변경 시 반드시 팀장 승인 후 진행하겠습니다.",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 홍길동 (인)", colspan: 3 },
    ],
  },
];

// 고소장 양식
export const 고소장_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "고 소 장", exampleValue: "고 소 장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고소인", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000", exampleValue: "850101-1234567", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼동 123-45", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "010-0000-0000", exampleValue: "010-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "피고소인", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김철수", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000 (알 수 없으면 '불상')", exampleValue: "불상", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 서초동 456-78", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "010-0000-0000", exampleValue: "010-9876-5432", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "고소 죄명", isHeader: true },
      { placeholder: "(해당 죄명)", exampleValue: "사기죄 (형법 제347조)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고소 취지", isHeader: true },
      {
        placeholder: "피고소인을 위 죄명으로 고소하오니 엄벌에 처해주시기 바랍니다.",
        exampleValue: "피고소인 김철수를 사기죄로 고소하오니, 철저히 수사하여 엄벌에 처해주시기 바랍니다.",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "범죄 사실", isHeader: true },
      {
        placeholder: "1. 피해 일시: ____년 __월 __일\n2. 피해 장소: (장소)\n3. 피해 내용:\n   (구체적인 범죄 사실을 기술합니다)",
        exampleValue: "1. 피해 일시: 2025년 12월 15일\n2. 피해 장소: 서울시 강남구 소재 커피숍\n3. 피해 내용:\n   피고소인 김철수는 2025년 12월 15일, 고소인에게 '투자하면 월 20% 수익 보장'이라며 3,000만원을 투자받았습니다. 그러나 피고소인은 처음부터 투자 의사나 능력이 없었으며, 해당 금원을 편취하여 개인 용도로 사용하였습니다.",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "증거자료", isHeader: true },
      {
        placeholder: "1. 계좌이체 내역서\n2. 카카오톡 대화 캡처\n3. 약정서 사본",
        exampleValue: "1. 계좌이체 내역서 1부\n2. 카카오톡 대화 캡처본 1부\n3. 투자 약정서 사본 1부\n4. 녹음 파일 1건",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "____경찰서 귀중", exampleValue: "서울강남경찰서 귀중", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고소인", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 홍길동 (인)", colspan: 3 },
    ],
  },
];

// 고발장 양식
export const 고발장_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "고 발 장", exampleValue: "고 발 장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고발인", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이영희", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000", exampleValue: "800515-2345678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 마포구 합정동 789-12", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "010-0000-0000", exampleValue: "010-5555-6666", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "피고발인", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명 또는 상호)", exampleValue: "(주)가짜식품", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 성남시 분당구 판교로 100", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "박사장", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "고발 죄명", isHeader: true },
      { placeholder: "(해당 죄명)", exampleValue: "식품위생법 위반", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고발 취지", isHeader: true },
      {
        placeholder: "피고발인을 위 죄명으로 고발하오니 수사하여 처벌해주시기 바랍니다.",
        exampleValue: "피고발인 (주)가짜식품을 식품위생법 위반으로 고발하오니, 철저히 수사하여 엄벌에 처해주시기 바랍니다.",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "범죄 사실", isHeader: true },
      {
        placeholder: "1. 발견 일시: ____년 __월 __일\n2. 발견 장소: (장소)\n3. 범죄 내용:\n   (구체적인 범죄 사실을 기술합니다)",
        exampleValue: "1. 발견 일시: 2025년 12월 20일\n2. 발견 장소: 경기도 성남시 분당구 소재 피고발인 공장\n3. 범죄 내용:\n   피고발인은 유통기한이 경과한 원재료를 사용하여 식품을 제조하고, 유통기한을 위조하여 판매하고 있습니다. 본 고발인은 피고발인 공장에서 근무하던 중 이러한 사실을 목격하였습니다.",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "증거자료", isHeader: true },
      {
        placeholder: "1. 사진 자료\n2. 목격 진술서\n3. 관련 문서",
        exampleValue: "1. 공장 내부 촬영 사진 5장\n2. 유통기한 위조 문서 사본 1부\n3. 목격 경위 진술서 1부",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "____검찰청 귀중", exampleValue: "수원지방검찰청 귀중", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고발인", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 이영희 (인)", colspan: 3 },
    ],
  },
];

// 합의서 양식
export const 합의서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "합 의 서", exampleValue: "합 의 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "갑", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000", exampleValue: "850101-1234567", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼동 123-45", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "을", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김철수", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000", exampleValue: "900515-2345678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 서초동 456-78", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "합의 사항", isHeader: true },
      {
        placeholder: "갑과 을은 아래 내용에 대하여 합의한다.\n\n제1조 (합의 내용)\n\n제2조 (금전 지급)\n\n제3조 (기타 조건)\n\n제4조 (분쟁 해결)",
        exampleValue: "갑과 을은 아래 내용에 대하여 합의한다.\n\n제1조 (합의 내용)\n갑과 을 사이에 2025년 12월 10일 발생한 교통사고에 대하여 원만히 합의한다.\n\n제2조 (금전 지급)\n을은 갑에게 합의금으로 금 500만원을 2026년 1월 31일까지 갑 명의 계좌(신한 110-123-456789)로 입금한다.\n\n제3조 (민·형사상 책임)\n갑은 본 합의 후 을에 대하여 민·형사상 어떠한 이의도 제기하지 아니한다.\n\n제4조 (효력)\n본 합의서는 갑과 을이 서명날인한 날로부터 효력이 발생한다.",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "갑", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 홍길동 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "을", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 김철수 (인)", colspan: 3 },
    ],
  },
];

// 차용증 양식
export const 차용증_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "차 용 증", exampleValue: "차 용 증", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "채권자", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김채권", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000", exampleValue: "750101-1234567", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼동 123-45", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "채무자", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박채무", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민번호", isHeader: true },
      { placeholder: "000000-0000000", exampleValue: "850515-2345678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 서초동 456-78", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "차용금액", isHeader: true },
      {
        placeholder: "금                    원정 (￦               )",
        exampleValue: "금 이천만원정 (￦20,000,000)",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "차용일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "변제일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2027년 1월 14일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "이자율", isHeader: true },
      { placeholder: "연 ____% (없으면 '없음' 기재)", exampleValue: "연 5%", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "이자지급", isHeader: true },
      { placeholder: "(지급 방식)", exampleValue: "매월 15일 채권자 계좌로 입금", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "변제방법", isHeader: true },
      {
        placeholder: "(변제 방식)",
        exampleValue: "변제일에 원금 전액을 채권자 명의 계좌(신한 110-123-456789)로 입금",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true },
      {
        placeholder: "(특이사항 기재)",
        exampleValue: "1. 채무자가 변제 기한을 어길 경우 연 20%의 지연손해금을 지급한다.\n2. 이 차용증에 관한 분쟁은 서울중앙지방법원을 관할로 한다.",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "채무자", isHeader: true },
      { placeholder: "성명:              (인)", exampleValue: "성명: 박채무 (인)", colspan: 3 },
    ],
  },
];

// 영수증 양식
export const 영수증_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "영 수 증", exampleValue: "영 수 증", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "영수증 번호", isHeader: true },
      { placeholder: "No.                ", exampleValue: "No. 2026-0115-001", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수취인", isHeader: true },
      { placeholder: "(받는 분)", exampleValue: "(주)한국무역 귀중", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "금액", isHeader: true },
      {
        placeholder: "금                    원정 (￦               )",
        exampleValue: "금 오백만원정 (￦5,000,000)",
        colspan: 3,
      },
    ],
  },
  {
    fields: [
      { label: "내역", isHeader: true },
      { placeholder: "(거래 내용)", exampleValue: "2026년 1월 컨설팅 용역비", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발행일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발행인", isHeader: true, rowspan: 3 },
      { label: "상호", isHeader: true },
      { placeholder: "(상호명)", exampleValue: "(주)머니위키솔루션", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "사업자번호", isHeader: true },
      { placeholder: "000-00-00000", exampleValue: "123-45-67890", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)      (인)", exampleValue: "홍길동 (인)", colspan: 2 },
    ],
  },
];

// 진술서 양식
export const 진술서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "진 술 서", exampleValue: "진 술 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "진술인", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김진술", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1990. 05. 15.", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "진술 일시", isHeader: true },
      { placeholder: "(진술 일시)", exampleValue: "2026년 1월 15일 14:00", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "진술 장소", isHeader: true },
      { placeholder: "(진술 장소)", exampleValue: "서울중앙지방법원 제5호 법정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사건번호", isHeader: true },
      { placeholder: "(사건번호)", exampleValue: "2026가합12345", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "진술 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(진술 내용을 육하원칙에 따라 구체적으로 작성)",
        exampleValue: "본인은 2026년 1월 10일 오후 3시경 서울시 강남구 소재 ○○카페에서 피고 홍길동과 만났습니다. 당시 피고는 본인에게 투자를 권유하며 '원금 보장'과 '월 5% 수익'을 약속했습니다. 이에 본인은 피고에게 금 5,000만원을 송금하였으나, 약속한 수익금을 받지 못하고 있습니다. 위 사실은 모두 진실이며 거짓이 없음을 진술합니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "첨부자료", isHeader: true },
      { placeholder: "(첨부자료 목록)", exampleValue: "1. 계좌이체 내역서 2. 카카오톡 대화내역", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "진술인 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "김진술 (인)", colspan: 3 },
    ],
  },
];

// 탄원서 양식
export const 탄원서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "탄 원 서", exampleValue: "탄 원 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사건번호", isHeader: true },
      { placeholder: "(사건번호)", exampleValue: "2026고단1234", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "피고인", isHeader: true },
      { placeholder: "(피고인 성명)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "탄원인", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김탄원", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "피고인과의 관계", isHeader: true },
      { placeholder: "(관계)", exampleValue: "직장 동료 (5년)", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 456", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-9876-5432", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "탄원 취지", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(탄원 취지 - 선처를 구하는 내용)",
        exampleValue: "피고인 홍길동에 대하여 선처를 탄원합니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "탄원 사유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(탄원 사유 - 피고인의 인품, 반성, 사정 등 구체적으로)",
        exampleValue: "저는 피고인과 5년간 같은 회사에서 근무한 직장 동료입니다. 피고인은 평소 성실하고 책임감이 강한 사람으로, 회사 내에서도 모범 직원으로 인정받아 왔습니다. 이번 사건으로 피고인은 깊이 반성하고 있으며, 피해자에게도 진심으로 사과하였습니다. 피고인에게는 부양해야 할 고령의 부모님과 어린 자녀가 있어, 가족들의 생계가 어려운 상황입니다. 부디 선처를 베풀어 주시기 바랍니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "탄원인 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "김탄원 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "(법원명) 귀중", exampleValue: "서울중앙지방법원 귀중", colspan: 3 },
    ],
  },
];

// 진정서 양식
export const 진정서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "진 정 서", exampleValue: "진 정 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "진정인", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이진정", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1985. 03. 20.", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 성남시 분당구 정자동 123", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-5555-6666", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "피진정인", isHeader: true, rowspan: 2 },
      { label: "기관명", isHeader: true },
      { placeholder: "(기관명)", exampleValue: "○○구청 건축과", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(기관 주소)", exampleValue: "서울시 ○○구 ○○로 100", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "진정 제목", isHeader: true },
      { placeholder: "(진정 제목)", exampleValue: "건축허가 지연 처리에 관한 진정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "진정 취지", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(진정 취지 - 요청하는 사항)",
        exampleValue: "피진정인의 부당한 건축허가 지연에 대한 시정과 신속한 처리를 요청합니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "진정 사유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(진정 사유 - 사실관계와 문제점을 구체적으로)",
        exampleValue: "1. 진정인은 2025년 10월 15일 ○○구청에 단독주택 증축 건축허가를 신청하였습니다.\n2. 건축법 시행령 제11조에 따르면 허가 신청일로부터 15일 이내에 처리하도록 되어 있습니다.\n3. 그러나 3개월이 경과한 현재까지 아무런 처리가 되지 않고 있으며, 담당자에게 문의해도 명확한 답변을 받지 못하고 있습니다.\n4. 이로 인해 진정인은 공사 일정 지연으로 경제적 손해를 입고 있습니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "첨부자료", isHeader: true },
      { placeholder: "(첨부자료 목록)", exampleValue: "1. 건축허가 신청서 사본 2. 민원 접수증", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "진정인 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "이진정 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "(기관명) 귀중", exampleValue: "국민권익위원회 귀중", colspan: 3 },
    ],
  },
];

// 거래명세서 양식
export const 거래명세서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "거 래 명 세 서", exampleValue: "거 래 명 세 서", colspan: 5 },
    ],
  },
  {
    fields: [
      { label: "거래일자", isHeader: true },
      { placeholder: "(거래일자)", exampleValue: "2026년 1월 15일", colspan: 2 },
      { label: "문서번호", isHeader: true },
      { placeholder: "(문서번호)", exampleValue: "GR-2026-0115", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "공급자", isHeader: true, rowspan: 4 },
      { label: "상호", isHeader: true },
      { placeholder: "(상호명)", exampleValue: "(주)대한무역", colspan: 2 },
      { label: "수신자", isHeader: true, rowspan: 4 },
      { placeholder: "(수신자명)", exampleValue: "(주)한국산업", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "사업자번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "123-45-67890", colspan: 2 },
      { placeholder: "(사업자번호)", exampleValue: "987-65-43210", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 100", colspan: 2 },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 200", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678", colspan: 2 },
      { placeholder: "(전화번호)", exampleValue: "02-9876-5432", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "No", isHeader: true },
      { label: "품목명", isHeader: true },
      { label: "규격", isHeader: true },
      { label: "수량", isHeader: true },
      { label: "단가", isHeader: true },
      { label: "금액", isHeader: true },
    ],
  },
  {
    fields: [
      { placeholder: "1", exampleValue: "1" },
      { placeholder: "(품목)", exampleValue: "노트북 컴퓨터" },
      { placeholder: "(규격)", exampleValue: "15인치" },
      { placeholder: "(수량)", exampleValue: "10" },
      { placeholder: "(단가)", exampleValue: "1,200,000" },
      { placeholder: "(금액)", exampleValue: "12,000,000" },
    ],
  },
  {
    fields: [
      { placeholder: "2", exampleValue: "2" },
      { placeholder: "(품목)", exampleValue: "무선마우스" },
      { placeholder: "(규격)", exampleValue: "블루투스" },
      { placeholder: "(수량)", exampleValue: "10" },
      { placeholder: "(단가)", exampleValue: "35,000" },
      { placeholder: "(금액)", exampleValue: "350,000" },
    ],
  },
  {
    fields: [
      { label: "합계금액", isHeader: true, colspan: 3 },
      { placeholder: "금액", exampleValue: "12,350,000", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "비고", isHeader: true },
      { placeholder: "(비고)", exampleValue: "납품 후 30일 이내 대금 지급", colspan: 5 },
    ],
  },
];

// 세금계산서 양식
export const 세금계산서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "세 금 계 산 서", exampleValue: "세 금 계 산 서 (공급자 보관용)", colspan: 5 },
    ],
  },
  {
    fields: [
      { label: "공급자", isHeader: true, rowspan: 5 },
      { label: "등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890", colspan: 2 },
      { label: "공급받는자", isHeader: true, rowspan: 5 },
      { placeholder: "(사업자등록번호)", exampleValue: "987-65-43210", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "상호", isHeader: true },
      { placeholder: "(상호)", exampleValue: "(주)대한무역", colspan: 2 },
      { placeholder: "(상호)", exampleValue: "(주)한국산업", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(대표자)", exampleValue: "김대표 (인)", colspan: 2 },
      { placeholder: "(대표자)", exampleValue: "이대표", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "사업장주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 100", colspan: 2 },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 200", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "업태/종목", isHeader: true },
      { placeholder: "(업태/종목)", exampleValue: "도매/전자제품", colspan: 2 },
      { placeholder: "(업태/종목)", exampleValue: "제조/IT기기", colspan: 1 },
    ],
  },
  {
    fields: [
      { label: "작성일자", isHeader: true },
      { placeholder: "(작성일자)", exampleValue: "2026년 1월 15일", colspan: 2 },
      { label: "공급가액", isHeader: true },
      { placeholder: "(공급가액)", exampleValue: "12,350,000", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "세액", isHeader: true },
      { placeholder: "(세액)", exampleValue: "1,235,000", colspan: 2 },
      { label: "합계금액", isHeader: true },
      { placeholder: "(합계)", exampleValue: "13,585,000", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "월일", isHeader: true },
      { label: "품목", isHeader: true },
      { label: "규격", isHeader: true },
      { label: "수량", isHeader: true },
      { label: "단가", isHeader: true },
      { label: "공급가액", isHeader: true },
    ],
  },
  {
    fields: [
      { placeholder: "01/15", exampleValue: "01/15" },
      { placeholder: "(품목)", exampleValue: "노트북" },
      { placeholder: "(규격)", exampleValue: "15인치" },
      { placeholder: "(수량)", exampleValue: "10" },
      { placeholder: "(단가)", exampleValue: "1,200,000" },
      { placeholder: "(공급가액)", exampleValue: "12,000,000" },
    ],
  },
  {
    fields: [
      { placeholder: "01/15", exampleValue: "01/15" },
      { placeholder: "(품목)", exampleValue: "마우스" },
      { placeholder: "(규격)", exampleValue: "무선" },
      { placeholder: "(수량)", exampleValue: "10" },
      { placeholder: "(단가)", exampleValue: "35,000" },
      { placeholder: "(공급가액)", exampleValue: "350,000" },
    ],
  },
  {
    fields: [
      { label: "비고", isHeader: true },
      { placeholder: "(비고)", exampleValue: "본 거래에 대한 대금은 거래일로부터 30일 이내에 결제", colspan: 5 },
    ],
  },
];

// 매도청구서 양식
export const 매도청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "매 도 청 구 서", exampleValue: "매 도 청 구 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신인", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(수신인 성명)", exampleValue: "김공유", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼동 123-45", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "발신인", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(발신인 성명)", exampleValue: "이매도", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 서초동 456-78", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-9876-5432", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "대상 부동산", isHeader: true, rowspan: 3 },
      { label: "소재지", isHeader: true },
      { placeholder: "(부동산 주소)", exampleValue: "서울시 송파구 잠실동 100-1", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "지목/용도", isHeader: true },
      { placeholder: "(지목/용도)", exampleValue: "대지 / 주거용", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "면적", isHeader: true },
      { placeholder: "(면적)", exampleValue: "150㎡ (약 45평)", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "지분 내역", isHeader: true },
      { placeholder: "(지분 비율)", exampleValue: "발신인 지분 1/2, 수신인 지분 1/2", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "청구 취지", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(청구 취지)",
        exampleValue: "발신인은 위 부동산에 대한 공유지분의 매도를 청구합니다. 수신인께서는 아래 조건으로 발신인의 지분(1/2)을 매수하여 주시기 바랍니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "매도 조건", isHeader: true, rowspan: 2 },
      { label: "매도 희망가격", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 5억원 (500,000,000원)", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "회신 기한", isHeader: true },
      { placeholder: "(기한)", exampleValue: "본 서면 도달일로부터 30일 이내", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발신인 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "이매도 (인)", colspan: 3 },
    ],
  },
];

// 산재보험청구서 양식
export const 산재보험청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "산업재해보상보험 급여청구서", exampleValue: "산업재해보상보험 급여청구서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "청구인", isHeader: true, rowspan: 5 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박근로", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900515-1******", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 성남시 분당구 판교로 123", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-5555-6666", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "계좌번호", isHeader: true },
      { placeholder: "(은행/계좌번호)", exampleValue: "국민은행 123-456-789012", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "사업장", isHeader: true, rowspan: 3 },
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)한국제조", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "사업장 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 화성시 동탄대로 456", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "사업장관리번호", isHeader: true },
      { placeholder: "(관리번호)", exampleValue: "12345-67890", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "재해 내용", isHeader: true, rowspan: 4 },
      { label: "재해 발생일", isHeader: true },
      { placeholder: "(발생일)", exampleValue: "2026년 1월 10일 14:30", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "재해 발생장소", isHeader: true },
      { placeholder: "(장소)", exampleValue: "화성공장 제2생산라인", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "상병명", isHeader: true },
      { placeholder: "(상병명)", exampleValue: "좌측 손목 골절", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "재해 경위", isHeader: true },
      { placeholder: "(재해 경위)", exampleValue: "제품 운반 작업 중 바닥에 넘어지면서 좌측 손목 부상", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "청구 급여", isHeader: true },
      { placeholder: "(급여 종류)", exampleValue: "☑ 요양급여  ☑ 휴업급여  ☐ 장해급여", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true },
      { placeholder: "(첨부서류)", exampleValue: "1. 의사 진단서 2. 재해발생경위서 3. 목격자 진술서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "청구인 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "박근로 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "(지사명)", exampleValue: "근로복지공단 ○○지사장 귀하", colspan: 3 },
    ],
  },
];

// 금전소비대차계약서 양식
export const 금전소비대차계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "금전소비대차계약서", exampleValue: "금전소비대차계약서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대주(갑)", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김대주", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850101-1******", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "차주(을)", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이차주", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900515-1******", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 456", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-9876-5432", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "대차금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 오천만원 (₩50,000,000)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대차일자", isHeader: true },
      { placeholder: "(대차일자)", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "변제일자", isHeader: true },
      { placeholder: "(변제일자)", exampleValue: "2027년 1월 14일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "이자율", isHeader: true },
      { placeholder: "(연 이자율)", exampleValue: "연 5% (법정 최고이율 이내)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "이자지급방법", isHeader: true },
      { placeholder: "(지급방법)", exampleValue: "매월 말일 선지급 (익월분)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "변제방법", isHeader: true },
      { placeholder: "(변제방법)", exampleValue: "원금 만기일시상환, 이자 월별지급", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지연손해금", isHeader: true },
      { placeholder: "(지연손해금율)", exampleValue: "연 12% (변제일 경과 시 적용)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "담보", isHeader: true },
      { placeholder: "(담보 내용)", exampleValue: "서울시 송파구 잠실동 소재 아파트 근저당권 설정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(특약사항)",
        exampleValue: "1. 차주는 대주의 사전 동의 없이 제3자에게 채무를 이전할 수 없다.\n2. 차주가 2회 이상 이자 지급을 연체할 경우, 대주는 즉시 원금 전액 상환을 청구할 수 있다.\n3. 본 계약에서 정하지 않은 사항은 민법에 따른다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대주(갑) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "김대주 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "차주(을) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "이차주 (인)", colspan: 3 },
    ],
  },
];

// 동의서 양식
export const 동의서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "동 의 서", exampleValue: "개인정보 수집·이용 동의서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "동의인", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박동의", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1990. 05. 15.", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 마포구 마포대로 100", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "수집기관", isHeader: true },
      { placeholder: "(기관명)", exampleValue: "(주)한국서비스", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수집 항목", isHeader: true },
      { placeholder: "(수집 항목)", exampleValue: "성명, 연락처, 주소, 이메일, 서비스 이용기록", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수집 목적", isHeader: true },
      { placeholder: "(수집 목적)", exampleValue: "서비스 제공, 고객 관리, 마케팅 활용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "보유 기간", isHeader: true },
      { placeholder: "(보유 기간)", exampleValue: "수집일로부터 3년간 (회원 탈퇴 시 즉시 파기)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "동의 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(동의 내용)",
        exampleValue: "본인은 위와 같이 개인정보를 수집·이용하는 것에 동의합니다.\n\n☑ 필수 개인정보 수집·이용에 동의합니다.\n☐ 선택 개인정보 수집·이용에 동의합니다.\n☐ 마케팅 목적 활용에 동의합니다.\n\n※ 동의를 거부할 권리가 있으며, 필수 항목 거부 시 서비스 이용이 제한될 수 있습니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "동의 일자", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "동의인 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "박동의 (인)", colspan: 3 },
    ],
  },
];

// 답변서(민사) 양식
export const 답변서민사_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "답 변 서", exampleValue: "답 변 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사건번호", isHeader: true },
      { placeholder: "(사건번호)", exampleValue: "2026가합12345 대여금 청구사건", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "원고", isHeader: true },
      { placeholder: "(원고 성명)", exampleValue: "김원고", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "피고", isHeader: true, rowspan: 3 },
      { label: "성명", isHeader: true },
      { placeholder: "(피고 성명)", exampleValue: "이피고", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 456", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-9876-5432", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "청구취지에 대한 답변", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(청구취지에 대한 답변)",
        exampleValue: "1. 원고의 청구를 기각한다.\n2. 소송비용은 원고가 부담한다.\n라는 판결을 구합니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "청구원인에 대한 답변", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(청구원인에 대한 답변 - 각 항목별 인정/부인)",
        exampleValue: "1. 청구원인 제1항 (금전 대여)에 대하여\n   - 인정합니다. 피고는 2025년 6월 15일 원고로부터 금 3,000만원을 차용한 사실이 있습니다.\n\n2. 청구원인 제2항 (변제기일 경과)에 대하여\n   - 부인합니다. 당사자 간 합의로 변제기일을 2026년 6월 14일로 연장하였으며, 아직 변제기일이 도래하지 않았습니다.\n\n3. 청구원인 제3항 (지연이자 주장)에 대하여\n   - 부인합니다. 변제기일 전이므로 지연이자 발생 근거가 없습니다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "첨부 증거", isHeader: true },
      { placeholder: "(첨부 증거)", exampleValue: "1. 을 제1호증: 변제기일 연장 합의서\n2. 을 제2호증: 카카오톡 대화내역", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "피고 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "이피고 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "(법원명) 귀중", exampleValue: "서울중앙지방법원 귀중", colspan: 3 },
    ],
  },
];

// 대리점계약서 양식
export const 대리점계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "대리점 계약서", exampleValue: "대 리 점 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "본사(갑)", isHeader: true, rowspan: 4 },
      { label: "상호", isHeader: true },
      { placeholder: "(상호)", exampleValue: "(주)대한제품", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "사업자번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "123-45-67890", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 100", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김대표", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "대리점(을)", isHeader: true, rowspan: 4 },
      { label: "상호", isHeader: true },
      { placeholder: "(상호)", exampleValue: "○○대리점", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "사업자번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "987-65-43210", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 성남시 분당구 판교로 200", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "이대리", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "계약 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "계약 제품", isHeader: true },
      { placeholder: "(제품명)", exampleValue: "○○브랜드 전 제품", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "판매 지역", isHeader: true },
      { placeholder: "(지역)", exampleValue: "경기도 성남시 전역 (독점)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "2026년 1월 15일 ~ 2028년 1월 14일 (2년)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수수료율", isHeader: true },
      { placeholder: "(수수료율)", exampleValue: "매출액의 15%", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "정산 주기", isHeader: true },
      { placeholder: "(정산 주기)", exampleValue: "매월 말일 마감, 익월 10일 지급", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "최소 매출", isHeader: true },
      { placeholder: "(최소 매출)", exampleValue: "월 5,000만원 이상", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(특약사항)",
        exampleValue: "1. 을은 갑의 사전 서면 동의 없이 타사 제품을 취급할 수 없다.\n2. 최소 매출 2회 연속 미달 시 갑은 계약을 해지할 수 있다.\n3. 계약 종료 시 을의 잔여 재고는 갑이 원가로 회수한다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "본사(갑) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "(주)대한제품 대표이사 김대표 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대리점(을) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "○○대리점 대표 이대리 (인)", colspan: 3 },
    ],
  },
];

// 도급계약서 양식
export const 도급계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "도급 계약서", exampleValue: "도 급 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "도급인(갑)", isHeader: true, rowspan: 3 },
      { label: "성명/상호", isHeader: true },
      { placeholder: "(성명/상호)", exampleValue: "김도급", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼동 123", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "수급인(을)", isHeader: true, rowspan: 3 },
      { label: "상호", isHeader: true },
      { placeholder: "(상호)", exampleValue: "(주)한국인테리어", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 송파구 잠실동 456", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-123-4567", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "공사 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "공사명", isHeader: true },
      { placeholder: "(공사명)", exampleValue: "강남 ○○빌딩 3층 사무실 인테리어 공사", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "공사 장소", isHeader: true },
      { placeholder: "(공사 장소)", exampleValue: "서울시 강남구 역삼동 123 ○○빌딩 3층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "공사 기간", isHeader: true },
      { placeholder: "(공사 기간)", exampleValue: "2026년 2월 1일 ~ 2026년 3월 31일 (60일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "공사 대금", isHeader: true },
      { placeholder: "(공사 대금)", exampleValue: "금 오천만원 (₩50,000,000) 부가세 별도", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대금 지급", isHeader: true, rowspan: 3 },
      { label: "착수금", isHeader: true },
      { placeholder: "(착수금)", exampleValue: "30% (1,500만원) - 계약 시", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "중도금", isHeader: true },
      { placeholder: "(중도금)", exampleValue: "40% (2,000만원) - 공정 50% 완료 시", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "준공금", isHeader: true },
      { placeholder: "(준공금)", exampleValue: "30% (1,500만원) - 준공 및 인도 시", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "하자 보수", isHeader: true },
      { placeholder: "(하자 보수 기간)", exampleValue: "준공일로부터 1년간 무상 하자 보수", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(특약사항)",
        exampleValue: "1. 을은 공사 기간 내 완공하지 못할 경우 지체상금(1일 0.1%)을 지급한다.\n2. 갑의 요청으로 공사 내용 변경 시 추가 비용은 별도 협의한다.\n3. 을은 공사 중 안전사고에 대한 책임을 진다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "도급인(갑) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "김도급 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수급인(을) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "(주)한국인테리어 대표 박수급 (인)", colspan: 3 },
    ],
  },
];

// 매매계약서 양식
export const 매매계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "부동산 매매계약서", exampleValue: "부 동 산 매 매 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매도인(갑)", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김매도", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "700101-1******", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 100", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "매수인(을)", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이매수", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850515-1******", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 200", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-9876-5432", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "매매 대상", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(소재지)", exampleValue: "서울시 송파구 잠실동 123-45 ○○아파트 101동 1501호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "면적", isHeader: true },
      { placeholder: "(면적)", exampleValue: "전용 84.59㎡ (공급 112.34㎡)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "구조", isHeader: true },
      { placeholder: "(구조)", exampleValue: "철근콘크리트조 아파트 15층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매매 조건", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "매매대금", isHeader: true },
      { placeholder: "(매매대금)", exampleValue: "금 십팔억원 (₩1,800,000,000)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약금", isHeader: true },
      { placeholder: "(계약금)", exampleValue: "금 1억8천만원 (계약 시 지급)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "중도금", isHeader: true },
      { placeholder: "(중도금)", exampleValue: "금 5억4천만원 (2026년 3월 15일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "잔금", isHeader: true },
      { placeholder: "(잔금)", exampleValue: "금 10억8천만원 (2026년 5월 15일 소유권이전등기시)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(특약사항)",
        exampleValue: "1. 매도인은 잔금일까지 세입자 퇴거 및 근저당권 말소를 완료한다.\n2. 매수인이 중도금을 지급하면 계약 해제가 불가하다.\n3. 현 상태 그대로 인도하며, 매도인은 숨은 하자에 대해 책임지지 않는다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매도인(갑) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "김매도 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매수인(을) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "이매수 (인)", colspan: 3 },
    ],
  },
];

// 물품매매계약서 양식
export const 물품매매계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "물품 매매계약서", exampleValue: "물 품 매 매 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매도인(갑)", isHeader: true, rowspan: 3 },
      { label: "상호/성명", isHeader: true },
      { placeholder: "(상호/성명)", exampleValue: "(주)한국기계", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 화성시 동탄대로 100", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "031-123-4567", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "매수인(을)", isHeader: true, rowspan: 3 },
      { label: "상호/성명", isHeader: true },
      { placeholder: "(상호/성명)", exampleValue: "(주)대한제조", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "인천시 남동구 남동대로 200", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "032-987-6543", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "매매 물품", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "품목", isHeader: true },
      { placeholder: "(품목명)", exampleValue: "CNC 밀링 머신", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "규격/모델", isHeader: true },
      { placeholder: "(규격/모델)", exampleValue: "VMC-850 / 2025년식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수량", isHeader: true },
      { placeholder: "(수량)", exampleValue: "2대", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "물품 상태", isHeader: true },
      { placeholder: "(상태)", exampleValue: "중고 (사용 6개월, 정상 작동 확인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매매대금", isHeader: true },
      { placeholder: "(매매대금)", exampleValue: "금 2억원 (₩200,000,000) 부가세 별도", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대금 지급", isHeader: true },
      { placeholder: "(지급 방법)", exampleValue: "계약금 30% (계약 시), 잔금 70% (인도 시)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인도 장소", isHeader: true },
      { placeholder: "(인도 장소)", exampleValue: "매수인 공장 (인천시 남동구)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인도 일자", isHeader: true },
      { placeholder: "(인도 일자)", exampleValue: "2026년 2월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "하자 보증", isHeader: true },
      { placeholder: "(하자 보증)", exampleValue: "인도일로부터 6개월간 무상 A/S", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      {
        placeholder: "(특약사항)",
        exampleValue: "1. 매도인은 인도 전 시운전 및 정상 작동 확인 기회를 매수인에게 제공한다.\n2. 운송 비용은 매도인이 부담한다.\n3. 인도 후 발견된 숨은 하자에 대해 매도인은 3개월간 책임진다.",
        colspan: 4,
      },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매도인(갑) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "(주)한국기계 대표 김매도 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매수인(을) 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "(주)대한제조 대표 이매수 (인)", colspan: 3 },
    ],
  },
];

// 복직신청서 미리보기 데이터
export const 복직신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "복직 신청서", exampleValue: "복 직 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사번)", exampleValue: "A2024-0156" },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "마케팅팀" },
      { label: "직위/직급", isHeader: true },
      { placeholder: "(직위)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴직 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴직 종류", isHeader: true },
      { placeholder: "(휴직 사유)", exampleValue: "육아휴직", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴직 기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2025년 1월 15일 ~ 2026년 1월 14일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "복직 희망일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "복직 희망 부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "마케팅팀 (원 소속)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "복직 사유", isHeader: true },
      { placeholder: "(복직 신청 사유)", exampleValue: "육아휴직 기간 만료에 따라 복직을 신청합니다. 자녀가 어린이집에 입소하여 정상 근무가 가능합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2025년 12월 30일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

// 배우자출산휴가신청서 미리보기 데이터
export const 배우자출산휴가신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "배우자 출산휴가 신청서", exampleValue: "배우자 출산휴가 신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "김영수" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사번)", exampleValue: "B2023-0089" },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "개발팀" },
      { label: "직위/직급", isHeader: true },
      { placeholder: "(직위)", exampleValue: "과장" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-9876-5432", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "배우자 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "배우자 성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "이미영" },
      { label: "출산 예정일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일" },
    ],
  },
  {
    fields: [
      { label: "출산 병원", isHeader: true },
      { placeholder: "(병원명)", exampleValue: "삼성서울병원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴가 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴가 기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2026년 1월 20일 ~ 2026년 1월 31일 (10일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사용 일수", isHeader: true },
      { placeholder: "(__일)", exampleValue: "10일 (연속 사용)" },
      { label: "복귀 예정일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 2월 3일" },
    ],
  },
  {
    fields: [
      { label: "업무 인수인계", isHeader: true },
      { placeholder: "(인수인계 계획)", exampleValue: "대리 박철수에게 진행 중인 프로젝트 인수인계 완료 예정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(첨부 서류)", exampleValue: "출산예정일 확인서 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 10일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 김영수 (서명)", colspan: 3 },
    ],
  },
];

// 병가신청서 미리보기 데이터
export const 병가신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "병가 신청서", exampleValue: "병 가 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "박지민" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사번)", exampleValue: "C2022-0234" },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "영업팀" },
      { label: "직위/직급", isHeader: true },
      { placeholder: "(직위)", exampleValue: "사원" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-5555-1234", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "병가 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "병명/증상", isHeader: true },
      { placeholder: "(질병명 또는 증상)", exampleValue: "급성 장염", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "병가 기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2026년 1월 15일 ~ 2026년 1월 17일 (3일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "병가 일수", isHeader: true },
      { placeholder: "(__일)", exampleValue: "3일" },
      { label: "복귀 예정일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일" },
    ],
  },
  {
    fields: [
      { label: "진료 병원", isHeader: true },
      { placeholder: "(병원명)", exampleValue: "서울내과의원" },
      { label: "담당 의사", isHeader: true },
      { placeholder: "(의사명)", exampleValue: "김의사" },
    ],
  },
  {
    fields: [
      { label: "업무 인수인계", isHeader: true },
      { placeholder: "(인수인계 계획)", exampleValue: "팀장 이부장님께 긴급 건 보고 완료, 일반 업무는 복귀 후 처리 예정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(첨부 서류)", exampleValue: "진단서 1부, 의사 소견서 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 박지민 (서명)", colspan: 3 },
    ],
  },
];

// 가족돌봄휴가신청서 미리보기 데이터
export const 가족돌봄휴가신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "가족돌봄휴가 신청서", exampleValue: "가족돌봄휴가 신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "최민호" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사번)", exampleValue: "D2021-0567" },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "총무팀" },
      { label: "직위/직급", isHeader: true },
      { placeholder: "(직위)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-7777-8888", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "돌봄 대상 가족", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "최순자" },
      { label: "관계", isHeader: true },
      { placeholder: "(관계)", exampleValue: "어머니" },
    ],
  },
  {
    fields: [
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1955년 3월 10일" },
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강북구" },
    ],
  },
  {
    fields: [
      { label: "돌봄 사유", isHeader: true },
      { placeholder: "(돌봄이 필요한 사유)", exampleValue: "어머니 고관절 수술 후 재활 치료 및 일상생활 보조 필요", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴가 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴가 기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2026년 1월 20일 ~ 2026년 1월 24일 (5일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴가 일수", isHeader: true },
      { placeholder: "(__일)", exampleValue: "5일" },
      { label: "복귀 예정일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 27일" },
    ],
  },
  {
    fields: [
      { label: "업무 인수인계", isHeader: true },
      { placeholder: "(인수인계 계획)", exampleValue: "과장 김철수에게 주요 업무 인수인계 완료", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(첨부 서류)", exampleValue: "가족관계증명서 1부, 진단서 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 최민호 (서명)", colspan: 3 },
    ],
  },
];

// 경력증명서 미리보기 데이터
export const 경력증명서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "경력 증명서", exampleValue: "경 력 증 명 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인적사항", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1990년 5월 15일" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123, 456호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "경력사항", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무처", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)한국테크", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2018년 3월 2일 ~ 2023년 8월 31일 (5년 6개월)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "개발팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "선임연구원" },
    ],
  },
  {
    fields: [
      { label: "담당업무", isHeader: true },
      { placeholder: "(담당 업무 내용)", exampleValue: "웹 애플리케이션 개발, 시스템 설계, 신입사원 교육", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "퇴직사유", isHeader: true },
      { placeholder: "(퇴직 사유)", exampleValue: "개인 사정에 의한 자진 퇴사", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급기관", isHeader: true },
      { placeholder: "(회사명, 대표자)", exampleValue: "(주)한국테크 대표이사 김철수", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "직인", isHeader: true },
      { placeholder: "(직인)", exampleValue: "(직인)", colspan: 3 },
    ],
  },
];

// 재직증명서 미리보기 데이터
export const 재직증명서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "재직 증명서", exampleValue: "재 직 증 명 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인적사항", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "김영희" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1988년 8월 20일" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민번호)", exampleValue: "880820-2******", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 송파구 올림픽로 300, 101동 1502호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "재직사항", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)대한금융", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "회사주소", isHeader: true },
      { placeholder: "(회사 주소)", exampleValue: "서울시 중구 을지로 50", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "재무팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "과장" },
    ],
  },
  {
    fields: [
      { label: "입사일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2015년 7월 1일" },
      { label: "재직기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "10년 7개월" },
    ],
  },
  {
    fields: [
      { label: "용도", isHeader: true },
      { placeholder: "(용도)", exampleValue: "은행 대출용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급기관", isHeader: true },
      { placeholder: "(회사명, 대표자)", exampleValue: "(주)대한금융 대표이사 박대표", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "직인", isHeader: true },
      { placeholder: "(직인)", exampleValue: "(직인)", colspan: 3 },
    ],
  },
];

// 퇴직증명서 미리보기 데이터
export const 퇴직증명서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "퇴직 증명서", exampleValue: "퇴 직 증 명 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인적사항", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "이철수" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1985년 3월 10일" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민번호)", exampleValue: "850310-1******", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 성남시 분당구 판교로 200", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "퇴직사항", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)미래시스템즈", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "영업부" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "부장" },
    ],
  },
  {
    fields: [
      { label: "입사일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2012년 4월 1일" },
      { label: "퇴사일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2025년 12월 31일" },
    ],
  },
  {
    fields: [
      { label: "근속기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "13년 9개월", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "퇴직사유", isHeader: true },
      { placeholder: "(퇴직 사유)", exampleValue: "회사 경영상 사유로 인한 권고사직", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 10일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급기관", isHeader: true },
      { placeholder: "(회사명, 대표자)", exampleValue: "(주)미래시스템즈 대표이사 최미래", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "직인", isHeader: true },
      { placeholder: "(직인)", exampleValue: "(직인)", colspan: 3 },
    ],
  },
];

// 납세증명서신청서 미리보기 데이터
export const 납세증명서신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "납세증명서 신청서", exampleValue: "납 세 증 명 서 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명/상호", isHeader: true },
      { placeholder: "(이름 또는 상호)", exampleValue: "(주)한국상사" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김대표" },
    ],
  },
  {
    fields: [
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "123-45-67890" },
      { label: "법인등록번호", isHeader: true },
      { placeholder: "(법인번호)", exampleValue: "110111-0012345" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼로 100", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전화번호", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
      { label: "팩스번호", isHeader: true },
      { placeholder: "(팩스번호)", exampleValue: "02-1234-5679" },
    ],
  },
  {
    fields: [
      { label: "신청내용", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "증명서 종류", isHeader: true },
      { placeholder: "(종류 선택)", exampleValue: "납세완납증명서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청 목적", isHeader: true },
      { placeholder: "(목적)", exampleValue: "공공입찰 참가용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "증명 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "2025년 1월 1일 ~ 2025년 12월 31일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급 통수", isHeader: true },
      { placeholder: "(__통)", exampleValue: "2통" },
      { label: "수령 방법", isHeader: true },
      { placeholder: "(방법)", exampleValue: "인터넷 발급" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: (주)한국상사 대표 김대표 (인)", colspan: 3 },
    ],
  },
];

// 연봉근로계약서 미리보기 데이터
export const 연봉근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "연봉 근로계약서", exampleValue: "연 봉 근 로 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)미래기술" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "박대표" },
    ],
  },
  {
    fields: [
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "123-45-67890" },
      { label: "사업장주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123" },
    ],
  },
  {
    fields: [
      { label: "근로자 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "김개발" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1992년 7월 25일" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 송파구 올림픽로 200", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로조건", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "개발팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "시니어 개발자" },
    ],
  },
  {
    fields: [
      { label: "계약기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2026년 1월 1일 ~ 2026년 12월 31일 (1년)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무시간", isHeader: true },
      { placeholder: "(근무 시간)", exampleValue: "09:00 ~ 18:00 (주 40시간, 휴게 1시간)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연봉", isHeader: true },
      { placeholder: "(연봉)", exampleValue: "금 오천사백만원정 (₩54,000,000)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "월 지급액", isHeader: true },
      { placeholder: "(월급)", exampleValue: "금 사백오십만원정 (₩4,500,000)" },
      { label: "지급일", isHeader: true },
      { placeholder: "(지급일)", exampleValue: "매월 25일" },
    ],
  },
  {
    fields: [
      { label: "포함 항목", isHeader: true },
      { placeholder: "(포함 내역)", exampleValue: "기본급 4,000,000원 + 식대 200,000원 + 교통비 100,000원 + 고정연장수당 200,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true },
      { placeholder: "(특약)", exampleValue: "성과급은 별도 지급하며, 퇴직금은 연봉과 별도로 적립함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2025년 12월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업주 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "(주)미래기술 대표이사 박대표 (인)" },
      { label: "근로자 서명", isHeader: true },
      { placeholder: "(서명 또는 날인)", exampleValue: "근로자 김개발 (서명)" },
    ],
  },
];

// 연차휴가신청서 미리보기 데이터
export const 연차휴가신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "연차휴가 신청서", exampleValue: "연 차 휴 가 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사번)", exampleValue: "E2023-0456" },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "기획팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "연차 현황", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "총 연차일수", isHeader: true },
      { placeholder: "(__일)", exampleValue: "15일" },
      { label: "사용 연차", isHeader: true },
      { placeholder: "(__일)", exampleValue: "8일" },
    ],
  },
  {
    fields: [
      { label: "잔여 연차", isHeader: true },
      { placeholder: "(__일)", exampleValue: "7일" },
      { label: "신청 일수", isHeader: true },
      { placeholder: "(__일)", exampleValue: "3일" },
    ],
  },
  {
    fields: [
      { label: "휴가 일정", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴가 기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2026년 2월 5일 (수) ~ 2026년 2월 7일 (금)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴가 사유", isHeader: true },
      { placeholder: "(사유)", exampleValue: "개인 사유", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업무 인수인계", isHeader: true },
      { placeholder: "(인수인계 담당자)", exampleValue: "과장 김철수에게 진행 중인 업무 인수인계 완료 예정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "비상 연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

// 출장신청서 미리보기 데이터
export const 출장신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "출장 신청서", exampleValue: "출 장 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "이영업" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사번)", exampleValue: "S2024-0123" },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "영업1팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "과장" },
    ],
  },
  {
    fields: [
      { label: "출장 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "출장 기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2026년 1월 25일 (목) ~ 2026년 1월 26일 (금) (1박 2일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "출장지", isHeader: true },
      { placeholder: "(출장 장소)", exampleValue: "부산시 해운대구 해운대로 123 (부산지사)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "출장 목적", isHeader: true },
      { placeholder: "(출장 목적)", exampleValue: "부산지사 신규 거래처 미팅 및 계약 체결", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "세부 일정", isHeader: true },
      { placeholder: "(세부 일정)", exampleValue: "1/25 10:00 서울 출발, 14:00 거래처 미팅 / 1/26 09:00 계약 체결, 13:00 서울 복귀", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "예상 비용", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "교통비", isHeader: true },
      { placeholder: "(금액)", exampleValue: "150,000원 (KTX 왕복)" },
      { label: "숙박비", isHeader: true },
      { placeholder: "(금액)", exampleValue: "100,000원 (1박)" },
    ],
  },
  {
    fields: [
      { label: "식비", isHeader: true },
      { placeholder: "(금액)", exampleValue: "50,000원" },
      { label: "합계", isHeader: true },
      { placeholder: "(금액)", exampleValue: "300,000원" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 이영업 (서명)", colspan: 3 },
    ],
  },
];

// 휴직신청서 미리보기 데이터
export const 휴직신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "휴직 신청서", exampleValue: "휴 직 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(이름)", exampleValue: "박휴직" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사번)", exampleValue: "H2020-0789" },
    ],
  },
  {
    fields: [
      { label: "소속부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "인사팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "사원" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-3333-4444", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴직 정보", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴직 종류", isHeader: true },
      { placeholder: "(휴직 종류)", exampleValue: "육아휴직", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴직 기간", isHeader: true },
      { placeholder: "20__년 __월 __일 ~ 20__년 __월 __일", exampleValue: "2026년 3월 1일 ~ 2027년 2월 28일 (1년)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴직 사유", isHeader: true },
      { placeholder: "(휴직 사유)", exampleValue: "자녀 양육을 위한 육아휴직 (자녀: 박아기, 2025년 9월생)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "복직 예정일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2027년 3월 1일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업무 인수인계", isHeader: true },
      { placeholder: "(인수인계 담당자)", exampleValue: "대리 김인수에게 담당 업무 전체 인수인계 예정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(첨부 서류)", exampleValue: "가족관계증명서 1부, 육아휴직 급여 신청서 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 2월 1일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 박휴직 (서명)", colspan: 3 },
    ],
  },
];

// 출산휴가신청서 미리보기 데이터
export const 출산휴가신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "출산휴가 신청서", exampleValue: "출 산 휴 가 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김출산" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사원번호)", exampleValue: "2023-0045" },
    ],
  },
  {
    fields: [
      { label: "부서", isHeader: true },
      { placeholder: "(소속 부서)", exampleValue: "마케팅팀" },
      { label: "직급", isHeader: true },
      { placeholder: "(직급)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-5678-1234" },
      { label: "입사일", isHeader: true },
      { placeholder: "(입사일)", exampleValue: "2023년 3월 2일" },
    ],
  },
  {
    fields: [
      { label: "출산 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "출산 예정일", isHeader: true },
      { placeholder: "(출산 예정일)", exampleValue: "2026년 4월 15일" },
      { label: "임신 주수", isHeader: true },
      { placeholder: "(임신 주수)", exampleValue: "32주" },
    ],
  },
  {
    fields: [
      { label: "다태아 여부", isHeader: true },
      { placeholder: "단태아/다태아", exampleValue: "단태아" },
      { label: "산전진료 병원", isHeader: true },
      { placeholder: "(병원명)", exampleValue: "서울여성병원" },
    ],
  },
  {
    fields: [
      { label: "휴가 신청 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "휴가 시작일", isHeader: true },
      { placeholder: "(시작일)", exampleValue: "2026년 3월 15일" },
      { label: "휴가 종료일", isHeader: true },
      { placeholder: "(종료일)", exampleValue: "2026년 6월 12일" },
    ],
  },
  {
    fields: [
      { label: "휴가 기간", isHeader: true },
      { placeholder: "(총 일수)", exampleValue: "90일 (산전 30일 + 산후 60일)" },
      { label: "복직 예정일", isHeader: true },
      { placeholder: "(복직 예정일)", exampleValue: "2026년 6월 13일" },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(첨부 서류)", exampleValue: "출산 예정일 확인서 1부, 산모수첩 사본 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 2월 10일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 김출산 (서명)", colspan: 3 },
    ],
  },
];

// 육아휴직신청서 미리보기 데이터
export const 육아휴직신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "육아휴직 신청서", exampleValue: "육 아 휴 직 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이육아" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사원번호)", exampleValue: "2021-0089" },
    ],
  },
  {
    fields: [
      { label: "부서", isHeader: true },
      { placeholder: "(소속 부서)", exampleValue: "인사팀" },
      { label: "직급", isHeader: true },
      { placeholder: "(직급)", exampleValue: "과장" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-7890-4567" },
      { label: "입사일", isHeader: true },
      { placeholder: "(입사일)", exampleValue: "2021년 7월 1일" },
    ],
  },
  {
    fields: [
      { label: "자녀 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "자녀 성명", isHeader: true },
      { placeholder: "(자녀 성명)", exampleValue: "이하늘" },
      { label: "자녀 생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "2024년 8월 20일" },
    ],
  },
  {
    fields: [
      { label: "자녀 나이", isHeader: true },
      { placeholder: "(만 나이)", exampleValue: "만 1세" },
      { label: "관계", isHeader: true },
      { placeholder: "(관계)", exampleValue: "아들" },
    ],
  },
  {
    fields: [
      { label: "휴직 신청 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "휴직 시작일", isHeader: true },
      { placeholder: "(시작일)", exampleValue: "2026년 3월 1일" },
      { label: "휴직 종료일", isHeader: true },
      { placeholder: "(종료일)", exampleValue: "2027년 2월 28일" },
    ],
  },
  {
    fields: [
      { label: "휴직 기간", isHeader: true },
      { placeholder: "(총 기간)", exampleValue: "12개월" },
      { label: "복직 예정일", isHeader: true },
      { placeholder: "(복직 예정일)", exampleValue: "2027년 3월 1일" },
    ],
  },
  {
    fields: [
      { label: "휴직 사유", isHeader: true },
      { placeholder: "(휴직 사유)", exampleValue: "만 8세 이하 자녀 양육을 위한 육아휴직", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "비상연락처", isHeader: true },
      { placeholder: "(비상연락처)", exampleValue: "배우자: 010-1234-8765", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(첨부 서류)", exampleValue: "가족관계증명서 1부, 주민등록등본 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 이육아 (서명)", colspan: 3 },
    ],
  },
];

// 이력서 미리보기 데이터
export const 이력서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "이력서", exampleValue: "이 력 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "기본 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "한자", isHeader: true },
      { placeholder: "(한자)", exampleValue: "洪吉童" },
    ],
  },
  {
    fields: [
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1995년 3월 15일 (만 30세)" },
      { label: "성별", isHeader: true },
      { placeholder: "(성별)", exampleValue: "남" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "hong@email.com" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123, 402호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "학력", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "기간", isHeader: true },
      { placeholder: "(입학~졸업)", exampleValue: "2014.03 ~ 2018.02" },
      { label: "학교명", isHeader: true },
      { placeholder: "(학교명)", exampleValue: "한국대학교" },
    ],
  },
  {
    fields: [
      { label: "전공", isHeader: true },
      { placeholder: "(전공)", exampleValue: "경영학과" },
      { label: "졸업구분", isHeader: true },
      { placeholder: "(졸업구분)", exampleValue: "졸업" },
    ],
  },
  {
    fields: [
      { label: "경력", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "기간", isHeader: true },
      { placeholder: "(근무기간)", exampleValue: "2018.03 ~ 2023.12" },
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)ABC테크" },
    ],
  },
  {
    fields: [
      { label: "직위/담당업무", isHeader: true },
      { placeholder: "(직위/업무)", exampleValue: "대리 / 기획팀 마케팅 담당" },
      { label: "퇴직사유", isHeader: true },
      { placeholder: "(퇴직사유)", exampleValue: "이직" },
    ],
  },
  {
    fields: [
      { label: "자격증", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "취득일", isHeader: true },
      { placeholder: "(취득일)", exampleValue: "2019년 5월" },
      { label: "자격증명", isHeader: true },
      { placeholder: "(자격증명)", exampleValue: "컴퓨터활용능력 1급" },
    ],
  },
  {
    fields: [
      { label: "취득일", isHeader: true },
      { placeholder: "(취득일)", exampleValue: "2020년 3월" },
      { label: "자격증명", isHeader: true },
      { placeholder: "(자격증명)", exampleValue: "TOEIC 850점" },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true },
      { placeholder: "위 기재사항은 사실과 다름없음. 작성자: _______ (인)", exampleValue: "위 기재사항은 사실과 다름없음. 작성자: 홍길동 (인)", colspan: 3 },
    ],
  },
];

// 자기소개서 미리보기 데이터
export const 자기소개서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "자기소개서", exampleValue: "자 기 소 개 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지원자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김지원" },
      { label: "지원 직무", isHeader: true },
      { placeholder: "(지원 직무)", exampleValue: "마케팅" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-9876-5432" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "jiwon@email.com" },
    ],
  },
  {
    fields: [
      { label: "1. 성장과정", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(성장과정을 기술하세요)", exampleValue: "저는 서울에서 태어나 부모님의 따뜻한 사랑 속에서 성장했습니다. 어릴 때부터 책읽기를 좋아했고, 이는 자연스럽게 글쓰기에 대한 관심으로 이어졌습니다. 대학 시절 마케팅 동아리 활동을 하며 '소통의 힘'을 깨달았습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 지원동기", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(지원동기를 기술하세요)", exampleValue: "귀사의 혁신적인 마케팅 전략과 고객 중심 철학에 깊은 감명을 받았습니다. 특히 최근 진행한 '함께 성장하는 브랜드' 캠페인은 제가 추구하는 마케팅 방향과 일치합니다. 제 경험과 열정을 귀사에서 발휘하고 싶습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 성격의 장단점", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(성격의 장단점을 기술하세요)", exampleValue: "장점: 새로운 도전을 두려워하지 않는 도전정신과 팀원들과의 협업 능력입니다. 프로젝트 진행 시 항상 소통을 최우선으로 생각합니다. 단점: 완벽주의 성향이 있어 때로는 일 처리가 늦어질 때가 있습니다. 이를 극복하기 위해 우선순위를 정해 효율적으로 업무를 처리하고 있습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 입사 후 포부", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(입사 후 포부를 기술하세요)", exampleValue: "입사 후 3년 내에 담당 브랜드의 인지도를 20% 향상시키는 것이 목표입니다. 이를 위해 데이터 기반 마케팅 역량을 키우고, 트렌드에 민감한 콘텐츠 기획력을 갖추겠습니다. 궁극적으로 귀사의 마케팅 팀을 이끄는 리더로 성장하고 싶습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true },
      { placeholder: "작성자: _______ (서명)", exampleValue: "작성자: 김지원 (서명)", colspan: 3 },
    ],
  },
];
