"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 임신 중이거나 출산을 앞두고 있는데, 출산휴가 급여가 2026년에 얼마인지, 회사·고용보험 중 누가 주는지, 어떻게 신청하는지 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 통상임금으로 출산휴가 급여를 계산하고, 고용24에서 직접 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 상한액 월 220만원, 대기업 vs 중소기업 지급방식 차이, 배우자출산휴가 20일, 신청기간(1개월~12개월), 필요서류, 6+6 연결.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 숫자) + 대기업/중소기업 비교 테이블 + Steps(신청 절차) + BorderBox(배우자출산휴가) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "고용24 접속·로그인", desc: "work24.go.kr에 공인인증서 또는 간편인증으로 로그인해요." },
  { title: "출산전후휴가 급여 신청 메뉴", desc: "개인 서비스 → 모성보호 → 출산전후휴가 급여 신청으로 이동해요." },
  { title: "신청서 작성·서류 첨부", desc: "출산전후휴가 확인서(회사 발급) + 통상임금 확인 서류를 첨부해요.", tip: "확인서는 최초 1회만 제출하면 돼요" },
  { title: "제출 완료", desc: "제출하면 약 14일 이내에 통장으로 입금돼요." },
];

const FAQS = [
  { q: "2026년 출산휴가급여 상한액이 올라간 이유가 뭔가요?", a: "2026년 최저임금이 10,320원으로 올라서 월급 기준 약 215만원이에요. 기존 상한액 210만원이 하한보다 낮아지는 역전 현상을 막기 위해 220만원으로 올렸어요." },
  { q: "대기업 직원은 출산휴가급여를 어디서 받나요?", a: "최초 60일은 회사에서 통상임금 100%를 받고, 나머지 30일만 고용보험에서 받아요 (상한 220만원). 중소기업은 90일 전체가 고용보험이에요." },
  { q: "배우자출산휴가 20일 급여는 전부 정부에서 주나요?", a: "중소기업(우선지원대상기업) 근로자는 20일 전액 고용보험에서 급여를 지원해요. 대기업 근로자는 회사에서 유급휴가로 줘요." },
  { q: "출산휴가 끝나면 바로 육아휴직 연결 가능한가요?", a: "네, 따로 복직하지 않고 바로 연결할 수 있어요. 6+6 부모육아휴직제 혜택을 받기에도 좋은 타이밍이에요." },
  { q: "신청 기한을 놓치면 어떻게 되나요?", a: "출산휴가 시작 후 1개월부터 휴가 종료 후 12개월 이내에 신청해야 해요. 이 기간이 지나면 급여를 못 받으니까 출산 직후 달력에 꼭 표시해두세요." },
  { q: "쌍둥이를 낳으면 휴가가 더 길어지나요?", a: "네, 다태아는 출산전후휴가가 90일이 아닌 120일이에요. 급여 상한도 동일하게 적용돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부 출산전후휴가 급여 상한액 고시", url: "https://www.moel.go.kr" },
    { label: "고용24 출산전후휴가 급여 신청", url: "https://www.work24.go.kr" },
    { label: "고용보험법 출산전후휴가 급여", url: "https://www.law.go.kr/법령/고용보험법" },
    { label: "근로기준법 출산전후휴가", url: "https://www.law.go.kr/법령/근로기준법" },
  ] },
];

const RELATED = [
  { slug: "2026년-육아휴직급여", title: "2026년 육아휴직급여 계산·6+6 제도", description: "출산휴가 끝나면 바로 연결할 수 있는 육아휴직 급여예요." },
  { slug: "육아기-근로시간-단축", title: "육아기 근로시간 단축", description: "급여 상한액 인상과 신청 방법을 확인하세요." },
  { slug: "2026년-달라지는-제도", title: "2026년 달라지는 제도", description: "출산·육아 외에도 바뀌는 제도가 많아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>출산휴가 · 고용보험 · 모성보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 출산휴가급여, 상한액이 또 올랐어요<br />
        신청방법·배우자휴가 20일까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        출산을 앞두고 급여가 얼마나 나오는지 궁금하시죠?
        2026년 1월부터 출산전후휴가 급여 상한액이 <strong>월 220만원</strong>으로 올랐어요.
        배우자출산휴가도 20일로 늘어나서 아빠도 쓸 수 있는 시간이 넉넉해졌어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* 섹션 1: 핵심 숫자 */}
      <H2>상한액이 220만원으로 올랐어요</H2>
      <p style={body}>
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>가 매년 출산전후휴가 급여 상한액을 고시해요.
        2025년까지 월 210만원이었는데, 최저임금 인상으로 역전 현상이 생겨서 220만원으로 올렸어요.
        최저임금 기준 월급이 약 215만원인데 상한이 210만원이면 말이 안 되니까요.
      </p>

      <GreenBox title="2026년 출산전후휴가 급여 핵심">
        출산휴가 급여 상한: <strong>월 220만원</strong> (2025년 210만원 → +10만원)<br />
        출산휴가 기간: <strong>90일</strong> (다태아 120일)<br />
        배우자출산휴가: <strong>20일</strong> (출산일로부터 120일 이내 사용)
      </GreenBox>

      <p style={body}>
        상한액은 &ldquo;최대 이만큼까지만&rdquo;이라는 뜻이에요. 통상임금이 200만원이면 200만원 그대로 받아요.
        220만원 이상인 분만 상한에 걸려요.
      </p>

      <Divider />

      {/* 섹션 2: 대기업 vs 중소기업 */}
      <H2>대기업과 중소기업, 지급 방식이 달라요</H2>
      <p style={body}>
        출산휴가 90일 급여가 전부 고용보험에서 나오는 게 아니에요.
        회사 규모에 따라 누가 급여를 주는지가 완전히 달라요. 본인 회사가 어디에 해당하는지 확인해보세요.
      </p>

      <SectionBadge>지급 방식 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>대기업</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>중소기업 (우선지원대상)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["최초 60일", "회사 지급 (통상임금 100%)", "고용보험 (상한 220만원)"],
              ["이후 30일", "고용보험 (상한 220만원)", "고용보험 (상한 220만원)"],
              ["총 지급 주체", "회사 + 고용보험", "고용보험 전액"],
            ].map(([item, big, small], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{big}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{small}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        우선지원대상기업(중소기업) 기준이에요.<br />
        · 제조업: 500인 이하<br />
        · 건설·운수·통신업: 300인 이하<br />
        · 도소매·숙박·음식점업: 200인 이하<br />
        · 기타: 100인 이하<br />
        → 모르겠으면 회사 인사팀에 확인하세요.
      </BorderBox>

      <ArticleAd position="mid" />
      <Divider />

      {/* 섹션 3: 배우자출산휴가 */}
      <H2>아빠도 20일 출산휴가 쓸 수 있어요</H2>
      <p style={body}>
        10일이던 배우자출산휴가가 <strong>20일</strong>로 늘었어요. 출산일로부터 120일 이내에 3회까지 나눠서 쓸 수 있어요.
        출산 직후에 10일 쓰고, 한 달 뒤에 10일 더 쓰는 식도 가능해요.
      </p>

      <GreenBox title="배우자출산휴가 핵심">
        기간: <strong>20일</strong> (출산일로부터 120일 이내)<br />
        분할: <strong>3회까지</strong> 나눠서 사용 가능<br />
        급여: 중소기업은 20일 전액 <strong>고용보험</strong> 지원 / 대기업은 <strong>회사 유급</strong>
      </GreenBox>

      <p style={body}>
        예전에는 최초 5일만 정부 지원이었는데, 2025년 2월 개정법 시행 이후 20일 전액 고용보험에서 급여를 지원해요 (중소기업 기준).
        급여 상한은 20일분 약 168만원 수준이에요.
      </p>

      <Divider />

      {/* 섹션 4: 신청 방법 */}
      <H2>출산휴가 급여 신청, 이 순서로 하세요</H2>
      <p style={body}>
        회사에서 알아서 급여를 챙겨주는 게 아니에요. <strong>본인이 직접</strong> <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 신청해야 해요.
        출산하고 정신없을 때 깜빡하기 쉬우니까 출산 전에 미리 알아두세요.
        신청 기한은 출산휴가 시작 후 1개월~종료 후 12개월이에요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        온라인이 어려우면 관할 고용센터에 방문하거나, 고용노동부 상담센터 <strong>1350</strong>으로 전화하면 안내받을 수 있어요.
      </p>

      <Divider />

      {/* 섹션 5: 육아휴직 연결 */}
      <H2>출산휴가 끝나면 육아휴직으로 바로 연결돼요</H2>
      <p style={body}>
        출산휴가 90일이 끝나면 복직 없이 바로 <a href="/w/2026년-육아휴직급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>육아휴직</a>으로 연결할 수 있어요.
        6+6 부모육아휴직제를 쓰면 첫 6개월은 통상임금 100%(상한 450만원)까지 받을 수 있으니까, 출산휴가 끝나자마자 연결하는 게 유리해요.
      </p>

      <SectionBadge>출산휴가 vs 육아휴직 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>출산전후휴가</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>육아휴직</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["대상", "출산한 여성 근로자", "만 8세 이하 자녀 부모 (남녀 모두)"],
              ["기간", "90일 (다태아 120일)", "최대 1년 6개월"],
              ["급여 상한", "월 220만원", "일반 160만원 / 6+6 450만원"],
              ["지급 주체", "고용보험 + 회사", "고용보험"],
            ].map(([item, maternity, parental], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{maternity}</td>
                <td style={{ padding: "9px 12px" }}>{parental}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />

      <Divider />
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 고용노동부·고용보험법·근로기준법을 바탕으로 작성됐어요. 개인별 정확한 급여는 고용24(work24.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
