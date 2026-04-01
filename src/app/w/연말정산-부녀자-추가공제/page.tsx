"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 여성 근로자가 연말정산에서 부녀자 공제 받을 수 있는지 조건 확인하는 상황
// Q2. 소득·배우자·부양가족 조건 확인 → 원천징수영수증에서 체크 여부 확인 → 연말정산 신청
// Q3. 배우자 있는 여성 or 부양가족 있는 여성 세대주 / 총급여 4,100만원 이하(종합소득 3,000만원) / 50만원 공제 / 한부모 공제(100만원)와 중복 불가
// Q4. GreenBox(공제 요건 표) + GreenBox(한부모 공제 비교) + BorderBox(원천징수영수증 확인 + 주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "배우자 없는 미혼 여성도 부녀자 공제 받을 수 있나요?",
    a: "배우자가 없는 미혼 여성은 부양가족이 있는 세대주인 경우에만 부녀자 공제를 받을 수 있어요. 부모님이나 자녀를 부양하고 세대주라면 해당돼요. 배우자 있는 여성은 부양가족 조건 없이 소득 조건만 맞으면 받을 수 있어요.",
  },
  {
    q: "총급여 4,100만원 기준은 세전 연봉 기준인가요?",
    a: "네, 세전 총급여 기준이에요. 각종 수당 포함 세전 연봉이 4,100만원 이하면 돼요. 비과세 항목(식대 월 20만원, 차량유지비 등)은 총급여에서 제외되니 실제 기준은 명세서로 확인하세요. 종합소득 기준으로는 3,000만원 이하예요.",
  },
  {
    q: "부녀자 공제와 한부모 공제를 동시에 받을 수 있나요?",
    a: "중복 적용이 안 돼요. 한부모 공제(100만원)가 부녀자 공제(50만원)보다 크기 때문에, 한부모 공제 요건이 되면 한부모 공제만 받는 게 유리해요. 두 공제 모두 해당되는 경우에는 큰 금액인 한부모 공제(100만원)가 자동으로 적용돼요.",
  },
  {
    q: "부녀자 공제는 어떻게 신청해요?",
    a: "연말정산 소득공제 신고서에 부녀자 공제 항목에 체크하면 돼요. 회사에서 연말정산 진행 시 근로자 공제 신고서를 제출할 때 해당 항목에 체크하면 됩니다. 별도 서류 제출은 필요 없고, 조건을 충족한다고 스스로 확인 후 신청하면 돼요.",
  },
  {
    q: "남편이 있는데 남편이 이미 기본공제를 받으면 부녀자 공제 안 되나요?",
    a: "부녀자 공제는 본인(여성 근로자)의 소득 조건만 충족하면 돼요. 배우자가 다른 공제를 받는 것과는 무관해요. 단, 본인이 기본공제 대상자가 되면(배우자에게 기본공제 적용) 부녀자 공제를 받기 어려우니, 본인이 직접 연말정산을 신청해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "소득세법 제51조 (추가공제 - 부녀자공제)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청: 연말정산 추가공제 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-한부모-공제", title: "연말정산 한부모 공제 100만원", description: "한부모 공제 요건과 부녀자 공제와의 차이예요." },
  { slug: "연말정산-인적공제-부양가족", title: "연말정산 부양가족 인적공제", description: "기본공제 150만원 받는 부양가족 조건이에요." },
  { slug: "연말정산-형제자매", title: "연말정산 형제자매 공제 조건", description: "형제자매 부양가족 공제 요건 확인해요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 추가공제 · 부녀자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 부녀자 추가공제<br />
        총급여 4,100만원 이하 여성 50만원 공제
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        여성 근로자 중 배우자가 있거나, 부양가족이 있는 여성 세대주라면 연 50만원 추가공제를 받을 수 있어요.
        단, 총급여 4,100만원 이하 조건이 있고, 한부모 공제(100만원)와는 중복이 안 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>부녀자 공제 요건</H2>
      <p style={body}>
        두 가지 경우 중 하나에 해당하면 받을 수 있어요.
        소득 조건은 공통이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>유형</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>조건</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>공제 금액</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "배우자 있는 여성", condition: "배우자 있음 + 총급여 4,100만원 이하", amount: "50만원" },
              { type: "여성 세대주", condition: "부양가족 있음 + 세대주 + 총급여 4,100만원 이하", amount: "50만원" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{row.condition}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ※ 총급여 4,100만원 = 종합소득금액 약 3,000만원 기준<br />
          ※ 배우자 있는 여성은 부양가족 조건 없음
        </p>
      </GreenBox>

      <H2>한부모 공제와 비교</H2>
      <p style={body}>
        한부모 공제 대상이면 부녀자 공제보다 2배 더 받을 수 있어요.
        두 공제가 동시에 되지 않으니 더 유리한 걸 선택하면 돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>공제 종류</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>공제 금액</th>
              <th style={{ textAlign: "center", padding: "5px 8px" }}>요건</th>
              <th style={{ textAlign: "right", padding: "5px 8px" }}>중복 여부</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "부녀자 공제", amount: "50만원", condition: "소득 4,100만원 이하 여성", overlap: "중복 불가" },
              { type: "한부모 공제", amount: "100만원", condition: "배우자 없음 + 부양 자녀", overlap: "중복 불가" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 1 ? "rgba(29,158,117,0.05)" : undefined }}>
                <td style={{ padding: "5px 8px" }}>{row.type}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", color: "#1D9E75", fontWeight: 600 }}>{row.amount}</td>
                <td style={{ textAlign: "center", padding: "5px 8px", fontSize: 12 }}>{row.condition}</td>
                <td style={{ textAlign: "right", padding: "5px 8px", color: "#E53E3E", fontSize: 12 }}>{row.overlap}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 한부모 공제 해당 시 한부모 공제(100만원) 선택이 유리해요
        </p>
      </GreenBox>

      <H2>원천징수영수증 확인과 신청 방법</H2>
      <p style={body}>
        신청은 간단해요. 연말정산 소득공제 신고서에 체크하면 끝이에요.
        이미 적용됐는지 원천징수영수증으로 확인할 수 있어요.
      </p>

      <BorderBox>
        <strong>원천징수영수증 확인 위치</strong><br />
        소득공제 명세 → 추가공제 항목 → "부녀자" 란에 50만원 반영 여부 확인<br />
        홈택스 → 마이홈택스 → 연말정산 지급명세서 조회<br />
        <br />
        <strong>신청 방법</strong><br />
        연말정산 소득공제 신고서 → 추가공제 항목 → 부녀자 공제 체크<br />
        별도 서류 제출 없이 자기 신고 방식으로 적용<br />
        <br />
        <strong>주의사항</strong><br />
        한부모 공제와 중복 적용 불가 → 큰 금액(한부모 100만원) 선택<br />
        소득 조건(총급여 4,100만원) 초과 시 자동 미적용<br />
        본인이 기본공제 대상자가 되면 적용 불가<br />
        <br />
        ★ 공제 누락됐으면 5년 이내 경정청구로 돌려받을 수 있어요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 소득세법 기준으로 작성됐어요. 공제 요건은 세법 개정에 따라 변경될 수 있으니 국세청 공식 안내를 확인하세요." />
    </ArticleLayout>
  );
}
