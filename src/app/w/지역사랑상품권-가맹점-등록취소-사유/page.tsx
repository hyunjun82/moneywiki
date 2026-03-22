"use client";

// Q1. 지역사랑상품권 가맹점으로 등록했는데, 어떤 행위를 하면 등록이 취소되는지 몰라서 불안한 상황
// Q2. 등록 취소 사유를 파악하고, 위반 행위를 사전에 방지하기
// Q3. 지역사랑상품권법 제11조 취소 사유 4가지, 현금 환전 금지, 재등록 제한 1년, 취소 절차(시정명령→취소)
// Q4. GreenBox(취소 사유 4가지 표) + Steps(취소 절차) + BorderBox(사후 처리) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, Checklist,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "실수로 한 번 현금 바꿔줬는데 바로 취소되나요?", a: "한 번으로 바로 취소되진 않을 수 있어요. 경고나 시정 명령이 먼저 나오죠. 다만 반복하거나 고의적이면 즉시 취소 대상이에요." },
  { q: "취소되면 미정산 금액은 어떻게 되나요?", a: "이미 결제된 상품권에 대한 정산금은 받을 수 있어요. 다만 새로운 상품권 결제는 즉시 중단돼요." },
  { q: "등록 취소 후 언제 재등록할 수 있나요?", a: "지자체가 1년 이내 범위에서 재등록을 제한할 수 있어요. 취소 사유가 심각하면 제한 기간이 길어질 수 있죠." },
  { q: "상품권 결제를 거부하면 취소 사유인가요?", a: "네. 상품권 결제 거부나 상품권 사용 고객에게 불이익을 주는 행위는 법 위반이에요. 반복하면 등록 취소 대상이에요." },
  { q: "영업을 한동안 쉬면 자동 취소되나요?", a: "일시적 휴업은 지자체에 신고하면 유예될 수 있어요. 장기간 영업 중단이나 폐업 시 직권으로 취소될 수 있어요." },
  { q: "취소 결정에 이의를 제기할 수 있나요?", a: "가능해요. 취소 통지를 받은 날로부터 30일 이내에 이의신청을 할 수 있어요. 정당한 사유가 인정되면 철회될 수 있죠." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "지역사랑상품권 이용 활성화에 관한 법률", url: "https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" },
      { label: "행정안전부 지역사랑상품권 안내", url: "https://www.mois.go.kr/frt/sub/a06/b07/localVoucher/screen.do" },
      { label: "찾기쉬운 생활법령정보 - 지역사랑상품권", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1816" },
    ],
  },
];

const RELATED = [
  { slug: "비밀유지-의무-위반", title: "비밀유지 의무 위반 처벌", description: "영업비밀 침해 시 형사·민사 제재를 다뤄요." },
  { slug: "고객응대근로자-정의-범위", title: "고객응대근로자 보호", description: "가맹점 직원도 고객응대근로자에 해당할 수 있어요." },
  { slug: "휴업수당-지급-기준-계산", title: "휴업수당 지급 기준", description: "가게 휴업 시 직원 수당 지급 기준이에요." },
];

const STEPS_DATA = [
  { title: "위반 행위 적발", desc: "지자체나 상품권 발행 기관이 정기 점검이나 신고를 통해 위반 행위를 확인해요." },
  { title: "시정 명령 발부", desc: "즉시 취소가 아니라 시정 명령이 먼저 나와요. 기한 내에 위반 사항을 개선하면 취소를 피할 수 있어요." },
  { title: "미이행 시 등록 취소 결정", desc: "시정 명령에 불응하거나 위반이 중대하면 등록 취소가 결정돼요. 서면으로 통지받아요." },
  { title: "이의신청 또는 재등록 대기", desc: "30일 이내 이의신청 가능해요. 취소가 확정되면 1년 이내 범위에서 재등록이 제한돼요." },
];

const CHECKLIST = [
  "상품권을 현금으로 바꿔주지 않기 (절대 금지)",
  "상품권 결제를 거부하거나 차별하지 않기",
  "사업자등록 변경 사항 즉시 신고하기",
  "장기 휴업 시 지자체에 미리 알리기",
  "직원에게 상품권 결제 방법 교육하기",
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 지역사랑상품권 · 가맹점</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지역사랑상품권 가맹점, 이러면 취소돼요<br />
        등록취소 사유와 대응법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        동네 가게를 운영하면서 지역사랑상품권 가맹점으로 등록하셨나요?
        편하게 쓰고 있지만, 특정 행위를 하면 등록이 취소될 수 있어요.
        특히 상품권을 현금으로 바꿔주는 건 형사처벌까지 갈 수 있으니 절대 하면 안 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>등록 취소되는 4가지 사유</H2>
      <p style={body}>
        지역사랑상품권 이용 활성화에 관한 법률에서 정한 취소 사유는 크게 4가지예요.
        첫 번째는 필수 취소, 나머지는 재량 취소예요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>취소 사유</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구분</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              { reason: "부정한 방법으로 등록", type: "필수 취소", ex: "폐업 사업장으로 등록, 명의 대여" },
              { reason: "제한업종·사업체 영위", type: "재량 취소", ex: "등록 후 사행성·유흥업으로 전환" },
              { reason: "법 제10조 위반 행위", type: "재량 취소", ex: "상품권 현금 전환, 수수료 받고 환전" },
              { reason: "결제 거부·사용자 불이익", type: "재량 취소", ex: "상품권 사용 시 할인 거부, 결제 거부" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.reason}</td>
                <td style={{ padding: "5px 8px" }}>{row.type}</td>
                <td style={{ padding: "5px 8px" }}>{row.ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 지역사랑상품권법 제11조 기준 / 부정 등록은 반드시 취소
        </p>
      </GreenBox>

      <H2>취소 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        대부분 바로 취소되는 게 아니라 시정 기회가 있어요. 다만 부정 등록은 즉시 취소 대상이에요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>취소 안 당하려면 이것만 지키세요</H2>
      <p style={body}>
        간단한 규칙만 지키면 문제없어요. 아래 체크리스트로 확인하세요.
      </p>

      <Checklist items={CHECKLIST} />

      <H2>취소 후 어떻게 되나요?</H2>
      <p style={body}>
        등록이 취소되면 즉시 상품권 결제가 중단돼요. 이후 처리를 알아두세요.
      </p>

      <BorderBox>
        <strong>등록 취소 후 처리</strong><br /><br />
        ▶ 새로운 상품권 결제 <strong>즉시 중단</strong><br />
        ▶ 기존 결제분 정산금은 <strong>정상 지급</strong><br />
        ▶ 재등록 제한: <strong>최대 1년</strong> (지자체 조례에 따라)<br />
        ▶ 취소 사실 <strong>공개</strong> (이용자 보호 목적)<br /><br />
        ★ 이의신청은 취소 통지일로부터 30일 이내
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 지역사랑상품권법 기준으로 작성됐어요. 지자체별 세부 규정이 다를 수 있으니 관할 구청에 확인하세요." />
    </ArticleLayout>
  );
}
