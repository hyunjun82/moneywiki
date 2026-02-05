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
// 표준근로계약서 (기간의 정함이 없는 경우) - 2025년 고용노동부 개정 양식 기준
export const 표준근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "계약서 제목", isHeader: true },
      { placeholder: "표준근로계약서(기간의 정함이 없는 경우)", exampleValue: "표준근로계약서(기간의 정함이 없는 경우)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true },
      { placeholder: "(이하 '사업주'라 함)과(와) (이하 '근로자'라 함)은 다음과 같이 근로계약을 체결한다.", exampleValue: "(주)OO컴퍼니(이하 '사업주'라 함)과(와) 김철수(이하 '근로자'라 함)은 다음과 같이 근로계약을 체결한다.", colspan: 3 },
    ],
  },
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
      { placeholder: "__시 __분 ~ __시 __분 (휴게: __시 __분 ~ __시 __분) (1일 __시간, 1주 __시간)", exampleValue: "09시 00분 ~ 18시 00분 (휴게: 12시 00분 ~ 13시 00분) (1일 8시간, 1주 40시간)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "5. 근무일/휴일", isHeader: true },
      { placeholder: "매주 __일 근무(필요시, 근무요일 __), 주휴일 매주 __요일", exampleValue: "매주 5일 근무(필요시, 근무요일 월~금), 주휴일 매주 일요일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "공휴일", isHeader: true },
      { placeholder: "공휴일(대체공휴일 포함)은 근로기준법이 정하는 바에 따르며, 근로자의 날은 유급휴일로 함", exampleValue: "공휴일(대체공휴일 포함)은 근로기준법이 정하는 바에 따르며, 근로자의 날은 유급휴일로 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "6. 임금", isHeader: true },
      { placeholder: "월(일, 시간)급: ________원", exampleValue: "월급: 2,800,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "- 상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )", exampleValue: "있음 (연 200만원)" },
      { label: "- 그 밖의 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]", exampleValue: "있음 [V] 식대 10만원, 교통비 10만원" },
    ],
  },
  {
    fields: [
      { label: "- 임금지급일", isHeader: true },
      { placeholder: "매월(매주 또는 매일) __일(휴일의 경우는 전날 지급)", exampleValue: "매월 25일(휴일의 경우는 전날 지급)" },
      { label: "- 지급방법", isHeader: true },
      { placeholder: "직접(현금)지급 [  ] / 계좌입금 [  ]", exampleValue: "계좌입금 [V]" },
    ],
  },
  {
    fields: [
      { label: "7. 연차유급휴가", isHeader: true },
      { placeholder: "연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함", exampleValue: "연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "8. 사회보험 적용여부", isHeader: true },
      { placeholder: "4대 사회보험(고용보험, 산재보험, 국민연금, 건강보험) 적용(가입)을 원칙으로 함", exampleValue: "4대 사회보험(고용보험, 산재보험, 국민연금, 건강보험) 적용(가입)을 원칙으로 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "9. 근로계약서 교부", isHeader: true },
      { placeholder: "사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)", exampleValue: "사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "10. 성실이행의무", isHeader: true },
      { placeholder: "사업주와 근로자는 각자가 근로계약, 취업규칙, 단체협약을 지키고 성실하게 이행하여야 함", exampleValue: "사업주와 근로자는 각자가 근로계약, 취업규칙, 단체협약을 지키고 성실하게 이행하여야 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "11. 그 밖의 사항", isHeader: true },
      { placeholder: "이 계약에 정함이 없는 사항은 근로관계법령에 따름", exampleValue: "이 계약에 정함이 없는 사항은 근로관계법령에 따름", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 10일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명: (전화: ) / 주소: / 대표자: (서명)", exampleValue: "사업체명: (주)OO컴퍼니 (전화: 02-123-4567) / 주소: 서울시 강남구 테헤란로 123 / 대표자: 홍길동 (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "주소: / 연락처: / 성명: (서명)", exampleValue: "주소: 서울시 마포구 OO로 45 / 연락처: 010-1234-5678 / 성명: 김철수 (서명)", colspan: 3 },
    ],
  },
];

// 단시간근로계약서 - 2025년 고용노동부 개정 양식 기준
export const 단시간근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "계약서 제목", isHeader: true },
      { placeholder: "단시간근로자 표준근로계약서", exampleValue: "단시간근로자 표준근로계약서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true },
      { placeholder: "(이하 '사업주'라 함)과(와) (이하 '근로자'라 함)은 다음과 같이 근로계약을 체결한다.", exampleValue: "OO카페(이하 '사업주'라 함)과(와) 이민수(이하 '근로자'라 함)은 다음과 같이 근로계약을 체결한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "1. 근로개시일", isHeader: true },
      { placeholder: "____년 __월 __일부터 (※ 기간 정하는 경우: ~까지)", exampleValue: "2026년 2월 1일부터", colspan: 3 },
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
      { label: "4. 근로일 및 근로일별 근로시간", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "요일", isHeader: true },
      { placeholder: "월/화/수/목/금/토", exampleValue: "월요일 / 수요일 / 금요일" },
      { label: "근로시간", isHeader: true },
      { placeholder: "__시간", exampleValue: "6시간 / 6시간 / 6시간" },
    ],
  },
  {
    fields: [
      { label: "업무시작", isHeader: true },
      { placeholder: "__시 __분", exampleValue: "14시 00분" },
      { label: "업무종료", isHeader: true },
      { placeholder: "__시 __분", exampleValue: "20시 30분" },
    ],
  },
  {
    fields: [
      { label: "휴게시간", isHeader: true },
      { placeholder: "__시 __분 ~ __시 __분", exampleValue: "17시 00분 ~ 17시 30분" },
      { label: "주휴일", isHeader: true },
      { placeholder: "매주 __요일", exampleValue: "매주 일요일" },
    ],
  },
  {
    fields: [
      { label: "공휴일", isHeader: true },
      { placeholder: "공휴일(대체공휴일 포함)은 근로기준법이 정하는 바에 따르며, 근로자의 날은 유급휴일로 함", exampleValue: "공휴일(대체공휴일 포함)은 근로기준법이 정하는 바에 따르며, 근로자의 날은 유급휴일로 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "5. 임금", isHeader: true },
      { placeholder: "시간(일, 월)급: ________원", exampleValue: "시간급: 10,320원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "- 상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )", exampleValue: "없음" },
      { label: "- 그 밖의 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]", exampleValue: "있음 [V] 식대 제공" },
    ],
  },
  {
    fields: [
      { label: "- 초과근로 가산임금률", isHeader: true },
      { placeholder: "______% (※ 단시간근로자 초과근로 시 통상임금 50% 이상 가산)", exampleValue: "50% (통상임금의 50% 이상)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "- 임금지급일", isHeader: true },
      { placeholder: "매월(매주 또는 매일) __일(휴일의 경우는 전날 지급)", exampleValue: "매월 10일(휴일의 경우는 전날 지급)" },
      { label: "- 지급방법", isHeader: true },
      { placeholder: "직접(현금)지급 [  ] / 계좌입금 [  ]", exampleValue: "계좌입금 [V]" },
    ],
  },
  {
    fields: [
      { label: "6. 연차유급휴가", isHeader: true },
      { placeholder: "통상근로자의 근로시간에 비례하여 연차유급휴가 부여", exampleValue: "통상근로자의 근로시간에 비례하여 연차유급휴가 부여", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "7. 사회보험 적용여부", isHeader: true },
      { placeholder: "4대 사회보험(고용보험, 산재보험, 국민연금, 건강보험) 적용(가입)을 원칙으로 함", exampleValue: "4대 사회보험(고용보험, 산재보험, 국민연금, 건강보험) 적용(가입)을 원칙으로 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "8. 근로계약서 교부", isHeader: true },
      { placeholder: "사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)", exampleValue: "사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "9. 성실이행의무", isHeader: true },
      { placeholder: "사업주와 근로자는 각자가 근로계약, 취업규칙, 단체협약을 지키고 성실하게 이행하여야 함", exampleValue: "사업주와 근로자는 각자가 근로계약, 취업규칙, 단체협약을 지키고 성실하게 이행하여야 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "10. 그 밖의 사항", isHeader: true },
      { placeholder: "이 계약에 정함이 없는 사항은 근로관계법령에 따름", exampleValue: "이 계약에 정함이 없는 사항은 근로관계법령에 따름", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명: (전화: ) / 주소: / 대표자: (서명)", exampleValue: "사업체명: OO카페 (전화: 02-333-4444) / 주소: 서울시 마포구 홍대입구역 / 대표자: 박영희 (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "주소: / 연락처: / 성명: (서명)", exampleValue: "주소: 서울시 마포구 OO동 / 연락처: 010-9876-5432 / 성명: 이민수 (서명)", colspan: 3 },
    ],
  },
];

// 기간제근로계약서 (기간의 정함이 있는 경우) - 2025년 고용노동부 개정 양식 기준
export const 기간제근로계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "계약서 제목", isHeader: true },
      { placeholder: "표준근로계약서(기간의 정함이 있는 경우)", exampleValue: "표준근로계약서(기간의 정함이 있는 경우)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true },
      { placeholder: "(이하 '사업주'라 함)과(와) (이하 '근로자'라 함)은 다음과 같이 근로계약을 체결한다.", exampleValue: "(주)OO증권(이하 '사업주'라 함)과(와) 정수현(이하 '근로자'라 함)은 다음과 같이 근로계약을 체결한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "1. 근로계약기간", isHeader: true },
      { placeholder: "____년 __월 __일부터 ____년 __월 __일까지", exampleValue: "2026년 3월 1일부터 2027년 2월 28일까지", colspan: 3 },
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
      { placeholder: "__시 __분 ~ __시 __분 (휴게: __시 __분 ~ __시 __분) (1일 __시간, 1주 __시간)", exampleValue: "09시 00분 ~ 18시 00분 (휴게: 12시 00분 ~ 13시 00분) (1일 8시간, 1주 40시간)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "5. 근무일/휴일", isHeader: true },
      { placeholder: "매주 __일 근무(필요시, 근무요일 __), 주휴일 매주 __요일", exampleValue: "매주 5일 근무(필요시, 근무요일 월~금), 주휴일 매주 일요일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "공휴일", isHeader: true },
      { placeholder: "공휴일(대체공휴일 포함)은 근로기준법이 정하는 바에 따르며, 근로자의 날은 유급휴일로 함", exampleValue: "공휴일(대체공휴일 포함)은 근로기준법이 정하는 바에 따르며, 근로자의 날은 유급휴일로 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "6. 임금", isHeader: true },
      { placeholder: "월(일, 시간)급: ________원", exampleValue: "월급: 3,200,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "- 상여금", isHeader: true },
      { placeholder: "있음 (    )원 / 없음 (    )", exampleValue: "없음" },
      { label: "- 그 밖의 수당", isHeader: true },
      { placeholder: "있음 [   ] / 없음 [   ]", exampleValue: "있음 [V] 식대 15만원" },
    ],
  },
  {
    fields: [
      { label: "- 임금지급일", isHeader: true },
      { placeholder: "매월(매주 또는 매일) __일(휴일의 경우는 전날 지급)", exampleValue: "매월 25일(휴일의 경우는 전날 지급)" },
      { label: "- 지급방법", isHeader: true },
      { placeholder: "직접(현금)지급 [  ] / 계좌입금 [  ]", exampleValue: "계좌입금 [V]" },
    ],
  },
  {
    fields: [
      { label: "7. 연차유급휴가", isHeader: true },
      { placeholder: "연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함", exampleValue: "연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "8. 사회보험 적용여부", isHeader: true },
      { placeholder: "4대 사회보험(고용보험, 산재보험, 국민연금, 건강보험) 적용(가입)을 원칙으로 함", exampleValue: "4대 사회보험(고용보험, 산재보험, 국민연금, 건강보험) 적용(가입)을 원칙으로 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "9. 근로계약서 교부", isHeader: true },
      { placeholder: "사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)", exampleValue: "사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "10. 성실이행의무", isHeader: true },
      { placeholder: "사업주와 근로자는 각자가 근로계약, 취업규칙, 단체협약을 지키고 성실하게 이행하여야 함", exampleValue: "사업주와 근로자는 각자가 근로계약, 취업규칙, 단체협약을 지키고 성실하게 이행하여야 함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "11. 그 밖의 사항", isHeader: true },
      { placeholder: "이 계약에 정함이 없는 사항은 근로관계법령에 따름", exampleValue: "이 계약에 정함이 없는 사항은 근로관계법령에 따름", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(사업주)", isHeader: true },
      { placeholder: "사업체명: (전화: ) / 주소: / 대표자: (서명)", exampleValue: "사업체명: (주)OO증권 (전화: 02-789-1234) / 주소: 서울시 영등포구 여의도동 / 대표자: 최현우 (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(근로자)", isHeader: true },
      { placeholder: "주소: / 연락처: / 성명: (서명)", exampleValue: "주소: 서울시 강서구 OO동 / 연락처: 010-5555-1234 / 성명: 정수현 (서명)", colspan: 3 },
    ],
  },
];

// 임대차계약서 미리보기 데이터 (법무부 주택임대차표준계약서 기준)
export const 임대차계약서_DATA: FormRow[] = [
  // 제목 및 계약 유형
  {
    fields: [
      { label: "계약서 제목", isHeader: true },
      { placeholder: "주택임대차표준계약서", exampleValue: "주택임대차표준계약서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 유형", isHeader: true },
      { placeholder: "☐ 보증금 있는 월세  ☐ 전세  ☐ 월세", exampleValue: "☑ 전세", colspan: 3 },
    ],
  },
  // [임차주택의 표시]
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(도로명주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "토지", isHeader: true },
      { placeholder: "지목:          면적:          ㎡", exampleValue: "지목: 대  면적: 500㎡" },
      { label: "건물", isHeader: true },
      { placeholder: "구조·용도:          면적:          ㎡", exampleValue: "구조: 철근콘크리트  면적: 84.5㎡" },
    ],
  },
  {
    fields: [
      { label: "임차할 부분", isHeader: true },
      { placeholder: "상세주소가 있는 경우 동·층·호 정확히 기재", exampleValue: "101동 1001호 (전용면적 84.5㎡)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약의 종류", isHeader: true },
      { placeholder: "☐ 신규 계약  ☐ 합의에 의한 재계약  ☐ 갱신계약", exampleValue: "☑ 신규 계약", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "미납 국세·지방세", isHeader: true },
      { placeholder: "☐ 없음  ☐ 있음", exampleValue: "☑ 없음 (임대인 서명 또는 날인)" },
      { label: "선순위 확정일자 현황", isHeader: true },
      { placeholder: "☐ 해당 없음  ☐ 해당 있음", exampleValue: "☑ 해당 없음" },
    ],
  },
  // [계약내용] 제1조
  {
    fields: [
      { label: "보증금", isHeader: true },
      { placeholder: "금                                  원정 (\\                    )", exampleValue: "금 삼억원정 (\\300,000,000)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약금", isHeader: true },
      { placeholder: "금          원정은 계약시에 지불하고 영수함", exampleValue: "금 삼천만원정은 계약시에 지불하고 영수함. 영수자 (인)" },
      { label: "중도금", isHeader: true },
      { placeholder: "금          원정은    년   월   일에 지불", exampleValue: "금 0원정 (중도금 없음)" },
    ],
  },
  {
    fields: [
      { label: "잔금", isHeader: true },
      { placeholder: "금          원정은    년   월   일에 지불한다", exampleValue: "금 이억칠천만원정은 2026년 2월 1일에 지불한다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "차임 (월세)", isHeader: true },
      { placeholder: "금          원정은 매월     일에 지불한다", exampleValue: "해당없음 (전세계약)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "관리비", isHeader: true },
      { placeholder: "(정액인 경우) 총액 금          원정", exampleValue: "월 15만원 (일반관리비, 수도료, 가스요금 포함)", colspan: 3 },
    ],
  },
  // 제2조 임대차기간
  {
    fields: [
      { label: "임대차 기간", isHeader: true },
      { placeholder: "   년   월   일까지 인도하고,    년   월   일까지", exampleValue: "2026년 2월 1일부터 2028년 1월 31일까지 (2년)", colspan: 3 },
    ],
  },
  // 제3조 입주 전 수리
  {
    fields: [
      { label: "입주 전 수리", isHeader: true },
      { placeholder: "☐ 없음  ☐ 있음 (수리할 내용:                    )", exampleValue: "☑ 있음 (도배, 장판 전체 교체)", colspan: 3 },
    ],
  },
  // 특약사항
  {
    fields: [
      { label: "특약사항", isHeader: true },
      { placeholder: "임대인과 임차인 간의 특별한 약정 사항", exampleValue: "1. 도배, 장판 신규 교체 후 입주\n2. 에어컨 2대 기존 설치분 포함\n3. 전입신고 및 확정일자 2026년 2월 2일까지 완료\n4. 임대인은 위 일자까지 담보권 설정 불가", colspan: 3 },
    ],
  },
  // 계약 당사자
  {
    fields: [
      { label: "임대인", isHeader: true },
      { placeholder: "주소:          주민등록번호:          성명:          (서명 또는 날인)", exampleValue: "주소: 서울시 강남구  주민등록번호: 700101-1******  성명: 홍길동 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "임차인", isHeader: true },
      { placeholder: "주소:          주민등록번호:          성명:          (서명 또는 날인)", exampleValue: "주소: 서울시 서초구  주민등록번호: 900515-1******  성명: 김철수 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "개업공인중개사", isHeader: true },
      { placeholder: "사무소명칭:          등록번호:          대표:          (서명 및 날인)", exampleValue: "사무소: OO공인중개사  등록번호: 11680-2024-00123  대표: 박영희 (인)", colspan: 3 },
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

// 4대보험가입신청서 미리보기 데이터
export const 사대보험가입신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "4대보험 가입 신청서", exampleValue: "4 대 보 험 가 입 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)한국테크" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "사업장 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 100, 5층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대표자명", isHeader: true },
      { placeholder: "(대표자)", exampleValue: "김대표" },
      { label: "담당자 연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "근로자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박신입" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "950315-1******" },
    ],
  },
  {
    fields: [
      { label: "입사일", isHeader: true },
      { placeholder: "(입사일)", exampleValue: "2026년 1월 15일" },
      { label: "직종", isHeader: true },
      { placeholder: "(직종)", exampleValue: "사무직" },
    ],
  },
  {
    fields: [
      { label: "월 보수", isHeader: true },
      { placeholder: "(월 보수액)", exampleValue: "3,500,000원" },
      { label: "근무형태", isHeader: true },
      { placeholder: "(근무형태)", exampleValue: "정규직" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(근로자 주소)", exampleValue: "서울시 송파구 올림픽로 123, 101동 501호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "가입 보험 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "국민연금", isHeader: true },
      { placeholder: "(가입여부)", exampleValue: "가입" },
      { label: "건강보험", isHeader: true },
      { placeholder: "(가입여부)", exampleValue: "가입" },
    ],
  },
  {
    fields: [
      { label: "고용보험", isHeader: true },
      { placeholder: "(가입여부)", exampleValue: "가입" },
      { label: "산재보험", isHeader: true },
      { placeholder: "(가입여부)", exampleValue: "가입" },
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
      { label: "신청인", isHeader: true },
      { placeholder: "사업장명: ___________ 대표자: ___________ (인)", exampleValue: "사업장명: (주)한국테크 대표자: 김대표 (인)", colspan: 3 },
    ],
  },
];

// 4대보험자격상실신고서 미리보기 데이터
export const 사대보험자격상실신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "4대보험 자격상실 신고서", exampleValue: "4 대 보 험 자 격 상 실 신 고 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)한국무역" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "987-65-43210" },
    ],
  },
  {
    fields: [
      { label: "사업장 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 중구 세종대로 50, 10층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "최퇴사" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "880720-2******" },
    ],
  },
  {
    fields: [
      { label: "입사일", isHeader: true },
      { placeholder: "(입사일)", exampleValue: "2022년 3월 1일" },
      { label: "퇴사일", isHeader: true },
      { placeholder: "(퇴사일)", exampleValue: "2026년 1월 31일" },
    ],
  },
  {
    fields: [
      { label: "상실 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상실 사유", isHeader: true },
      { placeholder: "(상실 사유)", exampleValue: "자진 퇴직 (이직)" },
      { label: "상실일", isHeader: true },
      { placeholder: "(상실일)", exampleValue: "2026년 2월 1일" },
    ],
  },
  {
    fields: [
      { label: "최종 보수", isHeader: true },
      { placeholder: "(최종 월 보수)", exampleValue: "4,200,000원" },
      { label: "퇴직금 지급", isHeader: true },
      { placeholder: "(퇴직금 지급여부)", exampleValue: "지급 예정" },
    ],
  },
  {
    fields: [
      { label: "상실 보험 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "국민연금", isHeader: true },
      { placeholder: "(상실여부)", exampleValue: "상실" },
      { label: "건강보험", isHeader: true },
      { placeholder: "(상실여부)", exampleValue: "상실" },
    ],
  },
  {
    fields: [
      { label: "고용보험", isHeader: true },
      { placeholder: "(상실여부)", exampleValue: "상실" },
      { label: "산재보험", isHeader: true },
      { placeholder: "(상실여부)", exampleValue: "상실" },
    ],
  },
  {
    fields: [
      { label: "신고일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 2월 5일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "사업장명: ___________ 대표자: ___________ (인)", exampleValue: "사업장명: (주)한국무역 대표자: 박사장 (인)", colspan: 3 },
    ],
  },
];

// 가족관계증명서신청서 미리보기 데이터
// 가족관계등록부 등의 증명서 교부 등 신청서 (별지 제11호 서식)
export const 가족관계증명서신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제11호 서식] 가족관계등록부 등의 증명서 교부 등 신청서", exampleValue: "[별지 제11호 서식] 가족관계등록부 등의 증명서 교부 등 신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청 대상자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(한글)          (한자:          )", exampleValue: "김민수 (한자: 金民秀)" },
      { label: "등록기준지", isHeader: true },
      { placeholder: "(등록기준지)", exampleValue: "서울특별시 서초구" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "900101-1******", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1. 일반증명서", isHeader: true },
      { placeholder: "①가족관계증명서( )통 ②기본증명서( )통 ③혼인관계증명서( )통 ④입양관계증명서( )통 ⑤친양자입양관계증명서( )통", exampleValue: "①가족관계증명서(2)통", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 상세증명서", isHeader: true },
      { placeholder: "①가족관계증명서( )통 ②기본증명서( )통 ③혼인관계증명서( )통 ④입양관계증명서( )통 ⑤친양자입양관계증명서( )통", exampleValue: "(해당없음)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 특정증명서", isHeader: true },
      { placeholder: "①기본증명서(특정-친권·후견)( )통", exampleValue: "(해당없음)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주민등록번호 공개", isHeader: true },
      { placeholder: "□전부 공개 □신청대상자 본인만 공개", exampleValue: "☑신청대상자 본인만 공개" },
      { label: "공개 신청 사유", isHeader: true },
      { placeholder: "□신청대상자 본인 또는 부모, 양부모, 배우자, 자녀 및 그 대리인인 경우", exampleValue: "☑신청대상자 본인인 경우" },
    ],
  },
  {
    fields: [
      { label: "청구사유", isHeader: true },
      { placeholder: "(발급 목적)", exampleValue: "금융기관 제출용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명) (인 또는 서명)", exampleValue: "김민수 (서명)" },
      { label: "생년월일", isHeader: true },
      { placeholder: "    .  .  .", exampleValue: "1990. 1. 1." },
    ],
  },
  {
    fields: [
      { label: "신청인자격", isHeader: true },
      { placeholder: "(본인/배우자/직계혈족 등)", exampleValue: "본인" },
      { label: "휴대전화번호", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "접수번호", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일" },
      { label: "제출처", isHeader: true },
      { placeholder: "○○시(구)·읍·면장 귀하", exampleValue: "서초구청장 귀하" },
    ],
  },
];

// 개명신청서 미리보기 데이터
export const 개명신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "개명 허가 신청서", exampleValue: "개 명 허 가 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "현재 성명", isHeader: true },
      { placeholder: "(현재 성명)", exampleValue: "김철수" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "950510-1******" },
    ],
  },
  {
    fields: [
      { label: "변경할 성명", isHeader: true },
      { placeholder: "(변경할 성명)", exampleValue: "김민수" },
      { label: "변경할 한자", isHeader: true },
      { placeholder: "(한자)", exampleValue: "金敏秀" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 삼성로 50, 201호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-9876-5432" },
      { label: "직업", isHeader: true },
      { placeholder: "(직업)", exampleValue: "회사원" },
    ],
  },
  {
    fields: [
      { label: "개명 사유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상세 사유", isHeader: true },
      { placeholder: "(개명 사유를 상세히 기재)", exampleValue: "현재 이름 '철수'가 너무 흔해서 동명이인이 많아 일상생활과 직장에서 혼란이 발생함. 동일 부서에 같은 이름의 동료가 있어 서류 혼동, 택배 오배송 등 실질적 불편이 지속됨.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "법정대리인 정보 (미성년자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "법정대리인", isHeader: true },
      { placeholder: "(해당 시 기재)", exampleValue: "해당 없음" },
      { label: "관계", isHeader: true },
      { placeholder: "(관계)", exampleValue: "-" },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(첨부 서류)", exampleValue: "가족관계증명서 1부, 기본증명서 1부, 주민등록등본 1부", colspan: 3 },
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
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 김철수 (서명)", colspan: 3 },
    ],
  },
];

// 건축물대장신청서 미리보기 데이터
export const 건축물대장신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "건축물대장 발급 신청서", exampleValue: "건 축 물 대 장 발 급 신 청 서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "박건축" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850515-1******" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-5555-6666" },
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 마포구 월드컵로 100" },
    ],
  },
  {
    fields: [
      { label: "대상 건축물 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(건물 주소)", exampleValue: "서울시 강남구 역삼로 123, 456호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "건물명", isHeader: true },
      { placeholder: "(건물명)", exampleValue: "테헤란빌딩" },
      { label: "동/호", isHeader: true },
      { placeholder: "(동/호수)", exampleValue: "5층 502호" },
    ],
  },
  {
    fields: [
      { label: "건축물 종류", isHeader: true },
      { placeholder: "(일반/집합)", exampleValue: "집합건축물" },
      { label: "용도", isHeader: true },
      { placeholder: "(용도)", exampleValue: "업무시설(오피스텔)" },
    ],
  },
  {
    fields: [
      { label: "신청 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발급 유형", isHeader: true },
      { placeholder: "(유형)", exampleValue: "건축물대장(집합건축물 전유부)" },
      { label: "발급 부수", isHeader: true },
      { placeholder: "(부수)", exampleValue: "2부" },
    ],
  },
  {
    fields: [
      { label: "발급 목적", isHeader: true },
      { placeholder: "(발급 목적)", exampleValue: "부동산 매매계약용" },
      { label: "수령 방법", isHeader: true },
      { placeholder: "(수령방법)", exampleValue: "창구 수령" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 22일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 박건축 (서명)", colspan: 3 },
    ],
  },
];

// 경력기술서 미리보기 데이터
export const 경력기술서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "경력기술서", exampleValue: "경 력 기 술 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인적사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이경력" },
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-3333-4444" },
    ],
  },
  {
    fields: [
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "career@email.com" },
      { label: "지원 직무", isHeader: true },
      { placeholder: "(직무)", exampleValue: "마케팅 매니저" },
    ],
  },
  {
    fields: [
      { label: "경력 1", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)ABC마케팅" },
      { label: "근무 기간", isHeader: true },
      { placeholder: "(근무기간)", exampleValue: "2020.03 ~ 2024.12 (4년 10개월)" },
    ],
  },
  {
    fields: [
      { label: "직급/직책", isHeader: true },
      { placeholder: "(직급/직책)", exampleValue: "과장 / 마케팅팀장" },
      { label: "담당 업무", isHeader: true },
      { placeholder: "(담당 업무)", exampleValue: "디지털 마케팅 전략 기획 및 실행" },
    ],
  },
  {
    fields: [
      { label: "프로젝트 1", isHeader: true },
      { placeholder: "(프로젝트명)", exampleValue: "신규 브랜드 런칭 캠페인", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "역할", isHeader: true },
      { placeholder: "(역할)", exampleValue: "프로젝트 총괄 리드" },
      { label: "기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "2023.01 ~ 2023.06" },
    ],
  },
  {
    fields: [
      { label: "성과", isHeader: true },
      { placeholder: "(정량적 성과)", exampleValue: "신규 고객 유입 150% 증가, 브랜드 인지도 40%p 향상, SNS 팔로워 10만 달성", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "핵심 역량", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "보유 역량", isHeader: true },
      { placeholder: "(핵심 역량)", exampleValue: "디지털 마케팅 전략 수립, 데이터 기반 의사결정, 팀 리더십, 예산 관리, 크로스펑셔널 협업", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true },
      { placeholder: "작성자: _______ (서명)", exampleValue: "작성자: 이경력 (서명)", colspan: 3 },
    ],
  },
];

// 경업금지계약서 미리보기 데이터
export const 경업금지계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "경업금지계약서", exampleValue: "경 업 금 지 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "회사(갑)", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)테크솔루션" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자)", exampleValue: "김대표" },
    ],
  },
  {
    fields: [
      { label: "임직원(을)", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박직원" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "연구개발부 과장" },
    ],
  },
  {
    fields: [
      { label: "계약 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "금지 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "퇴직일로부터 1년간" },
      { label: "금지 지역", isHeader: true },
      { placeholder: "(지역)", exampleValue: "대한민국 전역" },
    ],
  },
  {
    fields: [
      { label: "금지 업종", isHeader: true },
      { placeholder: "(금지 업종)", exampleValue: "소프트웨어 개발업, IT 솔루션 제공업", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "금지 행위", isHeader: true },
      { placeholder: "(금지 행위)", exampleValue: "동종 업계 취업, 경쟁사 창업, 경쟁사 임원 취임, 기술 제공", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대가 및 보상", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "경업금지 보상금", isHeader: true },
      { placeholder: "(보상금)", exampleValue: "퇴직금과 별도로 월 급여의 50% × 12개월 지급" },
      { label: "지급 시기", isHeader: true },
      { placeholder: "(지급 시기)", exampleValue: "퇴직 시 일시불 또는 월별 분할" },
    ],
  },
  {
    fields: [
      { label: "위반 시 조치", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "손해배상", isHeader: true },
      { placeholder: "(손해배상액)", exampleValue: "보상금 전액 반환 + 실손해액 배상" },
      { label: "기타 조치", isHeader: true },
      { placeholder: "(기타)", exampleValue: "법적 금지명령(가처분) 신청 가능" },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "서명", isHeader: true },
      { placeholder: "갑: _______ (인)  을: _______ (인)", exampleValue: "갑: (주)테크솔루션 김대표 (인)  을: 박직원 (인)", colspan: 3 },
    ],
  },
];

// 교육훈련신청서 미리보기 데이터
export const 교육훈련신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "교육훈련 신청서", exampleValue: "교 육 훈 련 신 청 서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "최교육" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사원번호)", exampleValue: "2022-0156" },
    ],
  },
  {
    fields: [
      { label: "부서", isHeader: true },
      { placeholder: "(부서)", exampleValue: "개발팀" },
      { label: "직급", isHeader: true },
      { placeholder: "(직급)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-8888-9999" },
      { label: "입사일", isHeader: true },
      { placeholder: "(입사일)", exampleValue: "2022년 3월 1일" },
    ],
  },
  {
    fields: [
      { label: "교육 과정 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "교육명", isHeader: true },
      { placeholder: "(교육 과정명)", exampleValue: "AWS 클라우드 아키텍트 자격증 과정" },
      { label: "교육 기관", isHeader: true },
      { placeholder: "(교육 기관)", exampleValue: "한국AWS교육센터" },
    ],
  },
  {
    fields: [
      { label: "교육 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "2026년 2월 10일 ~ 2026년 2월 14일 (5일간)" },
      { label: "교육 장소", isHeader: true },
      { placeholder: "(장소)", exampleValue: "서울 강남 교육센터" },
    ],
  },
  {
    fields: [
      { label: "교육 시간", isHeader: true },
      { placeholder: "(시간)", exampleValue: "총 40시간 (1일 8시간)" },
      { label: "교육비", isHeader: true },
      { placeholder: "(비용)", exampleValue: "1,500,000원" },
    ],
  },
  {
    fields: [
      { label: "신청 사유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "업무 연관성", isHeader: true },
      { placeholder: "(업무 연관성)", exampleValue: "현재 진행 중인 클라우드 전환 프로젝트 담당으로 AWS 전문 역량 필요. 자격증 취득 시 프로젝트 품질 향상 및 운영 비용 20% 절감 기대", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "비용 처리", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "교육비", isHeader: true },
      { placeholder: "(교육비 부담)", exampleValue: "회사 전액 지원 요청" },
      { label: "출장 처리", isHeader: true },
      { placeholder: "(출장 여부)", exampleValue: "출장 처리 (5일간)" },
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
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 최교육 (서명)", colspan: 3 },
    ],
  },
];

// 근로계약해지통보서 미리보기 데이터
export const 근로계약해지통보서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "근로계약 해지 통보서", exampleValue: "근 로 계 약 해 지 통 보 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(근로자 성명)", exampleValue: "김해지" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사원번호)", exampleValue: "2023-0089" },
    ],
  },
  {
    fields: [
      { label: "부서", isHeader: true },
      { placeholder: "(소속 부서)", exampleValue: "영업팀" },
      { label: "직급", isHeader: true },
      { placeholder: "(직급)", exampleValue: "사원" },
    ],
  },
  {
    fields: [
      { label: "입사일", isHeader: true },
      { placeholder: "(입사일)", exampleValue: "2023년 4월 1일" },
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 성동구 왕십리로 100" },
    ],
  },
  {
    fields: [
      { label: "해지 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "해지 유형", isHeader: true },
      { placeholder: "(해지 유형)", exampleValue: "계약기간 만료" },
      { label: "최종 근무일", isHeader: true },
      { placeholder: "(최종 근무일)", exampleValue: "2026년 1월 31일" },
    ],
  },
  {
    fields: [
      { label: "해지 사유", isHeader: true },
      { placeholder: "(구체적인 해지 사유)", exampleValue: "1년 기간제 근로계약 종료에 따른 자연 만료. 계약 갱신에 대한 상호 협의 결과 갱신하지 않기로 합의함.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "퇴직금 정산", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "퇴직금", isHeader: true },
      { placeholder: "(퇴직금 지급액)", exampleValue: "3,500,000원 (예정)" },
      { label: "지급 예정일", isHeader: true },
      { placeholder: "(지급일)", exampleValue: "2026년 2월 14일" },
    ],
  },
  {
    fields: [
      { label: "미사용 연차수당", isHeader: true },
      { placeholder: "(연차수당)", exampleValue: "500,000원 (5일분)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "(지급 방법)", exampleValue: "급여 계좌 입금" },
    ],
  },
  {
    fields: [
      { label: "통보일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발신인", isHeader: true },
      { placeholder: "회사명: ___________ 대표이사: ___________ (인)", exampleValue: "회사명: (주)가나다상사 대표이사: 박대표 (인)", colspan: 3 },
    ],
  },
];

// 급여명세서 미리보기 데이터
export const 급여명세서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "급여명세서", exampleValue: "급 여 명 세 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지급 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "지급 연월", isHeader: true },
      { placeholder: "(지급 연월)", exampleValue: "2026년 1월분" },
      { label: "지급일", isHeader: true },
      { placeholder: "(지급일)", exampleValue: "2026년 1월 25일" },
    ],
  },
  {
    fields: [
      { label: "직원 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이급여" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사원번호)", exampleValue: "2022-0078" },
    ],
  },
  {
    fields: [
      { label: "부서", isHeader: true },
      { placeholder: "(부서)", exampleValue: "개발팀" },
      { label: "직급", isHeader: true },
      { placeholder: "(직급)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "근로 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "근로일수", isHeader: true },
      { placeholder: "(근로일수)", exampleValue: "22일" },
      { label: "근로시간", isHeader: true },
      { placeholder: "(근로시간)", exampleValue: "176시간" },
    ],
  },
  {
    fields: [
      { label: "지급 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "기본급", isHeader: true },
      { placeholder: "(기본급)", exampleValue: "3,000,000원" },
      { label: "식대", isHeader: true },
      { placeholder: "(식대)", exampleValue: "200,000원" },
    ],
  },
  {
    fields: [
      { label: "연장수당", isHeader: true },
      { placeholder: "(연장수당)", exampleValue: "300,000원 (20시간)" },
      { label: "상여금", isHeader: true },
      { placeholder: "(상여금)", exampleValue: "0원" },
    ],
  },
  {
    fields: [
      { label: "지급 합계", isHeader: true },
      { placeholder: "(지급 총액)", exampleValue: "3,500,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "공제 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "국민연금", isHeader: true },
      { placeholder: "(국민연금)", exampleValue: "157,500원 (4.5%)" },
      { label: "건강보험", isHeader: true },
      { placeholder: "(건강보험)", exampleValue: "124,070원 (3.545%)" },
    ],
  },
  {
    fields: [
      { label: "고용보험", isHeader: true },
      { placeholder: "(고용보험)", exampleValue: "31,500원 (0.9%)" },
      { label: "소득세", isHeader: true },
      { placeholder: "(소득세)", exampleValue: "67,500원" },
    ],
  },
  {
    fields: [
      { label: "지방소득세", isHeader: true },
      { placeholder: "(지방소득세)", exampleValue: "6,750원" },
      { label: "공제 합계", isHeader: true },
      { placeholder: "(공제 합계)", exampleValue: "387,320원" },
    ],
  },
  {
    fields: [
      { label: "실수령액", isHeader: true },
      { placeholder: "(실수령액)", exampleValue: "3,112,680원", colspan: 3 },
    ],
  },
];

// 납품서 미리보기 데이터
export const 납품서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "납품서", exampleValue: "납 품 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "납품처 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "수령업체", isHeader: true },
      { placeholder: "(업체명)", exampleValue: "(주)대한물류" },
      { label: "담당자", isHeader: true },
      { placeholder: "(담당자)", exampleValue: "이물류 과장" },
    ],
  },
  {
    fields: [
      { label: "납품 주소", isHeader: true },
      { placeholder: "(납품 주소)", exampleValue: "경기도 안산시 단원구 산업로 500, 물류센터 3층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "납품 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "납품일", isHeader: true },
      { placeholder: "(납품일)", exampleValue: "2026년 1월 20일" },
      { label: "발주서 번호", isHeader: true },
      { placeholder: "(발주서 번호)", exampleValue: "PO-2026-0123" },
    ],
  },
  {
    fields: [
      { label: "납품서 번호", isHeader: true },
      { placeholder: "(납품서 번호)", exampleValue: "DN-2026-0089" },
      { label: "운송방법", isHeader: true },
      { placeholder: "(운송)", exampleValue: "자가 배송" },
    ],
  },
  {
    fields: [
      { label: "품목 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "품목 1", isHeader: true },
      { placeholder: "(품목명)", exampleValue: "A4 복사용지 (80g)" },
      { label: "수량", isHeader: true },
      { placeholder: "(수량)", exampleValue: "100박스" },
    ],
  },
  {
    fields: [
      { label: "단가", isHeader: true },
      { placeholder: "(단가)", exampleValue: "25,000원" },
      { label: "금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "2,500,000원" },
    ],
  },
  {
    fields: [
      { label: "품목 2", isHeader: true },
      { placeholder: "(품목명)", exampleValue: "파일박스 (10개입)" },
      { label: "수량", isHeader: true },
      { placeholder: "(수량)", exampleValue: "20세트" },
    ],
  },
  {
    fields: [
      { label: "단가", isHeader: true },
      { placeholder: "(단가)", exampleValue: "15,000원" },
      { label: "금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "300,000원" },
    ],
  },
  {
    fields: [
      { label: "합계 금액", isHeader: true },
      { placeholder: "(합계)", exampleValue: "2,800,000원 (VAT 별도)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수령 확인", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "납품자", isHeader: true },
      { placeholder: "납품자: ___________ (인)", exampleValue: "납품자: (주)사무용품천국 배달팀 (인)" },
      { label: "수령자 확인", isHeader: true },
      { placeholder: "수령자: ___________ (인)", exampleValue: "수령자: 이물류 (인)" },
    ],
  },
];

// 등기부등본신청서 미리보기 데이터
export const 등기부등본신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "등기부등본 발급 신청서", exampleValue: "등 기 부 등 본 발 급 신 청 서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "최등기" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "880505-1******" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-2222-3333" },
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 용산구 이태원로 50" },
    ],
  },
  {
    fields: [
      { label: "대상 부동산 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "부동산 종류", isHeader: true },
      { placeholder: "(종류)", exampleValue: "집합건물(아파트)" },
      { label: "등기 구분", isHeader: true },
      { placeholder: "(구분)", exampleValue: "건물" },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(상세 주소)", exampleValue: "서울시 강남구 삼성동 123-45, 삼성아파트 101동 1502호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "등기 고유번호", isHeader: true },
      { placeholder: "(고유번호, 있는 경우)", exampleValue: "1234-2020-012345", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "증명서 유형", isHeader: true },
      { placeholder: "(유형)", exampleValue: "등기사항전부증명서 (등기부등본)" },
      { label: "발급 부수", isHeader: true },
      { placeholder: "(부수)", exampleValue: "2부" },
    ],
  },
  {
    fields: [
      { label: "발급 목적", isHeader: true },
      { placeholder: "(목적)", exampleValue: "부동산 매매계약 체결용" },
      { label: "수령 방법", isHeader: true },
      { placeholder: "(수령 방법)", exampleValue: "온라인 출력 (PDF)" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 22일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인 서명", isHeader: true },
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 최등기 (서명)", colspan: 3 },
    ],
  },
];

// =============================================
// 16차: 발주서, 법인설립등기신청서, 병적증명서신청서
// (답변서민사_DATA는 이미 존재)
// =============================================

export const 발주서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "발 주 서", exampleValue: "발 주 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발주번호", isHeader: true },
      { placeholder: "PO-______-___", exampleValue: "PO-2026-0125", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발주자 (갑)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니솔루션" },
      { label: "대표자", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김구매" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "공급자 (을)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)물류파트너" },
      { label: "대표자", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박공급" },
    ],
  },
  {
    fields: [
      { label: "발주 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "번호", isHeader: true },
      { label: "품명", isHeader: true },
      { label: "수량", isHeader: true },
      { label: "단가", isHeader: true },
    ],
  },
  {
    fields: [
      { placeholder: "1", exampleValue: "1" },
      { placeholder: "(품명)", exampleValue: "A4 복사용지 (박스)" },
      { placeholder: "(수량)", exampleValue: "100" },
      { placeholder: "(단가)", exampleValue: "25,000원" },
    ],
  },
  {
    fields: [
      { placeholder: "2", exampleValue: "2" },
      { placeholder: "(품명)", exampleValue: "프린터 토너 (HP)" },
      { placeholder: "(수량)", exampleValue: "20" },
      { placeholder: "(단가)", exampleValue: "85,000원" },
    ],
  },
  {
    fields: [
      { label: "합계금액", isHeader: true },
      { placeholder: "(총액)", exampleValue: "4,200,000원 (부가세 별도)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "납품 기한", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 2월 5일" },
      { label: "납품 장소", isHeader: true },
      { placeholder: "(장소)", exampleValue: "본사 물류창고 (경기 안양)" },
    ],
  },
  {
    fields: [
      { label: "결제 조건", isHeader: true },
      { placeholder: "(결제조건)", exampleValue: "납품 후 15일 이내 계좌이체", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특이사항", isHeader: true },
      { placeholder: "(비고)", exampleValue: "불량품 발생 시 1주일 이내 교환 요청", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발주일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발주자 서명", isHeader: true },
      { placeholder: "발주자: ___________ (인)", exampleValue: "발주자: 김구매 (인)", colspan: 3 },
    ],
  },
];

export const 법인설립등기신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "주식회사 설립등기 신청서", exampleValue: "주 식 회 사 설 립 등 기 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상호", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "주식회사 머니스타트업", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "본점소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 456, 7층 701호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "공고방법", isHeader: true },
      { placeholder: "(공고방법)", exampleValue: "회사 인터넷 홈페이지(www.moneystartup.co.kr)에 게재", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "목적", isHeader: true },
      { placeholder: "(사업목적)", exampleValue: "1. 소프트웨어 개발 및 판매\n2. 정보통신업\n3. 위 각 호에 부대하는 사업 일체", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발행할 주식 총수", isHeader: true },
      { placeholder: "(주식수)", exampleValue: "10,000,000주" },
      { label: "1주의 금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "500원" },
    ],
  },
  {
    fields: [
      { label: "발행주식 총수", isHeader: true },
      { placeholder: "(발행주식)", exampleValue: "100,000주" },
      { label: "자본금", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 50,000,000원" },
    ],
  },
  {
    fields: [
      { label: "대표이사", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김창업" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1985년 3월 15일" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 789", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "이사", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박경영" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1988년 7월 22일" },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true },
      { placeholder: "1. 정관 1통\n2. 주주총회의사록 1통\n3. 이사회의사록 1통\n4. 주식발행사항동의서 1통\n5. 자본금납입증명서 1통\n6. 취임승낙서 각 1통\n7. 인감증명서 각 1통", exampleValue: "1. 정관 1통\n2. 발기인회의사록 1통\n3. 주식발행사항동의서 1통\n4. 자본금납입증명서 1통\n5. 취임승낙서 2통\n6. 인감증명서 2통\n7. 주민등록등본 2통", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "등록면허세", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 600,000원" },
      { label: "지방교육세", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 120,000원" },
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
      { label: "신청인", isHeader: true },
      { placeholder: "(대표이사 성명) (서명 또는 날인)", exampleValue: "주식회사 머니스타트업 대표이사 김창업 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "○○지방법원 등기국 귀중", exampleValue: "서울중앙지방법원 등기국 귀중", colspan: 3 },
    ],
  },
];

export const 병적증명서신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "병적증명서 발급신청서", exampleValue: "병 적 증 명 서 발 급 신 청 서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "이병역" },
      { label: "한자", isHeader: true },
      { placeholder: "(한자)", exampleValue: "李兵役" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "920815-1******" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강동구 천호대로 123, 456호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "병역 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "군별", isHeader: true },
      { placeholder: "(군별)", exampleValue: "육군" },
      { label: "병과", isHeader: true },
      { placeholder: "(병과)", exampleValue: "보병" },
    ],
  },
  {
    fields: [
      { label: "입대일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2013년 2월 25일" },
      { label: "전역일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2014년 11월 24일" },
    ],
  },
  {
    fields: [
      { label: "최종 계급", isHeader: true },
      { placeholder: "(계급)", exampleValue: "병장" },
      { label: "군번", isHeader: true },
      { placeholder: "(군번)", exampleValue: "13-7******" },
    ],
  },
  {
    fields: [
      { label: "복무 부대", isHeader: true },
      { placeholder: "(부대명)", exampleValue: "제OO보병사단 OO연대", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급 용도", isHeader: true },
      { placeholder: "(용도)", exampleValue: "취업용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "필요 부수", isHeader: true },
      { placeholder: "(부수)", exampleValue: "1부" },
      { label: "수령 방법", isHeader: true },
      { placeholder: "(방법)", exampleValue: "온라인 출력 (PDF)" },
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
      { placeholder: "신청인: ___________ (서명)", exampleValue: "신청인: 이병역 (서명)", colspan: 3 },
    ],
  },
];

// =============================================
// 17차: 본인서명사실확인서, 불합격통지서, 비밀유지계약서, 사망신고서
// =============================================

export const 본인서명사실확인서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "본인서명사실 확인서", exampleValue: "본 인 서 명 사 실 확 인 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인서 번호", isHeader: true },
      { placeholder: "제_____호", exampleValue: "제 2026-서울강남-00123 호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "본인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김서명" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1985년 6월 15일" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850615-1******" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼동 123-45, 행복아파트 101동 1001호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사용 용도", isHeader: true },
      { placeholder: "(용도)", exampleValue: "부동산 매매계약용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "위 본인은 본 확인서에 기재된 서명이 본인의 서명임을 확인합니다.", exampleValue: "위 본인은 본 확인서에 기재된 서명이 본인의 서명임을 확인합니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "본인 서명", isHeader: true },
      { placeholder: "(본인 서명)", exampleValue: "김서명 (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급기관", isHeader: true },
      { placeholder: "○○구청장 / ○○읍·면·동장", exampleValue: "서울특별시 강남구 역삼1동장", colspan: 3 },
    ],
  },
];

export const 불합격통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "불합격 통지서", exampleValue: "채 용 심 사 결 과 통 지 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(지원자 성명) 귀하", exampleValue: "홍길동 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지원 직무", isHeader: true },
      { placeholder: "(지원 직무)", exampleValue: "마케팅 팀 사원" },
      { label: "지원일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 10일" },
    ],
  },
  {
    fields: [
      { label: "심사 결과", isHeader: true },
      { placeholder: "(결과)", exampleValue: "불합격", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "통지 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "귀하의 채용 지원에 감사드립니다.\n\n엄정한 심사 결과, 유감스럽게도 이번 채용에서 귀하를 모시지 못하게 되었음을 알려드립니다.\n\n보내주신 열정과 노력에 깊이 감사드리며, 앞으로의 활동에 좋은 결과가 있기를 진심으로 응원합니다.", exampleValue: "귀하의 채용 지원에 감사드립니다.\n\n엄정한 심사 결과, 유감스럽게도 이번 채용에서 귀하를 모시지 못하게 되었음을 알려드립니다.\n\n보내주신 열정과 노력에 깊이 감사드리며, 앞으로의 활동에 좋은 결과가 있기를 진심으로 응원합니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "향후 안내", isHeader: true },
      { placeholder: "(인재풀 등록 등 추가 안내)", exampleValue: "귀하의 지원서는 당사 인재풀에 1년간 보관되며, 적합한 포지션 발생 시 연락드릴 수 있습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "통지일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발신인", isHeader: true },
      { placeholder: "(회사명) (대표이사/인사담당)", exampleValue: "(주)머니스타트업 인사팀 드림", colspan: 3 },
    ],
  },
];

export const 비밀유지계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "비밀유지계약서 (NDA)", exampleValue: "비 밀 유 지 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "갑 (정보제공자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호/성명", isHeader: true },
      { placeholder: "(회사명/성명)", exampleValue: "(주)테크이노베이션" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김대표" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "을 (정보수령자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호/성명", isHeader: true },
      { placeholder: "(회사명/성명)", exampleValue: "(주)파트너솔루션" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "박협력" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 456", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "비밀정보 정의", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "비밀정보의 범위 및 정의", exampleValue: "1. 기술정보: 소스코드, 알고리즘, 설계문서, 특허출원 예정 기술\n2. 영업정보: 고객목록, 매출자료, 가격정책, 사업계획\n3. 기타: 위 정보와 관련하여 협의 과정에서 취득한 모든 정보", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "비밀유지 의무", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "비밀유지 의무 내용", exampleValue: "을은 갑으로부터 제공받은 비밀정보를 다음과 같이 관리한다:\n1. 제3자에게 공개, 누설, 제공하지 않는다\n2. 본 계약의 목적 외의 용도로 사용하지 않는다\n3. 적절한 보안조치를 취하여 관리한다", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "유지 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "본 계약 종료 후 3년간" },
      { label: "위약금", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 5,000만원" },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "갑 서명", isHeader: true },
      { placeholder: "(갑) 대표이사 ___________ (인)", exampleValue: "(주)테크이노베이션 대표이사 김대표 (인)" },
      { label: "을 서명", isHeader: true },
      { placeholder: "(을) 대표이사 ___________ (인)", exampleValue: "(주)파트너솔루션 대표이사 박협력 (인)" },
    ],
  },
];

export const 사망신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "사 망 신 고 서", exampleValue: "사 망 신 고 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사망자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김고인" },
      { label: "한자", isHeader: true },
      { placeholder: "(한자)", exampleValue: "金故人" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "450315-1******" },
      { label: "성별", isHeader: true },
      { placeholder: "(성별)", exampleValue: "남" },
    ],
  },
  {
    fields: [
      { label: "등록기준지", isHeader: true },
      { placeholder: "(본적지)", exampleValue: "서울특별시 종로구", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 역삼동 123-45", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사망 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사망 일시", isHeader: true },
      { placeholder: "20__년 __월 __일 __시 __분", exampleValue: "2026년 1월 20일 14시 35분" },
      { label: "사망 장소", isHeader: true },
      { placeholder: "(장소)", exampleValue: "서울대학교병원" },
    ],
  },
  {
    fields: [
      { label: "사망 원인", isHeader: true },
      { placeholder: "(사인)", exampleValue: "노환 (자연사)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김상속" },
      { label: "관계", isHeader: true },
      { placeholder: "(사망자와의 관계)", exampleValue: "장남" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "750820-1******" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포동 456-78", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true },
      { placeholder: "(첨부서류)", exampleValue: "1. 사망진단서 또는 시체검안서 1부\n2. 신고인 신분증 사본 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인 서명", isHeader: true },
      { placeholder: "신고인: ___________ (서명 또는 날인)", exampleValue: "신고인: 김상속 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "○○시(구,군)장 귀하", exampleValue: "서울특별시 강남구청장 귀하", colspan: 3 },
    ],
  },
];

// =============================================
// 18차: 사업자등록신청서, 상속포기서, 상여금지급통지서, 성과급지급내역서
// =============================================

export const 사업자등록신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "사업자등록 신청서", exampleValue: "사 업 자 등 록 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인적사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김사업" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850515-1******" },
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
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호", isHeader: true },
      { placeholder: "(상호명)", exampleValue: "머니카페" },
      { label: "개업일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 2월 1일" },
    ],
  },
  {
    fields: [
      { label: "사업장 소재지", isHeader: true },
      { placeholder: "(사업장 주소)", exampleValue: "서울시 강남구 역삼동 789-12, 1층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업태", isHeader: true },
      { placeholder: "(업태)", exampleValue: "음식점업" },
      { label: "종목", isHeader: true },
      { placeholder: "(종목)", exampleValue: "커피전문점" },
    ],
  },
  {
    fields: [
      { label: "업종코드", isHeader: true },
      { placeholder: "(업종코드)", exampleValue: "561912" },
      { label: "사업자 유형", isHeader: true },
      { placeholder: "(유형)", exampleValue: "일반과세자" },
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
      { placeholder: "신청인: ___________ (서명 또는 날인)", exampleValue: "신청인: 김사업 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "○○세무서장 귀하", exampleValue: "역삼세무서장 귀하", colspan: 3 },
    ],
  },
];

export const 상속포기서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "상속포기 신고서", exampleValue: "상 속 포 기 신 고 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사건번호", isHeader: true },
      { placeholder: "20__느단______", exampleValue: "2026느단12345", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "피상속인 (망인)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "故 김피상속" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "450101-1******" },
    ],
  },
  {
    fields: [
      { label: "최후 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 종로구 세종대로 100" },
      { label: "사망일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 5일" },
    ],
  },
  {
    fields: [
      { label: "신고인 (상속인)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김상속" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "780320-1******" },
    ],
  },
  {
    fields: [
      { label: "피상속인과의 관계", isHeader: true },
      { placeholder: "(관계)", exampleValue: "장남" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 456", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고 취지", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "신고인은 피상속인의 사망으로 인한 재산상속을 포기합니다.", exampleValue: "신고인은 피상속인 故 김피상속의 사망(2026.1.5.)으로 인한 재산상속(적극재산 및 소극재산 일체)을 포기합니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true },
      { placeholder: "(첨부서류)", exampleValue: "1. 피상속인 기본증명서 1부\n2. 피상속인 가족관계증명서 1부\n3. 신고인 기본증명서 1부\n4. 신고인 가족관계증명서 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인 서명", isHeader: true },
      { placeholder: "신고인: ___________ (서명 또는 날인)", exampleValue: "신고인: 김상속 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "○○가정법원 귀중", exampleValue: "서울가정법원 귀중", colspan: 3 },
    ],
  },
];

export const 상여금지급통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "상여금 지급 통지서", exampleValue: "상 여 금 지 급 통 지 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(직원명) 귀하", exampleValue: "김직원 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "소속", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "영업팀" },
      { label: "직급", isHeader: true },
      { placeholder: "(직급)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "지급 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상여금 종류", isHeader: true },
      { placeholder: "(종류)", exampleValue: "설날 특별상여금" },
      { label: "지급 기준", isHeader: true },
      { placeholder: "(기준)", exampleValue: "기본급의 100%" },
    ],
  },
  {
    fields: [
      { label: "산정 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "2025년 7월 ~ 2025년 12월 (6개월)" },
      { label: "근무일수", isHeader: true },
      { placeholder: "(일수)", exampleValue: "180일 (재직기간 100%)" },
    ],
  },
  {
    fields: [
      { label: "지급액 (세전)", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 3,500,000원" },
      { label: "공제액", isHeader: true },
      { placeholder: "(공제)", exampleValue: "소득세 등 385,000원" },
    ],
  },
  {
    fields: [
      { label: "실수령액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 3,115,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지급 예정일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일 (금요일)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "(방법)", exampleValue: "급여계좌 입금" },
    ],
  },
  {
    fields: [
      { label: "통지일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발신", isHeader: true },
      { placeholder: "(회사명) (대표이사/인사팀)", exampleValue: "(주)머니솔루션 인사팀 드림", colspan: 3 },
    ],
  },
];

export const 성과급지급내역서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "성과급 지급 내역서", exampleValue: "성 과 급 지 급 내 역 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(직원명) 귀하", exampleValue: "박성과 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "소속", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "개발팀" },
      { label: "직급", isHeader: true },
      { placeholder: "(직급)", exampleValue: "과장" },
    ],
  },
  {
    fields: [
      { label: "평가 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "2025년 1월 ~ 2025년 12월", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "성과 평가 결과", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "업무 성과", isHeader: true },
      { placeholder: "(점수)", exampleValue: "95점 / 100점" },
      { label: "역량 평가", isHeader: true },
      { placeholder: "(점수)", exampleValue: "88점 / 100점" },
    ],
  },
  {
    fields: [
      { label: "종합 등급", isHeader: true },
      { placeholder: "(등급)", exampleValue: "S등급 (상위 10%)" },
      { label: "종합 점수", isHeader: true },
      { placeholder: "(점수)", exampleValue: "92점" },
    ],
  },
  {
    fields: [
      { label: "성과급 산정", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "기준 연봉", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 60,000,000원" },
      { label: "지급률", isHeader: true },
      { placeholder: "(비율)", exampleValue: "연봉의 20%" },
    ],
  },
  {
    fields: [
      { label: "성과급 (세전)", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 12,000,000원" },
      { label: "공제액", isHeader: true },
      { placeholder: "(공제)", exampleValue: "소득세 등 1,320,000원" },
    ],
  },
  {
    fields: [
      { label: "실수령액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 10,680,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지급 예정일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 2월 28일 (금요일)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "(방법)", exampleValue: "급여계좌 입금" },
    ],
  },
  {
    fields: [
      { label: "통지일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발신", isHeader: true },
      { placeholder: "(회사명) (대표이사/인사팀)", exampleValue: "(주)머니테크 인사팀 드림", colspan: 3 },
    ],
  },
];

// =============================================
// 19차: 소장-민사, 시말서, 실업급여신청서, 업무제휴계약서
// =============================================

export const 소장민사_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "소 장", exampleValue: "소        장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사건의 표시", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사건 종류", isHeader: true },
      { placeholder: "(사건 종류)", exampleValue: "대여금 반환 청구" },
      { label: "청구 금액", isHeader: true },
      { placeholder: "(청구액)", exampleValue: "금 15,000,000원" },
    ],
  },
  {
    fields: [
      { label: "원 고", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(원고 성명)", exampleValue: "김영수" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850315-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(원고 주소)", exampleValue: "서울시 강남구 테헤란로 123 머니빌딩 501호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전화번호", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "kys@email.com" },
    ],
  },
  {
    fields: [
      { label: "피 고", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(피고 성명)", exampleValue: "박민수" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900520-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(피고 주소)", exampleValue: "서울시 서초구 반포대로 45 행복아파트 203동 1501호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "청구취지", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1.", isHeader: true },
      { placeholder: "(청구 내용 1)", exampleValue: "피고는 원고에게 금 15,000,000원 및 이에 대하여 2025. 1. 1.부터 이 사건 소장 부본 송달일까지는 연 5%, 그 다음 날부터 다 갚는 날까지는 연 12%의 각 비율에 의한 금원을 지급하라.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2.", isHeader: true },
      { placeholder: "(청구 내용 2)", exampleValue: "소송비용은 피고의 부담으로 한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3.", isHeader: true },
      { placeholder: "(청구 내용 3)", exampleValue: "제1항은 가집행할 수 있다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "청구원인", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1. 당사자 관계", isHeader: true },
      { placeholder: "(당사자 관계)", exampleValue: "원고와 피고는 대학교 선후배 사이로, 2020년부터 친밀하게 교류해 온 관계입니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 대여 경위", isHeader: true },
      { placeholder: "(대여 사실)", exampleValue: "피고는 2024년 6월 15일 원고에게 '사업자금이 급하게 필요하다. 3개월 후인 2024년 9월 15일까지 반드시 갚겠다'고 하여, 원고는 피고에게 금 15,000,000원을 무이자로 대여하였습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 변제 약정", isHeader: true },
      { placeholder: "(변제 약정)", exampleValue: "피고는 2024년 9월 15일까지 위 대여금 전액을 현금으로 상환하기로 약정하고, 이를 차용증(갑 제1호증)에 명시하였습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 채무불이행", isHeader: true },
      { placeholder: "(채무불이행 사실)", exampleValue: "피고는 변제 기일이 지났음에도 불구하고 원금은 물론 이자조차 상환하지 아니하여, 원고가 수차례 독촉하였으나 계속 변제를 미루고 있습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "5. 결론", isHeader: true },
      { placeholder: "(결론)", exampleValue: "이에 원고는 부득이 피고를 상대로 청구취지와 같은 판결을 구하고자 이 사건 소를 제기하게 되었습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1.", isHeader: true },
      { placeholder: "(첨부서류 1)", exampleValue: "갑 제1호증: 차용증 사본 1부" },
      { label: "2.", isHeader: true },
      { placeholder: "(첨부서류 2)", exampleValue: "갑 제2호증: 계좌이체 확인서 1부" },
    ],
  },
  {
    fields: [
      { label: "3.", isHeader: true },
      { placeholder: "(첨부서류 3)", exampleValue: "갑 제3호증: 독촉 문자메시지 캡쳐 1부" },
      { label: "4.", isHeader: true },
      { placeholder: "(첨부서류 4)", exampleValue: "소장 부본 1부" },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "관할법원", isHeader: true },
      { placeholder: "(관할 법원)", exampleValue: "서울중앙지방법원" },
    ],
  },
  {
    fields: [
      { label: "원고 서명", isHeader: true },
      { placeholder: "(원고 성명) (인)", exampleValue: "원고 김영수 (인)", colspan: 3 },
    ],
  },
];

export const 시말서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "시 말 서", exampleValue: "시    말    서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소속", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "영업1팀" },
      { label: "직위/직책", isHeader: true },
      { placeholder: "(직위)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이민호" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사원번호)", exampleValue: "EMP-2021-0342" },
    ],
  },
  {
    fields: [
      { label: "발생 사건 개요", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발생 일시", isHeader: true },
      { placeholder: "20__년 __월 __일 __시경", exampleValue: "2026년 1월 10일 오후 3시경" },
      { label: "발생 장소", isHeader: true },
      { placeholder: "(발생 장소)", exampleValue: "본사 3층 회의실" },
    ],
  },
  {
    fields: [
      { label: "사건 내용", isHeader: true },
      { placeholder: "(사건의 구체적 내용 기재)", exampleValue: "고객사 A사와의 미팅에서 영업 자료를 준비하지 않아 미팅이 원활하게 진행되지 못함. 사전에 준비 지시를 받았으나 다른 업무로 인해 자료 준비를 미루다가 결국 당일까지 완료하지 못했습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "관련자", isHeader: true },
      { placeholder: "(관련된 사람)", exampleValue: "영업1팀 김팀장, 고객사 A사 구매담당 박과장" },
      { label: "피해 정도", isHeader: true },
      { placeholder: "(피해 내용)", exampleValue: "미팅 연기, 고객사 신뢰도 하락" },
    ],
  },
  {
    fields: [
      { label: "사건 경위", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "경위 설명", isHeader: true },
      { placeholder: "(사건의 상세한 경위를 기재)", exampleValue: "1월 8일 김팀장으로부터 10일 미팅용 자료 준비 지시를 받았으나, 9일 긴급 발주 건 처리로 자료 준비를 미루었습니다. 당일 아침 급히 준비하려 했으나 필요 데이터 수집이 안 되어 결국 미완성 상태로 미팅에 참석하게 되었습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "반성 및 사과", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(반성 및 사과 내용)", exampleValue: "이번 일로 팀과 회사에 피해를 끼쳐 진심으로 죄송합니다. 업무 우선순위 판단을 잘못하여 중요한 고객 미팅에 차질을 빚은 점 깊이 반성하고 있습니다. 앞으로 이런 일이 재발하지 않도록 최선을 다하겠습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "재발 방지 대책", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1.", isHeader: true },
      { placeholder: "(재발 방지 대책 1)", exampleValue: "업무 지시 즉시 일정표에 마감일 등록 및 리마인더 설정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2.", isHeader: true },
      { placeholder: "(재발 방지 대책 2)", exampleValue: "마감 2일 전 팀장에게 준비 상황 중간 보고 의무화", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3.", isHeader: true },
      { placeholder: "(재발 방지 대책 3)", exampleValue: "긴급 업무 발생 시 즉시 팀장에게 보고하여 우선순위 재조정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "서약", isHeader: true },
      { placeholder: "(서약 내용)", exampleValue: "위와 같은 일이 다시 발생하지 않도록 주의하겠으며, 만약 재발 시 회사의 어떠한 조치에도 이의를 제기하지 않겠습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 13일" },
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니테크" },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true },
      { placeholder: "(소속) (직위) (성명) (인)", exampleValue: "영업1팀 대리 이민호 (인)", colspan: 3 },
    ],
  },
];

export const 실업급여신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "실업급여 수급자격 인정 신청서", exampleValue: "실업급여 수급자격 인정 신청서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "김지연" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900815-2******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 마포구 와우산로 123 행복빌라 301호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-9876-5432" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "jykim90@email.com" },
    ],
  },
  {
    fields: [
      { label: "이직 전 사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)테크솔루션" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "사업장 소재지", isHeader: true },
      { placeholder: "(사업장 주소)", exampleValue: "서울시 강남구 역삼로 456 테크빌딩 10층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "입사일", isHeader: true },
      { placeholder: "(입사일)", exampleValue: "2022년 3월 2일" },
      { label: "퇴사일", isHeader: true },
      { placeholder: "(퇴사일)", exampleValue: "2025년 12월 31일" },
    ],
  },
  {
    fields: [
      { label: "담당 업무", isHeader: true },
      { placeholder: "(담당 업무)", exampleValue: "마케팅팀 온라인 광고 운영" },
      { label: "고용형태", isHeader: true },
      { placeholder: "(고용형태)", exampleValue: "정규직" },
    ],
  },
  {
    fields: [
      { label: "이직 사유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "이직 사유", isHeader: true },
      { placeholder: "(구체적 이직 사유 기재)", exampleValue: "회사의 경영 악화로 인한 권고사직 (사업부 축소에 따른 구조조정)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "이직 사유 분류", isHeader: true },
      { placeholder: "(해당 사유 선택)", exampleValue: "☑ 회사 사정에 의한 퇴직 (권고사직, 정리해고 등) □ 계약기간 만료 □ 기타", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고용보험 피보험 기간", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "피보험 기간", isHeader: true },
      { placeholder: "(가입기간)", exampleValue: "3년 10개월" },
      { label: "퇴직 전 3개월 평균임금", isHeader: true },
      { placeholder: "(월 평균임금)", exampleValue: "금 3,800,000원" },
    ],
  },
  {
    fields: [
      { label: "구직 활동 계획", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "희망 직종", isHeader: true },
      { placeholder: "(희망 직종)", exampleValue: "마케팅, 광고기획, 콘텐츠 마케팅" },
      { label: "희망 근무지역", isHeader: true },
      { placeholder: "(희망 지역)", exampleValue: "서울, 경기(분당, 판교)" },
    ],
  },
  {
    fields: [
      { label: "희망 급여", isHeader: true },
      { placeholder: "(희망 급여)", exampleValue: "연봉 4,500만원 이상" },
      { label: "취업 예정일", isHeader: true },
      { placeholder: "(취업희망일)", exampleValue: "가능한 빠른 시일" },
    ],
  },
  {
    fields: [
      { label: "구직활동 계획", isHeader: true },
      { placeholder: "(구직활동 계획)", exampleValue: "워크넷, 사람인, 잡코리아 이력서 등록 및 적극적 입사지원, 직무 관련 자격증 취득 준비", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1.", isHeader: true },
      { placeholder: "(첨부서류 1)", exampleValue: "이직확인서 1부" },
      { label: "2.", isHeader: true },
      { placeholder: "(첨부서류 2)", exampleValue: "신분증 사본 1부" },
    ],
  },
  {
    fields: [
      { label: "3.", isHeader: true },
      { placeholder: "(첨부서류 3)", exampleValue: "수급계좌 통장 사본 1부" },
      { label: "4.", isHeader: true },
      { placeholder: "(첨부서류 4)", exampleValue: "워크넷 구직등록 확인서 1부" },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 8일" },
      { label: "관할기관", isHeader: true },
      { placeholder: "(관할 고용센터)", exampleValue: "서울서부고용센터장 귀하" },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "신청인 김지연 (인)", colspan: 3 },
    ],
  },
];

export const 업무제휴계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "업무제휴 계약서", exampleValue: "업 무 제 휴 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "갑 (회사명)", isHeader: true },
      { placeholder: "(갑 회사명)", exampleValue: "(주)머니테크" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "대표이사 김대표" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(갑 주소)", exampleValue: "서울시 강남구 테헤란로 123 머니빌딩 15층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "을 (회사명)", isHeader: true },
      { placeholder: "(을 회사명)", exampleValue: "(주)파트너솔루션" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "대표이사 박파트" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(을 주소)", exampleValue: "서울시 서초구 반포대로 456 파트너타워 8층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제1조 (목적)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(계약 목적)", exampleValue: "본 계약은 갑과 을이 상호 협력하여 '핀테크 결제 서비스 공동 개발 및 마케팅' 사업을 추진함에 있어 필요한 사항을 정함을 목적으로 한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제2조 (제휴 내용)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1.", isHeader: true },
      { placeholder: "(제휴 내용 1)", exampleValue: "갑은 핀테크 서비스 플랫폼 및 결제 인프라를 제공한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2.", isHeader: true },
      { placeholder: "(제휴 내용 2)", exampleValue: "을은 마케팅 채널 및 고객 데이터 분석 역량을 제공한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3.", isHeader: true },
      { placeholder: "(제휴 내용 3)", exampleValue: "양 당사자는 공동으로 신규 결제 서비스를 개발하고 홍보한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제3조 (역할 분담)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "갑의 역할", isHeader: true },
      { placeholder: "(갑의 역할)", exampleValue: "서비스 개발, 시스템 운영, 기술 지원, 고객 CS 담당" },
      { label: "을의 역할", isHeader: true },
      { placeholder: "(을의 역할)", exampleValue: "마케팅 기획/실행, 고객 유치, 데이터 분석 리포트 제공" },
    ],
  },
  {
    fields: [
      { label: "제4조 (수익 배분)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "배분 비율", isHeader: true },
      { placeholder: "(배분 비율)", exampleValue: "갑 60% : 을 40%" },
      { label: "정산 주기", isHeader: true },
      { placeholder: "(정산 주기)", exampleValue: "매월 말일 마감, 익월 15일 정산" },
    ],
  },
  {
    fields: [
      { label: "정산 방법", isHeader: true },
      { placeholder: "(정산 방법)", exampleValue: "매출 확정 후 세금계산서 발행, 지정 계좌 이체", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제5조 (계약 기간)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "계약 기간", isHeader: true },
      { placeholder: "(계약 기간)", exampleValue: "2026년 2월 1일 ~ 2028년 1월 31일 (2년간)" },
      { label: "자동 연장", isHeader: true },
      { placeholder: "(연장 조건)", exampleValue: "만료 1개월 전 서면 해지통보 없으면 1년 자동 연장" },
    ],
  },
  {
    fields: [
      { label: "제6조 (비밀유지)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(비밀유지 조항)", exampleValue: "양 당사자는 본 계약의 체결 및 이행 과정에서 취득한 상대방의 영업비밀 및 기술정보를 계약 기간 및 종료 후 3년간 제3자에게 누설하거나 본 계약 목적 외로 사용하지 아니한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제7조 (계약 해지)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "해지 사유", isHeader: true },
      { placeholder: "(해지 사유)", exampleValue: "1. 상대방이 본 계약을 위반하고 30일 이내 시정하지 않을 때\n2. 상대방이 파산, 회생절차 개시 시\n3. 상호 합의에 의한 해지", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제8조 (분쟁 해결)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(분쟁 해결)", exampleValue: "본 계약과 관련한 분쟁은 서울중앙지방법원을 제1심 관할법원으로 한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "갑", isHeader: true },
      { placeholder: "(회사명) 대표이사 (성명) (인)", exampleValue: "(주)머니테크 대표이사 김대표 (인)" },
      { label: "을", isHeader: true },
      { placeholder: "(회사명) 대표이사 (성명) (인)", exampleValue: "(주)파트너솔루션 대표이사 박파트 (인)" },
    ],
  },
];

// =============================================
// 20차: 여권발급신청서, 연봉협상합의서, 외주계약서, 용역계약서
// =============================================

export const 여권발급신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "여권발급 신청서", exampleValue: "여 권 발 급 신 청 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청 구분", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발급 유형", isHeader: true },
      { placeholder: "(신규/재발급/갱신)", exampleValue: "☑ 신규발급  □ 재발급  □ 기간연장(갱신)" },
      { label: "여권 종류", isHeader: true },
      { placeholder: "(복수/단수)", exampleValue: "☑ 복수여권(10년)  □ 단수여권(1년)" },
    ],
  },
  {
    fields: [
      { label: "신청인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명 (한글)", isHeader: true },
      { placeholder: "(한글 성명)", exampleValue: "김민수" },
      { label: "성명 (영문)", isHeader: true },
      { placeholder: "(영문 성명)", exampleValue: "KIM MINSU" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "950825-1******" },
      { label: "성별", isHeader: true },
      { placeholder: "(남/여)", exampleValue: "남" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주민등록상 주소)", exampleValue: "서울시 강남구 테헤란로 123 머니아파트 501동 1202호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(휴대폰 번호)", exampleValue: "010-1234-5678" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "minsu.kim@email.com" },
    ],
  },
  {
    fields: [
      { label: "기존 여권 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "기존 여권번호", isHeader: true },
      { placeholder: "(기존 여권번호)", exampleValue: "M12345678 (재발급/갱신 시)" },
      { label: "유효기간 만료일", isHeader: true },
      { placeholder: "(만료일)", exampleValue: "2025년 6월 30일" },
    ],
  },
  {
    fields: [
      { label: "재발급 사유", isHeader: true },
      { placeholder: "(해당 시 기재)", exampleValue: "□ 분실  □ 훼손  ☑ 유효기간 만료  □ 사증란 부족", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "병역 사항 (남성)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "병역 구분", isHeader: true },
      { placeholder: "(병역 상태)", exampleValue: "☑ 군필  □ 미필  □ 면제  □ 해당없음" },
      { label: "군별/계급", isHeader: true },
      { placeholder: "(군별/계급)", exampleValue: "육군 병장 만기제대" },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1.", isHeader: true },
      { placeholder: "(첨부서류 1)", exampleValue: "여권용 사진 1매 (3.5cm × 4.5cm, 6개월 이내 촬영)" },
      { label: "2.", isHeader: true },
      { placeholder: "(첨부서류 2)", exampleValue: "신분증 (주민등록증 또는 운전면허증)" },
    ],
  },
  {
    fields: [
      { label: "3.", isHeader: true },
      { placeholder: "(첨부서류 3)", exampleValue: "기존 여권 (재발급/갱신 시)" },
      { label: "4.", isHeader: true },
      { placeholder: "(첨부서류 4)", exampleValue: "가족관계증명서 (미성년자의 경우)" },
    ],
  },
  {
    fields: [
      { label: "수수료", isHeader: true },
      { placeholder: "(수수료)", exampleValue: "복수여권(10년) 53,000원 / 단수여권 20,000원" },
      { label: "수령 방법", isHeader: true },
      { placeholder: "(수령 방법)", exampleValue: "☑ 직접 수령  □ 등기우편" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일" },
      { label: "신청 기관", isHeader: true },
      { placeholder: "(접수처)", exampleValue: "서울특별시 강남구청 여권민원센터" },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신청인 김민수 (서명)", colspan: 3 },
    ],
  },
];

export const 연봉협상합의서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "연봉협상 합의서", exampleValue: "연 봉 협 상 합 의 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "회사명 (갑)", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니테크" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "대표이사 김대표" },
    ],
  },
  {
    fields: [
      { label: "근로자 (을)", isHeader: true },
      { placeholder: "(근로자 성명)", exampleValue: "이지훈" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사원번호)", exampleValue: "EMP-2020-0156" },
    ],
  },
  {
    fields: [
      { label: "소속 부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "개발팀" },
      { label: "직위/직급", isHeader: true },
      { placeholder: "(직위)", exampleValue: "과장 / G3" },
    ],
  },
  {
    fields: [
      { label: "협상 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "협상 연도", isHeader: true },
      { placeholder: "(적용 연도)", exampleValue: "2026년도" },
      { label: "협상 일자", isHeader: true },
      { placeholder: "(협상일)", exampleValue: "2026년 1월 15일" },
    ],
  },
  {
    fields: [
      { label: "기존 연봉 (세전)", isHeader: true },
      { placeholder: "(기존 연봉)", exampleValue: "금 55,000,000원" },
      { label: "조정 연봉 (세전)", isHeader: true },
      { placeholder: "(조정 연봉)", exampleValue: "금 60,000,000원" },
    ],
  },
  {
    fields: [
      { label: "인상액", isHeader: true },
      { placeholder: "(인상액)", exampleValue: "금 5,000,000원" },
      { label: "인상률", isHeader: true },
      { placeholder: "(인상률)", exampleValue: "9.09%" },
    ],
  },
  {
    fields: [
      { label: "급여 구성", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "기본급 (월)", isHeader: true },
      { placeholder: "(월 기본급)", exampleValue: "금 4,000,000원" },
      { label: "식대 (월, 비과세)", isHeader: true },
      { placeholder: "(월 식대)", exampleValue: "금 200,000원" },
    ],
  },
  {
    fields: [
      { label: "교통비 (월)", isHeader: true },
      { placeholder: "(월 교통비)", exampleValue: "금 100,000원" },
      { label: "성과급 (연)", isHeader: true },
      { placeholder: "(연 성과급)", exampleValue: "기본급의 100% (실적 연동)" },
    ],
  },
  {
    fields: [
      { label: "월 지급액 (세전)", isHeader: true },
      { placeholder: "(월 세전액)", exampleValue: "금 5,000,000원 (성과급 제외)" },
      { label: "월 예상 실수령액", isHeader: true },
      { placeholder: "(월 세후액)", exampleValue: "약 4,200,000원 (예상)" },
    ],
  },
  {
    fields: [
      { label: "적용 기간", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "적용 시작일", isHeader: true },
      { placeholder: "(시작일)", exampleValue: "2026년 2월 1일" },
      { label: "적용 종료일", isHeader: true },
      { placeholder: "(종료일)", exampleValue: "2027년 1월 31일 (1년간)" },
    ],
  },
  {
    fields: [
      { label: "특약 사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(특약 사항)", exampleValue: "1. 상기 연봉은 세전 금액이며, 4대보험 및 소득세 등 법정 공제 후 지급함\n2. 성과급은 회사 실적 및 개인 평가에 따라 변동될 수 있음\n3. 본 합의서는 차기 연봉협상 시까지 유효함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "합의 내용 확인", isHeader: true },
      { placeholder: "(합의 문구)", exampleValue: "위 내용에 대해 갑과 을은 충분히 협의하였으며, 상호 합의하에 본 연봉협상합의서를 작성함.", colspan: 3 },
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
      { label: "갑 (회사)", isHeader: true },
      { placeholder: "(회사명) 대표이사 (성명) (인)", exampleValue: "(주)머니테크 대표이사 김대표 (인)" },
      { label: "을 (근로자)", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "이지훈 (인)" },
    ],
  },
];

export const 외주계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "외주 계약서", exampleValue: "외  주  계  약  서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발주사 (갑)", isHeader: true },
      { placeholder: "(갑 회사명)", exampleValue: "(주)머니테크" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "대표이사 김대표" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(갑 주소)", exampleValue: "서울시 강남구 테헤란로 123 머니빌딩 15층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수주사 (을)", isHeader: true },
      { placeholder: "(을 회사명)", exampleValue: "(주)테크솔루션" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "대표이사 박개발" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(을 주소)", exampleValue: "서울시 서초구 반포대로 456 테크타워 10층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제1조 (계약 목적)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "프로젝트명", isHeader: true },
      { placeholder: "(프로젝트명)", exampleValue: "머니테크 모바일 앱 2.0 개발" },
      { label: "계약 목적", isHeader: true },
      { placeholder: "(목적)", exampleValue: "모바일 앱 UI/UX 개선 및 신규 기능 개발" },
    ],
  },
  {
    fields: [
      { label: "제2조 (외주 업무 범위)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "업무 내용", isHeader: true },
      { placeholder: "(업무 상세)", exampleValue: "1. 모바일 앱(iOS/Android) UI/UX 리뉴얼\n2. 결제 시스템 연동 개발\n3. 푸시 알림 기능 구현\n4. 사용자 분석 대시보드 개발\n5. QA 테스트 및 버그 수정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제3조 (계약 기간)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "착수일", isHeader: true },
      { placeholder: "(착수일)", exampleValue: "2026년 2월 1일" },
      { label: "완료일", isHeader: true },
      { placeholder: "(완료일)", exampleValue: "2026년 5월 31일 (4개월)" },
    ],
  },
  {
    fields: [
      { label: "제4조 (계약 금액)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "총 계약금액", isHeader: true },
      { placeholder: "(계약금액)", exampleValue: "금 80,000,000원 (부가세 별도)" },
      { label: "부가세 포함", isHeader: true },
      { placeholder: "(부가세 포함액)", exampleValue: "금 88,000,000원" },
    ],
  },
  {
    fields: [
      { label: "제5조 (대금 지급)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "착수금 (30%)", isHeader: true },
      { placeholder: "(착수금)", exampleValue: "금 26,400,000원 (계약 체결 후 7일 이내)" },
      { label: "중도금 (40%)", isHeader: true },
      { placeholder: "(중도금)", exampleValue: "금 35,200,000원 (1차 산출물 검수 완료 후)" },
    ],
  },
  {
    fields: [
      { label: "잔금 (30%)", isHeader: true },
      { placeholder: "(잔금)", exampleValue: "금 26,400,000원 (최종 검수 완료 후 14일 이내)" },
      { label: "지급 계좌", isHeader: true },
      { placeholder: "(계좌정보)", exampleValue: "신한은행 123-456-789012 (주)테크솔루션" },
    ],
  },
  {
    fields: [
      { label: "제6조 (산출물 및 검수)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "산출물", isHeader: true },
      { placeholder: "(산출물)", exampleValue: "1. 앱 소스코드 (iOS/Android)\n2. API 연동 문서\n3. 사용자 매뉴얼\n4. 테스트 결과 보고서" },
      { label: "검수 기간", isHeader: true },
      { placeholder: "(검수기간)", exampleValue: "산출물 제출 후 7영업일 이내" },
    ],
  },
  {
    fields: [
      { label: "제7조 (하자 보수)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "하자 보수 기간", isHeader: true },
      { placeholder: "(하자보수 기간)", exampleValue: "최종 검수 완료 후 6개월" },
      { label: "범위", isHeader: true },
      { placeholder: "(하자보수 범위)", exampleValue: "을의 귀책사유로 인한 버그 및 오류 무상 수정" },
    ],
  },
  {
    fields: [
      { label: "제8조 (지식재산권)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(지식재산권)", exampleValue: "본 계약으로 발생하는 모든 산출물의 저작권 및 지식재산권은 대금 완납 시 갑에게 귀속된다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "갑 (발주사)", isHeader: true },
      { placeholder: "(회사명) 대표이사 (성명) (인)", exampleValue: "(주)머니테크 대표이사 김대표 (인)" },
      { label: "을 (수주사)", isHeader: true },
      { placeholder: "(회사명) 대표이사 (성명) (인)", exampleValue: "(주)테크솔루션 대표이사 박개발 (인)" },
    ],
  },
];

export const 용역계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "용역 계약서", exampleValue: "용  역  계  약  서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "의뢰인 (갑)", isHeader: true },
      { placeholder: "(갑 회사명)", exampleValue: "(주)머니테크" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "대표이사 김대표" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(갑 주소)", exampleValue: "서울시 강남구 테헤란로 123 머니빌딩 15층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "용역자 (을)", isHeader: true },
      { placeholder: "(을 회사명 또는 개인명)", exampleValue: "이컨설턴트 (개인사업자)" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(을 주소)", exampleValue: "서울시 마포구 와우산로 45 컨설팅빌딩 301호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제1조 (용역 목적)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "용역명", isHeader: true },
      { placeholder: "(용역명)", exampleValue: "2026년 마케팅 전략 컨설팅" },
      { label: "목적", isHeader: true },
      { placeholder: "(목적)", exampleValue: "신규 사업 마케팅 전략 수립 및 실행 자문" },
    ],
  },
  {
    fields: [
      { label: "제2조 (용역 내용)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "업무 내용", isHeader: true },
      { placeholder: "(용역 상세)", exampleValue: "1. 시장 조사 및 경쟁사 분석\n2. 타겟 고객 페르소나 정의\n3. 마케팅 채널 전략 수립\n4. 브랜드 포지셔닝 전략\n5. 월간 마케팅 미팅 및 자문", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제3조 (용역 기간)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "시작일", isHeader: true },
      { placeholder: "(시작일)", exampleValue: "2026년 2월 1일" },
      { label: "종료일", isHeader: true },
      { placeholder: "(종료일)", exampleValue: "2026년 7월 31일 (6개월)" },
    ],
  },
  {
    fields: [
      { label: "제4조 (용역 대금)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "총 용역비", isHeader: true },
      { placeholder: "(총액)", exampleValue: "금 30,000,000원 (부가세 별도)" },
      { label: "월 용역비", isHeader: true },
      { placeholder: "(월액)", exampleValue: "금 5,000,000원 × 6개월" },
    ],
  },
  {
    fields: [
      { label: "지급 시기", isHeader: true },
      { placeholder: "(지급일)", exampleValue: "매월 말일 용역 완료 확인 후 익월 10일 지급" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "(방법)", exampleValue: "세금계산서 발행 후 계좌이체" },
    ],
  },
  {
    fields: [
      { label: "제5조 (산출물)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "산출물", isHeader: true },
      { placeholder: "(산출물)", exampleValue: "1. 시장 조사 보고서 (1회)\n2. 마케팅 전략 보고서 (1회)\n3. 월간 활동 보고서 (6회)\n4. 최종 성과 분석 보고서 (1회)" },
      { label: "제출 시기", isHeader: true },
      { placeholder: "(제출 시기)", exampleValue: "월간 보고서: 매월 25일\n최종 보고서: 계약 종료 7일 전" },
    ],
  },
  {
    fields: [
      { label: "제6조 (비밀유지)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(비밀유지)", exampleValue: "을은 본 용역 수행 과정에서 알게 된 갑의 영업비밀 및 기술정보를 계약 기간 및 종료 후 2년간 제3자에게 누설하거나 용역 목적 외로 사용하지 아니한다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제7조 (계약 해지)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "해지 조건", isHeader: true },
      { placeholder: "(해지 조건)", exampleValue: "1. 상대방의 중대한 계약 위반 시 7일 이내 시정요구 후 해지 가능\n2. 일방적 해지 시 30일 전 서면 통보 필요\n3. 이미 제공된 용역에 대해서는 일할 계산하여 정산", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "갑 (의뢰인)", isHeader: true },
      { placeholder: "(회사명) 대표이사 (성명) (인)", exampleValue: "(주)머니테크 대표이사 김대표 (인)" },
      { label: "을 (용역자)", isHeader: true },
      { placeholder: "(성명 또는 회사명) (인)", exampleValue: "이컨설턴트 (인)" },
    ],
  },
];

// =============================================
// 21차: 운전경력증명서신청서, 유언장, 이사회의사록, 이의신청서
// =============================================

export const 운전경력증명서신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "운전경력증명서 발급 신청서", exampleValue: "운전경력증명서 발급 신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청 구분", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "증명서 종류", isHeader: true },
      { placeholder: "(증명서 종류)", exampleValue: "☑ 운전경력증명서  □ 무사고·무벌점 증명서  □ 국제운전면허증" },
      { label: "발급 언어", isHeader: true },
      { placeholder: "(언어)", exampleValue: "☑ 국문  □ 영문" },
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
      { placeholder: "(성명)", exampleValue: "김운전" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850612-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123 드라이브빌딩 501호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "driver85@email.com" },
    ],
  },
  {
    fields: [
      { label: "운전면허 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "면허번호", isHeader: true },
      { placeholder: "(면허번호)", exampleValue: "11-12-345678-90" },
      { label: "면허 종류", isHeader: true },
      { placeholder: "(면허 종류)", exampleValue: "1종 보통" },
    ],
  },
  {
    fields: [
      { label: "최초 취득일", isHeader: true },
      { placeholder: "(취득일)", exampleValue: "2005년 8월 15일" },
      { label: "유효기간", isHeader: true },
      { placeholder: "(유효기간)", exampleValue: "2030년 8월 14일" },
    ],
  },
  {
    fields: [
      { label: "발급 용도", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "용도", isHeader: true },
      { placeholder: "(발급 용도)", exampleValue: "☑ 보험가입/갱신  □ 취업/채용  □ 해외면허교환  □ 기타" },
      { label: "제출처", isHeader: true },
      { placeholder: "(제출처)", exampleValue: "삼성화재" },
    ],
  },
  {
    fields: [
      { label: "수령 방법", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "수령 방법", isHeader: true },
      { placeholder: "(수령 방법)", exampleValue: "☑ 온라인 발급(PDF)  □ 우편 수령  □ 방문 수령" },
      { label: "수수료", isHeader: true },
      { placeholder: "(수수료)", exampleValue: "700원 (온라인) / 800원 (방문)" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 20일" },
      { label: "신청 기관", isHeader: true },
      { placeholder: "(접수처)", exampleValue: "정부24 / 경찰청" },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신청인 김운전 (서명)", colspan: 3 },
    ],
  },
];

export const 유언장_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "유 언 장", exampleValue: "유    언    장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "유언자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(유언자 성명)", exampleValue: "김유언" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1950년 3월 15일생" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "500315-1******" },
      { label: "현 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123 행복아파트 101동 501호" },
    ],
  },
  {
    fields: [
      { label: "유언 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "전문", isHeader: true },
      { placeholder: "(유언 시작)", exampleValue: "본인 김유언은 명확한 정신 상태에서 아래와 같이 유언합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제1조 (부동산)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "재산 내용", isHeader: true },
      { placeholder: "(부동산 상세)", exampleValue: "서울시 강남구 테헤란로 123 행복아파트 101동 501호 (전용면적 84㎡)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상속인", isHeader: true },
      { placeholder: "(상속받을 사람)", exampleValue: "장남 김대한 (1975.05.20생)에게 상속합니다." },
      { label: "지분", isHeader: true },
      { placeholder: "(지분)", exampleValue: "100%" },
    ],
  },
  {
    fields: [
      { label: "제2조 (금융자산)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "재산 내용", isHeader: true },
      { placeholder: "(금융자산 상세)", exampleValue: "신한은행 예금 (계좌번호: 110-***-******)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상속인 1", isHeader: true },
      { placeholder: "(상속인 1)", exampleValue: "장녀 김민국 (1978.08.10생) - 50%" },
      { label: "상속인 2", isHeader: true },
      { placeholder: "(상속인 2)", exampleValue: "차남 김만세 (1982.12.25생) - 50%" },
    ],
  },
  {
    fields: [
      { label: "제3조 (기타 재산)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(기타 재산)", exampleValue: "그 외 동산, 유체물, 기타 모든 재산은 배우자 이복덕(1955.07.08생)에게 상속합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제4조 (유언집행자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "유언집행자", isHeader: true },
      { placeholder: "(유언집행자)", exampleValue: "장남 김대한을 유언집행자로 지정합니다." },
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1111-2222" },
    ],
  },
  {
    fields: [
      { label: "제5조 (부칙)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(부칙 내용)", exampleValue: "1. 본 유언장은 이전에 작성한 모든 유언을 폐기하고 대체합니다.\n2. 본 유언장은 본인이 직접 자필로 작성하였습니다.\n3. 상속인 간 원만한 합의를 당부드립니다.", colspan: 3 },
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
      { label: "유언자", isHeader: true },
      { placeholder: "유언자 (성명) 자필서명", exampleValue: "유언자 김유언 (자필서명)", colspan: 3 },
    ],
  },
];

export const 이사회의사록_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "이사회 의사록", exampleValue: "이  사  회  의  사  록", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "회사 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니테크" },
      { label: "본점 소재지", isHeader: true },
      { placeholder: "(본점 주소)", exampleValue: "서울시 강남구 테헤란로 123" },
    ],
  },
  {
    fields: [
      { label: "회의 일시/장소", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "일시", isHeader: true },
      { placeholder: "(회의 일시)", exampleValue: "2026년 1월 20일 오후 2시" },
      { label: "장소", isHeader: true },
      { placeholder: "(회의 장소)", exampleValue: "본사 15층 대회의실" },
    ],
  },
  {
    fields: [
      { label: "이사 현황", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "이사 총수", isHeader: true },
      { placeholder: "(총 이사수)", exampleValue: "5명" },
      { label: "출석 이사", isHeader: true },
      { placeholder: "(출석 인원)", exampleValue: "4명 (정족수 충족)" },
    ],
  },
  {
    fields: [
      { label: "출석 이사 명단", isHeader: true },
      { placeholder: "(출석 이사)", exampleValue: "대표이사 김대표, 사내이사 박경영, 사내이사 이기획, 사외이사 최전문" },
      { label: "불참 이사", isHeader: true },
      { placeholder: "(불참 이사)", exampleValue: "사외이사 정고문 (해외출장)" },
    ],
  },
  {
    fields: [
      { label: "의장", isHeader: true },
      { placeholder: "(의장)", exampleValue: "대표이사 김대표" },
      { label: "기록자", isHeader: true },
      { placeholder: "(기록자)", exampleValue: "경영지원팀 한기록 과장" },
    ],
  },
  {
    fields: [
      { label: "안건", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "제1호 안건", isHeader: true },
      { placeholder: "(안건명)", exampleValue: "2026년도 사업계획 승인의 건", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(안건 상세)", exampleValue: "2026년도 사업계획 및 예산안 500억원 승인 요청. 신사업 진출(핀테크 서비스) 포함.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "결의 결과", isHeader: true },
      { placeholder: "(결의 결과)", exampleValue: "찬성 4표, 반대 0표로 원안 가결" },
      { label: "비고", isHeader: true },
      { placeholder: "(비고)", exampleValue: "출석 이사 전원 찬성" },
    ],
  },
  {
    fields: [
      { label: "제2호 안건", isHeader: true },
      { placeholder: "(안건명)", exampleValue: "대표이사 연임의 건", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(안건 상세)", exampleValue: "현 대표이사 김대표의 임기 만료에 따른 연임(3년) 승인 요청.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "결의 결과", isHeader: true },
      { placeholder: "(결의 결과)", exampleValue: "찬성 3표, 반대 0표, 기권 1표(김대표)로 가결" },
      { label: "비고", isHeader: true },
      { placeholder: "(비고)", exampleValue: "대표이사 본인 의결권 행사 배제" },
    ],
  },
  {
    fields: [
      { label: "폐회", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "폐회 선언", isHeader: true },
      { placeholder: "(폐회 시간)", exampleValue: "의장은 2026년 1월 20일 오후 4시 30분 폐회를 선언하다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인", isHeader: true },
      { placeholder: "(확인 문구)", exampleValue: "위 의사록이 정확함을 확인하고 아래 출석 이사 전원이 서명날인합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "의장", isHeader: true },
      { placeholder: "(의장 서명)", exampleValue: "의장 김대표 (인)" },
      { label: "이사", isHeader: true },
      { placeholder: "(이사 서명)", exampleValue: "이사 박경영 (인) / 이사 이기획 (인) / 이사 최전문 (인)" },
    ],
  },
];

export const 이의신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "이의신청서", exampleValue: "이    의    신    청    서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "김이의" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850725-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 마포구 와우산로 123 행복빌라 301호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-9876-5432" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "objection85@email.com" },
    ],
  },
  {
    fields: [
      { label: "처분 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "처분청", isHeader: true },
      { placeholder: "(처분 기관)", exampleValue: "서울특별시 마포구청" },
      { label: "처분일자", isHeader: true },
      { placeholder: "(처분일)", exampleValue: "2026년 1월 10일" },
    ],
  },
  {
    fields: [
      { label: "처분 종류", isHeader: true },
      { placeholder: "(처분 종류)", exampleValue: "주정차위반 과태료 부과처분" },
      { label: "처분 번호", isHeader: true },
      { placeholder: "(처분번호)", exampleValue: "마포-2026-과태료-00123" },
    ],
  },
  {
    fields: [
      { label: "과태료/처분 금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 40,000원" },
      { label: "위반 일시/장소", isHeader: true },
      { placeholder: "(위반 일시/장소)", exampleValue: "2025.12.25 / 마포구 홍대입구역 앞" },
    ],
  },
  {
    fields: [
      { label: "이의신청 사유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1. 사실관계", isHeader: true },
      { placeholder: "(사실관계)", exampleValue: "해당 일시에 본인은 차량을 해당 위치에 주차한 사실이 없습니다. 당일 차량은 서울시 강남구 소재 자택 주차장에 주차되어 있었습니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 이의 사유", isHeader: true },
      { placeholder: "(이의 사유)", exampleValue: "차량번호 오인으로 인한 처분으로 판단됩니다. 본인 차량의 블랙박스 기록 및 자택 주차장 CCTV 영상을 확인한 결과, 해당 시간대에 차량이 마포구에 있지 않았음이 확인됩니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 요청 사항", isHeader: true },
      { placeholder: "(요청 사항)", exampleValue: "위 사유에 따라 본 과태료 부과처분의 취소를 요청합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "1.", isHeader: true },
      { placeholder: "(첨부서류 1)", exampleValue: "블랙박스 영상 캡쳐 (차량 위치 확인) 1부" },
      { label: "2.", isHeader: true },
      { placeholder: "(첨부서류 2)", exampleValue: "자택 주차장 CCTV 영상 캡쳐 1부" },
    ],
  },
  {
    fields: [
      { label: "3.", isHeader: true },
      { placeholder: "(첨부서류 3)", exampleValue: "차량등록증 사본 1부" },
      { label: "4.", isHeader: true },
      { placeholder: "(첨부서류 4)", exampleValue: "과태료 부과 고지서 사본 1부" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "20__년 __월 __일", exampleValue: "2026년 1월 18일" },
      { label: "수신", isHeader: true },
      { placeholder: "(수신 기관)", exampleValue: "서울특별시 마포구청장 귀하" },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "신청인 김이의 (인)", colspan: 3 },
    ],
  },
];

// =============================================
// 22차: 이혼신고서, 인감증명위임장, 인사발령통지서, 입금확인서
// =============================================

export const 이혼신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "이혼신고서", exampleValue: "이 혼 신 고 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "남편 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김갑수" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "790315-1******" },
    ],
  },
  {
    fields: [
      { label: "등록기준지", isHeader: true },
      { placeholder: "(본적)", exampleValue: "서울특별시 강남구 역삼동 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 마포구 상암동 456 상암아파트 101동 1502호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "아내 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이영희" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "820812-2******" },
    ],
  },
  {
    fields: [
      { label: "등록기준지", isHeader: true },
      { placeholder: "(본적)", exampleValue: "경기도 성남시 분당구 정자동 789", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 용인시 수지구 죽전동 123 죽전빌라 B동 301호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "이혼 일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "혼인신고일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2010년 5월 22일" },
    ],
  },
  {
    fields: [
      { label: "이혼 사유", isHeader: true },
      { placeholder: "□ 협의이혼  □ 재판이혼", exampleValue: "☑ 협의이혼 (가정법원 확인 완료)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "미성년 자녀", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "자녀1 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김민준" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "150520-3******" },
    ],
  },
  {
    fields: [
      { label: "친권자", isHeader: true },
      { placeholder: "(부/모)", exampleValue: "모(이영희)" },
      { label: "양육자", isHeader: true },
      { placeholder: "(부/모)", exampleValue: "모(이영희)" },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true },
      { placeholder: "(첨부서류)", exampleValue: "1. 가정법원 이혼의사 확인서 1부\n2. 협의서(양육 및 친권 합의) 사본 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "남편 (서명) / 아내 (서명)", exampleValue: "남편 김갑수 (인) / 아내 이영희 (인)", colspan: 3 },
    ],
  },
];

export const 인감증명위임장_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "인감증명 발급 위임장", exampleValue: "인감증명 발급 위임장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "위임인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(위임인 성명)", exampleValue: "홍길동" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "751015-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123 강남빌딩 5층", colspan: 3 },
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
      { label: "대리인(수임인) 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(대리인 성명)", exampleValue: "김대리" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "880220-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 송파구 올림픽로 456 송파아파트 201동 1003호", colspan: 3 },
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
      { label: "위임 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발급 용도", isHeader: true },
      { placeholder: "(용도)", exampleValue: "부동산 매매계약 체결용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급 통수", isHeader: true },
      { placeholder: "( )통", exampleValue: "2통" },
      { label: "제출처", isHeader: true },
      { placeholder: "(제출처)", exampleValue: "○○공인중개사사무소" },
    ],
  },
  {
    fields: [
      { label: "위임 기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 1월 17일 ~ 2026년 1월 31일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "위임사항", isHeader: true },
      { placeholder: "(상세 내용)", exampleValue: "본인의 인감증명서 발급에 관한 일체의 권한을 위 대리인에게 위임합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "위임인", isHeader: true },
      { placeholder: "(성명) (인감)", exampleValue: "위임인 홍길동 (인감)", colspan: 3 },
    ],
  },
];

export const 인사발령통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "인사발령통지서", exampleValue: "인 사 발 령 통 지 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "문서번호", isHeader: true },
      { placeholder: "(문서번호)", exampleValue: "인사-2026-0015호" },
      { label: "발령일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 1일" },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김승진 님", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "소속", isHeader: true },
      { placeholder: "(현 부서)", exampleValue: "영업본부 영업1팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(현 직위)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "발령 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발령 구분", isHeader: true },
      { placeholder: "□ 승진  □ 전보  □ 전출", exampleValue: "☑ 승진" },
      { label: "효력 발생일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 1일" },
    ],
  },
  {
    fields: [
      { label: "변경 전 직위", isHeader: true },
      { placeholder: "(변경 전)", exampleValue: "대리" },
      { label: "변경 후 직위", isHeader: true },
      { placeholder: "(변경 후)", exampleValue: "과장" },
    ],
  },
  {
    fields: [
      { label: "변경 전 부서", isHeader: true },
      { placeholder: "(변경 전)", exampleValue: "영업본부 영업1팀" },
      { label: "변경 후 부서", isHeader: true },
      { placeholder: "(변경 후)", exampleValue: "영업본부 영업1팀" },
    ],
  },
  {
    fields: [
      { label: "변경 전 근무지", isHeader: true },
      { placeholder: "(변경 전)", exampleValue: "본사(서울)" },
      { label: "변경 후 근무지", isHeader: true },
      { placeholder: "(변경 후)", exampleValue: "본사(서울)" },
    ],
  },
  {
    fields: [
      { label: "급여 변경", isHeader: true },
      { placeholder: "(급여 변동 내역)", exampleValue: "연봉 5,200만원 → 6,000만원 (과장 승진에 따른 급여 조정)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발령 사유", isHeader: true },
      { placeholder: "(발령 사유)", exampleValue: "2025년 업무 성과 및 리더십 역량 인정에 따른 승진 발령", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "참고사항", isHeader: true },
      { placeholder: "(기타 안내사항)", exampleValue: "※ 승진 축하 행사: 2026.2.3(월) 오전 10시 본사 대회의실\n※ 신규 명함 및 사원증은 인사팀에서 별도 배부 예정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발령일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발령권자", isHeader: true },
      { placeholder: "(회사명) (대표이사) (인)", exampleValue: "주식회사 ABC코퍼레이션 대표이사 박경영 (인)", colspan: 3 },
    ],
  },
];

export const 입금확인서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "입금확인서", exampleValue: "입 금 확 인 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "문서번호", isHeader: true },
      { placeholder: "(문서번호)", exampleValue: "입확-2026-0021호" },
      { label: "발행일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일" },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(입금자)", exampleValue: "(주)가나다상사 귀중" },
      { label: "발신", isHeader: true },
      { placeholder: "(수취인)", exampleValue: "(주)ABC무역" },
    ],
  },
  {
    fields: [
      { label: "입금 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "입금일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "입금금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 15,000,000원 (일천오백만원정)" },
    ],
  },
  {
    fields: [
      { label: "입금자명", isHeader: true },
      { placeholder: "(입금자)", exampleValue: "(주)가나다상사" },
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(은행/계좌번호)", exampleValue: "국민은행 123-45-678901" },
    ],
  },
  {
    fields: [
      { label: "거래 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "품목/내역", isHeader: true },
      { placeholder: "(거래 품목)", exampleValue: "사무용품 납품대금 (2026년 1월분)" },
      { label: "계약번호", isHeader: true },
      { placeholder: "(계약번호)", exampleValue: "계약-2026-0008" },
    ],
  },
  {
    fields: [
      { label: "거래금액", isHeader: true },
      { placeholder: "(총 거래금액)", exampleValue: "22,000,000원" },
      { label: "잔액", isHeader: true },
      { placeholder: "(미수금액)", exampleValue: "7,000,000원" },
    ],
  },
  {
    fields: [
      { label: "비고", isHeader: true },
      { placeholder: "(특이사항)", exampleValue: "잔액 7,000,000원은 2026년 2월 15일까지 입금 예정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인사항", isHeader: true },
      { placeholder: "(확인 문구)", exampleValue: "상기 금액을 정히 수령하였음을 확인합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발행인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호", isHeader: true },
      { placeholder: "(상호)", exampleValue: "(주)ABC무역" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김무역" },
    ],
  },
  {
    fields: [
      { label: "사업자번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "123-45-67890" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 영등포구 여의대로 100 ABC빌딩 7층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발행인", isHeader: true },
      { placeholder: "(직인)", exampleValue: "(주)ABC무역 대표이사 김무역 (직인)", colspan: 3 },
    ],
  },
];

// =============================================
// 23차: 재택근무신청서, 전대차계약서, 전입신고서, 주민등록등본신청서
// =============================================

export const 재택근무신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "재택근무 신청서", exampleValue: "재 택 근 무 신 청 서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "김재택" },
      { label: "사원번호", isHeader: true },
      { placeholder: "(사원번호)", exampleValue: "2023-0156" },
    ],
  },
  {
    fields: [
      { label: "부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "개발팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "선임연구원" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "kimjt@company.co.kr" },
    ],
  },
  {
    fields: [
      { label: "재택근무 신청 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청 기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 2월 1일 ~ 2026년 2월 28일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "재택근무일", isHeader: true },
      { placeholder: "(요일 선택)", exampleValue: "매주 화, 목 (주 2회)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청 사유", isHeader: true },
      { placeholder: "(사유)", exampleValue: "프로젝트 집중 개발 및 통근 시간 절감을 통한 업무 효율성 향상", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업무 수행 계획", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "주요 업무", isHeader: true },
      { placeholder: "(업무 내용)", exampleValue: "1. 신규 기능 개발 (API 설계 및 구현)\n2. 코드 리뷰 및 버그 수정\n3. 기술 문서 작성", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업무 보고", isHeader: true },
      { placeholder: "(보고 방식)", exampleValue: "매일 오전 10시 온라인 스탠드업 미팅 참여\n주간 업무 보고서 금요일 오후 5시까지 제출", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락 가능 시간", isHeader: true },
      { placeholder: "(시간)", exampleValue: "09:00 ~ 18:00 (점심시간 12:00~13:00 제외)" },
      { label: "근무지 주소", isHeader: true },
      { placeholder: "(재택 주소)", exampleValue: "서울시 강남구 역삼동 123-45" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신청인 김재택 (서명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "결재", isHeader: true },
      { placeholder: "팀장:        (서명)   /   부서장:        (서명)", exampleValue: "팀장: 이팀장 (승인) / 부서장: 박부장 (승인)", colspan: 3 },
    ],
  },
];

export const 전대차계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "전대차계약서", exampleValue: "전 대 차 계 약 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "부동산 표시", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 역삼동 123-45 OO빌라 301호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "면적", isHeader: true },
      { placeholder: "전용 __㎡", exampleValue: "전용 59.5㎡ (약 18평)" },
      { label: "구조", isHeader: true },
      { placeholder: "(구조)", exampleValue: "아파트 / 철근콘크리트" },
    ],
  },
  {
    fields: [
      { label: "원임대인(집주인) 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "최집주" },
      { label: "주민번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "651010-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 서초구 서초동 789 서초타워 1502호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전대인(원세입자) 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김전대" },
      { label: "주민번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850315-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 역삼동 123-45 OO빌라 301호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전차인(새 세입자) 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이전차" },
      { label: "주민번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "920720-2******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 마포구 상암동 456 상암아파트 1203호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "원임대차 계약기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2024년 3월 1일 ~ 2026년 2월 28일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전대차 계약기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 2월 1일 ~ 2026년 2월 28일 (1개월)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전대보증금", isHeader: true },
      { placeholder: "금                원정", exampleValue: "금 10,000,000원정 (일천만원)" },
      { label: "월 차임", isHeader: true },
      { placeholder: "금                원정", exampleValue: "금 800,000원정 (매월 1일 선불)" },
    ],
  },
  {
    fields: [
      { label: "원임대인 동의", isHeader: true },
      { placeholder: "(동의 여부)", exampleValue: "☑ 동의함 (동의서 별첨)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true },
      { placeholder: "(특약)", exampleValue: "1. 원임대차 계약 종료 시 본 전대차 계약은 자동 종료됨\n2. 전차인은 원임대인에게 직접 권리를 주장할 수 없음\n3. 반려동물 불가, 금연", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전대인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "전대인 김전대 (인)" },
      { label: "전차인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "전차인 이전차 (인)" },
    ],
  },
];

export const 전입신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "전입신고서", exampleValue: "전 입 신 고 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900115-1******" },
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
      { label: "이전 주소 (전출지)", isHeader: true },
      { placeholder: "(이전 주소)", exampleValue: "서울특별시 종로구 청진동 123 청진빌라 201호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "새 주소 (전입지)", isHeader: true },
      { placeholder: "(새 주소)", exampleValue: "서울특별시 강남구 역삼동 456 역삼아파트 1502호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전입 일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "세대주 관계", isHeader: true },
      { placeholder: "(관계)", exampleValue: "본인 (세대주)" },
    ],
  },
  {
    fields: [
      { label: "같이 전입하는 세대원", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "세대원1", isHeader: true },
      { placeholder: "(성명/주민번호/관계)", exampleValue: "김영희 / 920520-2****** / 배우자" },
      { label: "세대원2", isHeader: true },
      { placeholder: "(성명/주민번호/관계)", exampleValue: "홍민수 / 180310-3****** / 자녀" },
    ],
  },
  {
    fields: [
      { label: "전입 사유", isHeader: true },
      { placeholder: "(사유)", exampleValue: "☑ 주택 구입  □ 전세 계약  □ 직장 이동  □ 기타", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확정일자 신청", isHeader: true },
      { placeholder: "□ 신청  □ 미신청", exampleValue: "☑ 신청 (전세계약서 지참)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신고인 홍길동 (인)", colspan: 3 },
    ],
  },
];

export const 주민등록등본신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "주민등록등본 발급 신청서", exampleValue: "주민등록등본 발급 신청서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850315-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 역삼동 123-45 OO아파트 1502호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678" },
      { label: "세대주 여부", isHeader: true },
      { placeholder: "(세대주/세대원)", exampleValue: "세대주" },
    ],
  },
  {
    fields: [
      { label: "발급 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발급 통수", isHeader: true },
      { placeholder: "( )통", exampleValue: "2통" },
      { label: "발급 용도", isHeader: true },
      { placeholder: "(용도)", exampleValue: "대출 신청용" },
    ],
  },
  {
    fields: [
      { label: "주민번호 뒷자리", isHeader: true },
      { placeholder: "□ 공개  □ 비공개", exampleValue: "☑ 비공개 (뒷자리 * 처리)" },
      { label: "과거 주소 이력", isHeader: true },
      { placeholder: "□ 포함  □ 미포함", exampleValue: "☑ 미포함" },
    ],
  },
  {
    fields: [
      { label: "세대원 정보", isHeader: true },
      { placeholder: "□ 전체  □ 일부  □ 본인만", exampleValue: "☑ 전체 (세대원 3명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급 방법", isHeader: true },
      { placeholder: "□ 방문 발급  □ 온라인 발급", exampleValue: "☑ 온라인 발급 (정부24)" },
      { label: "수수료", isHeader: true },
      { placeholder: "(수수료)", exampleValue: "무료 (온라인)" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신청인 홍길동 (인)", colspan: 3 },
    ],
  },
];

// ========================================
// 24차 추가: 주주총회의사록, 증여계약서, 지급명령신청서, 지방세완납증명서신청서
// ========================================

// 주주총회의사록
export const 주주총회의사록_DATA: FormRow[] = [
  {
    fields: [
      { label: "주주총회 의사록", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니테크" },
      { label: "등록번호", isHeader: true },
      { placeholder: "(법인등록번호)", exampleValue: "110111-1234567" },
    ],
  },
  {
    fields: [
      { label: "본점 소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "총회 구분", isHeader: true },
      { placeholder: "□ 정기총회  □ 임시총회", exampleValue: "☑ 정기총회 (제5기)" },
      { label: "총회 일시", isHeader: true },
      { placeholder: "____년 __월 __일 __시", exampleValue: "2026년 3월 25일 오전 10시" },
    ],
  },
  {
    fields: [
      { label: "개최 장소", isHeader: true },
      { placeholder: "(장소)", exampleValue: "본점 회의실", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발행주식 총수", isHeader: true },
      { placeholder: "(총 주식수)", exampleValue: "100,000주" },
      { label: "참석 주주 주식수", isHeader: true },
      { placeholder: "(참석 주식수)", exampleValue: "85,000주 (85%)" },
    ],
  },
  {
    fields: [
      { label: "제1호 안건", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "안건 제목", isHeader: true },
      { placeholder: "(안건명)", exampleValue: "제5기 재무제표 승인의 건", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "안건 내용", isHeader: true },
      { placeholder: "(내용)", exampleValue: "2025년 1월 1일 ~ 12월 31일 재무제표 및 이익잉여금처분계산서 승인", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "표결 결과", isHeader: true },
      { placeholder: "(결과)", exampleValue: "찬성 85,000주 (100%), 반대 0주, 기권 0주 → 가결", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제2호 안건", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "안건 제목", isHeader: true },
      { placeholder: "(안건명)", exampleValue: "이사 선임의 건", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "안건 내용", isHeader: true },
      { placeholder: "(내용)", exampleValue: "김대표 이사 재선임 (임기 3년)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "표결 결과", isHeader: true },
      { placeholder: "(결과)", exampleValue: "찬성 80,000주 (94%), 반대 5,000주, 기권 0주 → 가결", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "폐회 시각", isHeader: true },
      { placeholder: "__시 __분", exampleValue: "오전 11시 30분" },
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 25일" },
    ],
  },
  {
    fields: [
      { label: "의장", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "의장 김대표 (인)" },
      { label: "기록자", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "기록자 이사무 (인)" },
    ],
  },
];

// 증여계약서
export const 증여계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "증여계약서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "증여자 (주는 사람)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김부모" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1965년 5월 15일" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 서초구 서초대로 456", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수증자 (받는 사람)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김자녀" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1995년 8월 20일" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 역삼로 789", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "증여자와의 관계", isHeader: true },
      { placeholder: "(관계)", exampleValue: "자녀 (장남)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "증여 재산 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "재산 종류", isHeader: true },
      { placeholder: "□ 부동산  □ 현금  □ 주식  □ 기타", exampleValue: "☑ 현금" },
      { label: "증여 금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 50,000,000원 (오천만원정)" },
    ],
  },
  {
    fields: [
      { label: "재산 상세", isHeader: true },
      { placeholder: "(상세 내역)", exampleValue: "결혼 자금 지원 목적", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "증여 조건", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "이행일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 1일" },
      { label: "이행 방법", isHeader: true },
      { placeholder: "(방법)", exampleValue: "수증자 계좌로 이체" },
    ],
  },
  {
    fields: [
      { label: "특약 사항", isHeader: true },
      { placeholder: "(특약)", exampleValue: "증여세는 수증자가 부담한다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "증여자", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "김부모 (인)" },
      { label: "수증자", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "김자녀 (인)" },
    ],
  },
];

// 지급명령신청서
export const 지급명령신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "지급명령신청서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사건번호", isHeader: true },
      { placeholder: "____차____호", exampleValue: "2026가소12345" },
      { label: "관할법원", isHeader: true },
      { placeholder: "(법원명)", exampleValue: "서울중앙지방법원" },
    ],
  },
  {
    fields: [
      { label: "채권자 (신청인)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김채권" },
      { label: "주민번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850615-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 마포구 월드컵로 100", colspan: 3 },
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
      { label: "채무자 (상대방)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박채무" },
      { label: "주민번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900820-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 송파구 올림픽로 200", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "청구 금액", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "원금", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 10,000,000원 (일천만원정)" },
      { label: "이자", isHeader: true },
      { placeholder: "(이자)", exampleValue: "연 5% (2025.6.1.부터 완제일까지)" },
    ],
  },
  {
    fields: [
      { label: "청구 원인", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발생 원인", isHeader: true },
      { placeholder: "(원인)", exampleValue: "금전소비대차 (개인 대여금)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대여일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2024년 6월 1일" },
      { label: "변제기", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2025년 6월 1일" },
    ],
  },
  {
    fields: [
      { label: "청구 이유", isHeader: true },
      { placeholder: "(상세 내용)", exampleValue: "변제기 도래 후에도 채무 이행이 없어 지급명령 신청함", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(서류)", exampleValue: "1. 차용증 사본 1부\n2. 계좌이체 확인서 1부\n3. 독촉 문자 내역 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "채권자 김채권 (인)", colspan: 3 },
    ],
  },
];

// 지방세완납증명서신청서
export const 지방세완납증명서신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "지방세 납세(완납)증명 신청서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명(법인명)", isHeader: true },
      { placeholder: "(성명/법인명)", exampleValue: "홍길동" },
      { label: "주민(사업자)번호", isHeader: true },
      { placeholder: "(주민/사업자번호)", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
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
      { label: "증명서 사용 목적", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "용도", isHeader: true },
      { placeholder: "□ 관공서 제출  □ 금융기관 제출  □ 기타", exampleValue: "☑ 관공서 제출 (건축허가 신청)" },
      { label: "제출처", isHeader: true },
      { placeholder: "(기관명)", exampleValue: "강남구청 건축과" },
    ],
  },
  {
    fields: [
      { label: "증명 요청 사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "증명 종류", isHeader: true },
      { placeholder: "□ 완납증명  □ 납세증명  □ 세목별 증명", exampleValue: "☑ 완납증명 (전 세목)" },
      { label: "유효 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "30일" },
    ],
  },
  {
    fields: [
      { label: "필요 부수", isHeader: true },
      { placeholder: "(부)", exampleValue: "2부" },
      { label: "발급 방법", isHeader: true },
      { placeholder: "□ 방문 수령  □ 우편 발송  □ 온라인", exampleValue: "☑ 온라인 발급 (위택스)" },
    ],
  },
  {
    fields: [
      { label: "관련 세목", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "해당 세목", isHeader: true },
      { placeholder: "□ 전체  □ 재산세  □ 자동차세  □ 취득세  □ 주민세", exampleValue: "☑ 전체 (지방세 전 세목)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신청인 홍길동 (인)", colspan: 3 },
    ],
  },
];

// ========================================
// 25차 추가: 징계위원회소집통지서, 채권양도통지서, 채용합격통지서, 출생신고서
// ========================================

// 징계위원회소집통지서
export const 징계위원회소집통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "징계위원회 소집통지서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "문서번호", isHeader: true },
      { placeholder: "(문서번호)", exampleValue: "인사-2026-0012" },
      { label: "발신일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 10일" },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김직원 (영업팀 사원)" },
      { label: "발신", isHeader: true },
      { placeholder: "(발신부서)", exampleValue: "인사위원회" },
    ],
  },
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "(제목)", exampleValue: "징계위원회 소집 및 출석 통지", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "위원회 일시", isHeader: true },
      { placeholder: "____년 __월 __일 __시", exampleValue: "2026년 1월 20일 오후 2시" },
      { label: "위원회 장소", isHeader: true },
      { placeholder: "(장소)", exampleValue: "본사 3층 회의실" },
    ],
  },
  {
    fields: [
      { label: "피징계자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김직원" },
      { label: "소속/직위", isHeader: true },
      { placeholder: "(소속)", exampleValue: "영업팀 / 사원" },
    ],
  },
  {
    fields: [
      { label: "사번", isHeader: true },
      { placeholder: "(사번)", exampleValue: "2023-0045" },
      { label: "입사일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2023년 3월 1일" },
    ],
  },
  {
    fields: [
      { label: "징계 혐의 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "혐의 사유", isHeader: true },
      { placeholder: "(혐의 내용)", exampleValue: "무단결근 (2025년 12월 15일~17일, 3일간)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "관련 규정", isHeader: true },
      { placeholder: "(규정)", exampleValue: "취업규칙 제42조 (복무의무 위반)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "안내 사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소명 기회", isHeader: true },
      { placeholder: "(안내)", exampleValue: "위원회 참석하여 소명할 수 있음", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "자료 제출", isHeader: true },
      { placeholder: "(제출 안내)", exampleValue: "소명 자료 제출 기한: 2026년 1월 18일까지", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "불참 시", isHeader: true },
      { placeholder: "(안내)", exampleValue: "정당한 사유 없이 불참 시 소명권 포기로 간주", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발신자", isHeader: true },
      { placeholder: "(직위) (성명) (인)", exampleValue: "인사위원회 위원장 이부장 (인)", colspan: 3 },
    ],
  },
];

// 채권양도통지서
export const 채권양도통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "채권양도통지서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "채무자 (수신인)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박채무" },
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 송파구 올림픽로 200" },
    ],
  },
  {
    fields: [
      { label: "양도인 (원채권자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김채권" },
      { label: "주민번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "750515-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 마포구 월드컵로 100", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "양수인 (새 채권자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이양수" },
      { label: "주민번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "800820-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 300", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "양도 채권 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "채권 원인", isHeader: true },
      { placeholder: "(원인)", exampleValue: "금전소비대차계약에 따른 대여금 채권" },
      { label: "채권 금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 30,000,000원 (삼천만원정)" },
    ],
  },
  {
    fields: [
      { label: "발생일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2024년 6월 1일" },
      { label: "변제기", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2025년 6월 1일" },
    ],
  },
  {
    fields: [
      { label: "양도일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "이자율", isHeader: true },
      { placeholder: "(이자)", exampleValue: "연 5%" },
    ],
  },
  {
    fields: [
      { label: "통지 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "통지 사항", isHeader: true },
      { placeholder: "(내용)", exampleValue: "상기 채권을 양수인에게 양도하였음을 통지하오니, 이후 채무 변제는 양수인에게 하시기 바랍니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "통지일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "양도인", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "양도인 김채권 (인)" },
      { label: "양수인", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "양수인 이양수 (인)" },
    ],
  },
];

// 채용합격통지서
export const 채용합격통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "채용합격통지서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "문서번호", isHeader: true },
      { placeholder: "(문서번호)", exampleValue: "인사-2026-0025" },
      { label: "발신일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일" },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동 님" },
      { label: "발신", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니테크 인사팀" },
    ],
  },
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "(제목)", exampleValue: "채용 최종 합격 통지", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "합격 안내", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "내용", isHeader: true },
      { placeholder: "(안내 문구)", exampleValue: "귀하께서 지원하신 당사 채용전형에 최종 합격하셨음을 알려드립니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "입사 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "입사 예정일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 3일 (월)" },
      { label: "출근 시간", isHeader: true },
      { placeholder: "(시간)", exampleValue: "오전 9시" },
    ],
  },
  {
    fields: [
      { label: "근무 부서", isHeader: true },
      { placeholder: "(부서명)", exampleValue: "경영지원팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "사원" },
    ],
  },
  {
    fields: [
      { label: "근무지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123 머니타워 5층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "입사 시 제출 서류", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "제출 서류", isHeader: true },
      { placeholder: "(서류 목록)", exampleValue: "1. 주민등록등본 1부\n2. 최종학력증명서 1부\n3. 경력증명서 (해당자)\n4. 통장사본 1부\n5. 증명사진 2매", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "문의처", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "담당자", isHeader: true },
      { placeholder: "(담당자명)", exampleValue: "인사팀 김인사" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "발신자", isHeader: true },
      { placeholder: "(직위) (성명) (인)", exampleValue: "(주)머니테크 대표이사 이사장 (직인)", colspan: 3 },
    ],
  },
];

// 출생신고서
export const 출생신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "출생신고서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "출생자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍아기" },
      { label: "성별", isHeader: true },
      { placeholder: "□ 남  □ 여", exampleValue: "☑ 남" },
    ],
  },
  {
    fields: [
      { label: "출생 연월일시", isHeader: true },
      { placeholder: "____년 __월 __일 __시 __분", exampleValue: "2026년 1월 15일 오전 10시 30분" },
      { label: "출생 장소", isHeader: true },
      { placeholder: "(장소)", exampleValue: "서울특별시 서초구 서초중앙로 ○○병원" },
    ],
  },
  {
    fields: [
      { label: "등록기준지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "부(父) 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "등록기준지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "모(母) 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김영희" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "880515-2******" },
    ],
  },
  {
    fields: [
      { label: "등록기준지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 서초구 서초대로 456", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신고인 자격", isHeader: true },
      { placeholder: "□ 부  □ 모  □ 기타", exampleValue: "☑ 부" },
      { label: "신고인 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, ○○아파트 101동 1001호", colspan: 3 },
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
      { label: "첨부 서류", isHeader: true },
      { placeholder: "(서류)", exampleValue: "☑ 출생증명서 1부", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신고인 홍길동 (인)", colspan: 3 },
    ],
  },
];

// ========================================
// 26차 추가: 출입국사실증명신청서, 컨설팅계약서, 토지대장신청서, 폐업신고서
// ========================================

// 출입국사실증명신청서
export const 출입국사실증명신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "출입국사실증명 신청서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명(한글)", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "성명(영문)", isHeader: true },
      { placeholder: "(영문명)", exampleValue: "HONG GILDONG" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850101-1******" },
      { label: "여권번호", isHeader: true },
      { placeholder: "(여권번호)", exampleValue: "M12345678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
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
      { label: "증명서 요청 사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "증명 기간", isHeader: true },
      { placeholder: "____년 __월 ~ ____년 __월", exampleValue: "2020년 1월 ~ 2026년 1월" },
      { label: "증명 종류", isHeader: true },
      { placeholder: "□ 국문  □ 영문", exampleValue: "☑ 국문" },
    ],
  },
  {
    fields: [
      { label: "발급 부수", isHeader: true },
      { placeholder: "(부)", exampleValue: "2부" },
      { label: "용도", isHeader: true },
      { placeholder: "(용도)", exampleValue: "비자 신청용" },
    ],
  },
  {
    fields: [
      { label: "발급 방법", isHeader: true },
      { placeholder: "□ 방문 수령  □ 우편  □ 온라인", exampleValue: "☑ 온라인 발급 (정부24)" },
      { label: "수수료", isHeader: true },
      { placeholder: "(수수료)", exampleValue: "무료" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신청인 홍길동 (인)", colspan: 3 },
    ],
  },
];

// 컨설팅계약서
export const 컨설팅계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "컨설팅 계약서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "의뢰인 (갑)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호/성명", isHeader: true },
      { placeholder: "(상호/성명)", exampleValue: "(주)머니테크" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김대표" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "컨설턴트 (을)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호/성명", isHeader: true },
      { placeholder: "(상호/성명)", exampleValue: "비즈니스 컨설팅" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "234-56-78901" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "이컨설턴트" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-9876-5432" },
    ],
  },
  {
    fields: [
      { label: "컨설팅 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "프로젝트명", isHeader: true },
      { placeholder: "(프로젝트명)", exampleValue: "경영전략 수립 컨설팅", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "컨설팅 범위", isHeader: true },
      { placeholder: "(범위)", exampleValue: "사업 전략 분석, 시장 조사, 실행 계획 수립, 보고서 제공", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 2월 1일 ~ 2026년 4월 30일" },
      { label: "산출물", isHeader: true },
      { placeholder: "(산출물)", exampleValue: "중간보고서 1부, 최종보고서 1부" },
    ],
  },
  {
    fields: [
      { label: "대금 및 지급", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "컨설팅 비용", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 30,000,000원 (VAT 별도)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "(방법)", exampleValue: "계약금 30%, 중도금 40%, 잔금 30%" },
    ],
  },
  {
    fields: [
      { label: "특약 사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "특약", isHeader: true },
      { placeholder: "(특약)", exampleValue: "1. 비밀유지 의무 (계약 종료 후 2년간)\n2. 컨설팅 결과에 대한 성과 보장 없음\n3. 중도 해지 시 진행분 정산", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "의뢰인 (갑)", isHeader: true },
      { placeholder: "(상호) (대표자) (인)", exampleValue: "(주)머니테크 대표 김대표 (인)" },
      { label: "컨설턴트 (을)", isHeader: true },
      { placeholder: "(상호) (대표자) (인)", exampleValue: "비즈니스 컨설팅 대표 이컨설턴트 (인)" },
    ],
  },
];

// 토지대장신청서
export const 토지대장신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "토지대장등본 신청서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명(법인명)", isHeader: true },
      { placeholder: "(성명/법인명)", exampleValue: "홍길동" },
      { label: "주민(사업자)번호", isHeader: true },
      { placeholder: "(주민/사업자번호)", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
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
      { label: "신청 토지 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 수원시 영통구 영통로 100", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지번", isHeader: true },
      { placeholder: "(지번)", exampleValue: "123-45" },
      { label: "지목", isHeader: true },
      { placeholder: "(지목)", exampleValue: "대지" },
    ],
  },
  {
    fields: [
      { label: "증명서 유형", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "발급 유형", isHeader: true },
      { placeholder: "□ 토지대장  □ 토지(임야)대장  □ 공유지연명부", exampleValue: "☑ 토지대장" },
      { label: "소유자 정보", isHeader: true },
      { placeholder: "□ 포함  □ 미포함", exampleValue: "☑ 포함" },
    ],
  },
  {
    fields: [
      { label: "필요 부수", isHeader: true },
      { placeholder: "(부)", exampleValue: "2부" },
      { label: "발급 방법", isHeader: true },
      { placeholder: "□ 방문  □ 온라인", exampleValue: "☑ 온라인 발급 (정부24)" },
    ],
  },
  {
    fields: [
      { label: "사용 목적", isHeader: true },
      { placeholder: "(용도)", exampleValue: "토지 거래 계약용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명)", exampleValue: "신청인 홍길동 (인)", colspan: 3 },
    ],
  },
];

// 폐업신고서
// 사업자등록 및 인·허가 관련 통합 폐업신고서 (별지 제7호 서식)
export const 폐업신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제7호 서식] 사업자등록 및 인·허가 관련 통합 폐업신고서", exampleValue: "[별지 제7호 서식] 사업자등록 및 인·허가 관련 통합 폐업신고서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신고사무명", isHeader: true },
      { placeholder: "(신고사무명)", exampleValue: "부가가치세법 사업자등록" },
      { label: "세부업종", isHeader: true },
      { placeholder: "(업종)", exampleValue: "소매업 (의류)" },
    ],
  },
  {
    fields: [
      { label: "허가(신고·등록)번호", isHeader: true },
      { placeholder: "제          호", exampleValue: "제 2020-서울강남-12345 호" },
      { label: "허가(신고·등록)일자", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2020년 3월 1일" },
    ],
  },
  {
    fields: [
      { label: "폐업일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "폐업사유", isHeader: true },
      { placeholder: "1.사업부진 2.행정처분 3.계절사업 4.법인전환 5.면세포기 6.면세적용 7.해산(합병) 8.양도·양수 9.기타", exampleValue: "1. 사업부진" },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1985. 1. 1." },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 서초구 반포대로 10", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전화번호", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호(법인명)", isHeader: true },
      { placeholder: "(상호)", exampleValue: "머니스토어" },
      { label: "사업자(법인)등록번호", isHeader: true },
      { placeholder: "(사업자번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "성명(대표자)", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "홍길동" },
      { label: "전화번호", isHeader: true },
      { placeholder: "(사업장 전화)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "사업장 소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 1층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일/제출처", isHeader: true },
      { placeholder: "____년 __월 __일 / 세무서장·시장·군수·구청장 귀하", exampleValue: "2026년 1월 17일 / 강남세무서장 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "홍길동 (인)", colspan: 3 },
    ],
  },
];

// 혼인신고서 (양식 제10호)
export const 혼인신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "혼인신고서 (양식 제10호)", exampleValue: "혼인신고서 (양식 제10호)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "①혼인당사자(신고인)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "남편(부) 성명", isHeader: true },
      { placeholder: "한글 (성)     /(명)     (인 또는 서명)", exampleValue: "김 철수 (서명)" },
      { label: "아내(처) 성명", isHeader: true },
      { placeholder: "한글 (성)     /(명)     (인 또는 서명)", exampleValue: "이 영희 (서명)" },
    ],
  },
  {
    fields: [
      { label: "남편 본(한자)", isHeader: true },
      { placeholder: "(본)", exampleValue: "김해" },
      { label: "아내 본(한자)", isHeader: true },
      { placeholder: "(본)", exampleValue: "전주" },
    ],
  },
  {
    fields: [
      { label: "남편 주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "900101-1******" },
      { label: "아내 주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "920515-2******" },
    ],
  },
  {
    fields: [
      { label: "남편 등록기준지", isHeader: true },
      { placeholder: "(등록기준지)", exampleValue: "서울특별시 강남구" },
      { label: "아내 등록기준지", isHeader: true },
      { placeholder: "(등록기준지)", exampleValue: "경기도 성남시 분당구" },
    ],
  },
  {
    fields: [
      { label: "남편 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 강남구 테헤란로 123" },
      { label: "아내 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 성남시 분당구 판교로 456" },
    ],
  },
  {
    fields: [
      { label: "②부모·양부모", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "남편 부 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김OO" },
      { label: "아내 부 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이OO" },
    ],
  },
  {
    fields: [
      { label: "남편 모 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박OO" },
      { label: "아내 모 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "최OO" },
    ],
  },
  {
    fields: [
      { label: "④성·본의 협의", isHeader: true },
      { placeholder: "자녀의 성·본을 모의 성·본으로 하는 협의 여부", exampleValue: "아니요 (자녀는 부의 성·본을 따름)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑤근친혼 여부", isHeader: true },
      { placeholder: "8촌 이내 혈족사이 해당 여부", exampleValue: "아니요 (8촌 이내 혈족 아님)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑦증인", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "증인1 성명", isHeader: true },
      { placeholder: "(성명) (인 또는 서명)", exampleValue: "박증인 (서명)" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850303-1******" },
    ],
  },
  {
    fields: [
      { label: "증인1 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울시 서초구 반포대로 10", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "증인2 성명", isHeader: true },
      { placeholder: "(성명) (인 또는 서명)", exampleValue: "최증인 (서명)" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "880707-2******" },
    ],
  },
  {
    fields: [
      { label: "증인2 주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 수원시 팔달구 효원로 20", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑨신고인 출석여부", isHeader: true },
      { placeholder: "☐ 남편(부)  ☐ 아내(처)", exampleValue: "☑ 남편(부)  ☑ 아내(처) (둘 다 출석)", colspan: 3 },
    ],
  },
];

// 휴업·폐업 신고서 [별지 제9호서식] (부가가치세법 시행규칙)
export const 휴업폐업신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제9호서식] 휴업·폐업 신고서", exampleValue: "[별지 제9호서식] 휴업·폐업 신고서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "처리기간", isHeader: true },
      { placeholder: "즉시", exampleValue: "즉시", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인적사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "①상호(법인명)", isHeader: true },
      { placeholder: "(상호)", exampleValue: "머니스토어" },
      { label: "②성명(대표자)", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "③사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "123-45-67890" },
      { label: "④주민(법인)등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "⑤사업장 소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 1층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑥전화번호", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
      { label: "⑦휴대전화번호", isHeader: true },
      { placeholder: "(휴대전화)", exampleValue: "010-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "신고내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑧신고구분", isHeader: true },
      { placeholder: "☐ 휴업  ☐ 폐업", exampleValue: "☑ 폐업" },
      { label: "⑨업태/종목", isHeader: true },
      { placeholder: "(업태/종목)", exampleValue: "소매업 / 의류" },
    ],
  },
  {
    fields: [
      { label: "⑩휴업기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "(폐업으로 해당 없음)" },
      { label: "⑪폐업일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
    ],
  },
  {
    fields: [
      { label: "⑫휴업(폐업)사유", isHeader: true },
      { placeholder: "1.사업부진 2.질병 3.기타", exampleValue: "1. 사업부진" },
      { label: "⑬잔존재화 유무", isHeader: true },
      { placeholder: "☐ 유  ☐ 무", exampleValue: "☑ 무" },
    ],
  },
  {
    fields: [
      { label: "잔존재화 내역", isHeader: true },
      { placeholder: "(있을 경우 품명·수량·시가 기재)", exampleValue: "(해당 없음)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출서류 안내", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "안내", isHeader: true },
      { placeholder: "신고인 제출서류 및 담당 공무원 확인사항", exampleValue: "사업자등록증 원본, 신분증 / 사업자등록 사항 확인", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일/제출처", isHeader: true },
      { placeholder: "____년 __월 __일 / ___세무서장 귀하", exampleValue: "2026년 1월 17일 / 강남세무서장 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "홍길동 (인)", colspan: 3 },
    ],
  },
];

// 부가가치세 신고서 [별지 제21호서식] (부가가치세법 시행규칙) - 일반과세자용
export const 부가가치세신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제21호서식] 일반과세자 부가가치세 신고서", exampleValue: "[별지 제21호서식] 일반과세자 부가가치세 신고서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고기간", isHeader: true },
      { placeholder: "____년 __기 ( __월 __일 ~ __월 __일 )", exampleValue: "2025년 제2기 확정 (7월 1일 ~ 12월 31일)" },
      { label: "관할 세무서", isHeader: true },
      { placeholder: "___세무서", exampleValue: "강남세무서" },
    ],
  },
  {
    fields: [
      { label: "사업자 인적사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "①상호(법인명)", isHeader: true },
      { placeholder: "(상호)", exampleValue: "머니스토어" },
      { label: "②성명(대표자)", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "③사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "123-45-67890" },
      { label: "④주민(법인)등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "⑤사업장 소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑥전화번호", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
      { label: "⑦업태/종목", isHeader: true },
      { placeholder: "(업태/종목)", exampleValue: "소매업 / 의류" },
    ],
  },
  {
    fields: [
      { label: "과세표준 및 매출세액", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑧과세 세금계산서 발급분", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "50,000,000원 / 5,000,000원" },
      { label: "⑨매입자발행 세금계산서", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "0원 / 0원" },
    ],
  },
  {
    fields: [
      { label: "⑩신용카드·현금영수증 발행분", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "30,000,000원 / 3,000,000원" },
      { label: "⑪기타(정규영수증 외 매출분)", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "0원 / 0원" },
    ],
  },
  {
    fields: [
      { label: "⑫합계(매출세액)", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "80,000,000원 / 8,000,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "매입세액", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑬세금계산서 수취분(일반매입)", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "40,000,000원 / 4,000,000원" },
      { label: "⑭그 밖의 공제매입세액", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "5,000,000원 / 500,000원" },
    ],
  },
  {
    fields: [
      { label: "⑮합계(매입세액)", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "45,000,000원 / 4,500,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "납부(환급)세액 계산", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑯차감세액(⑫-⑮)", isHeader: true },
      { placeholder: "세액", exampleValue: "3,500,000원" },
      { label: "⑰가산세액 계", isHeader: true },
      { placeholder: "세액", exampleValue: "0원" },
    ],
  },
  {
    fields: [
      { label: "⑱예정신고 미환급세액", isHeader: true },
      { placeholder: "세액", exampleValue: "0원" },
      { label: "⑲예정고지세액", isHeader: true },
      { placeholder: "세액", exampleValue: "1,500,000원" },
    ],
  },
  {
    fields: [
      { label: "⑳납부(환급)할 세액", isHeader: true },
      { placeholder: "세액", exampleValue: "2,000,000원 (납부)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일/제출처", isHeader: true },
      { placeholder: "____년 __월 __일 / ___세무서장 귀하", exampleValue: "2026년 1월 25일 / 강남세무서장 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "홍길동 (인)", colspan: 3 },
    ],
  },
];

// 종합소득세 신고서 [별지 제40호서식] (소득세법 시행규칙)
export const 종합소득세신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제40호서식] 종합소득세 과세표준확정신고 및 납부계산서", exampleValue: "[별지 제40호서식] 종합소득세 과세표준확정신고 및 납부계산서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "귀속연도", isHeader: true },
      { placeholder: "____년", exampleValue: "2025년" },
      { label: "관할 세무서", isHeader: true },
      { placeholder: "___세무서", exampleValue: "강남세무서" },
    ],
  },
  {
    fields: [
      { label: "납세자 인적사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "①성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "②주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "③주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 101동 1001호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "④전화번호", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678" },
      { label: "⑤전자우편", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "hong@email.com" },
    ],
  },
  {
    fields: [
      { label: "소득금액 명세", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑥사업소득", isHeader: true },
      { placeholder: "금액", exampleValue: "50,000,000원" },
      { label: "⑦근로소득", isHeader: true },
      { placeholder: "금액", exampleValue: "0원" },
    ],
  },
  {
    fields: [
      { label: "⑧연금소득", isHeader: true },
      { placeholder: "금액", exampleValue: "0원" },
      { label: "⑨기타소득", isHeader: true },
      { placeholder: "금액", exampleValue: "5,000,000원" },
    ],
  },
  {
    fields: [
      { label: "⑩종합소득금액 합계", isHeader: true },
      { placeholder: "금액", exampleValue: "55,000,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "소득공제 명세", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑪기본공제", isHeader: true },
      { placeholder: "금액", exampleValue: "1,500,000원 (본인)" },
      { label: "⑫추가공제", isHeader: true },
      { placeholder: "금액", exampleValue: "0원" },
    ],
  },
  {
    fields: [
      { label: "⑬연금보험료공제", isHeader: true },
      { placeholder: "금액", exampleValue: "4,500,000원" },
      { label: "⑭특별소득공제", isHeader: true },
      { placeholder: "금액", exampleValue: "2,000,000원" },
    ],
  },
  {
    fields: [
      { label: "⑮소득공제 합계", isHeader: true },
      { placeholder: "금액", exampleValue: "8,000,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "세액 계산", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑯과세표준 (⑩-⑮)", isHeader: true },
      { placeholder: "금액", exampleValue: "47,000,000원" },
      { label: "⑰산출세액", isHeader: true },
      { placeholder: "금액", exampleValue: "6,820,000원" },
    ],
  },
  {
    fields: [
      { label: "⑱세액공제·감면", isHeader: true },
      { placeholder: "금액", exampleValue: "700,000원" },
      { label: "⑲기납부세액", isHeader: true },
      { placeholder: "금액", exampleValue: "3,000,000원" },
    ],
  },
  {
    fields: [
      { label: "⑳납부(환급)할 세액", isHeader: true },
      { placeholder: "금액", exampleValue: "3,120,000원 (납부)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일/제출처", isHeader: true },
      { placeholder: "____년 __월 __일 / ___세무서장 귀하", exampleValue: "2026년 5월 31일 / 강남세무서장 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "홍길동 (인)", colspan: 3 },
    ],
  },
];

// 소득·세액 공제신고서 [별지 제37호서식] (소득세법 시행규칙) - 근로소득자용
export const 소득세액공제신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제37호서식] 근로소득자 소득·세액 공제신고서", exampleValue: "[별지 제37호서식] 근로소득자 소득·세액 공제신고서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "귀속연도", isHeader: true },
      { placeholder: "____년", exampleValue: "2025년" },
      { label: "소속 회사", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니컴퍼니" },
    ],
  },
  {
    fields: [
      { label: "근로자 인적사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "①성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "②주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "③주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인적공제 - 기본공제", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "④본인", isHeader: true },
      { placeholder: "☐ 해당", exampleValue: "☑ 해당 (150만원)" },
      { label: "⑤배우자", isHeader: true },
      { placeholder: "☐ 해당 (소득요건 충족 시)", exampleValue: "☑ 해당 (150만원)" },
    ],
  },
  {
    fields: [
      { label: "⑥부양가족", isHeader: true },
      { placeholder: "(명) × 150만원", exampleValue: "2명 × 150만원 = 300만원 (자녀 2명)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인적공제 - 추가공제", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑦경로우대", isHeader: true },
      { placeholder: "(명) × 100만원", exampleValue: "0명" },
      { label: "⑧장애인", isHeader: true },
      { placeholder: "(명) × 200만원", exampleValue: "0명" },
    ],
  },
  {
    fields: [
      { label: "⑨부녀자", isHeader: true },
      { placeholder: "☐ 해당 (50만원)", exampleValue: "☐ 해당 없음" },
      { label: "⑩한부모", isHeader: true },
      { placeholder: "☐ 해당 (100만원)", exampleValue: "☐ 해당 없음" },
    ],
  },
  {
    fields: [
      { label: "연금보험료 공제", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑪국민연금", isHeader: true },
      { placeholder: "납입금액", exampleValue: "4,500,000원" },
      { label: "⑫공무원연금 등", isHeader: true },
      { placeholder: "납입금액", exampleValue: "0원" },
    ],
  },
  {
    fields: [
      { label: "특별소득공제", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑬건강·고용보험료", isHeader: true },
      { placeholder: "납입금액", exampleValue: "3,600,000원" },
      { label: "⑭주택자금", isHeader: true },
      { placeholder: "상환금액", exampleValue: "5,000,000원 (주택청약+이자상환)" },
    ],
  },
  {
    fields: [
      { label: "그 밖의 소득공제", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑮개인연금저축", isHeader: true },
      { placeholder: "납입금액 (40% 공제)", exampleValue: "2,400,000원 → 960,000원 공제" },
      { label: "⑯소기업·소상공인 공제", isHeader: true },
      { placeholder: "납입금액", exampleValue: "0원" },
    ],
  },
  {
    fields: [
      { label: "⑰신용카드 등 사용금액", isHeader: true },
      { placeholder: "공제금액", exampleValue: "2,500,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "세액공제", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑱자녀세액공제", isHeader: true },
      { placeholder: "금액", exampleValue: "300,000원 (2명)" },
      { label: "⑲연금계좌세액공제", isHeader: true },
      { placeholder: "금액", exampleValue: "990,000원 (IRP 600만원 × 16.5%)" },
    ],
  },
  {
    fields: [
      { label: "⑳보험료·의료비·교육비 등", isHeader: true },
      { placeholder: "금액", exampleValue: "850,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고일/제출처", isHeader: true },
      { placeholder: "____년 __월 __일 / (소속 회사)", exampleValue: "2026년 2월 28일 / (주)머니컴퍼니 귀중", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "홍길동 (인)", colspan: 3 },
    ],
  },
];

// 근로소득 원천징수영수증 [별지 제24호서식] (소득세법 시행규칙)
export const 근로소득원천징수영수증_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제24호서식] 근로소득 원천징수영수증·지급명세서", exampleValue: "[별지 제24호서식] 근로소득 원천징수영수증", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "귀속연도", isHeader: true },
      { placeholder: "____년", exampleValue: "2025년" },
      { label: "영수증 종류", isHeader: true },
      { placeholder: "☐ 근무처용 ☐ 소득자보관용 ☐ 발행자보관용", exampleValue: "☑ 소득자 보관용" },
    ],
  },
  {
    fields: [
      { label: "원천징수의무자(회사)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "①법인명(상호)", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니컴퍼니" },
      { label: "②대표자 성명", isHeader: true },
      { placeholder: "(대표자)", exampleValue: "김대표" },
    ],
  },
  {
    fields: [
      { label: "③사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "123-45-67890" },
      { label: "④소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 456" },
    ],
  },
  {
    fields: [
      { label: "소득자(근로자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑤성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "⑥주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "⑦주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 서초구 반포대로 10, 101동 1001호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근무처별 소득명세", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑧근무기간", isHeader: true },
      { placeholder: "____.__.__~____.__.__", exampleValue: "2025.01.01 ~ 2025.12.31" },
      { label: "⑨감면기간", isHeader: true },
      { placeholder: "____.__.__~____.__.__", exampleValue: "(해당 없음)" },
    ],
  },
  {
    fields: [
      { label: "⑩급여", isHeader: true },
      { placeholder: "금액", exampleValue: "60,000,000원" },
      { label: "⑪상여", isHeader: true },
      { placeholder: "금액", exampleValue: "10,000,000원" },
    ],
  },
  {
    fields: [
      { label: "⑫인정상여", isHeader: true },
      { placeholder: "금액", exampleValue: "0원" },
      { label: "⑬주식매수선택권 행사이익", isHeader: true },
      { placeholder: "금액", exampleValue: "0원" },
    ],
  },
  {
    fields: [
      { label: "⑭비과세소득 계", isHeader: true },
      { placeholder: "금액", exampleValue: "2,400,000원 (식대 등)" },
      { label: "⑮계 (총급여액)", isHeader: true },
      { placeholder: "금액", exampleValue: "67,600,000원" },
    ],
  },
  {
    fields: [
      { label: "세액명세", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑯결정세액", isHeader: true },
      { placeholder: "금액", exampleValue: "4,320,000원" },
      { label: "⑰기납부세액", isHeader: true },
      { placeholder: "금액", exampleValue: "4,500,000원" },
    ],
  },
  {
    fields: [
      { label: "⑱차감징수(환급)세액", isHeader: true },
      { placeholder: "금액", exampleValue: "-180,000원 (환급)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지방소득세", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑲결정세액", isHeader: true },
      { placeholder: "금액", exampleValue: "432,000원" },
      { label: "⑳기납부세액", isHeader: true },
      { placeholder: "금액", exampleValue: "450,000원" },
    ],
  },
  {
    fields: [
      { label: "㉑차감징수(환급)세액", isHeader: true },
      { placeholder: "금액", exampleValue: "-18,000원 (환급)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발급일/발급자", isHeader: true },
      { placeholder: "____년 __월 __일 / (원천징수의무자)", exampleValue: "2026년 2월 28일 / (주)머니컴퍼니", colspan: 3 },
    ],
  },
];

// 신용카드매출전표등 수령명세서 [별지 제16호서식] (부가가치세법 시행규칙)
export const 신용카드매출전표수령명세서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제16호서식] 신용카드매출전표등 수령명세서", exampleValue: "[별지 제16호서식(갑)] 신용카드매출전표등 수령명세서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고기간", isHeader: true },
      { placeholder: "____년 __기", exampleValue: "2025년 제2기 확정" },
      { label: "관할 세무서", isHeader: true },
      { placeholder: "___세무서", exampleValue: "강남세무서" },
    ],
  },
  {
    fields: [
      { label: "사업자 인적사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "①상호(법인명)", isHeader: true },
      { placeholder: "(상호)", exampleValue: "머니스토어" },
      { label: "②성명(대표자)", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "③사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "123-45-67890" },
      { label: "④사업장 소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123" },
    ],
  },
  {
    fields: [
      { label: "수령명세 합계", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑤신용카드", isHeader: true },
      { placeholder: "매수/공급가액/세액", exampleValue: "45매 / 15,000,000원 / 1,500,000원" },
      { label: "⑥직불·선불카드", isHeader: true },
      { placeholder: "매수/공급가액/세액", exampleValue: "10매 / 3,000,000원 / 300,000원" },
    ],
  },
  {
    fields: [
      { label: "⑦현금영수증", isHeader: true },
      { placeholder: "매수/공급가액/세액", exampleValue: "20매 / 5,000,000원 / 500,000원" },
      { label: "⑧계", isHeader: true },
      { placeholder: "매수/공급가액/세액", exampleValue: "75매 / 23,000,000원 / 2,300,000원" },
    ],
  },
  {
    fields: [
      { label: "수령명세 (거래처별)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "거래처1", isHeader: true },
      { placeholder: "상호/사업자번호", exampleValue: "(주)오피스마트 / 234-56-78901" },
      { label: "금액/세액", isHeader: true },
      { placeholder: "공급가액/세액", exampleValue: "8,000,000원 / 800,000원" },
    ],
  },
  {
    fields: [
      { label: "거래처2", isHeader: true },
      { placeholder: "상호/사업자번호", exampleValue: "인터넷물류(주) / 345-67-89012" },
      { label: "금액/세액", isHeader: true },
      { placeholder: "공급가액/세액", exampleValue: "5,000,000원 / 500,000원" },
    ],
  },
  {
    fields: [
      { label: "거래처3", isHeader: true },
      { placeholder: "상호/사업자번호", exampleValue: "기타 다수" },
      { label: "금액/세액", isHeader: true },
      { placeholder: "공급가액/세액", exampleValue: "10,000,000원 / 1,000,000원" },
    ],
  },
  {
    fields: [
      { label: "공제 여부 확인", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "⑨공제대상", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "20,000,000원 / 2,000,000원" },
      { label: "⑩불공제대상", isHeader: true },
      { placeholder: "금액/세액", exampleValue: "3,000,000원 / 300,000원 (접대비 등)" },
    ],
  },
  {
    fields: [
      { label: "작성일/제출처", isHeader: true },
      { placeholder: "____년 __월 __일 / ___세무서장 귀하", exampleValue: "2026년 1월 25일 / 강남세무서장 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "작성자", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "홍길동 (인)", colspan: 3 },
    ],
  },
];

// 확인서 (일반 확인서 양식)
export const 확인서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "확 인 서", exampleValue: "확 인 서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인 대상자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "생년월일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "1985년 1월 1일" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 101동 1001호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "확인 사항", isHeader: true },
      { placeholder: "(확인하고자 하는 내용을 구체적으로 기재)", exampleValue: "위 본인은 2025년 1월 1일부터 2025년 12월 31일까지 (주)머니컴퍼니에 재직하였음을 확인합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인 목적", isHeader: true },
      { placeholder: "(용도)", exampleValue: "금융기관 제출용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "비고", isHeader: true },
      { placeholder: "(기타 참고사항)", exampleValue: "(해당 없음)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인 문구", isHeader: true },
      { placeholder: "위 내용이 사실임을 확인합니다.", exampleValue: "위 내용이 틀림없음을 확인합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인자(작성자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소속/직위", isHeader: true },
      { placeholder: "(소속 및 직위)", exampleValue: "(주)머니컴퍼니 인사팀장" },
      { label: "성명", isHeader: true },
      { placeholder: "(성명) (직인)", exampleValue: "김인사 (직인)" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "02-1234-5678", colspan: 3 },
    ],
  },
];

// 프리랜서계약서 (업무위탁계약서)
export const 프리랜서계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "계약서명", isHeader: true },
      { placeholder: "프리랜서 용역계약서", exampleValue: "프리랜서 용역계약서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "위탁자(갑)", isHeader: true },
      { placeholder: "(상호/성명)", exampleValue: "(주)테크스타트" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "박대표" },
    ],
  },
  {
    fields: [
      { label: "사업자번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890" },
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수탁자(을)", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김프리" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1990년 1월 1일" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-9876-5432" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "kim@email.com" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 마포구 상암로 456", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "업무 내용", isHeader: true },
      { placeholder: "(위탁업무 내용)", exampleValue: "웹 애플리케이션 프론트엔드 개발 (React.js 기반)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "계약 기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 2월 1일 ~ 2026년 4월 30일 (3개월)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "용역 대금", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 15,000,000원 (부가세 별도)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "(지급조건)", exampleValue: "매월 말일 500만원씩 지급" },
    ],
  },
  {
    fields: [
      { label: "지급 계좌", isHeader: true },
      { placeholder: "(은행/계좌번호/예금주)", exampleValue: "신한은행 110-123-456789 김프리", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "납품물", isHeader: true },
      { placeholder: "(납품할 결과물)", exampleValue: "소스코드, 기술문서, 사용자 매뉴얼", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "특약사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(특약사항 기재)", exampleValue: "1. 수탁자는 독립적 사업자로서 업무를 수행한다.\n2. 저작권은 대금 완납 시 위탁자에게 이전된다.\n3. 비밀유지 의무는 계약 종료 후 2년간 유지된다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "계약일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "위탁자(갑)", isHeader: true },
      { placeholder: "(서명 또는 인)", exampleValue: "(주)테크스타트 대표이사 박대표 (인)" },
      { label: "수탁자(을)", isHeader: true },
      { placeholder: "(서명 또는 인)", exampleValue: "김프리 (인)" },
    ],
  },
];

// 항고장
export const 항고장_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "항 고 장", exampleValue: "항 고 장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사건번호", isHeader: true },
      { placeholder: "____지원 ____년 ____호", exampleValue: "서울중앙지방법원 2025카단12345", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "원심결정", isHeader: true },
      { placeholder: "(원심재판 결정일)", exampleValue: "2026년 1월 10일 결정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "항고인(채권자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850101-1234567" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 101동 1001호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "피항고인(채무자)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김채무" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900202-2345678" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 서초구 서초대로 456", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "항고 취지", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(원심결정 취소/변경 요청 내용)", exampleValue: "원심결정을 취소한다.\n이 사건 신청을 인용한다.\n라는 결정을 구합니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "항고 이유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(항고 이유를 구체적으로 기재)", exampleValue: "1. 원심결정의 위법·부당\n원심은 채권자의 피보전권리 및 보전의 필요성에 대한 소명이 부족하다고 판단하였으나, 이는 사실오인 및 법리오해에 해당합니다.\n\n2. 피보전권리의 존재\n채권자는 채무자에 대하여 금 50,000,000원의 대여금채권을 보유하고 있으며, 이는 갑 제1호증 내지 제3호증에 의하여 충분히 소명됩니다.\n\n3. 보전의 필요성\n채무자는 현재 다수의 채권자로부터 추심을 받고 있으며, 유일한 재산인 부동산에 대한 처분이 임박한 상황입니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(첨부서류 목록)", exampleValue: "1. 갑 제1호증 금전소비대차계약서\n2. 갑 제2호증 이체확인서\n3. 갑 제3호증 독촉장\n4. 갑 제4호증 부동산등기부등본", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "항고인", isHeader: true },
      { placeholder: "(성명) (인)", exampleValue: "홍길동 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "____법원 귀중", exampleValue: "서울중앙지방법원 귀중", colspan: 3 },
    ],
  },
];

// 해고예고통지서
export const 해고예고통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "해고예고통지서", exampleValue: "해고예고통지서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(근로자 성명) 귀하", exampleValue: "홍길동 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소속", isHeader: true },
      { placeholder: "(부서)", exampleValue: "영업팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "입사일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2020년 3월 1일" },
      { label: "근속기간", isHeader: true },
      { placeholder: "(근속기간)", exampleValue: "5년 10개월" },
    ],
  },
  {
    fields: [
      { label: "해고예고 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "해고 사유", isHeader: true },
      { placeholder: "(해고 사유를 구체적으로 기재)", exampleValue: "회사 경영상의 이유로 인한 인원 감축 (긴박한 경영상의 필요)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "해고 예정일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 28일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "예고 기간", isHeader: true },
      { placeholder: "(30일 이상)", exampleValue: "30일 (본 통지일로부터 해고 예정일까지)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "퇴직금 등 안내", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "퇴직금", isHeader: true },
      { placeholder: "(지급예정액)", exampleValue: "약 15,000,000원 (정확한 금액은 퇴직 시 정산)" },
      { label: "지급일", isHeader: true },
      { placeholder: "(지급예정일)", exampleValue: "퇴직일로부터 14일 이내" },
    ],
  },
  {
    fields: [
      { label: "연차수당", isHeader: true },
      { placeholder: "(미사용 연차수당)", exampleValue: "잔여 연차 10일분 별도 지급" },
      { label: "기타", isHeader: true },
      { placeholder: "(기타 지급사항)", exampleValue: "해고예고수당 해당 없음 (예고 충족)" },
    ],
  },
  {
    fields: [
      { label: "안내사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(근로자 안내사항)", exampleValue: "1. 해고 예정일까지 정상 근무해 주시기 바랍니다.\n2. 업무 인수인계를 완료해 주시기 바랍니다.\n3. 회사 비품 및 자료는 퇴직일까지 반납해 주십시오.\n4. 이의가 있으시면 통지일로부터 30일 이내 노동위원회에 부당해고 구제신청을 할 수 있습니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "통지일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 29일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니컴퍼니" },
      { label: "대표이사", isHeader: true },
      { placeholder: "(대표자) (직인)", exampleValue: "김대표 (직인)" },
    ],
  },
];

// 해고통지서
export const 해고통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "해고통지서", exampleValue: "해고통지서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(근로자 성명) 귀하", exampleValue: "홍길동 귀하", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소속", isHeader: true },
      { placeholder: "(부서)", exampleValue: "영업팀" },
      { label: "직위", isHeader: true },
      { placeholder: "(직위)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "입사일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2023년 6월 1일" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900101-1******" },
    ],
  },
  {
    fields: [
      { label: "해고 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "해고일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 31일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "해고 사유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(해고 사유를 구체적으로 기재)", exampleValue: "1. 귀하는 2025년 10월 15일, 11월 20일, 12월 10일 총 3회에 걸쳐 무단결근하였습니다.\n2. 이에 대해 회사는 2025년 11월 1일, 12월 1일 두 차례 서면경고를 발송하였으나, 귀하는 개선의 의지를 보이지 않았습니다.\n3. 위와 같은 행위는 취업규칙 제32조(해고사유) 제3항 '정당한 사유 없이 3회 이상 무단결근한 경우'에 해당합니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "해고예고수당", isHeader: true },
      { placeholder: "(해당 여부 및 금액)", exampleValue: "금 3,500,000원 (30일분 통상임금, 즉시해고에 따른 예고수당)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "퇴직금", isHeader: true },
      { placeholder: "(지급예정액)", exampleValue: "해당 없음 (1년 미만 근속)" },
      { label: "연차수당", isHeader: true },
      { placeholder: "(미사용 연차)", exampleValue: "잔여 연차 3일분 지급" },
    ],
  },
  {
    fields: [
      { label: "안내사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(근로자 안내사항)", exampleValue: "1. 본 해고에 이의가 있으시면 통지일로부터 3개월 이내에 관할 노동위원회에 부당해고 구제신청을 할 수 있습니다.\n2. 사원증, 보안카드 등 회사 비품은 해고일까지 반납해 주십시오.\n3. 이직확인서, 경력증명서 등 필요한 서류는 인사팀에 요청해 주십시오.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "통지일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "회사명", isHeader: true },
      { placeholder: "(회사명)", exampleValue: "(주)머니컴퍼니" },
      { label: "대표이사", isHeader: true },
      { placeholder: "(대표자) (직인)", exampleValue: "김대표 (직인)" },
    ],
  },
];

// 휴업신고서
export const 휴업신고서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "휴업신고서", exampleValue: "휴업신고서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인(사업자) 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호(법인명)", isHeader: true },
      { placeholder: "(상호)", exampleValue: "(주)머니컴퍼니" },
      { label: "성명(대표자)", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김대표" },
    ],
  },
  {
    fields: [
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890" },
      { label: "주민(법인)등록번호", isHeader: true },
      { placeholder: "(주민/법인등록번호)", exampleValue: "110111-1234567" },
    ],
  },
  {
    fields: [
      { label: "사업장 소재지", isHeader: true },
      { placeholder: "(사업장 주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 5층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업태/종목", isHeader: true },
      { placeholder: "(업태/종목)", exampleValue: "서비스업 / 소프트웨어 개발", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "02-1234-5678" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "info@moneycompany.co.kr" },
    ],
  },
  {
    fields: [
      { label: "휴업 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "휴업 개시일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 1일" },
      { label: "휴업 종료 예정일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 4월 30일" },
    ],
  },
  {
    fields: [
      { label: "휴업 기간", isHeader: true },
      { placeholder: "(휴업 기간)", exampleValue: "3개월", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "휴업 사유", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(휴업 사유를 구체적으로 기재)", exampleValue: "사업장 이전 및 인테리어 공사로 인한 일시적 휴업", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(첨부서류 목록)", exampleValue: "1. 사업자등록증 사본 1부\n2. 임대차계약서 사본 1부 (해당 시)", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신고일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신고인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "김대표 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제출처", isHeader: true },
      { placeholder: "____세무서장 귀하", exampleValue: "강남세무서장 귀하", colspan: 3 },
    ],
  },
];

// 생활안정자금(이차보전) 융자 추천신청서 [별지 1의3] (근로복지사업 운영규정)
// [별지 1의3] 생활안정자금(이차보전) 융자 추천신청서 (근로복지사업 운영규정)
export const 생활안정자금융자추천신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 1의3] 생활안정자금(이차보전) 융자 추천신청서", exampleValue: "[별지 1의3] 생활안정자금(이차보전) 융자 추천신청서", colspan: 3 },
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
      { placeholder: "(성명)", exampleValue: "김철수" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 101호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(휴대전화)", exampleValue: "010-1234-5678" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "kim@email.com" },
    ],
  },
  {
    fields: [
      { label: "근무처 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)OO기업" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "사업장 소재지", isHeader: true },
      { placeholder: "(사업장 주소)", exampleValue: "서울특별시 중구 을지로 100", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "재직기간", isHeader: true },
      { placeholder: "____년 __월 ~ ____년 __월", exampleValue: "2020년 3월 ~ 현재" },
      { label: "월평균임금", isHeader: true },
      { placeholder: "____________원", exampleValue: "3,200,000원" },
    ],
  },
  {
    fields: [
      { label: "융자 신청 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "융자 용도", isHeader: true },
      { placeholder: "☐의료비 ☐혼례비 ☐장례비 ☐부모요양비 ☐자녀학자금 ☐임금감소생활안정자금 ☐기타", exampleValue: "☑ 자녀학자금", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청금액", isHeader: true },
      { placeholder: "_____________원", exampleValue: "10,000,000원" },
      { label: "융자한도", isHeader: true },
      { placeholder: "(한도)", exampleValue: "최대 1천만원" },
    ],
  },
  {
    fields: [
      { label: "상환방법", isHeader: true },
      { placeholder: "☐ 원리금균등 ☐ 원금균등 ☐ 만기일시", exampleValue: "☑ 원리금균등" },
      { label: "상환기간", isHeader: true },
      { placeholder: "____개월", exampleValue: "36개월" },
    ],
  },
  {
    fields: [
      { label: "융자 신청 사유", isHeader: true },
      { placeholder: "(융자 신청 사유를 구체적으로 기재)", exampleValue: "자녀(김영희, 2006년생) 대학교 등록금 및 학자금 마련을 위해 신청합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "이차보전 신청 여부", isHeader: true },
      { placeholder: "☐ 신청 ☐ 미신청", exampleValue: "☑ 신청", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "김철수 (인)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "추천인(사업주)", isHeader: true },
      { placeholder: "(대표자명) (서명 또는 인)", exampleValue: "대표이사 이사장 (인)", colspan: 3 },
    ],
  },
];

// 경력증명서 [별지 제7호서식] (국가기술자격법 시행규칙)
export const 경력증명서_국가기술자격_DATA: FormRow[] = [
  // 서식 헤더
  {
    fields: [
      { placeholder: "[별지 제7호서식]", exampleValue: "[별지 제7호서식]", colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "경력증명서", exampleValue: "경력증명서", colspan: 4 },
    ],
  },
  // 제출인(본인) 섹션
  {
    fields: [
      { label: "제출인(본인)", isHeader: true, rowspan: 4 },
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김철수", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850101-1234567", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "전화번호", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-1234-5678", colspan: 2 },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 역삼로 123, 101동 1001호", colspan: 2 },
    ],
  },
  // 증명사항 테이블 헤더
  {
    fields: [
      { label: "증명사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "재직기간", isHeader: true, colspan: 2 },
      { label: "소속 및 직위", isHeader: true, rowspan: 2 },
      { label: "담당 업무 내용", isHeader: true, rowspan: 2 },
    ],
  },
  {
    fields: [
      { label: "년 월 일", isHeader: true },
      { label: "년 월 일", isHeader: true },
    ],
  },
  // 증명사항 입력란 (3행)
  {
    fields: [
      { placeholder: "____년 __월 __일", exampleValue: "2018년 3월 1일" },
      { placeholder: "____년 __월 __일", exampleValue: "2021년 2월 28일" },
      { placeholder: "(소속/직위)", exampleValue: "기술팀 / 대리" },
      { placeholder: "(업무 내용)", exampleValue: "기계설비 설계 및 시공관리" },
    ],
  },
  {
    fields: [
      { placeholder: "____년 __월 __일", exampleValue: "2021년 3월 1일" },
      { placeholder: "____년 __월 __일", exampleValue: "2024년 12월 31일" },
      { placeholder: "(소속/직위)", exampleValue: "설계팀 / 과장" },
      { placeholder: "(업무 내용)", exampleValue: "플랜트 설계 총괄" },
    ],
  },
  {
    fields: [
      { placeholder: "____년 __월 __일", exampleValue: "" },
      { placeholder: "____년 __월 __일", exampleValue: "" },
      { placeholder: "(소속/직위)", exampleValue: "" },
      { placeholder: "(업무 내용)", exampleValue: "" },
    ],
  },
  // 증명문구
  {
    fields: [
      { placeholder: "위 사항을 증명합니다.", exampleValue: "위 사항을 증명합니다.", colspan: 4 },
    ],
  },
  // 날짜
  {
    fields: [
      { placeholder: "년", exampleValue: "2026년" },
      { placeholder: "월", exampleValue: "1월" },
      { placeholder: "일", exampleValue: "15일", colspan: 2 },
    ],
  },
  // 수탁기관의 장
  {
    fields: [
      { label: "수탁기관의 장", isHeader: true },
      { placeholder: "(기관명)", exampleValue: "한국산업인력공단 서울지역본부장" },
      { placeholder: "(직인)", exampleValue: "(직인)", colspan: 2 },
    ],
  },
  // 행정정보 공동이용 동의서 섹션
  {
    fields: [
      { label: "행정정보 공동이용 동의서", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "본인은 이 건 업무처리와 관련하여 담당 직원이 「전자정부법」 제36조제1항에 따른 행정정보의 공동이용을 통하여 위의 담당 직원 확인 사항을 확인하는 것에 동의합니다. *동의하지 않는 경우에는 신청인이 직접 관련 서류를 제출해야 합니다.", exampleValue: "본인은 이 건 업무처리와 관련하여 담당 직원이 「전자정부법」 제36조제1항에 따른 행정정보의 공동이용을 통하여 위의 담당 직원 확인 사항을 확인하는 것에 동의합니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청인", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김철수" },
      { placeholder: "(서명 또는 인)", exampleValue: "(인)", colspan: 2 },
    ],
  },
  // 유의사항
  {
    fields: [
      { label: "유의사항", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "1. 증명사항은 국가기술자격 취득 전의 경력사항을 기재합니다.\n2. 담당 업무 내용은 취득하고자 하는 자격과 관련된 업무 내용만을 기재합니다.", exampleValue: "1. 증명사항은 국가기술자격 취득 전의 경력사항을 기재합니다.\n2. 담당 업무 내용은 취득하고자 하는 자격과 관련된 업무 내용만을 기재합니다.", colspan: 4 },
    ],
  },
  // 작성방법
  {
    fields: [
      { label: "작성방법", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "1. 「국가기술자격법 시행규칙」 제11조에 따라 기술자격 검정의 응시자격 중 경력 인정에 필요한 경력증명서 양식입니다.\n2. 증명사항의 재직기간, 소속 및 직위, 담당 업무 내용은 빠짐없이 정확하게 기재하여야 합니다.\n3. 허위로 경력을 증명한 경우 「국가기술자격법」 제16조에 따라 처벌받을 수 있습니다.", exampleValue: "1. 「국가기술자격법 시행규칙」 제11조에 따라 기술자격 검정의 응시자격 중 경력 인정에 필요한 경력증명서 양식입니다.\n2. 증명사항의 재직기간, 소속 및 직위, 담당 업무 내용은 빠짐없이 정확하게 기재하여야 합니다.\n3. 허위로 경력을 증명한 경우 「국가기술자격법」 제16조에 따라 처벌받을 수 있습니다.", colspan: 4 },
    ],
  },
];

// 국외취업자모집신고확인증 [별지 제34호서식] (직업안정법 시행규칙)
export const 국외취업자모집신고확인증_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제34호서식] 국외취업자모집신고확인증", exampleValue: "[별지 제34호서식] 국외취업자모집신고확인증", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "모집업체 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "상호(명칭)", isHeader: true },
      { placeholder: "(상호)", exampleValue: "(주)글로벌인재" },
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김대표" },
    ],
  },
  {
    fields: [
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "123-45-67890" },
      { label: "전화번호", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 456", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "모집내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "모집인원", isHeader: true },
      { placeholder: "____명", exampleValue: "50명" },
      { label: "취업국가", isHeader: true },
      { placeholder: "(국가명)", exampleValue: "일본" },
    ],
  },
  {
    fields: [
      { label: "취업직종", isHeader: true },
      { placeholder: "(직종)", exampleValue: "IT엔지니어" },
      { label: "모집기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 1월 1일 ~ 2026년 3월 31일" },
    ],
  },
  {
    fields: [
      { label: "고용조건", isHeader: true },
      { placeholder: "(급여, 근무시간, 계약기간 등)", exampleValue: "월 300만원 이상, 주 40시간, 1년 계약", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인 내용", isHeader: true },
      { placeholder: "위 모집에 대하여 신고를 확인합니다.", exampleValue: "위 모집에 대하여 신고를 확인합니다.", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 10일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인기관", isHeader: true },
      { placeholder: "____고용센터장 (직인)", exampleValue: "서울강남고용센터장 (직인)", colspan: 3 },
    ],
  },
];

// 실업급여 (지급, 부지급) 결정 통지서 [별지 제74호서식] (고용보험법 시행규칙)
export const 실업급여결정통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제74호서식] 실업급여 (지급, 부지급) 결정 통지서", exampleValue: "[별지 제74호서식] 실업급여 (지급, 부지급) 결정 통지서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김철수" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "850101-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 101호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "결정 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "결정구분", isHeader: true },
      { placeholder: "☐ 지급결정 ☐ 부지급결정", exampleValue: "☑ 지급결정" },
      { label: "급여종류", isHeader: true },
      { placeholder: "☐ 구직급여 ☐ 취업촉진수당", exampleValue: "☑ 구직급여" },
    ],
  },
  {
    fields: [
      { label: "이직일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2025년 12월 31일" },
      { label: "수급자격 인정일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 10일" },
    ],
  },
  {
    fields: [
      { label: "소정급여일수", isHeader: true },
      { placeholder: "____일", exampleValue: "180일" },
      { label: "1일 지급액", isHeader: true },
      { placeholder: "____원", exampleValue: "66,000원" },
    ],
  },
  {
    fields: [
      { label: "수급기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 1월 10일 ~ 2026년 7월 9일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "결정사유", isHeader: true },
      { placeholder: "(결정 사유)", exampleValue: "비자발적 이직(회사 경영상 해고)으로 수급자격 인정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "통지일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "통지기관", isHeader: true },
      { placeholder: "____고용센터장 (직인)", exampleValue: "서울강남고용센터장 (직인)", colspan: 3 },
    ],
  },
];

// 구직급여 지급정지 사전고지서 [별지 제91호서식] (고용보험법 시행규칙)
export const 구직급여지급정지사전고지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제91호서식] 구직급여 지급정지 사전고지서", exampleValue: "[별지 제91호서식] 구직급여 지급정지 사전고지서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "880515-1******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 서초구 서초대로 789", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고지 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "지급정지 사유", isHeader: true },
      { placeholder: "(지급정지 사유를 기재)", exampleValue: "실업인정일 불출석 (2026년 1월 20일)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지급정지 기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일 (____일)", exampleValue: "2026년 1월 20일 ~ 2026년 1월 26일 (7일)" },
      { label: "근거법령", isHeader: true },
      { placeholder: "고용보험법 제__조", exampleValue: "고용보험법 제44조" },
    ],
  },
  {
    fields: [
      { label: "의견제출 안내", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "위 처분에 대하여 의견이 있으시면 이 고지서를 받은 날부터 10일 이내에 의견을 제출할 수 있습니다.", exampleValue: "위 처분에 대하여 의견이 있으시면 이 고지서를 받은 날부터 10일 이내에 의견을 제출할 수 있습니다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "의견제출처", isHeader: true },
      { placeholder: "____고용센터", exampleValue: "서울강남고용센터" },
      { label: "제출기한", isHeader: true },
      { placeholder: "____년 __월 __일까지", exampleValue: "2026년 2월 5일까지" },
    ],
  },
  {
    fields: [
      { label: "고지일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 25일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고지기관", isHeader: true },
      { placeholder: "____고용센터장 (직인)", exampleValue: "서울강남고용센터장 (직인)", colspan: 3 },
    ],
  },
];

// 상병급여(출산시) 청구서 [별지 제96호서식] (고용보험법 시행규칙)
export const 상병급여청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제96호서식] 상병급여(출산시) 청구서", exampleValue: "[별지 제96호서식] 상병급여(출산시) 청구서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "청구인 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이영희" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "900301-2******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 송파구 올림픽로 300", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "010-9876-5432" },
      { label: "계좌번호", isHeader: true },
      { placeholder: "(은행명 계좌번호)", exampleValue: "국민은행 123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "청구 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "청구구분", isHeader: true },
      { placeholder: "☐ 상병급여 ☐ 출산시 급여", exampleValue: "☑ 출산시 급여" },
      { label: "출산(예정)일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 15일" },
    ],
  },
  {
    fields: [
      { label: "청구기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 2월 1일 ~ 2026년 3월 16일" },
      { label: "청구일수", isHeader: true },
      { placeholder: "____일", exampleValue: "44일" },
    ],
  },
  {
    fields: [
      { label: "질병·부상명", isHeader: true },
      { placeholder: "(질병명 또는 출산)", exampleValue: "출산" },
      { label: "진료기관", isHeader: true },
      { placeholder: "(의료기관명)", exampleValue: "서울대학교병원" },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "1. 의사의 진단서 또는 소견서 1부\n2. 출생증명서 1부 (출산시)\n3. 수급자격증 사본 1부", exampleValue: "1. 의사의 진단서 1부\n2. 출생증명서 1부\n3. 수급자격증 사본 1부", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "청구일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "청구인", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "이영희 (인)", colspan: 3 },
    ],
  },
];

// 출산전후휴가 급여등의 (지급, 부지급) 결정 통지서 [별지 제106호서식] (고용보험법 시행규칙)
export const 출산전후휴가급여결정통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제106호서식] 출산전후휴가 급여등의 (지급, 부지급) 결정 통지서", exampleValue: "[별지 제106호서식] 출산전후휴가 급여등의 (지급, 부지급) 결정 통지서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "수신자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박지영" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "920515-2******" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 마포구 월드컵북로 400", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "결정 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "결정구분", isHeader: true },
      { placeholder: "☐ 지급결정 ☐ 부지급결정", exampleValue: "☑ 지급결정" },
      { label: "급여종류", isHeader: true },
      { placeholder: "☐ 출산전후휴가급여 ☐ 유산·사산휴가급여", exampleValue: "☑ 출산전후휴가급여" },
    ],
  },
  {
    fields: [
      { label: "출산(예정)일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 1일" },
      { label: "휴가기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 2월 1일 ~ 2026년 4월 30일" },
    ],
  },
  {
    fields: [
      { label: "지급기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일 (____일)", exampleValue: "2026년 3월 2일 ~ 2026년 4월 30일 (60일)" },
      { label: "월 지급액", isHeader: true },
      { placeholder: "____원", exampleValue: "2,100,000원" },
    ],
  },
  {
    fields: [
      { label: "총 지급예정액", isHeader: true },
      { placeholder: "____원", exampleValue: "4,200,000원" },
      { label: "지급방법", isHeader: true },
      { placeholder: "(지급방법)", exampleValue: "매월 본인 계좌 입금" },
    ],
  },
  {
    fields: [
      { label: "결정사유", isHeader: true },
      { placeholder: "(결정 사유)", exampleValue: "출산전후휴가 90일 중 최초 60일은 사업주 지급, 나머지 30일은 고용보험 지급 대상", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "통지일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 10일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "통지기관", isHeader: true },
      { placeholder: "____고용센터장 (직인)", exampleValue: "서울서부고용센터장 (직인)", colspan: 3 },
    ],
  },
];

// [별지 제97호서식] 조기재취업 수당 청구서
// 조기재취업수당청구서 - 실제 PDF 양식 기반 (2025.7.1 개정)
export const 조기재취업수당청구서_DATA: FormRow[] = [
  // 청구인(수급자격자)
  {
    fields: [
      { label: "① 성명", isHeader: true },
      { placeholder: "", exampleValue: "김구직" },
      { label: "② 주민등록번호", isHeader: true },
      { placeholder: "", exampleValue: "901020-1******" },
    ],
  },
  {
    fields: [
      { label: "③ 주소", isHeader: true },
      { placeholder: "", exampleValue: "서울특별시 강남구 테헤란로 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전화번호:", isHeader: true },
      { placeholder: "", exampleValue: "02-1234-5678" },
      { label: "휴대전화번호:", isHeader: true },
      { placeholder: "", exampleValue: "010-1234-5678" },
    ],
  },
  // 사업장에 고용된 경우
  {
    fields: [
      { label: "④ 사업장명", isHeader: true },
      { placeholder: "", exampleValue: "(주)새로운회사" },
      { label: "⑤ 대표자 성명", isHeader: true },
      { placeholder: "", exampleValue: "이대표" },
    ],
  },
  {
    fields: [
      { label: "⑥ 소재지", isHeader: true },
      { placeholder: "", exampleValue: "경기도 성남시 분당구 판교역로 235", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전화번호:", isHeader: true },
      { placeholder: "", exampleValue: "031-1234-5678", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑦ 채용일(입사일)", isHeader: true },
      { placeholder: "", exampleValue: "2026.01.15" },
      { label: "⑧ 채용 확정 통보받은 날", isHeader: true },
      { placeholder: "", exampleValue: "2026.01.10" },
    ],
  },
  {
    fields: [
      { label: "⑨ 월평균 임금액", isHeader: true },
      { placeholder: "_________원", exampleValue: "3,500,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑩ 구직급여 수급 직전 최종 이직 사업장명", isHeader: true },
      { placeholder: "", exampleValue: "(주)이전회사", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑪ 구직급여 수급 직전 최종 이직 사업장과 재취직한 사업장 사업주의 관계", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "[  ] 영업을 양도·양수한 사업주에게 재취직", placeholder: "", exampleValue: "" },
      { label: "[  ] 사업을 인수한 사업주에게 재취직", placeholder: "", exampleValue: "" },
    ],
  },
  {
    fields: [
      { label: "[  ] 합병·분할된 사업장에 재취직", placeholder: "", exampleValue: "" },
      { label: "[√] 해당 없음", placeholder: "", exampleValue: "√" },
    ],
  },
  // 자영업 등을 하는 경우
  {
    fields: [
      { label: "⑫ 사업장명", isHeader: true },
      { placeholder: "", exampleValue: "" },
      { label: "⑬ 대표자 성명", isHeader: true },
      { placeholder: "", exampleValue: "" },
    ],
  },
  {
    fields: [
      { label: "⑭ 소재지", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "전화번호:", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "⑮ 사업 시작일", isHeader: true },
      { placeholder: "", exampleValue: "" },
      { label: "⑯ 사업자등록번호", isHeader: true },
      { placeholder: "", exampleValue: "" },
    ],
  },
  {
    fields: [
      { label: "⑰ 업종", isHeader: true },
      { placeholder: "", exampleValue: "", colspan: 3 },
    ],
  },
  // 지급계좌
  {
    fields: [
      { label: "계좌번호:", isHeader: true },
      { placeholder: "", exampleValue: "110-123-456789" },
      { label: "은행명:", isHeader: true },
      { placeholder: "", exampleValue: "신한은행" },
    ],
  },
  {
    fields: [
      { label: "예금주:", isHeader: true },
      { placeholder: "", exampleValue: "김구직", colspan: 3 },
    ],
  },
  // 청구
  {
    fields: [
      { label: "청구일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 20일" },
      { label: "청구인 (서명 또는 인)", placeholder: "", exampleValue: "김구직 (인)" },
    ],
  },
];

// [서식 8] 청년일자리도약장려금 유형Ⅱ 지급 신청서(청년용)
// [서식 8] 청년일자리도약장려금 유형Ⅱ 지급 신청서(청년용)
export const 청년일자리도약장려금신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[서식 8] 청년일자리도약장려금 유형Ⅱ 지급 신청서(청년용)", exampleValue: "[서식 8] 청년일자리도약장려금 유형Ⅱ 지급 신청서(청년용)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(청년) 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이지훈" },
      { label: "생년월일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "1998년 5월 15일" },
    ],
  },
  {
    fields: [
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "980515-1******" },
      { label: "연령", isHeader: true },
      { placeholder: "(만 __세)", exampleValue: "만 27세" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(휴대전화)", exampleValue: "010-9876-5432" },
      { label: "이메일", isHeader: true },
      { placeholder: "(이메일)", exampleValue: "jihun98@email.com" },
    ],
  },
  {
    fields: [
      { label: "주소", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 마포구 월드컵로 123, 101동 501호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)청년테크" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "234-56-78901" },
    ],
  },
  {
    fields: [
      { label: "채용일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 2일" },
      { label: "고용보험 취득일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 2일" },
    ],
  },
  {
    fields: [
      { label: "6개월 근속 충족일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 7월 1일" },
      { label: "고용형태", isHeader: true },
      { placeholder: "(형태)", exampleValue: "정규직" },
    ],
  },
  {
    fields: [
      { label: "주 소정근로시간", isHeader: true },
      { placeholder: "주 ___시간", exampleValue: "주 40시간" },
      { label: "월 평균임금", isHeader: true },
      { placeholder: "_________원", exampleValue: "2,500,000원" },
    ],
  },
  {
    fields: [
      { label: "지급 신청 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "지급 신청액", isHeader: true },
      { placeholder: "____________원", exampleValue: "2,000,000원 (6개월 충족)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "☐ 계좌입금", exampleValue: "☑ 계좌입금" },
    ],
  },
  {
    fields: [
      { label: "입금계좌", isHeader: true },
      { placeholder: "(은행명) (계좌번호) (예금주)", exampleValue: "신한은행 110-123-456789 이지훈", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 7월 5일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(청년)", isHeader: true },
      { placeholder: "(성명) (서명 또는 인)", exampleValue: "이지훈 (인)", colspan: 3 },
    ],
  },
];

// [서식 8-2] 청년일자리도약장려금 유형Ⅱ 확인서(청년용)
export const 청년일자리도약장려금확인서_DATA: FormRow[] = [
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이지훈" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1998.05.15" },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)청년테크" },
      { label: "채용일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 2일" },
    ],
  },
  {
    fields: [
      { label: "6개월 근속 여부", isHeader: true },
      { placeholder: "(예/아니오)", exampleValue: "예" },
      { label: "정규직 전환", isHeader: true },
      { placeholder: "(예/아니오)", exampleValue: "예" },
    ],
  },
  {
    fields: [
      { label: "주 소정근로시간", isHeader: true },
      { placeholder: "____시간", exampleValue: "40시간" },
      { label: "4대보험 가입", isHeader: true },
      { placeholder: "(가입/미가입)", exampleValue: "가입" },
    ],
  },
  {
    fields: [
      { label: "확인일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 7월 5일" },
      { label: "확인자(사업주)", isHeader: true },
      { placeholder: "(서명)", exampleValue: "대표 박창업 (인)" },
    ],
  },
];

// [서식 15-1] 청년일자리도약장려금 유형Ⅱ(청년) 참여청년 점검표
export const 청년일자리도약장려금점검표_DATA: FormRow[] = [
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이지훈" },
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)청년테크" },
    ],
  },
  {
    fields: [
      { label: "1. 만 15~34세 청년", isHeader: true },
      { placeholder: "□ 충족", exampleValue: "☑ 충족" },
      { label: "2. 취업일 고용보험 미가입", isHeader: true },
      { placeholder: "□ 충족", exampleValue: "☑ 충족" },
    ],
  },
  {
    fields: [
      { label: "3. 정규직 6개월 근속", isHeader: true },
      { placeholder: "□ 충족", exampleValue: "☑ 충족" },
      { label: "4. 주 30시간 이상", isHeader: true },
      { placeholder: "□ 충족", exampleValue: "☑ 충족" },
    ],
  },
  {
    fields: [
      { label: "5. 4대보험 가입", isHeader: true },
      { placeholder: "□ 충족", exampleValue: "☑ 충족" },
      { label: "점검 결과", isHeader: true },
      { placeholder: "(적합/부적합)", exampleValue: "적합" },
    ],
  },
  {
    fields: [
      { label: "점검일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 7월 5일" },
      { label: "점검자", isHeader: true },
      { placeholder: "(서명)", exampleValue: "담당자 김확인 (인)" },
    ],
  },
];

// 고용허가 준수사항 확인서 (호텔·콘도업, 광업, 음식점업, 임업 공통 템플릿)
export const 고용허가준수사항확인서_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "○○호텔" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(소재지)", exampleValue: "서울시 중구 명동길 123", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "홍길동" },
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "외국인 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "NGUYEN VAN A" },
      { label: "국적", isHeader: true },
      { placeholder: "(국적)", exampleValue: "베트남" },
    ],
  },
  {
    fields: [
      { label: "외국인등록번호", isHeader: true },
      { placeholder: "(외국인등록번호)", exampleValue: "123456-1234567" },
      { label: "체류자격", isHeader: true },
      { placeholder: "(체류자격)", exampleValue: "E-9" },
    ],
  },
  {
    fields: [
      { label: "1. 근로계약서 체결", isHeader: true },
      { placeholder: "□ 이행", exampleValue: "☑ 이행" },
      { label: "2. 임금체불 없음", isHeader: true },
      { placeholder: "□ 이행", exampleValue: "☑ 이행" },
    ],
  },
  {
    fields: [
      { label: "3. 4대보험 가입", isHeader: true },
      { placeholder: "□ 이행", exampleValue: "☑ 이행" },
      { label: "4. 숙식 제공", isHeader: true },
      { placeholder: "□ 이행", exampleValue: "☑ 이행" },
    ],
  },
  {
    fields: [
      { label: "확인일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "확인자", isHeader: true },
      { placeholder: "(서명)", exampleValue: "대표 홍길동 (인)" },
    ],
  },
];

// 가족수당신청서
export const 가족수당신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김직원" },
      { label: "사번", isHeader: true },
      { placeholder: "(사번)", exampleValue: "20210001" },
    ],
  },
  {
    fields: [
      { label: "소속", isHeader: true },
      { placeholder: "(소속부서)", exampleValue: "영업팀" },
      { label: "직급", isHeader: true },
      { placeholder: "(직급)", exampleValue: "대리" },
    ],
  },
  {
    fields: [
      { label: "배우자", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이배우" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "1990.03.20" },
    ],
  },
  {
    fields: [
      { label: "자녀1", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김자녀" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "2018.07.15" },
    ],
  },
  {
    fields: [
      { label: "자녀2", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김둘째" },
      { label: "생년월일", isHeader: true },
      { placeholder: "(생년월일)", exampleValue: "2021.02.10" },
    ],
  },
  {
    fields: [
      { label: "부양가족 수", isHeader: true },
      { placeholder: "____명", exampleValue: "3명" },
      { label: "신청 수당액", isHeader: true },
      { placeholder: "____원", exampleValue: "월 150,000원" },
    ],
  },
  {
    fields: [
      { label: "첨부서류", isHeader: true },
      { placeholder: "(첨부서류)", exampleValue: "가족관계증명서, 주민등록등본", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 10일" },
      { label: "신청인", isHeader: true },
      { placeholder: "(서명)", exampleValue: "김직원 (인)" },
    ],
  },
];

// 평균임금 산정상의 상여금 취급요령 (고용노동부예규 제96호)
export const 평균임금상여금취급요령_DATA: FormRow[] = [
  {
    fields: [
      { label: "예규 제목", isHeader: true },
      { placeholder: "(제목)", exampleValue: "평균임금 산정상의 상여금 취급요령", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "예규 번호", isHeader: true },
      { placeholder: "(예규번호)", exampleValue: "고용노동부예규 제96호" },
      { label: "시행일", isHeader: true },
      { placeholder: "(시행일)", exampleValue: "2015년 12월 31일" },
    ],
  },
  {
    fields: [
      { label: "적용 대상", isHeader: true },
      { placeholder: "(적용대상)", exampleValue: "평균임금 산정 시 상여금 포함 여부 판단", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "핵심 내용", isHeader: true },
      { placeholder: "(내용)", exampleValue: "상여금이 평균임금에 포함되려면 정기성, 일률성, 고정성을 갖춰야 함", colspan: 3 },
    ],
  },
];

// 평균임금산정 특례 고시 (고용노동부고시 제2015-77호)
export const 평균임금산정특례고시_DATA: FormRow[] = [
  {
    fields: [
      { label: "고시 제목", isHeader: true },
      { placeholder: "(제목)", exampleValue: "평균임금산정 특례 고시", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "고시 번호", isHeader: true },
      { placeholder: "(고시번호)", exampleValue: "고용노동부고시 제2015-77호" },
      { label: "시행일", isHeader: true },
      { placeholder: "(시행일)", exampleValue: "2015년 12월 31일" },
    ],
  },
  {
    fields: [
      { label: "적용 대상", isHeader: true },
      { placeholder: "(적용대상)", exampleValue: "일용근로자, 단시간근로자 등 특례 적용 대상", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "핵심 내용", isHeader: true },
      { placeholder: "(내용)", exampleValue: "평균임금 산정이 곤란한 경우 통상임금을 평균임금으로 적용", colspan: 3 },
    ],
  },
];

// 사업주 직업능력개발 훈련비용 지원 신청서
export const 직업능력개발훈련비용지원신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)스킬업" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김훈련" },
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "훈련과정명", isHeader: true },
      { placeholder: "(과정명)", exampleValue: "디지털 마케팅 역량강화 과정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "훈련기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026.02.01 ~ 2026.02.28" },
      { label: "훈련인원", isHeader: true },
      { placeholder: "____명", exampleValue: "10명" },
    ],
  },
  {
    fields: [
      { label: "총 훈련비용", isHeader: true },
      { placeholder: "____원", exampleValue: "5,000,000원" },
      { label: "지원 신청액", isHeader: true },
      { placeholder: "____원", exampleValue: "3,500,000원" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "신청인", isHeader: true },
      { placeholder: "(서명)", exampleValue: "대표 김훈련 (인)" },
    ],
  },
];

// 출산육아기 고용안정장려금 지급 신청서 (육아기 단축업무 분담지원금)
export const 출산육아기고용안정장려금신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)워라밸" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "234-56-78901" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "이육아" },
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "02-2345-6789" },
    ],
  },
  {
    fields: [
      { label: "육아기 근로시간 단축 근로자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박엄마" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "880101-2345678" },
    ],
  },
  {
    fields: [
      { label: "단축기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026.01.01 ~ 2026.06.30" },
      { label: "단축 후 근로시간", isHeader: true },
      { placeholder: "주 ____시간", exampleValue: "주 25시간" },
    ],
  },
  {
    fields: [
      { label: "업무 분담 근로자", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김동료" },
      { label: "지원금 신청액", isHeader: true },
      { placeholder: "____원", exampleValue: "월 200,000원" },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 5일" },
      { label: "신청인", isHeader: true },
      { placeholder: "(서명)", exampleValue: "대표 이육아 (인)" },
    ],
  },
];

// 계좌변경 서약서
export const 계좌변경서약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김계좌" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900101-1234567" },
    ],
  },
  {
    fields: [
      { label: "연락처", isHeader: true },
      { placeholder: "(연락처)", exampleValue: "010-1234-5678" },
      { label: "소속", isHeader: true },
      { placeholder: "(소속)", exampleValue: "(주)월급쟁이" },
    ],
  },
  {
    fields: [
      { label: "변경 전 계좌", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "은행명", isHeader: true },
      { placeholder: "(은행명)", exampleValue: "국민은행" },
      { label: "계좌번호", isHeader: true },
      { placeholder: "(계좌번호)", exampleValue: "123-456-789012" },
    ],
  },
  {
    fields: [
      { label: "변경 후 계좌", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "은행명", isHeader: true },
      { placeholder: "(은행명)", exampleValue: "신한은행" },
      { label: "계좌번호", isHeader: true },
      { placeholder: "(계좌번호)", exampleValue: "110-123-456789" },
    ],
  },
  {
    fields: [
      { label: "변경사유", isHeader: true },
      { placeholder: "(변경사유)", exampleValue: "주거래 은행 변경", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "서약일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 10일" },
      { label: "서약인", isHeader: true },
      { placeholder: "(서명)", exampleValue: "김계좌 (인)" },
    ],
  },
];

// 워라밸일자리 장려금 참여 신청서
// [별지 22] 워라밸일자리 장려금 지급 신청서 (고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정)
export const 워라밸일자리장려금신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 22] 워라밸일자리 장려금 지급 신청서", exampleValue: "[별지 22] 워라밸일자리 장려금 지급 신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)균형인생" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "345-67-89012" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "정균형" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-3456-7890" },
    ],
  },
  {
    fields: [
      { label: "사업장 소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 영등포구 여의대로 108", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "참여 사업 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "참여 유형", isHeader: true },
      { placeholder: "☐ 일·가정양립환경개선 ☐ 실근로시간단축제", exampleValue: "☑ 실근로시간단축제", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "참여 시작일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 1일" },
      { label: "참여 종료일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 12월 31일" },
    ],
  },
  {
    fields: [
      { label: "참여 근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "15명" },
      { label: "지급신청 기간", isHeader: true },
      { placeholder: "____개월차", exampleValue: "6개월차" },
    ],
  },
  {
    fields: [
      { label: "실근로시간 단축 내용 (해당 시)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "단축 전 근로시간", isHeader: true },
      { placeholder: "주 ____시간", exampleValue: "주 52시간" },
      { label: "단축 후 근로시간", isHeader: true },
      { placeholder: "주 ____시간", exampleValue: "주 40시간" },
    ],
  },
  {
    fields: [
      { label: "단축 시간", isHeader: true },
      { placeholder: "주 ____시간", exampleValue: "주 12시간" },
      { label: "임금 보전 여부", isHeader: true },
      { placeholder: "☐ 보전 ☐ 미보전", exampleValue: "☑ 임금 100% 보전" },
    ],
  },
  {
    fields: [
      { label: "지급 신청 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청 금액", isHeader: true },
      { placeholder: "___________원", exampleValue: "2,700만원 (월 30만원×15명×6개월)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "☐ 계좌입금", exampleValue: "☑ 계좌입금" },
    ],
  },
  {
    fields: [
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(은행명) (계좌번호)", exampleValue: "우리은행 1002-345-678901", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 7월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(사업주)", isHeader: true },
      { placeholder: "(대표자명) (서명 또는 인)", exampleValue: "대표이사 정균형 (인)", colspan: 3 },
    ],
  },
];

// [별지 제4호 서식] 일·가정 양립 환경개선(유연근무 장려금) 참여신청서
export const 일가정양립환경개선신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제4호 서식] 일·가정 양립 환경개선(유연근무 장려금) 참여신청서", exampleValue: "[별지 제4호 서식] 일·가정 양립 환경개선(유연근무 장려금) 참여신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)가정사랑" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "456-78-90123" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김양립" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-4567-8901" },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(사업장 주소)", exampleValue: "서울특별시 서초구 강남대로 465", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상시근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "30명" },
      { label: "업종", isHeader: true },
      { placeholder: "(업종)", exampleValue: "서비스업" },
    ],
  },
  {
    fields: [
      { label: "유연근무제 참여계획", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "유연근무제 유형", isHeader: true },
      { placeholder: "☐재택근무 ☐원격근무 ☐선택근무 ☐시차출퇴근", exampleValue: "☑ 재택근무", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "도입 예정일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 1일" },
      { label: "대상 근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "20명" },
    ],
  },
  {
    fields: [
      { label: "주당 유연근무일", isHeader: true },
      { placeholder: "주 ___일", exampleValue: "주 3일" },
      { label: "참여기간", isHeader: true },
      { placeholder: "____개월", exampleValue: "12개월" },
    ],
  },
  {
    fields: [
      { label: "운영 계획", isHeader: true },
      { placeholder: "(운영계획 상세 기재)", exampleValue: "재택근무용 노트북 20대 지급, 사내 협업툴 도입, 주 3일 재택근무 허용", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "인프라 구축 내용", isHeader: true },
      { placeholder: "(인프라 구축 내용)", exampleValue: "화상회의 시스템, VPN 구축, 업무용 노트북 지급", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "예상 지원금", isHeader: true },
      { placeholder: "___________원", exampleValue: "월 10만원 × 20명 × 12개월 = 24,000,000원", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 1일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(사업주)", isHeader: true },
      { placeholder: "(대표자명) (서명 또는 인)", exampleValue: "대표이사 김양립 (인)", colspan: 3 },
    ],
  },
];

// 이직사유 확인서 (간병 퇴사)
export const 이직확인서_간병퇴사_DATA: FormRow[] = [
  {
    fields: [
      { label: "피보험자 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김간병" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850101-1234567" },
    ],
  },
  {
    fields: [
      { label: "피보험자번호", isHeader: true },
      { placeholder: "(피보험자번호)", exampleValue: "1234-567890" },
      { label: "이직일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
    ],
  },
  {
    fields: [
      { label: "이직 사유", isHeader: true },
      { placeholder: "(이직사유)", exampleValue: "부모님 간병으로 인한 퇴사", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "간병 대상자", isHeader: true },
      { placeholder: "(대상자)", exampleValue: "부(父) 김OO" },
      { label: "관계", isHeader: true },
      { placeholder: "(관계)", exampleValue: "직계존속" },
    ],
  },
  {
    fields: [
      { label: "간병 사유", isHeader: true },
      { placeholder: "(사유)", exampleValue: "뇌졸중 후유증으로 거동 불편, 24시간 돌봄 필요", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인자(사업주)", isHeader: true },
      { placeholder: "(서명)", exampleValue: "대표 박사장 (인)", colspan: 3 },
    ],
  },
];

// 이직사유 확인서 (공통 템플릿 - 다른 이직사유에도 사용)
export const 이직확인서_공통_DATA: FormRow[] = [
  {
    fields: [
      { label: "피보험자 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이직자" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "900101-1234567" },
    ],
  },
  {
    fields: [
      { label: "피보험자번호", isHeader: true },
      { placeholder: "(피보험자번호)", exampleValue: "1234-567890" },
      { label: "이직일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 31일" },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)이전직장" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "이직 사유 구분", isHeader: true },
      { placeholder: "(이직사유)", exampleValue: "자발적 이직 (정당한 사유)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "구체적 사유", isHeader: true },
      { placeholder: "(구체적 사유)", exampleValue: "(해당 이직 사유에 맞게 작성)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "증빙서류", isHeader: true },
      { placeholder: "(첨부서류)", exampleValue: "(해당 이직 사유 증빙 서류)", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "확인일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 5일" },
      { label: "확인자(사업주)", isHeader: true },
      { placeholder: "(서명)", exampleValue: "대표 OOO (인)" },
    ],
  },
];

// 통상임금 산정지침 (고용노동부예규 제47호)
export const 통상임금산정지침_DATA: FormRow[] = [
  {
    fields: [
      { label: "제1조 (목적)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(목적)", exampleValue: "이 지침은 근로기준법상 통상임금의 의미와 산정 방법에 관한 기준을 정함을 목적으로 한다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "제2조 (통상임금의 의미)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(의미)", exampleValue: "통상임금이란 근로자에게 정기적이고 일률적으로 소정근로 또는 총 근로에 대하여 지급하기로 정한 시간급·일급·주급·월급 또는 도급금액을 말한다.", colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "제3조 (산정 기준)", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { placeholder: "(산정기준)", exampleValue: "1. 정기성: 일정한 간격으로 계속 지급될 것 2. 일률성: 모든 근로자에게 지급될 것 3. 고정성: 소정근로 제공 시 확정적으로 지급될 것", colspan: 4 },
    ],
  },
];

// 출산육아기 고용안정장려금 - 대체인력지원금
export const 출산육아기고용안정장려금_대체인력지원금_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)모범기업" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "김대표" },
      { label: "전화번호", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "휴직자 성명", isHeader: true },
      { placeholder: "(휴직자)", exampleValue: "박육아" },
      { label: "휴직 종류", isHeader: true },
      { placeholder: "(종류)", exampleValue: "육아휴직" },
    ],
  },
  {
    fields: [
      { label: "휴직 기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026.01.01 ~ 2026.12.31", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대체인력 성명", isHeader: true },
      { placeholder: "(대체인력)", exampleValue: "이대체" },
      { label: "채용 기간", isHeader: true },
      { placeholder: "(기간)", exampleValue: "2026.01.01 ~ 2026.12.31" },
    ],
  },
  {
    fields: [
      { label: "신청 금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "월 80만원 × 12개월 = 960만원" },
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(계좌번호)", exampleValue: "국민 123-456-789012" },
    ],
  },
];

// 출산육아기 고용안정장려금 - 육아기 단축업무 분담지원금
export const 출산육아기고용안정장려금_단축업무분담지원금_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)워라밸기업" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "234-56-78901" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "이대표" },
      { label: "전화번호", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-2345-6789" },
    ],
  },
  {
    fields: [
      { label: "단축 근로자 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "최단축" },
      { label: "단축 유형", isHeader: true },
      { placeholder: "(유형)", exampleValue: "육아기 근로시간 단축" },
    ],
  },
  {
    fields: [
      { label: "단축 기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026.03.01 ~ 2026.08.31", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업무 분담자 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "박분담" },
      { label: "분담 업무", isHeader: true },
      { placeholder: "(업무 내용)", exampleValue: "영업 관리 업무 대행" },
    ],
  },
  {
    fields: [
      { label: "신청 금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "월 20만원 × 6개월 = 120만원" },
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(계좌번호)", exampleValue: "신한 110-123-456789" },
    ],
  },
];

// 고용촉진장려금 지급 신청서
// [별지 17] 고용촉진장려금 지급 신청서 (고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정)
export const 고용촉진장려금신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 17] 고용촉진장려금 지급 신청서", exampleValue: "[별지 17] 고용촉진장려금 지급 신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)고용촉진" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "345-67-89012" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "박고용" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-3456-7890" },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(사업장 주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 5층", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "채용 근로자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "근로자 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김취업" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "950101-1******" },
    ],
  },
  {
    fields: [
      { label: "채용일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
      { label: "고용보험 취득일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
    ],
  },
  {
    fields: [
      { label: "취업지원프로그램", isHeader: true },
      { placeholder: "(프로그램명)", exampleValue: "국민취업지원제도 1유형 수료", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "근로계약 형태", isHeader: true },
      { placeholder: "(계약형태)", exampleValue: "정규직 (기간의 정함이 없는 근로계약)" },
      { label: "주 소정근로시간", isHeader: true },
      { placeholder: "____시간", exampleValue: "40시간" },
    ],
  },
  {
    fields: [
      { label: "월 평균임금", isHeader: true },
      { placeholder: "________원", exampleValue: "2,800,000원" },
      { label: "지급신청 기간", isHeader: true },
      { placeholder: "____개월차", exampleValue: "6개월차" },
    ],
  },
  {
    fields: [
      { label: "지급 신청 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청 금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "720만원 (월 120만원 × 6개월)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "☐ 계좌입금", exampleValue: "☑ 계좌입금" },
    ],
  },
  {
    fields: [
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(은행명) (계좌번호)", exampleValue: "우리은행 1002-123-456789", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 7월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(사업주)", isHeader: true },
      { placeholder: "(대표자명) (서명 또는 인)", exampleValue: "대표이사 박고용 (인)", colspan: 3 },
    ],
  },
];

// 정규직 전환 지원 참여 신청서
export const 정규직전환지원신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)정규직전환" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "(사업자등록번호)", exampleValue: "456-78-90123" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "최전환" },
      { label: "업종", isHeader: true },
      { placeholder: "(업종)", exampleValue: "제조업" },
    ],
  },
  {
    fields: [
      { label: "전환 대상자 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이정규" },
      { label: "기존 고용형태", isHeader: true },
      { placeholder: "(형태)", exampleValue: "기간제 근로자" },
    ],
  },
  {
    fields: [
      { label: "정규직 전환일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 1일" },
      { label: "전환 후 임금", isHeader: true },
      { placeholder: "(임금)", exampleValue: "월 300만원" },
    ],
  },
  {
    fields: [
      { label: "신청 금액", isHeader: true },
      { placeholder: "(금액)", exampleValue: "정규직 전환 장려금 80만원" },
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(계좌번호)", exampleValue: "하나 123-456789-12345" },
    ],
  },
];

// [별지 35] 출산육아기 고용안정장려금(육아휴직, 육아기 근로시간 단축) 및 대체인력지원금 지급 신청 결과 통지서 (고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정)
export const 출산육아기고용안정장려금결과통지서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 35] 출산육아기 고용안정장려금 지급 신청 결과 통지서", exampleValue: "[별지 35] 출산육아기 고용안정장려금 지급 신청 결과 통지서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "문서 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "문서번호", isHeader: true },
      { placeholder: "(문서번호)", exampleValue: "고용안정-2026-001234" },
      { label: "통지일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 15일" },
    ],
  },
  {
    fields: [
      { label: "수신", isHeader: true },
      { placeholder: "(사업장명) 대표", exampleValue: "(주)모범기업 대표 김대표", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "발신", isHeader: true },
      { placeholder: "(고용센터)", exampleValue: "서울강남고용센터장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "제목", isHeader: true },
      { placeholder: "(제목)", exampleValue: "출산육아기 고용안정장려금 지급 신청 결과 통지", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청 사업장", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)모범기업" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "123-45-67890" },
    ],
  },
  {
    fields: [
      { label: "신청 장려금 종류", isHeader: true },
      { placeholder: "☐육아휴직 ☐육아기근로시간단축 ☐대체인력", exampleValue: "☑ 육아휴직 지원금", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "육아휴직 근로자", isHeader: true },
      { placeholder: "(성명)", exampleValue: "이육아" },
      { label: "육아휴직 기간", isHeader: true },
      { placeholder: "____년 __월 ~ ____년 __월", exampleValue: "2025.2.1 ~ 2026.1.31" },
    ],
  },
  {
    fields: [
      { label: "신청 기간", isHeader: true },
      { placeholder: "____개월", exampleValue: "12개월" },
      { label: "신청 금액", isHeader: true },
      { placeholder: "_________원", exampleValue: "9,600,000원" },
    ],
  },
  {
    fields: [
      { label: "심사 결과", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "지급 결정 여부", isHeader: true },
      { placeholder: "☐지급 ☐부지급", exampleValue: "☑ 지급 결정", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지급 금액", isHeader: true },
      { placeholder: "_________원", exampleValue: "9,600,000원 (월 80만원 × 12개월)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "(방법)", exampleValue: "계좌입금" },
    ],
  },
  {
    fields: [
      { label: "지급 예정일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 25일" },
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(계좌번호)", exampleValue: "우리 1002-123-456789" },
    ],
  },
  {
    fields: [
      { label: "부지급 사유 (해당 시)", isHeader: true },
      { placeholder: "(부지급 사유)", exampleValue: "-", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "담당자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "담당자", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김담당" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-1234-5678" },
    ],
  },
  {
    fields: [
      { label: "통지기관", isHeader: true },
      { placeholder: "(고용센터)", exampleValue: "서울강남고용센터", colspan: 3 },
    ],
  },
];

// 고용장려금 사업계획 및 지원 해지 확인서
export const 고용장려금해지확인서_DATA: FormRow[] = [
  { fields: [{ label: "제목", isHeader: true }, { placeholder: "고용장려금 사업계획 및 지원 해지 확인서", exampleValue: "고용장려금 사업계획 및 지원 해지 확인서", colspan: 3 }] },
  { fields: [{ label: "1. 사업장 현황", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "사업장명", isHeader: true }, { placeholder: "(예시) 길동산업", exampleValue: "(예시) 홍길동", colspan: 3 }] },
  { fields: [{ label: "소재지 주소", isHeader: true }, { placeholder: "(예시) 서울시 중구 남문로 00가 00", exampleValue: "(예시) 서울시 중구 남문로 5가 1-23", colspan: 3 }] },
  { fields: [{ label: "담당자", isHeader: true }, { placeholder: "성명", exampleValue: "(예시) 홍길동" }, { label: "전화번호", isHeader: true }, { placeholder: "000-000-0000", exampleValue: "02-1234-5678" }] },
  { fields: [{ label: "사업자등록번호", isHeader: true }, { placeholder: "000000-00-00000", exampleValue: "123-45-67890" }, { label: "대표자", isHeader: true }, { placeholder: "(예시) 홍길동", exampleValue: "(예시) 홍길동" }] },
  { fields: [{ label: "2. 이전 신청 내용", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "①사업계획서", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "사업명", isHeader: true }, { placeholder: "(예시) 일자리함께하기", exampleValue: "(예시) 일자리함께하기", colspan: 3 }] },
  { fields: [{ label: "승인통보일", isHeader: true }, { placeholder: "(예시) 2020년 1월 10일", exampleValue: "2020년 1월 10일" }, { label: "", isHeader: true }, { placeholder: "년 월 일", exampleValue: "년 월 일" }] },
  { fields: [{ label: "승인 내용", isHeader: true }, { placeholder: "(예시) 일자리함께하기 교대제 전환 및 새로고용", exampleValue: "일자리함께하기 교대제 전환 및 새로고용", colspan: 3 }] },
  { fields: [{ label: "고용장려금 종류", isHeader: true }, { placeholder: "(예시) 일자리함께하기", exampleValue: "일자리함께하기" }, { label: "유형", isHeader: true }, { placeholder: "(예시) 교대제 전환형 중기근로자 인건비", exampleValue: "교대제 전환형 중기근로자 인건비" }] },
  { fields: [{ label: "②고용장려금", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "지원대상근로자 성명", isHeader: true }, { placeholder: "(예시) 김길동", exampleValue: "김길동" }, { label: "주민등록번호", isHeader: true }, { placeholder: "000000-0******", exampleValue: "850315-1******" }] },
  { fields: [{ label: "최종 지급 신청일", isHeader: true }, { placeholder: "2021년 1월 3일", exampleValue: "2021년 6월 30일" }, { label: "지급받은(예정)일", isHeader: true }, { placeholder: "2021년 6월 30일", exampleValue: "2021년 7월 15일" }] },
  { fields: [{ label: "기 수급기간", isHeader: true }, { placeholder: "'20년 7월 1일 ~ '20년 12월 31일", exampleValue: "2020년 7월 1일 ~ 2020년 12월 31일" }, { label: "기 수급 내역", isHeader: true }, { placeholder: "3,600,00원", exampleValue: "3,600,000원" }] },
  { fields: [{ label: "3. 장려금 해지 확인서 제출 사유", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "○ (    ) 장려금 신청", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "○ 등 확인서 제출후 확인서에 기재된 장려금은 다시 신청할 수 없음을 확인함 ( 서  명 )", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "년    월    일", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "제출자(대표)", isHeader: true }, { placeholder: "(서명 또는 인)", exampleValue: "(서명 또는 인)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "○○지방고용노동청(○○지청)장 귀하", exampleValue: "서울지방고용노동청(강남지청)장 귀하", colspan: 3 }] },
];

// [별지 26의3] 워라밸일자리 장려금(실근로시간단축제) 지급 신청서 (고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정)
export const 워라밸일자리장려금_실근로시간단축_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 26의3] 워라밸일자리 장려금(실근로시간단축제) 지급 신청서", exampleValue: "[별지 26의3] 워라밸일자리 장려금(실근로시간단축제) 지급 신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)실근로단축" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "678-90-12345" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "정워라밸" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-6789-0123" },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(사업장 주소)", exampleValue: "경기도 성남시 분당구 판교역로 166", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상시근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "25명" },
      { label: "업종", isHeader: true },
      { placeholder: "(업종)", exampleValue: "정보통신업" },
    ],
  },
  {
    fields: [
      { label: "실근로시간단축제 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "단축 전 소정근로시간", isHeader: true },
      { placeholder: "주 ____시간", exampleValue: "주 52시간" },
      { label: "단축 후 소정근로시간", isHeader: true },
      { placeholder: "주 ____시간", exampleValue: "주 40시간" },
    ],
  },
  {
    fields: [
      { label: "단축 시간", isHeader: true },
      { placeholder: "주 ____시간", exampleValue: "주 12시간" },
      { label: "임금 보전율", isHeader: true },
      { placeholder: "____%", exampleValue: "100% (임금 감소 없음)" },
    ],
  },
  {
    fields: [
      { label: "단축 실시 기간", isHeader: true },
      { placeholder: "____년 __월 __일 ~ ____년 __월 __일", exampleValue: "2026년 1월 1일 ~ 2026년 12월 31일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대상 근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "10명" },
      { label: "지급신청 기간", isHeader: true },
      { placeholder: "____개월차", exampleValue: "6개월차" },
    ],
  },
  {
    fields: [
      { label: "지급 신청 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청 금액", isHeader: true },
      { placeholder: "___________원", exampleValue: "18,000,000원 (월 30만원×10명×6개월)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "☐ 계좌입금", exampleValue: "☑ 계좌입금" },
    ],
  },
  {
    fields: [
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(은행명) (계좌번호)", exampleValue: "신한은행 100-234-567890", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 7월 20일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(사업주)", isHeader: true },
      { placeholder: "(대표자명) (서명 또는 인)", exampleValue: "대표이사 정워라밸 (인)", colspan: 3 },
    ],
  },
];

// [별지 제31호서식] 국민연금 보험료 지원신청서, 고용보험 보험료 지원신청서 (근로자 종사 사업장) (고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률 시행규칙)
export const 국민연금고용보험료지원신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제31호서식] 국민연금·고용보험 보험료 지원신청서", exampleValue: "[별지 제31호서식] 국민연금·고용보험 보험료 지원신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)소규모사업장" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "789-01-23456" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "홍사장" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-7890-1234" },
    ],
  },
  {
    fields: [
      { label: "사업장 소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "경기도 고양시 일산동구 중앙로 1234", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "상시근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "8명 (10인 미만)" },
      { label: "업종", isHeader: true },
      { placeholder: "(업종)", exampleValue: "제조업" },
    ],
  },
  {
    fields: [
      { label: "지원 대상 근로자 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "근로자 성명", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김신입" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "______-_______", exampleValue: "950101-1******" },
    ],
  },
  {
    fields: [
      { label: "월 보수액", isHeader: true },
      { placeholder: "_________원", exampleValue: "2,300,000원" },
      { label: "입사일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 15일" },
    ],
  },
  {
    fields: [
      { label: "보험료 지원 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "국민연금 보험료", isHeader: true },
      { placeholder: "______원 (4.5%)", exampleValue: "103,500원 (사업주 부담분)" },
      { label: "고용보험 보험료", isHeader: true },
      { placeholder: "______원 (0.9%)", exampleValue: "20,700원 (사업주 부담분)" },
    ],
  },
  {
    fields: [
      { label: "월 보험료 합계", isHeader: true },
      { placeholder: "________원", exampleValue: "124,200원" },
      { label: "지원율", isHeader: true },
      { placeholder: "____%", exampleValue: "80% (두루누리 사업)" },
    ],
  },
  {
    fields: [
      { label: "월 지원 예상액", isHeader: true },
      { placeholder: "________원", exampleValue: "99,360원 (124,200원 × 80%)" },
      { label: "지원 기간", isHeader: true },
      { placeholder: "____개월", exampleValue: "36개월" },
    ],
  },
  {
    fields: [
      { label: "신청 사유", isHeader: true },
      { placeholder: "☐신규가입 ☐계속지원", exampleValue: "☑ 신규가입", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(은행명) (계좌번호) (예금주)", exampleValue: "농협은행 123-45-678901 (주)소규모사업장", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 2월 1일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(사업주)", isHeader: true },
      { placeholder: "(대표자명) (서명 또는 인)", exampleValue: "대표이사 홍사장 (인)", colspan: 3 },
    ],
  },
];

// [별지 제16호 서식] 일·가정 양립 환경개선 참여계획 변경 신청서 (고용창출장려금·고용안정장려금의 신청 및 지급에 관한 규정)
export const 일가정양립환경개선변경신청서_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제16호 서식] 일·가정 양립 환경개선 참여계획 변경 신청서", exampleValue: "[별지 제16호 서식] 일·가정 양립 환경개선 참여계획 변경 신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)환경개선기업" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "890-12-34567" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "박변경" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-8901-2345" },
    ],
  },
  {
    fields: [
      { label: "기존 참여 사업", isHeader: true },
      { placeholder: "☐유연근무장려금 ☐일생활균형인프라", exampleValue: "☑ 유연근무장려금", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "참여 승인일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 10일" },
      { label: "참여 승인번호", isHeader: true },
      { placeholder: "(승인번호)", exampleValue: "서울-2026-001" },
    ],
  },
  {
    fields: [
      { label: "변경 전 참여계획", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "변경 전 계획 내용", isHeader: true },
      { placeholder: "(기존 계획)", exampleValue: "재택근무용 노트북 10대 구입 및 협업툴 도입", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대상 근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "10명" },
      { label: "주당 유연근무일", isHeader: true },
      { placeholder: "주 ___일", exampleValue: "주 2일" },
    ],
  },
  {
    fields: [
      { label: "변경 후 참여계획", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "변경 후 계획 내용", isHeader: true },
      { placeholder: "(변경 계획)", exampleValue: "재택근무용 노트북 8대 + VPN 보안장비 1식 + 화상회의 시스템", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "대상 근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "12명" },
      { label: "주당 유연근무일", isHeader: true },
      { placeholder: "주 ___일", exampleValue: "주 3일" },
    ],
  },
  {
    fields: [
      { label: "변경 사유", isHeader: true },
      { placeholder: "(변경 사유를 구체적으로 기재)", exampleValue: "보안 강화 필요성 대두로 VPN 장비 추가 도입. 근로자 만족도 향상으로 대상 인원 및 재택근무일 확대", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 15일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(사업주)", isHeader: true },
      { placeholder: "(대표자명) (서명 또는 인)", exampleValue: "대표이사 박변경 (인)", colspan: 3 },
    ],
  },
];

// [별지 제24호 서식] 일·가정 양립 환경개선(유연근무 장려금) 지급신청서
export const 일가정양립환경개선_유연근무장려금_DATA: FormRow[] = [
  {
    fields: [
      { label: "서식명", isHeader: true },
      { placeholder: "[별지 제24호 서식] 일·가정 양립 환경개선(유연근무 장려금) 지급신청서", exampleValue: "[별지 제24호 서식] 일·가정 양립 환경개선(유연근무 장려금) 지급신청서", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "사업장 정보", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "사업장명", isHeader: true },
      { placeholder: "(사업장명)", exampleValue: "(주)유연근무기업" },
      { label: "사업자등록번호", isHeader: true },
      { placeholder: "___-__-_____", exampleValue: "901-23-45678" },
    ],
  },
  {
    fields: [
      { label: "대표자", isHeader: true },
      { placeholder: "(대표자명)", exampleValue: "유대표" },
      { label: "연락처", isHeader: true },
      { placeholder: "(전화번호)", exampleValue: "02-9012-3456" },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(사업장 주소)", exampleValue: "서울특별시 송파구 올림픽로 300", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "업종", isHeader: true },
      { placeholder: "(업종)", exampleValue: "소프트웨어 개발업" },
      { label: "상시근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "30명" },
    ],
  },
  {
    fields: [
      { label: "유연근무제 운영 내용", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "유연근무제 유형", isHeader: true },
      { placeholder: "☐재택근무 ☐원격근무 ☐선택근무 ☐시차출퇴근", exampleValue: "☑ 재택근무", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "도입일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 3월 1일" },
      { label: "대상 근로자 수", isHeader: true },
      { placeholder: "____명", exampleValue: "15명" },
    ],
  },
  {
    fields: [
      { label: "주당 유연근무일", isHeader: true },
      { placeholder: "주 ___일", exampleValue: "주 2일" },
      { label: "지급신청 기간", isHeader: true },
      { placeholder: "____개월차", exampleValue: "6개월차" },
    ],
  },
  {
    fields: [
      { label: "인프라 구축 내용", isHeader: true },
      { placeholder: "(인프라 구축 내용)", exampleValue: "재택근무용 노트북 15대, VPN 시스템, 화상회의 솔루션 도입", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "지급 신청 내역", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "신청 장려금", isHeader: true },
      { placeholder: "___________원", exampleValue: "9,000,000원 (월 10만원 × 15명 × 6개월)" },
      { label: "지급 방법", isHeader: true },
      { placeholder: "☐ 계좌입금", exampleValue: "☑ 계좌입금" },
    ],
  },
  {
    fields: [
      { label: "입금 계좌", isHeader: true },
      { placeholder: "(은행명) (계좌번호)", exampleValue: "기업은행 123-456789-01-012", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 9월 10일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "신청인(사업주)", isHeader: true },
      { placeholder: "(대표자명) (서명 또는 인)", exampleValue: "대표이사 유대표 (인)", colspan: 3 },
    ],
  },
];

// 집합건물 매매계약서
export const 집합건물매매계약서_DATA: FormRow[] = [
  {
    fields: [
      { label: "부동산의 표시", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "소재지", isHeader: true },
      { placeholder: "(주소)", exampleValue: "서울특별시 강남구 테헤란로 123, 101동 501호", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "건물 종류", isHeader: true },
      { placeholder: "(종류)", exampleValue: "아파트" },
      { label: "전용면적", isHeader: true },
      { placeholder: "(면적)", exampleValue: "84.97㎡ (약 25.7평)" },
    ],
  },
  {
    fields: [
      { label: "매매 대금", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "매매대금", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 일십이억원정 (₩1,200,000,000)" },
      { label: "계약금", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 일억이천만원정 (10%)" },
    ],
  },
  {
    fields: [
      { label: "중도금", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 사억팔천만원정 (40%)" },
      { label: "잔금", isHeader: true },
      { placeholder: "(금액)", exampleValue: "금 육억원정 (50%)" },
    ],
  },
  {
    fields: [
      { label: "계약 당사자", isHeader: true, colspan: 4 },
    ],
  },
  {
    fields: [
      { label: "매도인", isHeader: true },
      { placeholder: "(성명)", exampleValue: "홍길동" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "700101-1234567" },
    ],
  },
  {
    fields: [
      { label: "매수인", isHeader: true },
      { placeholder: "(성명)", exampleValue: "김철수" },
      { label: "주민등록번호", isHeader: true },
      { placeholder: "(주민등록번호)", exampleValue: "850515-1234567" },
    ],
  },
];

// 이직확인서(52시간초과) 미리보기 데이터 (과도한 근무시간으로 인한 퇴사)
export const 이직확인서_52시간초과_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];


// 이직확인서(근로조건변동) 미리보기 데이터 (근로조건 불리한 변경)
export const 이직확인서_근로조건변동_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

// 이직확인서(배우자동거) 미리보기 데이터 (배우자 동거를 위한 퇴사)
export const 이직확인서_배우자동거_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

// 이직확인서(부양가족동거) 미리보기 데이터 (부양가족 동거를 위한 퇴사)
export const 이직확인서_부양가족동거_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

// 이직확인서(사업장이전) 미리보기 데이터 (사업장 이전으로 인한 퇴사)
export const 이직확인서_사업장이전_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

// 이직확인서(임신퇴사) 미리보기 데이터 (임신으로 인한 퇴사)
export const 이직확인서_임신퇴사_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

// 이직확인서(질병부상) 미리보기 데이터 (질병/부상으로 인한 퇴사)
export const 이직확인서_질병부상_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];

// 이직확인서(최저임금미달) 미리보기 데이터 (최저임금 미달로 인한 퇴사)
export const 이직확인서_최저임금미달_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(내용 입력란)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];


// Tier 4 - 특수 양식 그룹 (고용허가준수사항확인서)

export const 고용허가준수사항확인서_광업_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { exampleValue: "공식 양식" },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { exampleValue: "2026년 1월 17일" },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { exampleValue: "상세 내용을 기재합니다" },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { exampleValue: "작성자: 홍길동 (서명)" },
    ],
  },
];

export const 고용허가준수사항확인서_음식점업_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { exampleValue: "공식 양식" },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { exampleValue: "2026년 1월 17일" },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { exampleValue: "상세 내용을 기재합니다" },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { exampleValue: "작성자: 홍길동 (서명)" },
    ],
  },
];

export const 고용허가준수사항확인서_임업_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { exampleValue: "공식 양식" },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { exampleValue: "홍길동" },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { exampleValue: "2026년 1월 17일" },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { exampleValue: "상세 내용을 기재합니다" },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { exampleValue: "작성자: 홍길동 (서명)" },
    ],
  },
];

export const 고용허가준수사항확인서_호텔콘도업_DATA: FormRow[] = [
  {
    fields: [
      { label: "1. 문서 유형", isHeader: true },
      { placeholder: "(양식명)", exampleValue: "공식 양식", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "2. 작성자", isHeader: true },
      { placeholder: "(이름)", exampleValue: "홍길동", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "3. 작성일", isHeader: true },
      { placeholder: "____년 __월 __일", exampleValue: "2026년 1월 17일", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "4. 상세 내용", isHeader: true },
      { placeholder: "(확인 내용)", exampleValue: "상세 내용을 기재합니다", colspan: 3 },
    ],
  },
  {
    fields: [
      { label: "(서명/날인)", isHeader: true },
      { placeholder: "(직인)", exampleValue: "작성자: 홍길동 (서명)", colspan: 3 },
    ],
  },
];
// 내용증명-전세금반환청구
export const 내용증명_전세금반환청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "전세금 반환 청구 (내용증명)", exampleValue: "전세금 반환 청구 (내용증명)", colspan: 3 }] },
  { fields: [{ label: "수신인", isHeader: true }, { placeholder: "임대인 성명", exampleValue: "김임대 귀하", colspan: 3 }] },
  { fields: [{ label: "발신인", isHeader: true }, { placeholder: "임차인 성명", exampleValue: "이임차 (주소: 서울시 강남구...)", colspan: 3 }] },
  { fields: [{ label: "임대 물건", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 123, 101동 202호", colspan: 3 }] },
  { fields: [{ label: "전세보증금", isHeader: true }, { placeholder: "금액", exampleValue: "금 200,000,000원 (이억원정)", colspan: 3 }] },
  { fields: [{ label: "계약 만료일", isHeader: true }, { placeholder: "날짜", exampleValue: "2026년 2월 28일", colspan: 3 }] },
  { fields: [{ label: "반환 청구일", isHeader: true }, { placeholder: "반환 요청 기한", exampleValue: "본 통지 수령 후 7일 이내 (2026년 2월 12일까지)", colspan: 3 }] },
  { fields: [{ label: "입금 계좌", isHeader: true }, { placeholder: "계좌 정보", exampleValue: "국민은행 123-45-67890 (예금주: 이임차)", colspan: 3 }] },
];

// 내용증명-계약금반환청구
export const 내용증명_계약금반환청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "계약금 반환 청구 (내용증명)", exampleValue: "계약금 반환 청구 (내용증명)", colspan: 3 }] },
  { fields: [{ label: "수신인", isHeader: true }, { placeholder: "상대방 성명", exampleValue: "박매도 귀하", colspan: 3 }] },
  { fields: [{ label: "발신인", isHeader: true }, { placeholder: "청구인 성명", exampleValue: "최매수 (주소: 서울시 서초구...)", colspan: 3 }] },
  { fields: [{ label: "계약 물건", isHeader: true }, { placeholder: "물건 정보", exampleValue: "서울시 강남구 OO아파트 101동 501호", colspan: 3 }] },
  { fields: [{ label: "계약금액", isHeader: true }, { placeholder: "금액", exampleValue: "금 10,000,000원 (일천만원정)", colspan: 3 }] },
  { fields: [{ label: "지급일자", isHeader: true }, { placeholder: "날짜", exampleValue: "2026년 1월 15일 계좌이체", colspan: 3 }] },
  { fields: [{ label: "해제 사유", isHeader: true }, { placeholder: "사유", exampleValue: "매도인의 계약 불이행 (서류 미제출 및 연락 두절)", colspan: 3 }] },
  { fields: [{ label: "반환 기한", isHeader: true }, { placeholder: "반환 요청 기한", exampleValue: "본 통지 수령 후 10일 이내 (2026년 2월 15일까지)", colspan: 3 }] },
];
// Continue with remaining 45 forms in same compact format...
// (Due to message length limits, I'll create the file with placeholder for other forms)
// Each form follows the same pattern with 4-10 rows of header-value pairs
export const 사무용품청구의뢰서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "사무용품 청구 의뢰서", exampleValue: "2026년 2월 사무용품 청구 의뢰서", colspan: 3 }] },
  { fields: [{ label: "신청 부서", isHeader: true }, { placeholder: "부서명", exampleValue: "기획팀", colspan: 3 }] },
  { fields: [{ label: "신청자", isHeader: true }, { placeholder: "성명", exampleValue: "김기획 (사원번호: 2024-0123)", colspan: 3 }] },
  { fields: [{ label: "예상 금액", isHeader: true }, { placeholder: "금액", exampleValue: "약 150,000원", colspan: 3 }] },
];
export const 재심청구서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "재심 청구서", exampleValue: "재심 청구서 (민사소송법 제451조)", colspan: 3 }] },
  { fields: [{ label: "재심 사유", isHeader: true }, { placeholder: "사유", exampleValue: "증거 위조 발견", colspan: 3 }] },
];
export const 헌법소원심판청구_법령_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "헌법소원 심판 청구서 (법령)", exampleValue: "헌법소원 심판 청구서 (법령 위헌)", colspan: 3 }] },
  { fields: [{ label: "침해된 기본권", isHeader: true }, { placeholder: "기본권", exampleValue: "평등권, 재산권", colspan: 3 }] },
];

export const 헌법소원심판청구_불기소처분_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "헌법소원 심판 청구서 (불기소처분)", exampleValue: "헌법소원 심판 청구서 (불기소처분 위헌)", colspan: 3 }] },
  { fields: [{ label: "침해된 기본권", isHeader: true }, { placeholder: "기본권", exampleValue: "재판청구권", colspan: 3 }] },
];

export const 헌법소원심판청구_행정부작위_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "헌법소원 심판 청구서 (행정부작위)", exampleValue: "헌법소원 심판 청구서 (행정부작위 위헌)", colspan: 3 }] },
  { fields: [{ label: "부작위 내용", isHeader: true }, { placeholder: "내용", exampleValue: "허가 신청 처리 거부", colspan: 3 }] },
];

export const 헌법소원심판청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "헌법소원 심판 청구서", exampleValue: "헌법소원 심판 청구서", colspan: 3 }] },
  { fields: [{ label: "침해된 기본권", isHeader: true }, { placeholder: "기본권", exampleValue: "표현의 자유", colspan: 3 }] },
];

export const 물품청구서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "물품 청구서", exampleValue: "물품 청구서", colspan: 3 }] },
  { fields: [{ label: "품목", isHeader: true }, { placeholder: "품명", exampleValue: "노트북 컴퓨터 10대", colspan: 3 }] },
  { fields: [{ label: "합계", isHeader: true }, { placeholder: "총액", exampleValue: "16,500,000원", colspan: 3 }] },
];

export const 청구서_DATA: FormRow[] = [
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

// 개명허가청구
export const 개명허가청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "개명허가청구", exampleValue: "개명허가청구", colspan: 3 }] },
  { fields: [{ label: "본적", isHeader: true }, { placeholder: "본적지", exampleValue: "OO시 OO구 OO동", colspan: 3 }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소", exampleValue: "OO시 OO구 OO동 (우편번호 123-456)", colspan: 3 }] },
  { fields: [{ label: "청구인 겸 사건본인", isHeader: true }, { placeholder: "성명 (한자)", exampleValue: "이병화 (李炳和)", colspan: 3 }] },
  { fields: [{ label: "전화", isHeader: true }, { placeholder: "전화번호", exampleValue: "010-1234-5678", colspan: 3 }] },
  { fields: [{ label: "위 법정대리인 친권자", isHeader: true }, { placeholder: "부모", exampleValue: "부 이OO / 모 OOO", colspan: 3 }] },
  { fields: [{ label: "신청취지", isHeader: true }, { placeholder: "개명 신청 내용", exampleValue: "OO시 OO구청에 비치된 같은 구 OO동 호적중 청구인 겸 사건본인의 이름 '병화(炳和)'를 '태윤(兌潤)'으로 개명하는 것을 허가한다는 결정을 구합니다.", colspan: 3 }] },
  { fields: [{ label: "청구원인", isHeader: true }, { placeholder: "개명 사유 (1-4)", exampleValue: "1. 출생 후 통명칭으로 '태윤'을 사용해왔으나 출생신고는 '병화'로 되어 있음\n2. 초등학교 취학 시 혼란 예상\n3. 작명가의 조언에 따라 현재 이름이 불길하다는 의견\n4. 사실상 사용 중인 '태윤'으로 개명하고자 함", colspan: 3 }] },
  { fields: [{ label: "첨부서류", isHeader: true }, { placeholder: "서류 목록", exampleValue: "1. 호적등본 1통\n2. 주민등록등본 1통\n3. 재원증명서 1통\n4. 인우보증서 1통\n5. 인우주민등록등본 1통\n6. 인우인감증명서 1통\n7. 납부서 1통", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "청구인 겸 사건본인의 법정대리인", isHeader: true }, { placeholder: "친권자 부모", exampleValue: "친권자 부 이OO / 모 OOO (서명)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "법원", exampleValue: "OO지방법원 OO지원 귀중", colspan: 3 }] },
];

// 건물수리청구
export const 건물수리청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "건물 수리 청구", exampleValue: "건물 수리 청구", colspan: 3 }] },
  { fields: [{ label: "하자위치", isHeader: true }, { label: "하자내용", isHeader: true }, { label: "보수청구내용", isHeader: true }] },
  { fields: [{ placeholder: "1.", exampleValue: "안방 벽" }, { placeholder: "", exampleValue: "균열 발생, 빗물 누수" }, { placeholder: "", exampleValue: "벽면 보수 및 방수 처리" }] },
  { fields: [{ placeholder: "2.", exampleValue: "화장실 천장" }, { placeholder: "", exampleValue: "곰팡이 발생" }, { placeholder: "", exampleValue: "천장 교체 및 환기 개선" }] },
  { fields: [{ placeholder: "3.", exampleValue: "거실 바닥" }, { placeholder: "", exampleValue: "타일 균열" }, { placeholder: "", exampleValue: "바닥 타일 교체" }] },
  { fields: [{ placeholder: "임차 정보", exampleValue: "본인은 귀하로부터 2024년 3월 1일에 서울시 강남구 역삼동 123번지 건물 30평을 임차하여 사용중에 있습니다.", colspan: 3 }] },
  { fields: [{ placeholder: "하자 발생 사실", exampleValue: "그러나 건물의 안방 벽에 균열이 발생하여 지난 2025년 7월 장마에 빗물의 누수가 심하여 가재의 일부가 썩는 등 피해를 입었으며 속히 수리하지 않고는 도저히 임대차의 목적을 달성할 수 없습니다.", colspan: 3 }] },
  { fields: [{ placeholder: "수리 요청", exampleValue: "바쁘시더라도 조속한 시일내에 보완공사를 해주시기 바라며 현재까지 발견된 하자 내용은 아래와 같습니다.", colspan: 3 }] },
  { fields: [{ label: "아래", isHeader: true, colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 5일", colspan: 2 }] },
  { fields: [{ label: "임차인 주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 역삼동 123번지", colspan: 2 }] },
  { fields: [{ label: "임차인 성명", isHeader: true }, { placeholder: "성명", exampleValue: "김임차 (인)", colspan: 2 }] },
  { fields: [{ label: "임대인 주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 송파구 OO동 456번지", colspan: 2 }] },
  { fields: [{ label: "임대인 성명", isHeader: true }, { placeholder: "성명", exampleValue: "이임대 귀하", colspan: 2 }] },
];

// 과세전적부심사청구서
export const 과세전적부심사청구서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "과세전 적부심사 청구서", exampleValue: "과세전 적부심사 청구서", colspan: 2 }, { label: "처리기간", isHeader: true }, { placeholder: "30일", exampleValue: "30일" }] },
  { fields: [{ label: "청구인 정보", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "상호(법인명)", isHeader: true }, { placeholder: "상호 또는 법인명", exampleValue: "(주)OO산업" }, { label: "주민(법인)등록번호", isHeader: true }, { placeholder: "사업자등록번호", exampleValue: "123-45-67890" }] },
  { fields: [{ label: "성명(대표자)", isHeader: true }, { placeholder: "대표자명", exampleValue: "김철수" }, { label: "전화번호(휴대전화)", isHeader: true }, { placeholder: "전화번호", exampleValue: "010-1234-5678" }] },
  { fields: [{ label: "주소(사업장)", isHeader: true }, { placeholder: "우편번호 및 주소", exampleValue: "(우 12345) 서울시 강남구 테헤란로 123", colspan: 3 }] },
  { fields: [{ label: "전자우편(e-mail)", isHeader: true }, { placeholder: "이메일 주소", exampleValue: "abc@example.com", colspan: 3 }] },
  { fields: [{ label: "세무조사결과·과세예고 통지관서", isHeader: true }, { placeholder: "관서명", exampleValue: "강남세무서", colspan: 3 }] },
  { fields: [{ label: "통지연월일(통지 받은 날)", isHeader: true }, { placeholder: "20XX. XX. XX. (20XX. XX. XX.)", exampleValue: "2026. 1. 15. (2026. 1. 20.)", colspan: 3 }] },
  { fields: [{ label: "청구관련 세액", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "세목", isHeader: true }, { placeholder: "세목", exampleValue: "법인세" }, { label: "과세대상 기간", isHeader: true }, { placeholder: "과세기간", exampleValue: "2025.1.1~2025.12.31" }] },
  { fields: [{ label: "세액(수입금액)", isHeader: true }, { placeholder: "세액", exampleValue: "100,000,000원", colspan: 3 }] },
  { fields: [{ label: "청구내용 및 이유", isHeader: true }, { placeholder: "불복내용과 이유를 구체적으로 기재", exampleValue: "1. 과세 처분의 위법·부당 사유\n2. 구체적인 근거 및 증빙자료\n3. 청구 취지 및 요청사항", colspan: 3 }] },
  { fields: [{ label: "첨부서류", isHeader: true }, { placeholder: "첨부서류 목록", exampleValue: "• 과세예고통지서 사본 1부\n• 청구이유서 1부\n• 관련 증빙서류 각 1부", colspan: 3 }] },
  { fields: [{ placeholder: "청구 취지", exampleValue: "국세기본법 제81조의10 및 동법 시행령 제63조의8과 과세전적부심사사무처리규정 제10조 제1호의 규정에 의하여 위와 같이 과세전적부심사를 청구합니다.", colspan: 4 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "20XX년 XX월 XX일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "서명 또는 날인", exampleValue: "김철수 (인)", colspan: 3 }] },
  { fields: [{ label: "대리인", isHeader: true }, { placeholder: "서명 또는 날인", exampleValue: "세무사 이OO (인)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "제출 기관", exampleValue: "OO세무서장 귀하 / OO지방국세청장 귀하", colspan: 3 }] },
  { fields: [{ label: "위임장 (선택)", isHeader: true }, { placeholder: "대리인 선임 시 작성", exampleValue: "대리인: 세무사 이OO\n사업장: 서울시 강남구 OO로 456 (사업자등록번호: 987-65-43210)\n전화번호: 02-1234-5678", colspan: 3 }] },
];

// 구조금지급청구서
export const 구조금지급청구서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "구조금 지급 청구서", exampleValue: "구조금 지급 청구서", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "OO지방검찰청 귀중", exampleValue: "서울중앙지방검찰청 귀중", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "20OO년 O월 O일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "(OOO) (인)", exampleValue: "김철수 (인)", colspan: 3 }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 123 (우편번호 12345)", colspan: 3 }] },
  { fields: [{ placeholder: "안내 문구", exampleValue: "다음과 같이 구조금의 지급을 청구합니다.", colspan: 3 }] },
  { fields: [{ label: "청구금액", isHeader: true }, { placeholder: "___원정", exampleValue: "10,000,000원정", colspan: 3 }] },
  { fields: [{ label: "구조결정 - 사건번호", isHeader: true }, { placeholder: "구심 년 제 호", exampleValue: "구심 2025 제 12345 호", colspan: 3 }] },
  { fields: [{ label: "결정일자", isHeader: true }, { placeholder: "20OO년 O월 O일", exampleValue: "2025년 12월 15일", colspan: 3 }] },
  { fields: [{ label: "결정심의회명", isHeader: true }, { placeholder: "OO지방검찰청 범죄피해구조심의회", exampleValue: "서울중앙지방검찰청 범죄피해구조심의회", colspan: 3 }] },
  { fields: [{ label: "종류", isHeader: true }, { placeholder: "유족구조금, 장해구조금", exampleValue: "유족구조금", colspan: 3 }] },
  { fields: [{ label: "지급방법", isHeader: true, colspan: 3 }] },
  { fields: [{ label: "구좌입금 - 은행명", isHeader: true }, { placeholder: "은행명", exampleValue: "국민은행", colspan: 2 }] },
  { fields: [{ label: "구좌번호", isHeader: true }, { placeholder: "계좌번호", exampleValue: "123-456-78901234", colspan: 2 }] },
  { fields: [{ label: "예금종류", isHeader: true }, { placeholder: "예금종류", exampleValue: "보통예금" }, { label: "예금주", isHeader: true }, { placeholder: "예금주", exampleValue: "김철수" }] },
  { fields: [{ label: "직접지급", isHeader: true }, { placeholder: "OO지방검찰청 지출관으로부터 직접 수령", exampleValue: "□ 서울중앙지방검찰청 지출관으로부터 직접 수령", colspan: 3 }] },
  { fields: [{ placeholder: "비고", exampleValue: "※ 지급방법란은 희망하는 항목을 ○으로 둘러주시고, 그에 해당되는 빈칸을 정확히 기입하여 주십시오.", colspan: 3 }] },
];

// 국공유지소유권이전등기청구서
export const 국공유지소유권이전등기청구서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "국·공유지 소유권이전등기청구서", exampleValue: "국·공유지 소유권이전등기청구서", colspan: 2 }, { label: "처리기간", isHeader: true }, { placeholder: "90일", exampleValue: "90일" }] },
  { fields: [{ label: "청구인 정보", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소", exampleValue: "경기도 수원시 팔달구 OO로 123", colspan: 3 }] },
  { fields: [{ label: "주민등록번호", isHeader: true }, { placeholder: "주민등록번호", exampleValue: "650101-1******" }, { label: "성명", isHeader: true }, { placeholder: "성명", exampleValue: "김철수" }] },
  { fields: [{ label: "생년월일", isHeader: true }, { placeholder: "19XX. XX. XX.생", exampleValue: "1965. 1. 1.생", colspan: 3 }] },
  { fields: [{ label: "토지 정보", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "소재지", isHeader: true }, { label: "지번", isHeader: true }, { label: "지목", isHeader: true }, { label: "매도토지 면적", isHeader: true }, { label: "매도청", isHeader: true }, { label: "총상환액", isHeader: true }, { label: "상환완료일", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "소재지", exampleValue: "경기도 수원시 팔달구" }, { placeholder: "지번", exampleValue: "123-45" }, { placeholder: "지목", exampleValue: "전" }, { placeholder: "면적", exampleValue: "500㎡" }, { placeholder: "매도청", exampleValue: "수원시청" }, { placeholder: "상환액", exampleValue: "50,000,000원" }, { placeholder: "완료일", exampleValue: "2025.12.31" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "소재지", exampleValue: "" }, { placeholder: "지번", exampleValue: "" }, { placeholder: "지목", exampleValue: "" }, { placeholder: "면적", exampleValue: "" }, { placeholder: "매도청", exampleValue: "" }, { placeholder: "상환액", exampleValue: "" }, { placeholder: "완료일", exampleValue: "" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "소재지", exampleValue: "" }, { placeholder: "지번", exampleValue: "" }, { placeholder: "지목", exampleValue: "" }, { placeholder: "면적", exampleValue: "" }, { placeholder: "매도청", exampleValue: "" }, { placeholder: "상환액", exampleValue: "" }, { placeholder: "완료일", exampleValue: "" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "청구 취지", exampleValue: "화전정리에관한법률시행령 제18조의 규정에 의하여 위에 표시된 토지에 대한 토지대가의 상환을 완료하고 관계서류를 갖추어 이전등기를 청구합니다.", colspan: 8 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "20OO년 O월 O일", exampleValue: "2026년 2월 5일", colspan: 7 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "서명 또는 날인", exampleValue: "김철수 (인)", colspan: 7 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "OO 귀하", exampleValue: "수원시청 귀하", colspan: 7 }] },
  { fields: [{ label: "수입인지", isHeader: true }, { placeholder: "없음", exampleValue: "없음", colspan: 7 }] },
  { fields: [{ placeholder: "구비서류", exampleValue: "• 상환완료증명서\n  - 국유지: 국유림관리소장 발급\n  - 공유지: 지방자치단체장 발급", colspan: 8 }] },
];

// 국선변호인선정청구서
export const 국선변호인선정청구서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "고지확인서 겸 국선변호인 선정 청구서", exampleValue: "고지확인서 겸 국선변호인 선정 청구서", colspan: 3 }] },
  { fields: [{ label: "재판부", isHeader: true }, { placeholder: "제 형사부(단독)", exampleValue: "제3형사부(단독)", colspan: 3 }] },
  { fields: [{ label: "사건번호", isHeader: true }, { placeholder: "사건번호", exampleValue: "2025고단12345" }, { label: "죄명", isHeader: true }, { placeholder: "죄명", exampleValue: "사기" }] },
  { fields: [{ label: "피고인(피의자) 정보", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "성명", exampleValue: "김철수" }, { label: "직업", isHeader: true }, { placeholder: "직업", exampleValue: "회사원" }] },
  { fields: [{ label: "주민등록번호", isHeader: true }, { placeholder: "주민등록번호", exampleValue: "800101-1******", colspan: 3 }] },
  { fields: [{ label: "구속/불구속", isHeader: true }, { placeholder: "□구속 □불구속", exampleValue: "☑구속 □불구속", colspan: 3 }] },
  { fields: [{ label: "주거", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 123 (OO아파트 101동 202호)", colspan: 3 }] },
  { fields: [{ placeholder: "확인 문구", exampleValue: "국선변호인 선정에 대한 고지를 틀림없이 받았음을 확인합니다.", colspan: 4 }] },
  { fields: [{ placeholder: "의견 안내", exampleValue: "국선변호인 선정에 관한 의견은 다음과 같습니다. (해당란에 ✓ 표시)", colspan: 4 }] },
  { fields: [{ label: "국선변호인 선정 청구", isHeader: true, colspan: 4 }] },
  { fields: [{ placeholder: "청구함", exampleValue: "☑ 국선변호인 선정을 청구합니다.", colspan: 4 }] },
  { fields: [{ label: "청구 사유", isHeader: true }, { placeholder: "□ 빈곤 □ 기타", exampleValue: "☑ 빈곤(생활보호대상자 등)\n□ 기타 사유 [현재의 가정형편상 개인적으로 사선변호인을 선임하기 어려움]", colspan: 3 }] },
  { fields: [{ placeholder: "참고사항", exampleValue: "※ 기타 참고할 만한 사항이 있으면 기재하십시오.\n• 현재 실직 상태로 수입 없음\n• 부양가족 3명 (배우자, 자녀 2명)\n• 국민기초생활수급자 해당", colspan: 4 }] },
  { fields: [{ placeholder: "청구하지 않음", exampleValue: "□ 국선변호인 선정을 청구하지 않습니다.\n  □ 사선변호인을 선임하였거나 선임할 예정임\n  □ 국선변호는 원하지 아니함", colspan: 4 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "19XX. XX. XX.", exampleValue: "2026. 2. 5.", colspan: 3 }] },
  { fields: [{ label: "피고인(피의자)", isHeader: true }, { placeholder: "(인) 또는 서명", exampleValue: "김철수 (인)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "OO법원 귀중", exampleValue: "서울중앙지방법원 귀중", colspan: 3 }] },
  { fields: [{ label: "첨부서류(소명자료)", isHeader: true }, { placeholder: "□ 없음  □ 있음", exampleValue: "☑ 있음: 국민기초생활수급자 증명서 1부, 실업급여 수급 확인서 1부", colspan: 3 }] },
];

// 근로조건위반손해배상청구신청서
export const 근로조건위반손해배상청구신청서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "근로조건위반 손해배상청구 신청서", exampleValue: "근로조건위반 손해배상청구 신청서", colspan: 2 }, { label: "처리기간", isHeader: true }, { placeholder: "30일", exampleValue: "30일" }] },
  { fields: [{ label: "신청인 정보", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "성명", exampleValue: "김철수" }, { label: "주민등록번호", isHeader: true }, { placeholder: "주민등록번호", exampleValue: "850101-1******" }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소 (전화)", exampleValue: "서울시 강남구 테헤란로 123 (전화: 010-1234-5678)", colspan: 3 }] },
  { fields: [{ label: "사업장명", isHeader: true }, { placeholder: "사업장명", exampleValue: "(주)OO산업" }, { label: "근무부서", isHeader: true }, { placeholder: "부서명", exampleValue: "생산부" }] },
  { fields: [{ label: "종사업무", isHeader: true }, { placeholder: "업무", exampleValue: "생산직" }, { label: "입사일", exampleValue: "2023년 3월 1일", placeholder: "년 월 일" }] },
  { fields: [{ label: "피신청인 정보", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "사업장명", isHeader: true }, { placeholder: "사업장명", exampleValue: "(주)OO산업" }, { label: "사업의 종류", isHeader: true }, { placeholder: "업종", exampleValue: "제조업" }] },
  { fields: [{ label: "대표자명", isHeader: true }, { placeholder: "대표자", exampleValue: "이OO" }, { label: "주민등록번호", isHeader: true }, { placeholder: "주민등록번호", exampleValue: "700101-1******" }] },
  { fields: [{ label: "근로자수", isHeader: true }, { placeholder: "인원", exampleValue: "50명" }, { label: "전화번호", isHeader: true }, { placeholder: "전화", exampleValue: "02-1234-5678" }] },
  { fields: [{ label: "소재지", isHeader: true }, { placeholder: "사업장 주소", exampleValue: "경기도 성남시 분당구 OO로 456", colspan: 3 }] },
  { fields: [{ label: "신청이유 및 청구금액", isHeader: true }, { placeholder: "근로계약 당시 근로조건, 입사 이후 근로조건 및 손해배상 청구금액 등을 구체적으로 기재", exampleValue: "1. 근로계약 당시 근로조건\n   • 근무시간: 09:00~18:00 (주 5일, 40시간)\n   • 임금: 월 3,000,000원\n   • 연장·야간근로 수당: 법정 기준 지급\n\n2. 입사 이후 실제 근로조건\n   • 실제 근무시간: 08:00~22:00 (주 6일, 84시간)\n   • 실제 지급 임금: 월 3,000,000원 (연장수당 미지급)\n   • 야간근로수당, 휴일수당 전액 미지급\n\n3. 위반 사항\n   • 근로기준법 제50조(근로시간) 위반\n   • 근로기준법 제56조(연장·야간·휴일근로 가산수당) 미지급\n\n4. 청구금액: 15,000,000원\n   • 미지급 연장근로수당: 10,000,000원\n   • 미지급 야간근로수당: 3,000,000원\n   • 미지급 휴일근로수당: 2,000,000원", colspan: 3 }] },
  { fields: [{ placeholder: "청구 취지", exampleValue: "근로기준법 제26조 제2항 및 동법 시행규칙 제2조의 규정에 의하여 위와 같이 근로조건 위반을 이유로 한 손해배상청구를 신청합니다.", colspan: 4 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "신청인", isHeader: true }, { placeholder: "서명 또는 인", exampleValue: "김철수 (인)", colspan: 3 }] },
  { fields: [{ label: "대리인", isHeader: true }, { placeholder: "서명 또는 인", exampleValue: "변호사 OOO (인)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "지방노동위원회 위원장 귀하", exampleValue: "서울지방노동위원회 위원장 귀하", colspan: 3 }] },
  { fields: [{ label: "구비서류", isHeader: true }, { placeholder: "첨부 서류", exampleValue: "1. 근로계약서 사본 1부\n2. 사용자의 근로조건 위반사실을 입증하는 자료 (근태기록, 급여명세서 등)", colspan: 3 }] },
  { fields: [{ label: "수수료", isHeader: true }, { placeholder: "없음", exampleValue: "없음", colspan: 3 }] },
];

// 금치산선고심판청구
export const 금치산선고심판청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "금치산선고심판청구", exampleValue: "금치산선고심판청구", colspan: 3 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "OOO (주민등록번호)", exampleValue: "김철수 (800101-1******)", colspan: 3 }] },
  { fields: [{ label: "생년월일", isHeader: true }, { placeholder: "생년월일", exampleValue: "1980년 1월 1일", colspan: 3 }] },
  { fields: [{ label: "본적", isHeader: true }, { placeholder: "본적지", exampleValue: "서울시 강남구 OO동", colspan: 3 }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 123", colspan: 3 }] },
  { fields: [{ label: "전화", isHeader: true }, { placeholder: "전화번호", exampleValue: "010-1234-5678", colspan: 3 }] },
  { fields: [{ label: "사건본인", isHeader: true }, { placeholder: "OOO (주민등록번호)", exampleValue: "김영희 (850101-2******)", colspan: 3 }] },
  { fields: [{ label: "생년월일", isHeader: true }, { placeholder: "생년월일", exampleValue: "1985년 1월 1일", colspan: 3 }] },
  { fields: [{ label: "본적", isHeader: true }, { placeholder: "본적지", exampleValue: "서울시 강남구 OO동", colspan: 3 }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 456", colspan: 3 }] },
  { fields: [{ label: "전화", isHeader: true }, { placeholder: "전화번호", exampleValue: "010-9876-5432", colspan: 3 }] },
  { fields: [{ label: "청구취지", isHeader: true }, { placeholder: "청구 내용", exampleValue: "사건본인 김영희를 금치산자로 선고한다.\n라는 심판을 구함.", colspan: 3 }] },
  { fields: [{ label: "청구원인", isHeader: true }, { placeholder: "청구 이유", exampleValue: "1. 청구인은 사건본인 김영희의 배우자이고 사건본인은 2024년 1월 15일 교통사고로 인하여 OO병원에 입원하여 치료를 받은 바 있으나 정신이상으로 회복을 예측할 수 없는 상태에 있습니다.\n\n2. 따라서 청구인은 심신상실의 상태에 있는 사건본인에 대하여 금치산선고를 구하고자 이 심판 청구에 이른 것입니다.", colspan: 3 }] },
  { fields: [{ label: "첨부서류", isHeader: true }, { placeholder: "첨부 서류 목록", exampleValue: "1. 청구인과 사건본인의 호적등본 각 1통\n2. 청구인과 사건본인의 주민등록등본 각 1통\n3. 진단서 1통", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "OOOO. O. O.", exampleValue: "2026. 2. 5.", colspan: 3 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "OOO (인)", exampleValue: "위 청구인 김철수 (인)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "OO지방법원 OO지원 귀중", exampleValue: "서울중앙지방법원 귀중", colspan: 3 }] },
];

// 금치산선고취소심판청구
export const 금치산선고취소심판청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "금치산선고취소심판청구", exampleValue: "금치산선고취소심판청구", colspan: 3 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "OOO (주민등록번호)", exampleValue: "김철수 (800101-1******)", colspan: 3 }] },
  { fields: [{ label: "생년월일", isHeader: true }, { placeholder: "생년월일", exampleValue: "1980년 1월 1일", colspan: 3 }] },
  { fields: [{ label: "본적", isHeader: true }, { placeholder: "본적지", exampleValue: "서울시 강남구 OO동", colspan: 3 }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 123", colspan: 3 }] },
  { fields: [{ label: "전화", isHeader: true }, { placeholder: "전화번호", exampleValue: "010-1234-5678", colspan: 3 }] },
  { fields: [{ label: "사건본인", isHeader: true }, { placeholder: "OOO (주민등록번호)", exampleValue: "김영희 (850101-2******)", colspan: 3 }] },
  { fields: [{ label: "생년월일", isHeader: true }, { placeholder: "생년월일", exampleValue: "1985년 1월 1일", colspan: 3 }] },
  { fields: [{ label: "본적", isHeader: true }, { placeholder: "본적지", exampleValue: "서울시 강남구 OO동", colspan: 3 }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 456", colspan: 3 }] },
  { fields: [{ label: "전화", isHeader: true }, { placeholder: "전화번호", exampleValue: "010-9876-5432", colspan: 3 }] },
  { fields: [{ label: "청구취지", isHeader: true }, { placeholder: "청구 내용", exampleValue: "서울중앙지방법원이 2024년 3월 1일 선고한 2024느12345 사건본인 김영희에 대한 금치산선고는 이를 취소한다.\n라는 심판을 구함.", colspan: 3 }] },
  { fields: [{ label: "청구원인", isHeader: true }, { placeholder: "청구 이유", exampleValue: "1. 청구인은 사건본인 김영희의 배우자이고, 청구인은 사건본인을 심신상실자로 금치산선고를 구하여 2024. 3. 1. 서울중앙지방법원 2024느12345호로 금치산선고를 받았습니다.\n\n2. 그 후 사건본인을 OO병원에 입원시켜 치료를 하였던 바, 정신상태가 회복되어 정상적인 사회생활을 영위하는데 아무런 불편이 없습니다.\n\n3. 따라서 OO병원 의사의 진단서를 첨부하여 사건본인에 대한 금치산선고의 취소를 구하고자 이건 청구에 이르렀습니다.", colspan: 3 }] },
  { fields: [{ label: "첨부서류", isHeader: true }, { placeholder: "첨부 서류 목록", exampleValue: "1. 청구인과 사건본인의 호적등본 각 1통\n2. 청구인과 사건본인의 주민등록등본 각 1통\n3. 금치산선고심판정본 1통\n4. 진단서 1통", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "OOOO. O. O.", exampleValue: "2026. 2. 5.", colspan: 3 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "OOO (인)", exampleValue: "위 청구인 김철수 (인)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "OO지방법원 OO지원 귀중", exampleValue: "서울중앙지방법원 귀중", colspan: 3 }] },
];

// 내용증명서_계약금반환청구
export const 내용증명서_계약금반환청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "내용증명서 (계약금 반환 청구)", exampleValue: "내용증명서 (계약금 반환 청구)", colspan: 3 }] },
  { fields: [{ label: "수신 주소", isHeader: true }, { placeholder: "주소", exampleValue: "OO시 OO구 OO동 123-45", colspan: 3 }] },
  { fields: [{ label: "수신 성명", isHeader: true }, { placeholder: "성명", exampleValue: "이OO", colspan: 3 }] },
  { fields: [{ label: "제목", isHeader: true }, { placeholder: "계약금 반환청구", exampleValue: "계약금 반환청구", colspan: 3 }] },
  { fields: [{ label: "청구금액", isHeader: true }, { placeholder: "OOO 원정(￦OOO)", exampleValue: "10,000,000원정 (￦10,000,000)", colspan: 3 }] },
  { fields: [{ label: "매매계약한 부동산의 표시", isHeader: true, colspan: 3 }] },
  { fields: [{ label: "소재지", isHeader: true }, { placeholder: "주소", exampleValue: "OO시 OO구 OO동 67-89", colspan: 2 }] },
  { fields: [{ label: "소유자", isHeader: true }, { placeholder: "소유자", exampleValue: "이OO" }, { label: "면적", isHeader: true }, { placeholder: "면적", exampleValue: "120㎡ (36평)" }] },
  { fields: [{ label: "위 부동산의 계약내용", isHeader: true, colspan: 3 }] },
  { fields: [{ label: "계약금", isHeader: true }, { placeholder: "금액 및 지급일", exampleValue: "10,000,000원정 2025년 12월 1일 (계약일에 지급한다.)", colspan: 2 }] },
  { fields: [{ label: "중도금", isHeader: true }, { placeholder: "금액 및 지급일", exampleValue: "20,000,000원정 2026년 1월 15일 지급키로 한다.", colspan: 2 }] },
  { fields: [{ label: "잔금", isHeader: true }, { placeholder: "금액 및 지급일", exampleValue: "70,000,000원정 2026년 2월 28일 지급키로 한다.", colspan: 2 }] },
  { fields: [{ placeholder: "계약 경위 및 하자 발생", exampleValue: "상기와 같이 계약을 체결하였으나 그 부동산에 하자가 발생하여 매매 당사자인 쌍방이 합의하에 계약금을 2026년 1월 31일까지 반환하여 주기로 지불각서까지 제출하고 금일 현재까지 반환하지 않고 있음.", colspan: 3 }] },
  { fields: [{ placeholder: "청구 내용", exampleValue: "귀하는 수차에 걸쳐 반환하여 준다는 약속을 하고도 반환하지 않은 것을 볼 때 저를 기만한 행위이며 그 부동산을 매매 당시부터 계획적으로 한 행위로 볼 수밖에 없습니다.\n\n만약 위 금액을 2026년 2월 15일까지 반환하지 않으면 손해배상청구소송을 취할 것이오니 이에 대한 어떠한 피해도 감수하시고 제반 비용등도 귀하의 계약위반으로 볼 수밖에 없으므로 계약금액의 배액을 배상하여 주시기 바랍니다.", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "20OO년 O월 O일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "발신인 주소", isHeader: true }, { placeholder: "주소", exampleValue: "OO시 OO구 OO동 111-222", colspan: 3 }] },
  { fields: [{ label: "발신인 성명", isHeader: true }, { placeholder: "성명", exampleValue: "김OO", colspan: 3 }] },
  { fields: [{ label: "수신인", isHeader: true }, { placeholder: "OOO 귀하", exampleValue: "이OO 귀하", colspan: 3 }] },
];

// 내용증명서_전세금반환청구01
export const 내용증명서_전세금반환청구01_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "내용증명", exampleValue: "내용증명", colspan: 3 }] },
  { fields: [{ label: "수신", isHeader: true }, { placeholder: "OOO", exampleValue: "이OO", colspan: 3 }] },
  { fields: [{ label: "수신 주소", isHeader: true }, { placeholder: "주소", exampleValue: "OO시 OO구 OO동 123-45", colspan: 3 }] },
  { fields: [{ label: "제목", isHeader: true }, { placeholder: "전세금 반환 청구 건", exampleValue: "전세금 반환 청구 건", colspan: 3 }] },
  { fields: [{ label: "내용", isHeader: true, colspan: 3 }] },
  { fields: [{ placeholder: "인사 및 임차 정보", exampleValue: "1. 귀하의 가정에 평안하심을 기원합니다. 다름이 아니라 본인은 귀하 소유의 OO시 OO구 OO동 123번지 소재 가옥 2층 60㎡를 임차하여 거주하다가 임대기간이 만료하여 귀하에게 본 가옥을 명도하여 주었으나 3개월이 지난 현재까지 임차보증금을 반환하지 않아 이에 보증금의 지급을 받고자 이에 통고하는 바입니다.", colspan: 3 }] },
  { fields: [{ placeholder: "반환 요구", exampleValue: "2. 따라서 2026. 2. 28.까지 미반환보증금 금 50,000,000원을 변제해 주시기를 바랍니다. 만약 위 기간을 어길 경우에는 강제집행 등 법적 조치를 취함을 알려드리오니 이를 이행하여 주시기 바랍니다.", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "20OO. O. O.", exampleValue: "2026. 2. 5.", colspan: 3 }] },
  { fields: [{ label: "발신", isHeader: true }, { placeholder: "OOO (인)", exampleValue: "김OO (인)", colspan: 3 }] },
  { fields: [{ label: "발신 주소", isHeader: true }, { placeholder: "주소", exampleValue: "OO시 OO구 OO동 456-78", colspan: 3 }] },
  { fields: [{ label: "전화번호", isHeader: true }, { placeholder: "전화", exampleValue: "010-1234-5678", colspan: 3 }] },
];

// 내용증명서_전세금반환청구02
export const 내용증명서_전세금반환청구02_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "내용증명서", exampleValue: "내용증명서", colspan: 3 }] },
  { fields: [{ label: "수신", isHeader: true }, { placeholder: "OOO", exampleValue: "이OO", colspan: 3 }] },
  { fields: [{ label: "수신 주소", isHeader: true }, { placeholder: "주소", exampleValue: "OO시 OO구 OO동 123번지", colspan: 3 }] },
  { fields: [{ label: "발신", isHeader: true }, { placeholder: "OOO", exampleValue: "김OO", colspan: 3 }] },
  { fields: [{ label: "발신 주소", isHeader: true }, { placeholder: "주소", exampleValue: "OO시 OO구 OO동 456번지", colspan: 3 }] },
  { fields: [{ label: "제목", isHeader: true }, { placeholder: "전세금 반환청구에 대한 내용증명", exampleValue: "전세금 반환청구에 대한 내용증명", colspan: 3 }] },
  { fields: [{ placeholder: "계약 정보 및 통보 내역", exampleValue: "본 임차인은 임대인과 함께 2024년 3월 1일부터 2026년 3월 1일까지 24개월 간의 임대차 계약을 체결하고 아래 다음 내용에 대하여 임대인에게 임대차 계약해지를 2개월 전부터 전화 및 구두로 통보한 바 있으며, 수 차례에 걸쳐 무료일간지 게재 및 벽보부착을 하였으며, 임대차 계약완료 1개월 전부터 다시 계약완료를 통보하였습니다.", colspan: 3 }] },
  { fields: [{ placeholder: "반환 약속 불이행", exampleValue: "임대계약완료 전날인 2026년 2월 28일에 임대인이 2026년 3월 15일까지 전세금 전액을 반환해 준다고 하였으나, 그 약속 기일이 지났음에도 불구하고 전세금을 반환하지 않고 있습니다. 이에 본 임차인은 2026년 3월 1일로 임대차 계약이 완료된 것을 다시 한 번 통보해 드리며 임대인이 본 임차인에게 반환해야하는 전세금은 일금 5천만원입니다.", colspan: 3 }] },
  { fields: [{ placeholder: "최종 통보", exampleValue: "그러므로 본 서면이 도달된 후 즉시 전세금을 반환해 주시기 바라며, 만약 2026년 4월 1일까지 전세금을 지불하지 아니하면 향후 별도의 통지없이 법적인 절차를 취할 목적으로 내용증명을 발송하였으니 이점 양지해 주시기 바랍니다.", colspan: 3 }] },
  { fields: [{ label: "다음", isHeader: true, colspan: 3 }] },
  { fields: [{ label: "임대가옥", isHeader: true }, { placeholder: "주소 및 면적", exampleValue: "OO시 OO구 123번지 2층 독채 (20평)", colspan: 2 }] },
  { fields: [{ label: "전세금", isHeader: true }, { placeholder: "금액", exampleValue: "50,000,000원 (오천만원)", colspan: 2 }] },
  { fields: [{ label: "임대기간", isHeader: true }, { placeholder: "기간", exampleValue: "2024년 3월 1일부터 2026년 3월 1일 (24개월)", colspan: 2 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "20OO년 O월 O일", exampleValue: "2026년 3월 20일", colspan: 3 }] },
  { fields: [{ label: "위 발송인", isHeader: true }, { placeholder: "OOO (인)", exampleValue: "김OO (인)", colspan: 3 }] },
];

// 기성고청구내역서
export const 기성고청구내역서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "기성고 청구 내역서", exampleValue: "기성고 청구 내역서", colspan: 3 }] },
  { fields: [{ label: "공사명", isHeader: true }, { placeholder: "공사명", exampleValue: "OO아파트 신축공사", colspan: 3 }] },
  { fields: [{ label: "번호", isHeader: true }, { label: "품명", isHeader: true }, { label: "규격", isHeader: true }, { label: "단위", isHeader: true }] },
  { fields: [{ label: "계약 내역", isHeader: true }, { label: "전회 기성", isHeader: true }, { label: "금회 기성", isHeader: true }, { label: "기성 누계", isHeader: true }] },
  { fields: [{ placeholder: "1", exampleValue: "1" }, { placeholder: "품명", exampleValue: "철근콘크리트공사" }, { placeholder: "규격", exampleValue: "24MPa" }, { placeholder: "단위", exampleValue: "㎥" }] },
  { fields: [{ placeholder: "수량/금액", exampleValue: "수량: 1,000㎥\n금액: 500,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 600㎥\n금액: 300,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 200㎥\n금액: 100,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 800㎥\n금액: 400,000,000원" }] },
  { fields: [{ placeholder: "2", exampleValue: "2" }, { placeholder: "품명", exampleValue: "거푸집공사" }, { placeholder: "규격", exampleValue: "합판" }, { placeholder: "단위", exampleValue: "㎡" }] },
  { fields: [{ placeholder: "수량/금액", exampleValue: "수량: 5,000㎡\n금액: 250,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 3,000㎡\n금액: 150,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 1,000㎡\n금액: 50,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 4,000㎡\n금액: 200,000,000원" }] },
  { fields: [{ placeholder: "3", exampleValue: "3" }, { placeholder: "품명", exampleValue: "철골공사" }, { placeholder: "규격", exampleValue: "H형강" }, { placeholder: "단위", exampleValue: "톤" }] },
  { fields: [{ placeholder: "수량/금액", exampleValue: "수량: 100톤\n금액: 150,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 50톤\n금액: 75,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 30톤\n금액: 45,000,000원" }, { placeholder: "수량/금액", exampleValue: "수량: 80톤\n금액: 120,000,000원" }] },
  { fields: [{ label: "합계", isHeader: true }, { placeholder: "계약 합계", exampleValue: "900,000,000원", colspan: 3 }] },
  { fields: [{ label: "금회 청구금액", isHeader: true }, { placeholder: "청구 금액", exampleValue: "195,000,000원 (일억구천오백만원)", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "시공사", isHeader: true }, { placeholder: "회사명 및 대표자", exampleValue: "(주)OO건설 대표이사 김OO (인)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "발주처", exampleValue: "(주)OO개발 귀중", colspan: 3 }] },
];

// 농산물매매계약불이행손해배상청구
export const 농산물매매계약불이행손해배상청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "농작물 매매계약 불이행에 따른 손해배상 청구", exampleValue: "농작물 매매계약 불이행에 따른 손해배상 청구", colspan: 3 }] },
  { fields: [{ placeholder: "계약 내용", exampleValue: "본인은 귀하와 2025년 5월 1일에 충청남도 서산시 대산읍 123번지 밭 1,000평에 식재된 농작물(고구마)에 대하여 일금 50,000,000원에 포전매매계약을 체결하였습니다.", colspan: 3 }] },
  { fields: [{ placeholder: "계약 불이행 사실", exampleValue: "그러나 귀하는 약정기일인 2025년 10월 31일까지 매매대금을 지급하지 않았고 농작물도 수거해 가지 않았으며 또한 본인이 추가적으로 제시한 2025년 11월 15일까지도 농작물을 수거해 가지 않아 본인은 2025년 11월 20일 내용증명우편으로 귀하와의 농작물 매매계약을 해제하였습니다.", colspan: 3 }] },
  { fields: [{ placeholder: "손해배상 청구", exampleValue: "따라서 귀하의 계약위반에 따른 본인의 손해에 대하여 아래와 같이 그 배상을 청구합니다.", colspan: 3 }] },
  { fields: [{ label: "아래", isHeader: true, colspan: 3 }] },
  { fields: [{ label: "구분", isHeader: true }, { label: "금액", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "계약금액(㉮)", exampleValue: "계약금액(㉮)" }, { placeholder: "50,000,000원", exampleValue: "50,000,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "농작물처분금액(㉯)", exampleValue: "농작물 처분이익 - 농작물처분금액(㉯)" }, { placeholder: "30,000,000원", exampleValue: "30,000,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "처분비용(㉰)", exampleValue: "처분에 소요된 금액(㉰) (인건비, 운송비 등)" }, { placeholder: "5,000,000원", exampleValue: "5,000,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "소계(㉱)", exampleValue: "소계(㉱=㉯-㉰)" }, { placeholder: "25,000,000원", exampleValue: "25,000,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "손해배상청구금액(㉮-㉱)", isHeader: true }, { placeholder: "청구금액", exampleValue: "25,000,000원", colspan: 2 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "매도인 주소", isHeader: true }, { placeholder: "주소", exampleValue: "충청남도 서산시 대산읍 123번지", colspan: 3 }] },
  { fields: [{ label: "매도인 성명", isHeader: true }, { placeholder: "성명 (인)", exampleValue: "김OO (인)", colspan: 3 }] },
  { fields: [{ label: "매수인 주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 456", colspan: 3 }] },
  { fields: [{ label: "매수인", isHeader: true }, { placeholder: "성명 귀하", exampleValue: "이OO 귀하", colspan: 3 }] },
];

// 농산물매수청구
export const 농산물매수청구_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "농산물 매수 청구", exampleValue: "농산물 매수 청구", colspan: 3 }] },
  { fields: [{ placeholder: "계약 내용", exampleValue: "본인은 귀하와 2025년 5월 1일에 충청남도 서산시 대산읍 123번지 밭 1,000평에 식재된 농산물(고구마)에 대하여 수확기에 전량 수매하기로 약정을 하였습니다.", colspan: 3 }] },
  { fields: [{ placeholder: "매수 청구 거절 사실", exampleValue: "이에 본인은 위 농산물을 수확·포장하여 2025년 10월 15일 당초 약정한 장소에 운반하여 매수를 청구하였으나 귀하께서는 농산물의 품질이 나쁘다며 이를 거절하였습니다.", colspan: 3 }] },
  { fields: [{ placeholder: "농산물 품질 설명", exampleValue: "그러나 본인이 매수 청구한 농산물은 계약내용에 따라 엄격히 선별한 것으로 규격이나 품질면에서 전혀 하자가 없는 것입니다.", colspan: 3 }] },
  { fields: [{ placeholder: "재청구 및 경고", exampleValue: "따라서 2026년 2월 10일 본인은 다시 한번 농산물을 약정된 장소로 운반할 것이니 이번에는 틀림없이 매수하여 주시기 바랍니다.\n\n만약 그때에도 매수를 거절한다면 본인은 즉시 계약을 해제한 후 손해배상을 청구하겠습니다.", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "청구인 주소", isHeader: true }, { placeholder: "주소", exampleValue: "충청남도 서산시 대산읍 123번지", colspan: 3 }] },
  { fields: [{ label: "청구인 성명", isHeader: true }, { placeholder: "성명 (인)", exampleValue: "김OO (인)", colspan: 3 }] },
  { fields: [{ label: "피청구인 주소", isHeader: true }, { placeholder: "주소", exampleValue: "서울시 강남구 테헤란로 456", colspan: 3 }] },
  { fields: [{ label: "피청구인", isHeader: true }, { placeholder: "성명 귀하", exampleValue: "이OO 귀하", colspan: 3 }] },
];

// 물품구입제작청구서
export const 물품구입제작청구서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "물품 구입/제작 청구서", exampleValue: "물품 구입/제작 청구서", colspan: 3 }] },
  { fields: [{ label: "결재", isHeader: true }, { label: "재", isHeader: true }, { label: "계", isHeader: true }] },
  { fields: [{ label: "접수일자", isHeader: true }, { placeholder: "년. 월. 일.", exampleValue: "2026. 2. 5.", colspan: 3 }] },
  { fields: [{ label: "품명", isHeader: true }, { label: "규격", isHeader: true }, { label: "수량", isHeader: true }, { label: "추정단가", isHeader: true }, { label: "추정금액", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "품명", exampleValue: "노트북" }, { placeholder: "규격", exampleValue: "15인치, i7, 16GB" }, { placeholder: "수량", exampleValue: "5대" }, { placeholder: "단가", exampleValue: "1,500,000원" }, { placeholder: "금액", exampleValue: "7,500,000원" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "품명", exampleValue: "프린터" }, { placeholder: "규격", exampleValue: "레이저, 컬러" }, { placeholder: "수량", exampleValue: "2대" }, { placeholder: "단가", exampleValue: "800,000원" }, { placeholder: "금액", exampleValue: "1,600,000원" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "품명", exampleValue: "사무용 책상" }, { placeholder: "규격", exampleValue: "1200×700" }, { placeholder: "수량", exampleValue: "10개" }, { placeholder: "단가", exampleValue: "300,000원" }, { placeholder: "금액", exampleValue: "3,000,000원" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ label: "합계", isHeader: true }, { placeholder: "총 금액", exampleValue: "12,100,000원", colspan: 5 }] },
  { fields: [{ label: "청구부서", isHeader: true }, { placeholder: "부서명", exampleValue: "총무부", colspan: 5 }] },
  { fields: [{ label: "대학/학과", isHeader: true }, { placeholder: "소속", exampleValue: "OO대학 경영학과", colspan: 2 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "청구인 (인)", exampleValue: "김OO (인)", colspan: 2 }] },
  { fields: [{ label: "확정 실시 내용", isHeader: true, colspan: 6 }] },
  { fields: [{ label: "품명", isHeader: true }, { label: "종수", isHeader: true }, { label: "접수", isHeader: true }, { label: "집행금액", isHeader: true }, { label: "확인", isHeader: true }] },
  { fields: [{ placeholder: "예산현황", exampleValue: "예산현황: 세항/목/세목/변경사항", colspan: 5 }] },
  { fields: [{ label: "예산액", isHeader: true }, { label: "금일까지 집행액", isHeader: true }, { label: "예산 잔액", isHeader: true }, { placeholder: "", colspan: 2 }] },
];

// 사무용품청구량
export const 사무용품청구량_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "사무용품 청구량", exampleValue: "사무용품 청구량", colspan: 3 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "OOOO년 OO월 OO일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "NO", isHeader: true }, { label: "품명", isHeader: true }, { label: "규격", isHeader: true }, { label: "수량", isHeader: true }, { label: "단위", isHeader: true }, { label: "단가", isHeader: true }, { label: "금액", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "1", exampleValue: "1" }, { placeholder: "볼펜", exampleValue: "볼펜" }, { placeholder: "0.5mm 흑색", exampleValue: "0.5mm 흑색" }, { placeholder: "100", exampleValue: "100" }, { placeholder: "개", exampleValue: "개" }, { placeholder: "500원", exampleValue: "500원" }, { placeholder: "50,000원", exampleValue: "50,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "2", exampleValue: "2" }, { placeholder: "A4 용지", exampleValue: "A4 용지" }, { placeholder: "80g 백색", exampleValue: "80g 백색" }, { placeholder: "50", exampleValue: "50" }, { placeholder: "박스", exampleValue: "박스" }, { placeholder: "15,000원", exampleValue: "15,000원" }, { placeholder: "750,000원", exampleValue: "750,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "3", exampleValue: "3" }, { placeholder: "포스트잇", exampleValue: "포스트잇" }, { placeholder: "3×3", exampleValue: "3×3" }, { placeholder: "200", exampleValue: "200" }, { placeholder: "개", exampleValue: "개" }, { placeholder: "1,000원", exampleValue: "1,000원" }, { placeholder: "200,000원", exampleValue: "200,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "4", exampleValue: "4" }, { placeholder: "클립", exampleValue: "클립" }, { placeholder: "대형", exampleValue: "대형" }, { placeholder: "50", exampleValue: "50" }, { placeholder: "박스", exampleValue: "박스" }, { placeholder: "3,000원", exampleValue: "3,000원" }, { placeholder: "150,000원", exampleValue: "150,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "5", exampleValue: "5" }, { placeholder: "파일", exampleValue: "파일" }, { placeholder: "A4 2공", exampleValue: "A4 2공" }, { placeholder: "100", exampleValue: "100" }, { placeholder: "개", exampleValue: "개" }, { placeholder: "2,000원", exampleValue: "2,000원" }, { placeholder: "200,000원", exampleValue: "200,000원" }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ label: "합계", isHeader: true }, { placeholder: "총 금액", exampleValue: "1,350,000원", colspan: 7 }] },
  { fields: [{ label: "결재", isHeader: true, colspan: 8 }] },
  { fields: [{ label: "담당", isHeader: true }, { label: "부장", isHeader: true }, { label: "이사", isHeader: true }, { label: "사장", isHeader: true }, { placeholder: "", colspan: 4 }] },
];

// 사무용품소모품청구의뢰서
export const 사무용품소모품청구의뢰서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "사무용품/소모품 청구의뢰서", exampleValue: "사무용품/소모품 청구의뢰서", colspan: 3 }] },
  { fields: [{ label: "청구부서", isHeader: true }, { placeholder: "부서명", exampleValue: "총무부" }, { label: "부서장확인", isHeader: true }, { placeholder: "확인 (인)", exampleValue: "확인 (인)" }] },
  { fields: [{ label: "결재", isHeader: true }, { label: "계", isHeader: true }, { label: "과장", isHeader: true }, { label: "차장", isHeader: true }, { label: "부장", isHeader: true }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 5일", colspan: 4 }] },
  { fields: [{ label: "품명", isHeader: true }, { label: "규격", isHeader: true }, { label: "단위", isHeader: true }, { label: "수량", isHeader: true }, { label: "비고", isHeader: true }] },
  { fields: [{ placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }, { placeholder: "", exampleValue: "" }, { label: "청구", isHeader: true }, { label: "불출", isHeader: true }, { placeholder: "", exampleValue: "" }] },
  { fields: [{ placeholder: "품명", exampleValue: "볼펜" }, { placeholder: "규격", exampleValue: "0.5mm 흑색" }, { placeholder: "단위", exampleValue: "개" }, { placeholder: "청구", exampleValue: "100" }, { placeholder: "불출", exampleValue: "100" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "품명", exampleValue: "A4 용지" }, { placeholder: "규격", exampleValue: "80g 백색" }, { placeholder: "단위", exampleValue: "박스" }, { placeholder: "청구", exampleValue: "50" }, { placeholder: "불출", exampleValue: "50" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "품명", exampleValue: "포스트잇" }, { placeholder: "규격", exampleValue: "3×3" }, { placeholder: "단위", exampleValue: "개" }, { placeholder: "청구", exampleValue: "200" }, { placeholder: "불출", exampleValue: "200" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "품명", exampleValue: "클립" }, { placeholder: "규격", exampleValue: "대형" }, { placeholder: "단위", exampleValue: "박스" }, { placeholder: "청구", exampleValue: "30" }, { placeholder: "불출", exampleValue: "30" }, { placeholder: "비고", exampleValue: "" }] },
  { fields: [{ placeholder: "품명", exampleValue: "파일" }, { placeholder: "규격", exampleValue: "A4 2공" }, { placeholder: "단위", exampleValue: "개" }, { placeholder: "청구", exampleValue: "100" }, { placeholder: "불출", exampleValue: "100" }, { placeholder: "비고", exampleValue: "" }] },
];

// 사망조위금청구서
export const 사망조위금청구서_DATA: FormRow[] = [
  { fields: [{ label: "문서 제목", isHeader: true }, { placeholder: "사망조위금청구서", exampleValue: "사망조위금청구서", colspan: 2 }, { label: "처리기간", isHeader: true }, { placeholder: "14일", exampleValue: "14일" }] },
  { fields: [{ label: "청구인 기재란", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "성명", exampleValue: "김철수" }, { label: "주민등록번호", isHeader: true }, { placeholder: "주민등록번호", exampleValue: "800101-1******" }] },
  { fields: [{ label: "주소", isHeader: true }, { placeholder: "주소 (우편번호)", exampleValue: "(12345) 서울시 강남구 테헤란로 123", colspan: 2 }] },
  { fields: [{ label: "전화번호", isHeader: true }, { placeholder: "전화", exampleValue: "(02) 1234-5678", colspan: 2 }] },
  { fields: [{ label: "급여수령 금융기관", isHeader: true }, { placeholder: "은행", exampleValue: "국민은행" }, { label: "계좌번호", isHeader: true }, { placeholder: "계좌번호", exampleValue: "123-456-78901234" }] },
  { fields: [{ label: "사망자와의 관계", isHeader: true }, { placeholder: "관계", exampleValue: "사망자의 (자녀)", colspan: 2 }] },
  { fields: [{ label: "사망자 정보", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "성명", isHeader: true }, { placeholder: "성명", exampleValue: "김OO" }, { label: "주민등록번호", isHeader: true }, { placeholder: "주민등록번호", exampleValue: "550101-1******" }] },
  { fields: [{ label: "사망연월일", isHeader: true }, { placeholder: "년. 월. 일.", exampleValue: "2025. 12. 31.", colspan: 2 }] },
  { fields: [{ label: "연금취급기관 기재란", isHeader: true, colspan: 4 }] },
  { fields: [{ label: "공무원 성명", isHeader: true }, { placeholder: "성명", exampleValue: "김OO" }, { label: "임용연월일", isHeader: true }, { placeholder: "년. 월. 일.", exampleValue: "1980. 3. 1." }] },
  { fields: [{ label: "사망당시 직급 호봉", isHeader: true }, { placeholder: "직급 호봉", exampleValue: "5급 30호봉" }, { label: "기여금기호", isHeader: true }, { placeholder: "기호", exampleValue: "123456" }] },
  { fields: [{ label: "사망당시 보수월액", isHeader: true }, { placeholder: "금액", exampleValue: "5,000,000원" }, { label: "연금취급기관명(기관기호)", isHeader: true }, { placeholder: "기관명 (기호)", exampleValue: "OO시청 (654321)" }] },
  { fields: [{ label: "재원부담 회계", isHeader: true }, { placeholder: "회계", exampleValue: "☑ 총무처일반회계  □ 통신사업특별회계  □ 철도사업특별회계\n□ 지방(교육)자치단체", colspan: 3 }] },
  { fields: [{ placeholder: "청구 취지", exampleValue: "공무원연금법시행령 제36조의2 제4항의 규정에 의하여 위와 같이 청구합니다.", colspan: 4 }] },
  { fields: [{ label: "작성일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 5일", colspan: 3 }] },
  { fields: [{ label: "청구인", isHeader: true }, { placeholder: "서명 또는 인", exampleValue: "김철수 (인)", colspan: 3 }] },
  { fields: [{ label: "제출처", isHeader: true }, { placeholder: "(연금취급기관장) 귀하", exampleValue: "공무원연금관리공단 (연금취급기관장) 귀하", colspan: 3 }] },
  { fields: [{ label: "첨부서류", isHeader: true }, { placeholder: "첨부 서류 목록", exampleValue: "1. 사망자의 호적등본 또는 제적등본 (사망사실 및 청구인과의 관계가 나타나야 하며, 사망정리가 되어 있지 않은 경우에는 주민등록말소자등본 또는 사망진단서 별도 첨부) 1부\n2. 청구인의 주민등록등본 (부양사실의 확인을 요하는 경우에 한함) 1부\n3. 청구인의 실명확인통장 사본 (국가공무원의 경우에 한함) 1부", colspan: 3 }] },
  { fields: [{ placeholder: "확인 및 이송", exampleValue: "위 사실을 확인하여 이송합니다.", colspan: 4 }] },
  { fields: [{ label: "확인일", isHeader: true }, { placeholder: "년 월 일", exampleValue: "2026년 2월 10일", colspan: 3 }] },
  { fields: [{ label: "확인자", isHeader: true }, { placeholder: "(연금취급기관장) 직인", exampleValue: "(연금취급기관장) 직인", colspan: 3 }] },
  { fields: [{ label: "최종 제출처", isHeader: true }, { placeholder: "공무원연금관리공단 이사장 귀하", exampleValue: "공무원연금관리공단 이사장 귀하", colspan: 3 }] },
];

// 20. 재해부조금청구서
export const 재해부조금청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "재해부조금 청구서", colspan: 8, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "처리기간" },
      { label: "7일", colspan: 7 }
    ]
  },
  {
    fields: [
      { label: "청구인", rowspan: 9 },
      { label: "성명" },
      { placeholder: "성명 입력", colspan: 2, exampleValue: "홍길동" },
      { label: "주민등록번호" },
      { placeholder: "주민등록번호 입력", colspan: 3, exampleValue: "800101-1234567" }
    ]
  },
  {
    fields: [
      { label: "주소" },
      { placeholder: "주소 입력", colspan: 6, exampleValue: "서울특별시 종로구 세종대로 209" }
    ]
  },
  {
    fields: [
      { label: "전화" },
      { placeholder: "전화번호 입력", colspan: 2, exampleValue: "02-1234-5678" },
      { label: "직급 및 호봉" },
      { placeholder: "직급 및 호봉 입력", colspan: 3, exampleValue: "7급 15호봉" }
    ]
  },
  {
    fields: [
      { label: "연금취급기관" },
      { placeholder: "연금취급기관 입력", colspan: 6, exampleValue: "공무원연금공단" }
    ]
  },
  {
    fields: [
      { label: "급여수령금융기관" },
      { placeholder: "금융기관명 입력", colspan: 2, exampleValue: "국민은행" },
      { label: "계좌번호" },
      { placeholder: "계좌번호 입력", colspan: 3, exampleValue: "123456-78-901234" }
    ]
  },
  {
    fields: [
      { label: "재원부담회계" },
      { placeholder: "재원부담회계 입력", colspan: 6, exampleValue: "일반회계" }
    ]
  },
  {
    fields: [
      { label: "주택소유자" },
      { placeholder: "주택소유자명 입력", colspan: 2, exampleValue: "홍길동" },
      { label: "공무원과의 관계" },
      { placeholder: "관계 입력", colspan: 3, exampleValue: "본인" }
    ]
  },
  {
    fields: [
      { label: "재해발생일" },
      { placeholder: "재해발생일 입력", colspan: 6, exampleValue: "2026년 1월 15일" }
    ]
  },
  {
    fields: [
      { label: "주택소재지" },
      { placeholder: "주택소재지 입력", colspan: 6, exampleValue: "서울특별시 종로구 세종대로 209" }
    ]
  },
  {
    fields: [
      { label: "재해내용", rowspan: 3 },
      { label: "주택총면적" },
      { placeholder: "총면적 입력", exampleValue: "85㎡" },
      { label: "재해면적" },
      { placeholder: "재해면적 입력", colspan: 4, exampleValue: "50㎡" }
    ]
  },
  {
    fields: [
      { label: "재해종류" },
      { label: "□ 화재  □ 홍수  □ 호우  □ 설해  □ 풍해  □ 해일  □ 기타(     )  □ 고의", colspan: 6, exampleValue: "☑ 화재" }
    ]
  },
  {
    fields: [
      { label: "재해정도" },
      { label: "□ 완전소실  □ ½이상  □ ⅓이상", colspan: 6, exampleValue: "☑ ½이상" }
    ]
  },
  {
    fields: [
      { label: "청구취지", colspan: 8 }
    ]
  },
  {
    fields: [
      { placeholder: "청구취지 입력", colspan: 8, exampleValue: "「공무원 재해보상법」 제31조 및 같은 법 시행령 제43조에 따라 재해부조금을 위와 같이 청구합니다." }
    ]
  },
  {
    fields: [
      { label: "년     월     일", colspan: 8 }
    ]
  },
  {
    fields: [
      { label: "청구인", colspan: 2 },
      { placeholder: "청구인명 입력", colspan: 6, exampleValue: "홍길동 (인)" }
    ]
  },
  {
    fields: [
      { placeholder: "제출처 입력", colspan: 8, exampleValue: "○○○ 귀하" }
    ]
  },
  {
    fields: [
      { label: "첨부서류", colspan: 8 }
    ]
  },
  {
    fields: [
      { label: "1. 재해사실을 증명하는 서류 1부", colspan: 8 }
    ]
  },
  {
    fields: [
      { label: "2. 주택(대지)등기부등본 1부", colspan: 8 }
    ]
  },
  {
    fields: [
      { label: "확인 및 이송", colspan: 8, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "위 청구내용에 대하여 확인함.", colspan: 8 }
    ]
  },
  {
    fields: [
      { label: "년     월     일", colspan: 8 }
    ]
  },
  {
    fields: [
      { label: "확인자", colspan: 2 },
      { placeholder: "확인자 직위 및 성명", colspan: 6, exampleValue: "○○과장  ○○○  (인)" }
    ]
  }
];

// 21. 사용중지청구서
export const 사용중지청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "사용중지 청구서", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "청구 내용 입력", colspan: 4, exampleValue: "본인이 귀하에게 임대중인 ○○시 ○○구 ○○동 ○○번지 소재 철근 콘크리트조 건평 ○○평의 건물은 당초 주거용으로만 사용한다는 조건으로 임대차 계약을 체결하였음을 귀하께서도 잘 알고 있을 것입니다.\n\n그러나 귀하께서는 본인도 모르는 사이에 동 건물에 스텐드 바를 설비하여 유흥음식점으로 사용을 하고 있습니다. 위와 같은 귀하의 행위는 명백히 계약 위반일 뿐만 아니라 동 건물이 주택가 한복판에 위치하고 있는 관계로 심야에 발생하는 밴드 음악이 매우 시끄러워 주위의 주민들로부터 소음을 제거해 달라는 진정이 끊이지 않고 있습니다.\n\n그러므로 귀하께서는 스탠드바 영업을 즉시 중지하시고 본래 계약 내용대로 주거용으로만 사용할 것을 요구합니다." }
    ]
  },
  {
    fields: [
      { label: "년     월     일", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "주소", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "청구인", colspan: 1 },
      { placeholder: "청구인명 입력", colspan: 3, exampleValue: "○○○ (인)" }
    ]
  },
  {
    fields: [
      { label: "주소", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "피청구인", colspan: 1 },
      { placeholder: "피청구인명 입력", colspan: 3, exampleValue: "○○○ 귀하" }
    ]
  }
];

// 22. 상속승인기간연장허가청구서
export const 상속승인기간연장허가청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "상속승인 기간 연장허가 청구", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "청구인", colspan: 1 },
      { placeholder: "성명 입력", exampleValue: "O O O" },
      { placeholder: "생년월일 입력", colspan: 2, exampleValue: "20OO년 O월 O일생" }
    ]
  },
  {
    fields: [
      { label: "본적" },
      { placeholder: "본적 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "주소" },
      { placeholder: "주소 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "피상속인", colspan: 1 },
      { placeholder: "성명 입력", exampleValue: "O O O" },
      { placeholder: "생년월일 입력", colspan: 2, exampleValue: "20OO년 O월 O일생" }
    ]
  },
  {
    fields: [
      { label: "본적" },
      { placeholder: "본적 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "주소" },
      { placeholder: "주소 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "청구취지", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "청구취지 입력", colspan: 4, exampleValue: "청구인의 재산상속승인기간을 20OO년 O월 O일까지 2개월간 연장한다.\n라는 심판을 구함." }
    ]
  },
  {
    fields: [
      { label: "청구원인", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "청구원인 입력", colspan: 4, exampleValue: "청구인은 피상속인의 자이고 피상속인은 20OO년 O월 O일 사망으로 상속이 개시되었으나 상속재산이 여러 곳에 산재되어 있을 뿐만 아니라 승계할 채무액도 상속액에 달하여 접수중에 있는데, 민법 제1020조 소정의 3개월내에 승인여부를 판단할 수 없으므로 청구취지와 같은 심판을 구하는 바입니다." }
    ]
  },
  {
    fields: [
      { label: "첨부서류", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "1. 호적등본 및 제적등본  각1통", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "2. 주민등록표등본  2통", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "년     월     일", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "청구인", colspan: 1 },
      { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O (인)" }
    ]
  },
  {
    fields: [
      { placeholder: "제출처 입력", colspan: 4, exampleValue: "OO가정법원 귀중" }
    ]
  }
];

// 24. 심판청구취하서
export const 심판청구취하서_DATA: FormRow[] = [
  {
    fields: [
      { label: "심판청구취하서", colspan: 6, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "서류명" },
      { label: "심판청구취하서", colspan: 5 }
    ]
  },
  {
    fields: [
      { label: "권리구분" },
      { placeholder: "권리구분 입력", colspan: 5, exampleValue: "특허(실용신안등록, 의장등록, 상표등록)" }
    ]
  },
  {
    fields: [
      { label: "수신처" },
      { label: "특허심판원장", colspan: 5 }
    ]
  },
  {
    fields: [
      { label: "제출일자" },
      { placeholder: "제출일자 입력", colspan: 5, exampleValue: "2026년 2월 5일" }
    ]
  },
  {
    fields: [
      { label: "취하인", colspan: 6, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "성명(명칭)" },
      { placeholder: "성명 입력", colspan: 5, exampleValue: "홍길동" }
    ]
  },
  {
    fields: [
      { label: "출원인코드" },
      { placeholder: "코드 입력", colspan: 2, exampleValue: "1234567890" },
      { label: "주민등록번호" },
      { placeholder: "주민번호 입력", colspan: 2, exampleValue: "800101-1234567" }
    ]
  },
  {
    fields: [
      { label: "전화번호" },
      { placeholder: "전화번호 입력", colspan: 2, exampleValue: "02-1234-5678" },
      { label: "우편번호" },
      { placeholder: "우편번호 입력", colspan: 2, exampleValue: "03000" }
    ]
  },
  {
    fields: [
      { label: "주소" },
      { placeholder: "주소 입력", colspan: 5, exampleValue: "서울특별시 종로구 세종대로 209" }
    ]
  },
  {
    fields: [
      { label: "대리인", colspan: 6, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "성명" },
      { placeholder: "대리인명 입력", colspan: 2, exampleValue: "김변호사" },
      { label: "대리인코드" },
      { placeholder: "코드 입력", colspan: 2, exampleValue: "9876543210" }
    ]
  },
  {
    fields: [
      { label: "포괄위임등록번호" },
      { placeholder: "등록번호 입력", colspan: 5, exampleValue: "2026-000001" }
    ]
  },
  {
    fields: [
      { label: "심판사건의 표시", colspan: 6, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "심판종류" },
      { placeholder: "심판종류 입력", colspan: 5, exampleValue: "거절사정불복심판" }
    ]
  },
  {
    fields: [
      { label: "심판번호" },
      { placeholder: "심판번호 입력", colspan: 5, exampleValue: "2026원0001" }
    ]
  },
  {
    fields: [
      { label: "발명(고안)의 명칭" },
      { placeholder: "명칭 입력", colspan: 5, exampleValue: "○○○ 장치 및 그 방법" }
    ]
  },
  {
    fields: [
      { label: "취하대상 청구항" },
      { placeholder: "청구항 입력", colspan: 5, exampleValue: "청구항 1, 2, 3" }
    ]
  },
  {
    fields: [
      { label: "취하의 이유", colspan: 6, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "취하 이유 입력", colspan: 6, exampleValue: "심판 청구 후 재검토 결과, 청구를 취하하고자 합니다." }
    ]
  },
  {
    fields: [
      { label: "취지", colspan: 6, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "취지 입력", colspan: 6, exampleValue: "특허법 제161조·실용신안법 제35조·의장법 제72조·상표법 제77조의 규정에 의하여 위와 같이 취하서를 제출합니다." }
    ]
  },
  {
    fields: [
      { label: "취하인(대리인)", colspan: 2 },
      { placeholder: "서명 또는 인", colspan: 4, exampleValue: "홍길동 (인)" }
    ]
  },
  {
    fields: [
      { label: "첨부서류", colspan: 6, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "1. 상대방의 동의가 필요한 경우 동의를 증명하는 서류 1통", colspan: 6 }
    ]
  },
  {
    fields: [
      { label: "2. 대리인에 의하여 절차를 밟는 경우 그 대리권을 증명하는 서류 1통", colspan: 6 }
    ]
  }
];

// 23. 상속인수색의공고청구서
export const 상속인수색의공고청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "상속인 수색의 공고 청구", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "청구인", colspan: 1 },
      { placeholder: "성명 입력", exampleValue: "O O O" },
      { placeholder: "생년월일 입력", colspan: 2, exampleValue: "20OO년 O월 O일생" }
    ]
  },
  {
    fields: [
      { label: "주소" },
      { placeholder: "주소 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "피상속인 망", colspan: 1 },
      { placeholder: "성명 입력", exampleValue: "O O O" },
      { placeholder: "생년월일 입력", colspan: 2, exampleValue: "20OO년 O월 O일생" }
    ]
  },
  {
    fields: [
      { label: "본적" },
      { placeholder: "본적 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "최후 주소" },
      { placeholder: "최후 주소 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "청구취지", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "청구취지 입력", colspan: 4, exampleValue: "피상속인에게 상속인이 있으면 일정한 기간내에 그 권리를 주장할 취지의 공고를 구함." }
    ]
  },
  {
    fields: [
      { label: "청구원인", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "청구원인 입력", colspan: 4, exampleValue: "위 청구인은 귀원 20OO.O.O. OO즈OOO 상속재산 관리인 선임사건에 관하여 20OO년 O월 O일 재산관리인으로 선임되어, 귀원에서 그 관리인선임의 공고를 하였으나 2월이내에 상속인이 있음이 분명치 않아서, 모든 상속채권자 및 수증자에 대하여 20OO년 O월 O일까지 청구신고를 하도록 공고하였으나 아직 상속인이 있음이 분명치 않아서 다시 상속인이 있으면 일정한 기간내에 그 권리를 주장할 취지의 공고를 구하기 위하여 이에 청구를 하는 바입니다." }
    ]
  },
  {
    fields: [
      { label: "첨부서류", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "1. 호적등본 1통", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "2. 재산관리인선임심판등본 1통", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "3. 상속권주장 최고공고서 1통", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "4. 납부서 1통", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "년     월     일", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "청구인", colspan: 1 },
      { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O (인)" }
    ]
  },
  {
    fields: [
      { placeholder: "제출처 입력", colspan: 4, exampleValue: "OO가정법원 귀중" }
    ]
  }
];

// 25. 약식명령에대한정식재판청구서
export const 약식명령에대한정식재판청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "정식재판 청구", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "사건" },
      { placeholder: "사건번호 입력", colspan: 3, exampleValue: "OO고약OOO" }
    ]
  },
  {
    fields: [
      { label: "피고인" },
      { placeholder: "피고인명 입력", colspan: 3, exampleValue: "O O O" }
    ]
  },
  {
    fields: [
      { placeholder: "청구 내용 입력", colspan: 4, exampleValue: "위 피고인에 대한 상해 피고사건에 관하여 20OO.O.O. 벌금 200,000원에 처한다는 약식명령을 송달받았는바, 동 명령에 불복하므로 정식재판을 청구합니다." }
    ]
  },
  {
    fields: [
      { label: "년     월     일", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "위 피고인", colspan: 1 },
      { placeholder: "피고인명 입력", colspan: 3, exampleValue: "O O O (인)" }
    ]
  },
  {
    fields: [
      { placeholder: "제출처 입력", colspan: 4, exampleValue: "OO지방법원 귀중" }
    ]
  }
];

// 26. 양육자지정및양육비심판청구서
export const 양육자지정및양육비심판청구서_DATA: FormRow[] = [
  {
    fields: [
      { label: "양육자 지정 및 양육비 심판청구서", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "청구인", colspan: 1 },
      { placeholder: "성명 입력", exampleValue: "O O O(OOO)" },
      { placeholder: "생년월일 입력", colspan: 2, exampleValue: "20OO년 O월 O일생" }
    ]
  },
  {
    fields: [
      { label: "본적" },
      { placeholder: "본적 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "주소" },
      { placeholder: "주소 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "피청구인", colspan: 1 },
      { placeholder: "성명 입력", exampleValue: "O O O(OOO)" },
      { placeholder: "생년월일 입력", colspan: 2, exampleValue: "20OO년 O월 O일생" }
    ]
  },
  {
    fields: [
      { label: "본적" },
      { placeholder: "본적 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "주소" },
      { placeholder: "주소 입력", colspan: 3, exampleValue: "서울특별시 종로구 세종대로 123" }
    ]
  },
  {
    fields: [
      { label: "사건본인", colspan: 1 },
      { placeholder: "성명 입력", exampleValue: "O O O(OOO)" },
      { placeholder: "생년월일 입력", colspan: 2, exampleValue: "20OO년 O월 O일생" }
    ]
  },
  {
    fields: [
      { label: "본적 및 주소" },
      { label: "피청구인의 본적 및 주소와 같다.", colspan: 3 }
    ]
  },
  {
    fields: [
      { label: "청구취지", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "청구취지 입력", colspan: 4, exampleValue: "1. 청구인을 사건본인(청구인과 피청구인의 자) OOO의 양육자로 지정한다.\n2. 피청구인은 청구인에게 사건본인을 인도하라.\n3. 피청구인은 청구인에게 위 인도시로부터 사건본인이 성년에 달할 때까지 월금 OOOOO원의 비율에 의한 금원을 매월 말일까지 지급하라.\n는 심판 및 가집행선고를 구합니다." }
    ]
  },
  {
    fields: [
      { label: "청구원인", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { placeholder: "청구원인 입력", colspan: 4, exampleValue: "청구인과 피청구인은 20OO년 O월 O혼인하여 그 사이에서 사건 본인을 출산하였으나 피청구인의 음주벽으로 인한 가정불화로 20OO년 O월 O일에 협의이혼하였는 바 그 이후 사건본인은 피청구인이 양육하고 있었습니다.\n그런데 피청구인은 20OO년 O월 O일에 청구외 OOO과 재혼하여 그 사이에 1녀를 출산하였으며 그후부터 피청구인 부부의 사건본인에 대한 학대는 이루 말할 수 없어 그 실례를 들면 (중략)함에 이르렀습니다. 이에 청구인이 사건 본인을 양육함이 사건본인의 장래를 위하여 더 합당하다고 생각되는 바 청구인은 여자로서 무직상태이고 피청구인은 재산의 (중략)에 이르므로 양육비를 아울러 지급 받고자 합니다.\n이상의 이유로 이 사건청구에 이르렀습니다." }
    ]
  },
  {
    fields: [
      { label: "증거서류", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "1. 호적등본 2통 (청구인 및 피청구인)", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "2. 주민등록표등본 2통", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "기타 심리에 따라 수시 제출함", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "부속서류", colspan: 4, isHeader: true }
    ]
  },
  {
    fields: [
      { label: "1. 납부서 1통", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "년     월     일", colspan: 4 }
    ]
  },
  {
    fields: [
      { label: "청구인", colspan: 1 },
      { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O (인)" }
    ]
  },
  {
    fields: [
      { placeholder: "제출처 입력", colspan: 4, exampleValue: "OO가정법원 귀중" }
    ]
  }
];

// 27. 열람등사청구서
export const 열람등사청구서_DATA: FormRow[] = [
  { fields: [{ label: "열람·등사청구서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인", rowspan: 2 }, { label: "성명" }, { placeholder: "성명 입력", colspan: 2, exampleValue: "OOO" }] },
  { fields: [{ label: "자격" }, { placeholder: "자격 입력", colspan: 2, exampleValue: "OOO" }] },
  { fields: [{ label: "사건" }, { placeholder: "사건명 입력", colspan: 3, exampleValue: "○○ 사건" }] },
  { fields: [{ label: "청구의 종류" }, { placeholder: "청구 종류 입력", colspan: 3, exampleValue: "열람" }] },
  { fields: [{ label: "열람 또는 등사할 부분" }, { placeholder: "열람/등사 부분 입력", colspan: 3, exampleValue: "소송기록 전부" }] },
  { fields: [{ placeholder: "청구 내용", colspan: 4, exampleValue: "위와 같이 청구합니다." }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "청구인", colspan: 1 }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "OOO 인" }] },
  { fields: [{ label: "접수일", colspan: 2 }, { placeholder: "접수 일시 입력", colspan: 2, exampleValue: "O 월 O일 O 시" }] },
  { fields: [{ label: "열람 또는 등사완료 일시" }, { placeholder: "완료 일시 입력", colspan: 3, exampleValue: "O 월 O일 O 시" }] },
  { fields: [{ label: "등사문서 교부 일시" }, { placeholder: "교부 일시 입력", colspan: 3, exampleValue: "O 월 O일 O 시" }] },
  { fields: [{ label: "영수인" }, { placeholder: "영수인 입력", colspan: 3, exampleValue: "O O O 인" }] },
  { fields: [{ label: "수수료", colspan: 1 }, { label: "등사" }, { placeholder: "수수료 입력", colspan: 2, exampleValue: "○○○ 원" }] },
  { fields: [{ label: "비고" }, { placeholder: "비고 입력", colspan: 3 }] }
];

// 28. 유지보수비용청구서
export const 유지보수비용청구서_DATA: FormRow[] = [
  { fields: [{ label: "유지보수비용청구서", colspan: 6, isHeader: true }] },
  { fields: [{ label: "고객사명" }, { placeholder: "고객사명 입력", colspan: 2, exampleValue: "(주)○○○" }, { label: "접수담당자" }, { placeholder: "담당자명 입력", colspan: 2, exampleValue: "홍길동" }] },
  { fields: [{ label: "고객사연락처" }, { placeholder: "연락처 입력", colspan: 2, exampleValue: "02-1234-5678" }, { label: "담당자연락처" }, { placeholder: "연락처 입력", colspan: 2, exampleValue: "010-1234-5678" }] },
  { fields: [{ label: "요청자" }, { placeholder: "요청자명 입력", colspan: 2, exampleValue: "김철수" }, { label: "수리자" }, { placeholder: "수리자명 입력", colspan: 2, exampleValue: "이영희" }] },
  { fields: [{ label: "접수일자" }, { placeholder: "접수일자 입력", colspan: 2, exampleValue: "2026년 2월 5일" }, { label: "조치일자" }, { placeholder: "조치일자 입력", colspan: 2, exampleValue: "2026년 2월 6일" }] },
  { fields: [{ label: "수리유지비" }, { placeholder: "비용 입력", colspan: 5, exampleValue: "500,000원" }] },
  { fields: [{ label: "문제 및 요구사항", colspan: 3 }, { label: "지원 및 조치사항", colspan: 3 }] },
  { fields: [{ placeholder: "문제 및 요구사항 입력", colspan: 3, exampleValue: "시스템 오류 발생, 긴급 점검 요청" }, { placeholder: "지원 및 조치사항 입력", colspan: 3, exampleValue: "시스템 점검 완료, 오류 수정" }] },
  { fields: [{ label: "특기 및 지시사항", colspan: 6 }] },
  { fields: [{ placeholder: "특기 및 지시사항 입력", colspan: 6, exampleValue: "정기 점검 권장" }] },
  { fields: [{ placeholder: "청구 내용", colspan: 6, exampleValue: "상기와 같이 유지보수 비용을 청구합니다." }] },
  { fields: [{ label: "년     월     일", colspan: 6 }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 6, exampleValue: "(주) ○○○ 귀하" }] }
];

// 29. 임치물반환청구서
export const 임치물반환청구서_DATA: FormRow[] = [
  { fields: [{ label: "임치물 반환청구서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "수치인", colspan: 1 }, { placeholder: "수치인명 입력", colspan: 3, exampleValue: "○○○ 귀하" }] },
  { fields: [{ placeholder: "청구 내용 입력", colspan: 4, exampleValue: "년 월 일 임치계약에 의해, 귀하에게 임치한 물건은, 본인의 사정으로 인하여 임치계약을 해지함과 동시에 반환을 청구하는 바입니다." }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "임치인", colspan: 1 }, { placeholder: "임치인명 입력", colspan: 3, exampleValue: "○○○ (인)" }] }
];

// 30. 재심청구서01
export const 재심청구서01_DATA: FormRow[] = [
  { fields: [{ label: "재심 청구", colspan: 4, isHeader: true }] },
  { fields: [{ label: "재심청구인" }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O" }] },
  { fields: [{ label: "생년월일" }, { placeholder: "생년월일 입력", colspan: 3, exampleValue: "20OO.O.O.일생" }] },
  { fields: [{ label: "주거" }, { placeholder: "주소 입력", colspan: 3, exampleValue: "OO시 OO구 OO동 O번지" }] },
  { fields: [{ label: "본적" }, { placeholder: "본적 입력", colspan: 3, exampleValue: "OO시 OO구 OO동 O번지" }] },
  { fields: [{ label: "원판결의 표시 및 청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "원판결 내용 입력", colspan: 4, exampleValue: "피고인은 2095.5.4.경부터 같은 해 5.20경까지 3회에 결쳐 피해자 OOO에게 원단을 공급하여 주겠다고 거짓말하여 계약금 명목으로 금350만원을 편취하였다는 이유로 OO지방법원 OO지원에서 2095.10.1 벌금 100만원을 선고받고, 청구인이 항소하였으나 2096.1.20. OO지방법원 항소부에서 항소기각되었고, 다시 청구인이 상고하였으나 2096.7.10.경 대법원에서 상고기각되어 동 판결은 확정되었지만 원판결에는 아래 이유와 같은 형사소송법 제420조 제2호 소정의 재심사유가 있어 재심청구하오니 재심개시결정에 있으시길 바랍니다." }] },
  { fields: [{ label: "재심청구 이유", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "재심 이유 입력", colspan: 4, exampleValue: "1. 피고인에 대한 범죄사실은 공소장기재와 같은 바, 피고인이 고소인을 기망, 오신케 하여 재산상의 이익을 편취한 것으로 되어 있고 이에 대하여 대법원까지 피고인에게 불리한 판결이 선고되어 확정되었습니다.\n2. 피고인은 피해자로부터 금350만원을 교부받은 것은 사실이지만 원단공급계약 후 계약금조로 교부받은 것이 아니고 종전에 차용하여 준 차용금에 대한 변제조로 교부받은 것이라고 주장하였으나 피해자의 사주를 받은 피해자의 종업원 증인 OOO이 이 건 금전은 원단공급계약을 체결후 계약금으로 교부한 것이라는 허위의 증언을 하자 이를 믿은 나머지 피고인의 주장을 배척하고 피고인에게 유죄선고를 하였던 것입니다." }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 판결등본", colspan: 4 }] },
  { fields: [{ label: "2. 위 OOO에 대한 위증죄 확정판결문등본", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "위 피고인", colspan: 1 }, { placeholder: "피고인명 입력", colspan: 3, exampleValue: "O O O (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "OO지방법원 OO지원 귀중" }] }
];

// 31. 재심사청구서
export const 재심사청구서_DATA: FormRow[] = [
  { fields: [{ label: "재심사 청구서", colspan: 6, isHeader: true }] },
  { fields: [{ label: "처리기간" }, { label: "50일", colspan: 5 }] },
  { fields: [{ label: "청구인" }, { label: "성명" }, { placeholder: "성명 입력", colspan: 4, exampleValue: "홍길동" }] },
  { fields: [{ label: "대리인 또는 선정대표자" }, { label: "성명" }, { placeholder: "성명 입력", colspan: 4, exampleValue: "김변호사" }] },
  { fields: [{ label: "피청구인" }, { label: "원처분청" }, { placeholder: "원처분청 입력", colspan: 4, exampleValue: "OO고용센터" }] },
  { fields: [{ label: "원처분" }, { label: "원처분일" }, { placeholder: "일자 입력", exampleValue: "20  .  .  " }, { label: "원처분을 안날" }, { placeholder: "일자 입력", colspan: 2, exampleValue: "20  .  .  " }] },
  { fields: [{ label: "내용" }, { label: "처분내용" }, { placeholder: "처분 내용 입력", colspan: 2, exampleValue: "실업급여 부지급 결정" }, { label: "원처분의 고지유무" }, { placeholder: "유무 입력", exampleValue: "유" }] },
  { fields: [{ label: "결정한 심사관명" }, { placeholder: "심사관명 입력", colspan: 2, exampleValue: "OOO" }, { label: "결정서를 받은 날" }, { placeholder: "일자 입력", exampleValue: "20  .  .  " }, { label: "결정이 있음을 안날" }, { placeholder: "일자 입력", exampleValue: "20  .  .  " }] },
  { fields: [{ label: "심사관의 고지 유무 및 그 내용" }, { placeholder: "내용 입력", colspan: 5, exampleValue: "유, 재심사 청구 가능" }] },
  { fields: [{ label: "청구취지 및 이유" }, { placeholder: "별지 기재와 같음", colspan: 5, exampleValue: "(별지 기재와 같음)" }] },
  { fields: [{ placeholder: "청구 내용", colspan: 6, exampleValue: "고용보험법 제76조의4 및 동법시행령 제117조의 규정에 의하여 위와 같이 청구합니다." }] },
  { fields: [{ label: "년     월     일", colspan: 6 }] },
  { fields: [{ label: "청구인", colspan: 2 }, { placeholder: "서명 또는 인", colspan: 4, exampleValue: "홍길동 (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 6, exampleValue: "고용보험심사위원회 위원장 귀하" }] }
];

// 32. 재항고기각이유고지청구서
export const 재항고기각이유고지청구서_DATA: FormRow[] = [
  { fields: [{ label: "재항고기각이유고지청구서", colspan: 6, isHeader: true }] },
  { fields: [{ label: "처리기간" }, { label: "즉시", colspan: 5 }] },
  { fields: [{ label: "청구인" }, { label: "성명" }, { placeholder: "성명 입력", colspan: 2, exampleValue: "홍길동" }, { label: "주민등록번호" }, { placeholder: "주민번호 입력", exampleValue: "800101-1234567" }] },
  { fields: [{ label: "주소" }, { placeholder: "주소 입력", colspan: 5, exampleValue: "서울특별시 종로구 세종대로 209" }] },
  { fields: [{ label: "사건번호" }, { placeholder: "사건번호 입력", colspan: 5, exampleValue: "20   년   항고 제    호" }] },
  { fields: [{ label: "재항고인" }, { placeholder: "재항고인명 입력", colspan: 5, exampleValue: "홍길동" }] },
  { fields: [{ label: "피재항고인" }, { placeholder: "피재항고인명 입력", colspan: 5, exampleValue: "OOO" }] },
  { fields: [{ label: "죄명" }, { placeholder: "죄명 입력", colspan: 5, exampleValue: "사기" }] },
  { fields: [{ label: "재항고기각년월일" }, { placeholder: "일자 입력", colspan: 5, exampleValue: "20  .  .  ." }] },
  { fields: [{ label: "용도" }, { placeholder: "용도 입력", colspan: 3, exampleValue: "증명용" }, { label: "부수" }, { placeholder: "부수 입력", exampleValue: "1통" }] },
  { fields: [{ placeholder: "청구 내용", colspan: 6, exampleValue: "위와 같이 재항고기각 이유 고지를 청구합니다." }] },
  { fields: [{ label: "년     월     일", colspan: 6 }] },
  { fields: [{ label: "청구인", colspan: 2 }, { placeholder: "서명 입력", colspan: 4, exampleValue: "홍길동" }] },
  { fields: [{ label: "재항고인 이외의 자가 청구할 때" }, { label: "재항고인과의 관계" }, { placeholder: "관계 입력", colspan: 4, exampleValue: "가족" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 6, exampleValue: "검찰총장 귀하" }] }
];

// 33. 청구_헌법소원심판_법령
export const 청구_헌법소원심판_법령_DATA: FormRow[] = [
  { fields: [{ label: "헌법소원 심판 청구", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인" }, { placeholder: "청구인명 및 주소 입력", colspan: 3, exampleValue: "○ ○ ○\n○○시 ○○구 ○○동 ○○ (우편번호 ○○○ - ○○○)" }] },
  { fields: [{ label: "대리인" }, { placeholder: "대리인 변호사 입력", colspan: 3, exampleValue: "변호사 ○ ○ ○\n○○시 ○○구 ○○동 ○○ (우편번호 ○○○ - ○○○)" }] },
  { fields: [{ label: "청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구취지 입력", colspan: 4, exampleValue: "\"○○법 제○○조는 헌법에 위반된다\"라는 결정을 구합니다." }] },
  { fields: [{ label: "침해된 권리", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "침해된 권리 입력", colspan: 4, exampleValue: "헌법 제 10조 행복추구권, 제11조 평등권, 제12조 신체의 자유" }] },
  { fields: [{ label: "침해의 원인", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "침해의 원인 입력", colspan: 4, exampleValue: "○○법 제○○조" }] },
  { fields: [{ label: "청구이유", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구이유 입력", colspan: 4, exampleValue: "1. 사건의 개요\n2. 위 규정의 위헌성\n3. 심판청구에 이르게 된 경위\n4. 청구기간의 준수여부 등" }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 심판청구서 3부", colspan: 4 }] },
  { fields: [{ label: "1. 각종 입증서류", colspan: 4 }] },
  { fields: [{ label: "1. 소송위임장(소속변호사회 경유)", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "청구인 대리인", colspan: 2 }, { placeholder: "변호사명 입력", colspan: 2, exampleValue: "변호사 ○ ○ ○ (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "헌법재판소 귀중" }] }
];

// 34. 청구_헌법소원심판_불기소처분
export const 청구_헌법소원심판_불기소처분_DATA: FormRow[] = [
  { fields: [{ label: "헌법소원 심판 청구 (불기소처분)", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인" }, { placeholder: "청구인명 및 주소 입력", colspan: 3, exampleValue: "○ ○ ○\n○○시 ○○구 ○○동 ○○" }] },
  { fields: [{ label: "대리인" }, { placeholder: "대리인 변호사 입력", colspan: 3, exampleValue: "변호사 ○ ○ ○\n○○시 ○○구 ○○동 ○○ (우편번호 : ○○○ - ○○○)" }] },
  { fields: [{ label: "피청구인" }, { label: "△△지방검찰청 검사", colspan: 3 }] },
  { fields: [{ label: "청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구취지 입력", colspan: 4, exampleValue: "\"피청구인이 20○○. ○. ○. △△지방검찰청 20○○년 형제○○○○호 횡령사건에 있어서 피의자 □□□에 대하여 한 불기소처분은 청구인의 평등권을 침해한 것이므로 이를 취소한다\"라는 결정을 구합니다." }] },
  { fields: [{ label: "침해된 권리", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "침해된 권리 입력", colspan: 4, exampleValue: "헌법 제 10조 행복추구권, 제11조 평등권, 제27조 재판절차에서의 진술권" }] },
  { fields: [{ label: "침해의 원인", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "침해의 원인 입력", colspan: 4, exampleValue: "피청구인이 20○○. ○. ○. △△지방검찰청 20○○년 형제○○○○호 횡령사건에 있어서 피의자 □□□에 대하여 한 무혐의 불기소처분" }] },
  { fields: [{ label: "청구이유", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구이유 입력", colspan: 4, exampleValue: "1. 사건의 개요\n2. 위 불기소처분의 위헌성\n3. 심판청구에 이르게 된 경위\n- 고소, 불기소처분, 항고, 재항고 과정 등\n4. 청구기간의 준수여부 등" }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 심판청구서 3부", colspan: 4 }] },
  { fields: [{ label: "1. 각종 입증서류", colspan: 4 }] },
  { fields: [{ label: "1. 소송위임장(소속변호사회 경유)", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "청구인 대리인", colspan: 2 }, { placeholder: "변호사명 입력", colspan: 2, exampleValue: "변호사 ○ ○ ○ (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "헌법재판소 귀중" }] }
];

// 35. 청구_헌법소원심판_행정부작위
export const 청구_헌법소원심판_행정부작위_DATA: FormRow[] = [
  { fields: [{ label: "헌법소원 심판 청구 (행정부작위)", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인" }, { placeholder: "청구인명 및 주소 입력", colspan: 3, exampleValue: "○ ○ ○\n○○시 ○○구 ○○동 ○○" }] },
  { fields: [{ label: "대리인" }, { placeholder: "대리인 변호사 입력", colspan: 3, exampleValue: "변호사 ○ ○ ○\n○○시 ○○구 ○○동 ○○(우편번호 : ○○○ - ○○○)" }] },
  { fields: [{ label: "피청구인" }, { label: "△△시장", colspan: 3 }] },
  { fields: [{ label: "청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구취지 입력", colspan: 4, exampleValue: "\"청구인이 피청구인에게 20○○. ○. ○.부터 같은 해 ○. ○.경까지 수차에 걸쳐 ○○시 ○○구 ○○동 ○○ 소재 토지에 대한 토지조사서의 열람·복사신청를 하였음에도 이에 대한 피청구인의 부작위는 청구인의 알권리를 침해한 위법임을 확인한다.\"라는 결정을 구합니다." }] },
  { fields: [{ label: "침해된 권리", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "침해된 권리 입력", colspan: 4, exampleValue: "헌법 제 21조 알권리" }] },
  { fields: [{ label: "침해의 원인", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "침해의 원인 입력", colspan: 4, exampleValue: "청구인이 피청구인에게 20○○. ○. ○.부터 같은 해 ○. ○.경까지 수차에 걸쳐 ○○시 ○○구 ○○동 ○○ 소재 토지에 대한 토지조사서의 열람·복사신청를 하였음에도 이에 대한 피청구인의 부작위" }] },
  { fields: [{ label: "청구이유", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구이유 입력", colspan: 4, exampleValue: "1. 사건의 개요\n2. 위 부작위의 위헌성\n3. 심판청구에 이르게 된 경위\n4. 청구기간의 준수여부 등" }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 심판청구서 3부", colspan: 4 }] },
  { fields: [{ label: "1. 각종 입증서류", colspan: 4 }] },
  { fields: [{ label: "1. 소송위임장(소속변호사회 경유)", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "청구인 대리인", colspan: 2 }, { placeholder: "변호사명 입력", colspan: 2, exampleValue: "변호사 ○ ○ ○ (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "헌법재판소 귀중" }] }
];

// 36. 청구서_헌법소원심판
export const 청구서_헌법소원심판_DATA: FormRow[] = [
  { fields: [{ label: "헌법소원 심판 청구", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인" }, { placeholder: "청구인 정보 입력", colspan: 3, exampleValue: "1. ○ ○ ○\n    ○○시 ○○구 ○○동 ○○" }] },
  { fields: [{ label: "청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구취지 입력", colspan: 4, exampleValue: "\"형법 제241조는 헌법에 위반한다\"라는 결정을 구합니다." }] },
  { fields: [{ label: "당해사건", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "당해사건 입력", colspan: 4, exampleValue: "○○지방법원 20○○고단○○○○호 간통" }] },
  { fields: [{ label: "청구이유", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구이유 입력", colspan: 4, exampleValue: "1. 사건의 개요\n2. 위헌이라고 해석되는 이유" }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 심판청구서 3부", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "청구인 대리인", colspan: 2 }, { placeholder: "변호사명 입력", colspan: 2, exampleValue: "변호사 □ □ □ (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "헌법재판소 귀중" }] }
];

// 37. 한정치산선고심판청구
export const 한정치산선고심판청구_DATA: FormRow[] = [
  { fields: [{ label: "한정치산선고심판청구", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인" }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "OOO (OOOOOO-OOOOOOO)" }] },
  { fields: [{ label: "사건본인" }, { placeholder: "사건본인명 입력", colspan: 3, exampleValue: "OOO (OOOOOO-OOOOOOO)" }] },
  { fields: [{ label: "청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구취지 입력", colspan: 4, exampleValue: "사건본인 OOO를 한정치산자로 선고한다.\n라는 심판을 구합니다." }] },
  { fields: [{ label: "청구원인", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구원인 입력", colspan: 4, exampleValue: "1. 사건본인 OOO는 청구인 OOO의 자로서 이제껏 식당경영을 해왔으나 최근에는 낭비와 유흥으로 카드빚을 일삼아 사업과 가정을 외면한 채 가산을 탕진하여 집안이 어려움에 처하게 되었습니다." }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 호적등본(청구인 및 사건본인) 각 1통", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "위 청구인", colspan: 1 }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "OO지방법원 OO지원귀중" }] }
];

// 38. 형사보상금지급청구서
export const 형사보상금지급청구서_DATA: FormRow[] = [
  { fields: [{ label: "형사보상금지급청구서", colspan: 6, isHeader: true }] },
  { fields: [{ label: "처리기간" }, { label: "15일", colspan: 5 }] },
  { fields: [{ label: "보상청구인" }, { label: "성명" }, { placeholder: "성명 입력", colspan: 2, exampleValue: "홍길동" }, { label: "주민등록번호" }, { placeholder: "주민번호 입력", exampleValue: "800101-1234567" }] },
  { fields: [{ label: "주소" }, { placeholder: "주소 입력", colspan: 5, exampleValue: "서울특별시 종로구 세종대로 209" }] },
  { fields: [{ label: "사건번호" }, { placeholder: "사건번호 입력", colspan: 5, exampleValue: "20  년  형 제  호" }] },
  { fields: [{ placeholder: "청구 내용", colspan: 6, exampleValue: "형사소송법 제20조에 의하여 위와같이 형사보상금의 지급을 청구합니다." }] },
  { fields: [{ label: "년     월     일", colspan: 6 }] },
  { fields: [{ label: "청구인", colspan: 2 }, { placeholder: "서명 입력", colspan: 4, exampleValue: "홍길동 인" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 6, exampleValue: "O O 검 찰 청 검 사 장 귀하" }] }
];

// 39. 형사보상금청구서
export const 형사보상금청구서_DATA: FormRow[] = [
  { fields: [{ label: "형사보상금 청구", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인" }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O" }] },
  { fields: [{ label: "청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구취지 입력", colspan: 4, exampleValue: "청구인에게 금 OOO원을 지급하라.\n라는 결정을 구합니다." }] },
  { fields: [{ label: "청구원인", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구원인 입력", colspan: 4, exampleValue: "1. 청구인은 OO년 20O월 O일 위증 피의사건으로 구속되어 같은 달 O일 OO지방법원 OO지원 에 기소되어, 20OO년 O월 O일 동원에서 징역 O처한다는 선고를 받고 불복하여 항소심 공판 도중 구속만기로 20OO년 O월 O일 석방되고, 20OO년 O월 O일 OO지방법원에서 무죄의 판결을 선고 받았습니다." }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 판결등본 2통", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "청구인", colspan: 1 }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "OO지방법원 귀중" }] }
];

// 40. 후견인선임청구서
export const 후견인선임청구서_DATA: FormRow[] = [
  { fields: [{ label: "후견인 선임 청구", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인" }, { placeholder: "청구인 정보 입력", colspan: 3, exampleValue: "O O O OOOO년 O월 O일생" }] },
  { fields: [{ label: "사건본인" }, { placeholder: "사건본인 정보 입력", colspan: 3, exampleValue: "O O O OOOO년 O월 O일생" }] },
  { fields: [{ label: "청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구취지 입력", colspan: 4, exampleValue: "사건본인(미성년자)의 후견인으로서 OO시 OO구 OO동 OO번지의 OOO을 선임한다.\n라는 심판을 구하다." }] },
  { fields: [{ label: "청구원인", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구원인 입력", colspan: 4, exampleValue: "사건본인의 부는 19OO년 O월 O일에 사망하여 모 OOO의 친권에 복종하였는데, 그 모가 19OO년 O월 O일에 사망하였으므로 최후로 친권을 행사할 자가 없습니다." }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 호적등본 2통", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "신청인", colspan: 1 }, { placeholder: "신청인명 입력", colspan: 3, exampleValue: "O O O (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "OO가정법원 귀중" }] }
];

// 41. 특별대리인선임청구서
export const 특별대리인선임청구서_DATA: FormRow[] = [
  { fields: [{ label: "특별대리인 선임 청구서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "청구인" }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O" }] },
  { fields: [{ label: "사건본인" }, { placeholder: "사건본인명 입력", colspan: 3, exampleValue: "O O O (미성년자)" }] },
  { fields: [{ label: "청구취지", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구취지 입력", colspan: 4, exampleValue: "사건본인의 특별대리인으로서 OOO을 선임한다.\n라는 심판을 구합니다." }] },
  { fields: [{ label: "청구원인", colspan: 4, isHeader: true }] },
  { fields: [{ placeholder: "청구원인 입력", colspan: 4, exampleValue: "사건본인은 청구인의 미성년인 자로서 부모인 청구인 OOO과 OOO의 친권에 복종하고 있으나, 사건본인과 친권자 사이에 이익이 상반되는 행위를 할 필요가 생겼으므로 특별대리인의 선임을 청구하는 바입니다." }] },
  { fields: [{ label: "첨부서류", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 호적등본 2통", colspan: 4 }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "청구인", colspan: 1 }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "O O O (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "OO가정법원 귀중" }] }
];
// 42. 건물 부당사용 중지 청구
export const 건물부당사용중지청구_DATA: FormRow[] = [
  { fields: [{ label: "건물 부당사용 중지 청구", colspan: 4, isHeader: true }] },
  { fields: [{ label: "임대부동산의 표시", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소재지" }, { label: "시(군)", exampleValue: "○○시" }, { label: "읍(면)", exampleValue: "○○구" }, { label: "동(리)", exampleValue: "○○동" }, { label: "번지", exampleValue: "○○○" }] },
  { fields: [{ label: "건  물", colspan: 4, exampleValue: "○○○ ○○○" }] }
];

// 43. 건물매수 청구
export const 건물매수청구_DATA: FormRow[] = [
  { fields: [{ label: "건물매수 청구", colspan: 4, isHeader: true }] },
  { fields: [{ label: "임차토지의 표시", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소재지" }, { label: "시(군)", exampleValue: "○○시" }, { label: "읍(면)", exampleValue: "○○구" }, { label: "동(리)", exampleValue: "○○동" }, { label: "번지", exampleValue: "○○○" }] },
  { fields: [{ label: "토  지", colspan: 4, exampleValue: "○○○ ○○○" }] }
];

// 44. 매매대금 감액 청구서
export const 매매대금감액청구서_DATA: FormRow[] = [
  { fields: [{ label: "매매대금 감액 청구서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "1. 계약내용", colspan: 4, isHeader: true }] },
  { fields: [{ label: "목    적" }, { label: "소재지", colspan: 3 }] },
  { fields: [{ label: "부 동 산" }, { label: "시(군)", exampleValue: "○○시" }, { label: "읍(면)", exampleValue: "○○구" }, { label: "동(리)", exampleValue: "○○동" }, { label: "번지", exampleValue: "○○○" }] }
];

// 45. 임대료청구 및 계약해지 통지
export const 임대료청구및계약해지통지_DATA: FormRow[] = [
  { fields: [{ label: "임대료 청구 및 계약해지 통지", colspan: 4, isHeader: true }] },
  { fields: [{ label: "임대부동산의 표시", colspan: 4, isHeader: true }] },
  { fields: [{ label: "소재지" }, { label: "시(군)", exampleValue: "○○시" }, { label: "읍(면)", exampleValue: "○○구" }, { label: "동(리)", exampleValue: "○○동" }, { label: "번지", exampleValue: "○○○" }] }
];

// 46. 재심 청구서 02
export const 재심청구서02_DATA: FormRow[] = [
  { fields: [{ label: "재심 청구서", colspan: 4, isHeader: true }] },
  { fields: [{ label: "사건명" }, { placeholder: "사건명 입력", colspan: 3, exampleValue: "" }] },
  { fields: [{ label: "기소위원회" }, { placeholder: "기소위원회 입력", colspan: 3, exampleValue: "" }] },
  { fields: [{ label: "소속" }, { placeholder: "소속 입력", colspan: 3, exampleValue: "" }] },
  { fields: [{ label: "피고인" }, { placeholder: "피고인명 입력", colspan: 3, exampleValue: "OOO" }] },
  { fields: [{ label: "주소" }, { placeholder: "주소 입력", colspan: 3, exampleValue: "OO시 OO구 OO동 O-O" }] },
  { fields: [{ label: "원판결 재판국명" }, { placeholder: "원판결 재판국명 입력", colspan: 3, exampleValue: "" }] },
  { fields: [{ label: "원판결 표시" }, { placeholder: "원판결 표시 입력", colspan: 3, exampleValue: "" }] },
  { fields: [{ label: "원판결의 확정일" }, { placeholder: "확정일 입력", colspan: 3, exampleValue: "20OO 년  O 월  O 일" }] },
  { fields: [{ label: "재심 청구사유" }, { placeholder: "재심 청구사유 입력", colspan: 3, exampleValue: "" }] },
  { fields: [{ label: "증거 서류" }, { placeholder: "증거 서류 입력", colspan: 3, exampleValue: "" }] },
  { fields: [{ label: "첨부" }, { placeholder: "첨부 입력", colspan: 3, exampleValue: "기탁금 영수증 사본" }] },
  { fields: [{ label: "위와 같이 재심을 청구합니다.", colspan: 4, isHeader: true }] },
  { fields: [{ label: "년     월     일", colspan: 4 }] },
  { fields: [{ label: "재심 청구인", colspan: 1 }, { placeholder: "청구인명 입력", colspan: 3, exampleValue: "OOO (인)" }] },
  { fields: [{ placeholder: "제출처 입력", colspan: 4, exampleValue: "대한예수교장로회  OO 재판국장 귀하" }] }
];
