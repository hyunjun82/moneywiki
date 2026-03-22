"use client";

// Q1. 회사에서 연차 쓰라고 메일 보냈는데, 이게 법적 효력 있는 건지 모르겠고 미사용수당 못 받을까 봐 불안한 상황
// Q2. 서면 촉진 절차가 유효한지 판단하고, 무효면 미사용수당을 청구하기
// Q3. 근로기준법 제61조 촉진 2단계(1차 촉구+2차 지정), 서면 필수(구두 무효), 10일 응답 기한, 촉진 무효 시 수당 청구
// Q4. Steps(촉진 절차 2단계) + GreenBox(유효·무효 판별표) + BorderBox(수당 청구 방법) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "카톡이나 문자로 연차 쓰라고 했는데 유효한가요?", a: "논란이 있어요. 이메일은 대법원 판례로 유효하다고 봤지만, 문자는 불명확해요. 서면 또는 이메일이 확실해요." },
  { q: "회사가 촉진을 안 했으면 미사용수당을 꼭 받을 수 있나요?", a: "네. 촉진 절차를 밟지 않으면 미사용 연차에 대해 수당을 지급해야 해요. 회사가 면제되려면 반드시 법적 절차를 거쳐야 하죠." },
  { q: "10일 안에 응답 못 했으면 어떻게 되나요?", a: "10일 내 사용 시기를 안 정하면 회사가 지정한 날에 자동으로 연차가 사용돼요. 그 날짜가 지나면 미사용수당 청구가 어려워져요." },
  { q: "회사가 업무상 이유로 연차 사용을 거부했다면요?", a: "촉진 절차가 무효가 돼요. 회사가 연차 사용을 막았으면서 촉진 절차를 밟았다고 주장할 수 없어요. 이 경우 미사용수당을 받을 수 있어요." },
  { q: "연차촉진은 1년 미만 근로자에게도 적용되나요?", a: "네. 2018년 개정으로 1년 미만 근로자(월 1일 발생 연차)에게도 촉진 제도가 적용돼요. 입사 후 3개월부터 촉진이 가능해요." },
  { q: "촉진 절차가 유효하면 수당을 한 푼도 못 받나요?", a: "맞아요. 유효한 촉진을 거쳤는데 근로자가 안 쓴 연차는 수당 청구가 안 돼요. 그래서 촉진 통보를 받으면 꼭 날짜를 정해서 쓰세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제61조 (연차 유급휴가의 사용 촉진)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 연차촉진 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "휴업수당-지급-기준-계산", title: "휴업수당 지급 기준", description: "회사 사정으로 쉬게 됐을 때 수당 기준이에요." },
  { slug: "퇴직급여-지급-지연이자-받기", title: "퇴직금 지연이자", description: "퇴직금 14일 미지급 시 연 20% 이자 청구법이에요." },
  { slug: "고객응대근로자-정의-범위", title: "고객응대근로자 보호", description: "감정노동자 법적 보호 범위를 다뤄요." },
];

const STEPS_DATA = [
  { title: "1차: 회사가 미사용 연차 일수를 서면으로 알림", desc: "연차 소멸 6개월 전까지, 회사가 근로자별로 미사용 연차 일수를 서면(이메일 가능)으로 통보하고 사용 시기를 정해서 알려달라고 촉구해요.", tip: "구두 통보, 사내 공지는 무효예요. 개별 서면이어야 해요" },
  { title: "근로자가 10일 이내에 사용 시기 통보", desc: "촉구받은 날로부터 10일 이내에 연차를 쓸 날짜를 정해서 회사에 알려야 해요. 이 기간을 넘기면 회사가 날짜를 지정할 수 있어요." },
  { title: "2차: 회사가 사용 시기를 서면으로 지정", desc: "근로자가 10일 내 응답하지 않으면, 연차 소멸 2개월 전까지 회사가 직접 사용 날짜를 정해서 서면으로 통보해요." },
  { title: "지정된 날짜에 연차 사용 또는 미사용 확정", desc: "지정된 날에 쉬면 정상 소진이에요. 안 쓰면 미사용 확정 → 회사는 수당 지급 의무에서 벗어나요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 연차 · 미사용수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연차촉진 통보 받았는데, 수당 못 받나?<br />
        유효 조건과 대응법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말에 갑자기 &quot;연차 쓰세요&quot; 메일을 받으셨나요?
        이게 근로기준법 제61조에 따른 연차촉진 절차예요.
        핵심은 서면 통보가 유효한지 여부예요.
        유효하면 미사용수당을 못 받고, 무효면 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>촉진이 유효한 경우 vs 무효인 경우</H2>
      <p style={body}>
        같은 &quot;연차 쓰라&quot;는 메시지도 방식에 따라 법적 효력이 완전히 달라져요.
        아래 표로 확인해 보세요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>유효 (수당 X)</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>무효 (수당 O)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { valid: "개별 서면(이메일) 통보", invalid: "구두(말로만) 독려" },
              { valid: "미사용 일수 + 사용 촉구 명시", invalid: "사내 공지·게시판 안내" },
              { valid: "10일 내 미응답 시 2차 서면 지정", invalid: "문자(논란 있음)" },
              { valid: "연차 소멸 6개월 전 1차 촉구", invalid: "촉구 없이 일방적 날짜 지정" },
              { valid: "근로자가 자유롭게 날짜 선택 가능", invalid: "회사가 업무상 이유로 사용 거부" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px" }}>{row.valid}</td>
                <td style={{ padding: "5px 8px" }}>{row.invalid}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 근로기준법 제61조 + 대법원 판례 기준
        </p>
      </GreenBox>

      <H2>연차촉진 절차 단계별 진행</H2>
      <p style={body}>
        촉진 절차는 1차 촉구 → 근로자 응답 → 2차 지정 순서예요.
        하나라도 빠지면 무효가 되고, 미사용수당을 받을 수 있어요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>촉진이 무효라면 미사용수당 청구하세요</H2>
      <p style={body}>
        촉진 절차가 제대로 안 됐다면 퇴사 시 미사용 연차에 대해 수당을 청구할 수 있어요.
      </p>

      <BorderBox>
        <strong>미사용수당 청구 방법</strong><br /><br />
        ▶ <strong>계산</strong>: 1일 통상임금 x 미사용 연차 일수<br />
        ▶ <strong>퇴사 시</strong>: 퇴직금과 함께 14일 이내 지급 요청<br />
        ▶ <strong>미지급 시</strong>: 고용노동부(1350) 임금체불 진정 접수<br />
        ▶ <strong>소멸시효</strong>: 퇴사일로부터 3년 이내 청구해야 해요<br /><br />
        ★ 촉진 절차 증빙(이메일, 서면)을 보관해 두세요. 분쟁 시 증거가 돼요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 근로기준법 기준으로 작성됐어요. 촉진 유효성 판단은 개별 상황에 따라 다를 수 있으니 고용노동부(1350)에 확인하세요." />
    </ArticleLayout>
  );
}
