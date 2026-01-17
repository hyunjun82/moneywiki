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
