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

// 표준근로계약서 미리보기 데이터
export const 표준근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업체명", isHeader: true },
      { placeholder: "(주)○○○○", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "홍길동" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "000-00-00000" },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "서울특별시 ○○구 ○○로 00", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로자 성명", isHeader: true },
      { placeholder: "김철수" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "000000-0000000" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "서울특별시 ○○구 ○○로 00", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "010-0000-0000" },
      { label: "이메일", isHeader: true },
      { placeholder: "example@email.com" },
    ],
  },
  {
    fields: [
      { label: "계약기간", isHeader: true },
      { placeholder: "기간의 정함이 없음 / 2026.01.01 ~ 2026.12.31", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무장소", isHeader: true },
      { placeholder: "본사 또는 회사가 지정하는 장소", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업무내용", isHeader: true },
      { placeholder: "○○○○ 업무", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로시간", isHeader: true },
      { placeholder: "09:00 ~ 18:00 (휴게시간 12:00~13:00)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무일/휴일", isHeader: true },
      { placeholder: "주 5일 (월~금) / 주휴일: 매주 일요일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임금", isHeader: true },
      { placeholder: "월급 ○,○○○,○○○원 (시급 10,320원 이상)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임금 지급일", isHeader: true },
      { placeholder: "매월 25일" },
      { label: "지급방법", isHeader: true },
      { placeholder: "근로자 명의 계좌 입금" },
    ],
  },
  {
    fields: [
      { label: "연차유급휴가", isHeader: true },
      { placeholder: "근로기준법에서 정하는 바에 따라 부여", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사회보험 적용", isHeader: true },
      { placeholder: "☑ 고용보험  ☑ 산재보험  ☑ 국민연금  ☑ 건강보험", colspan: 3 },
    ],
  },
];

// 단시간근로계약서 (알바) 미리보기 데이터
export const 단시간근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업체명", isHeader: true },
      { placeholder: "○○○○", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "홍길동" },
      { label: "전화번호", isHeader: true },
      { placeholder: "02-0000-0000" },
    ],
  },
  {
    fields: [
      { label: "근로자 성명", isHeader: true },
      { placeholder: "김알바" },
      { label: "생년월일", isHeader: true },
      { placeholder: "2000.01.01" },
    ],
  },
  {
    fields: [
      { label: "계약기간", isHeader: true },
      { placeholder: "2026.01.01 ~ 2026.06.30", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무장소", isHeader: true },
      { placeholder: "○○점", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업무내용", isHeader: true },
      { placeholder: "매장 판매 보조", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로일", isHeader: true },
      { placeholder: "매주 월, 수, 금요일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로시간", isHeader: true },
      { placeholder: "14:00 ~ 18:00 (1일 4시간)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "시급", isHeader: true },
      { placeholder: "10,320원 (2026년 최저임금)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주휴수당", isHeader: true },
      { placeholder: "주 15시간 이상 시 별도 지급", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임금 지급일", isHeader: true },
      { placeholder: "매월 10일" },
      { label: "지급방법", isHeader: true },
      { placeholder: "계좌이체" },
    ],
  },
];

// 기간제근로계약서 (계약직) 미리보기 데이터
export const 기간제근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업체명", isHeader: true },
      { placeholder: "(주)○○○○", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "홍길동" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "000-00-00000" },
    ],
  },
  {
    fields: [
      { label: "근로자 성명", isHeader: true },
      { placeholder: "이계약" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "000000-0000000" },
    ],
  },
  {
    fields: [
      { label: "계약기간", isHeader: true },
      { placeholder: "2026.01.01 ~ 2026.12.31 (1년)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "갱신여부", isHeader: true },
      { placeholder: "☐ 갱신가능  ☐ 갱신없음  ☐ 협의 후 결정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무장소", isHeader: true },
      { placeholder: "본사", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업무내용", isHeader: true },
      { placeholder: "○○ 프로젝트 업무", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로시간", isHeader: true },
      { placeholder: "09:00 ~ 18:00 (휴게 1시간)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임금", isHeader: true },
      { placeholder: "월 ○,○○○,○○○원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약종료 시", isHeader: true },
      { placeholder: "퇴직금 지급 (1년 이상 근무 시)", colspan: 3 },
    ],
  },
];
