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
