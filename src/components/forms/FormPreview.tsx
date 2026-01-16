"use client";

interface FormField {
  label?: string;
  value?: string;
  placeholder?: string;
  colspan?: number;
  rowspan?: number;
  isHeader?: boolean;
}

interface FormRow {
  fields: FormField[];
}

interface FormPreviewProps {
  title: string;
  rows: FormRow[];
  className?: string;
}

export default function FormPreview({ title, rows, className = "" }: FormPreviewProps) {
  return (
    <div className={`bg-white border border-neutral-200 rounded-lg overflow-hidden ${className}`}>
      {/* 제목 바 */}
      <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-800">{title}</h3>
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
    </div>
  );
}

// 표준근로계약서 미리보기 데이터 (고용노동부 표준양식 기준)
export const 표준근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 근로개시일", isHeader: true },
      { placeholder: "____년 __월 __일부터", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 근무장소", isHeader: true },
      { placeholder: "(입력란)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 업무의 내용", isHeader: true },
      { placeholder: "(입력란)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 소정근로시간", isHeader: true },
      { placeholder: "__시 __분 ~ __시 __분 (휴게: __시 __분 ~ __시 __분)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "5. 근무일/휴일", isHeader: true },
      { placeholder: "매주 __일 근무, 주휴일 매주 __요일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "6. 임금", isHeader: true },
      { placeholder: "월(일, 시간)급: ________원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )" },
      { label: "기타 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]" },
    ],
  },
  {
    fields: [
      { label: "임금지급일", isHeader: true },
      { placeholder: "매월(매주) __일" },
      { label: "지급방법", isHeader: true },
      { placeholder: "직접지급 [  ] / 계좌입금 [  ]" },
    ],
  },
  {
    fields: [
      { label: "7. 연차유급휴가", isHeader: true },
      { placeholder: "근로기준법에서 정하는 바에 따라 부여", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "8. 사회보험", isHeader: true },
      { placeholder: "4대 보험 (고용/산재/국민연금/건강보험) 적용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명:          대표자:          (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "성명:              연락처:          (서명)", colspan: 3 },
    ],
  },
];

// 단시간근로계약서 (알바) 미리보기 데이터 (고용노동부 표준양식 기준)
export const 단시간근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 근로개시일", isHeader: true },
      { placeholder: "____년 __월 __일부터", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 근무장소", isHeader: true },
      { placeholder: "(입력란)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 업무의 내용", isHeader: true },
      { placeholder: "(입력란)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 근로일별 근로시간", isHeader: true },
      { placeholder: "요일별 시작/종료/휴게시간 기재 (표 형태)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주휴일", isHeader: true },
      { placeholder: "매주 __요일" },
      { label: "공휴일", isHeader: true },
      { placeholder: "근로기준법에 따름" },
    ],
  },
  {
    fields: [
      { label: "5. 임금", isHeader: true },
      { placeholder: "시간(일, 월)급: ________원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )" },
      { label: "기타 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]" },
    ],
  },
  {
    fields: [
      { label: "초과근로 가산임금률", isHeader: true },
      { placeholder: "______% (통상임금의 50% 이상)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임금지급일", isHeader: true },
      { placeholder: "매월(매주) __일" },
      { label: "지급방법", isHeader: true },
      { placeholder: "직접지급 [  ] / 계좌입금 [  ]" },
    ],
  },
  {
    fields: [
      { label: "6. 연차유급휴가", isHeader: true },
      { placeholder: "통상근로자 근로시간에 비례하여 부여", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "7. 사회보험", isHeader: true },
      { placeholder: "4대 보험 (고용/산재/국민연금/건강보험) 적용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명:          대표자:          (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "성명:              연락처:          (서명)", colspan: 3 },
    ],
  },
];

// 기간제근로계약서 (계약직) 미리보기 데이터 (고용노동부 표준양식 기준)
export const 기간제근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 근로계약기간", isHeader: true },
      { placeholder: "____년 __월 __일부터 ____년 __월 __일까지", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 근무장소", isHeader: true },
      { placeholder: "(입력란)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 업무의 내용", isHeader: true },
      { placeholder: "(입력란)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 소정근로시간", isHeader: true },
      { placeholder: "__시 __분 ~ __시 __분 (휴게: __시 __분 ~ __시 __분)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "5. 근무일/휴일", isHeader: true },
      { placeholder: "매주 __일 근무, 주휴일 매주 __요일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "6. 임금", isHeader: true },
      { placeholder: "월(일, 시간)급: ________원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )" },
      { label: "기타 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]" },
    ],
  },
  {
    fields: [
      { label: "임금지급일", isHeader: true },
      { placeholder: "매월(매주) __일" },
      { label: "지급방법", isHeader: true },
      { placeholder: "직접지급 [  ] / 계좌입금 [  ]" },
    ],
  },
  {
    fields: [
      { label: "7. 연차유급휴가", isHeader: true },
      { placeholder: "근로기준법에서 정하는 바에 따라 부여", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "8. 사회보험", isHeader: true },
      { placeholder: "4대 보험 (고용/산재/국민연금/건강보험) 적용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명:          대표자:          (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "성명:              연락처:          (서명)", colspan: 3 },
    ],
  },
];
