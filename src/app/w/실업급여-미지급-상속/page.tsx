"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실업급여 수급 중 가족이 사망해서, 남은 급여를 유족이 받을 수 있는지 찾는 상황
// Q2. 사망일로부터 3년 이내에 고용센터에 미지급 실업급여 청구서 제출
// Q3. 유족 청구 순위(배우자·자녀→부모→손자녀·조부모→형제자매), 상속재산 아님 고유 청구권, 3년 소멸시효, 필요서류
// Q4. GreenBox(유족 순위표) + BorderBox(청구 절차·서류) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "상속을 포기하면 미지급 실업급여도 못 받나요?",
    a: "받을 수 있어요. 미지급 실업급여는 상속재산이 아니에요. 유족의 고유 청구권이기 때문에, 상속을 포기해도 별도로 청구할 수 있어요. 수급자에게 빚이 있어도 채권자가 압류할 수 없어요.",
  },
  {
    q: "유족 간 순위가 같으면 어떻게 나누나요?",
    a: "같은 순위 유족이 여럿이면 동등하게 나눠요. 자녀가 2명이면 각각 절반씩 청구할 수 있어요. 대표 청구인을 지정해 일괄 신청하는 방법도 있어요.",
  },
  {
    q: "사망 사실을 1년 뒤에 알았어도 3년 이내면 되나요?",
    a: "소멸시효 기산점은 사망일이에요. 나중에 알았더라도 사망일 기준으로 3년을 계산해요. 사망 시점이 언제인지 먼저 확인하는 게 중요해요.",
  },
  {
    q: "온라인으로 청구할 수 없나요?",
    a: "미지급 실업급여 유족 청구는 고용센터 방문이 원칙이에요. 수급자가 마지막으로 다니던 고용센터에 직접 방문해서 청구서를 제출해야 해요.",
  },
  {
    q: "청구 가능한 금액은 어떻게 알 수 있나요?",
    a: "수급자의 실업인정 기간 중 지급이 완료되지 않은 금액이에요. 실업인정일에 신청은 했지만 지급 전에 사망한 경우 그 금액이 해당돼요. 고용센터에서 정확한 금액을 조회해 줘요.",
  },
];

const CLAIM_STEPS = [
  { title: "수급자 담당 고용센터 확인", desc: "수급자가 마지막으로 다니던 고용센터예요. 고용24(work24.go.kr)에서 가까운 고용센터를 조회할 수 있어요." },
  { title: "서류 준비", desc: "사망진단서 또는 가족관계증명서, 청구인 신분증 사본, 청구인 통장 사본, 미지급 실업급여 청구서를 준비해요." },
  { title: "고용센터 방문 접수", desc: "청구서와 서류를 제출해요. 소멸시효가 임박하면 서류가 미완비라도 먼저 청구서를 접수해서 시효를 중단시켜요." },
  { title: "지급 결정 및 입금", desc: "담당자가 서류 검토 후 지급 여부와 금액을 결정해요. 통장으로 입금돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법 제63조 - 미지급 실업급여의 청구", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 - 실업급여 안내", url: "https://www.work24.go.kr/cm/c/d/UECMCDA0101.do" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-신청방법", title: "실업급여 신청방법", description: "수급자 본인의 신청 절차와 서류 준비예요." },
  { slug: "실업급여-소정급여일수", title: "실업급여 소정급여일수", description: "나이와 피보험기간에 따라 120~270일 기준표예요." },
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "실업급여를 받기 위한 기본 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 미지급 · 유족 청구</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 미지급 유족 청구<br />
        순위·소멸시효·서류 한 번에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 수급 중 사망하면 남은 급여는 사라지지 않아요.
        유족이 직접 청구할 수 있는 고유 권리예요.
        상속 포기와 무관하고, 사망일로부터 3년 이내면 청구할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>미지급 실업급여는 누가 받나요?</H2>
      <p style={body}>
        수급자가 사망하면 아직 지급되지 않은 급여는 유족이 본인 명의로 청구할 수 있어요.
        <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>고용보험법 제63조</a>에서
        미지급 실업급여는 수급자격자의 유족이 청구할 수 있다고 정하고 있어요.
      </p>
      <p style={body}>
        여기서 중요한 점이 있어요. 미지급 실업급여는 상속재산이 아니에요.
        유족의 고유 청구권이기 때문에 수급자에게 채무가 있어도 채권자가 압류할 수 없어요.
        상속을 포기해도 미지급 실업급여는 별도로 청구할 수 있어요.
      </p>
      <p style={body}>
        청구 대상은 사망일 이전에 발생한 실업인정 기간 중 지급이 완료되지 않은 금액이에요.
        실업인정일에 신청은 했지만 지급 전에 사망했다면 그 금액을 청구할 수 있어요.
        수급자가 아직 실업인정을 받지 않은 기간의 급여는 청구 대상이 아니에요.
      </p>

      <GreenBox>
        <strong style={{ display: "block", marginBottom: 8 }}>미지급 실업급여 유족 청구 순위</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>순위</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>대상</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: "1순위", who: "배우자·자녀", cond: "동등하게 나눔, 생계 무관" },
              { rank: "2순위", who: "부모 (친부모·양부모)", cond: "1순위 없을 때" },
              { rank: "3순위", who: "손자녀·조부모", cond: "1~2순위 없을 때" },
              { rank: "4순위", who: "형제자매", cond: "1~3순위 없을 때" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.rank}</td>
                <td style={{ padding: "5px 8px" }}>{row.who}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#555" }}>{row.cond}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 선순위 청구권자가 있으면 후순위는 청구 불가 / 선순위 포기 시 후순위 가능
        </p>
      </GreenBox>

      <H2>유족 청구 절차와 필요서류</H2>
      <p style={body}>
        미지급 실업급여를 청구하려면 수급자가 마지막으로 다니던 고용센터에 방문해야 해요.
        온라인 신청은 되지 않고, 직접 방문해서 청구서를 제출해야 해요.
      </p>
      <p style={body}>
        방문 전에 서류를 미리 준비해두면 한 번에 처리할 수 있어요.
        사망진단서 또는 가족관계증명서로 사망 사실을 확인하고,
        청구인 본인 신분증과 통장 사본을 지참해야 해요.
      </p>

      <BorderBox>
        <strong>필요 서류 목록</strong><br />
        미지급 실업급여 청구서 (고용센터에서 수령 가능)<br />
        사망진단서 또는 가족관계증명서 (사망 사실 확인)<br />
        청구인 신분증 사본<br />
        청구인 통장 사본<br />
        유족 관계를 증명하는 서류 (가족관계증명서 등)<br />
        <br />
        <strong>방문 장소</strong><br />
        수급자가 마지막으로 담당했던 고용센터 (전국 어디서나 가능)<br />
        <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>고용24</a>에서 가까운 고용센터 검색 가능<br />
        <br />
        ★ 서류가 미완비라도 소멸시효가 임박하면 먼저 청구서 제출해서 시효 중단
      </BorderBox>

      <H2>유족 청구 4단계 절차</H2>
      <p style={body}>
        서류만 갖춰지면 고용센터 1번 방문으로 청구를 마칠 수 있어요.
      </p>

      <Steps steps={CLAIM_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>3년 소멸시효, 놓치면 못 받아요</H2>
      <p style={body}>
        미지급 실업급여 청구권의 소멸시효는 사망일로부터 3년이에요.
        3년이 지나면 청구권이 소멸해서 더 이상 받을 수 없어요.
        고용보험법에서 실업급여 청구권의 소멸시효를 3년으로 정하고 있어요.
      </p>
      <p style={body}>
        소멸시효 기산점은 수급자가 사망한 날이에요.
        사망 사실을 나중에 알았더라도 사망일 기준으로 기산해요.
        예를 들어 2024년 3월에 사망했다면 2027년 3월까지 청구해야 해요.
      </p>
      <p style={body}>
        상속 절차와 별개로 진행할 수 있어요.
        상속 정리가 끝나지 않았더라도 미지급 실업급여는 먼저 청구해두는 게 좋아요.
        3년 시효가 임박했다면 서류가 완비되지 않아도 일단 청구서를 제출해서 시효를 중단시키는 게 중요해요.
      </p>

      <GreenBox>
        <strong>소멸시효 계산 예시</strong><br />
        2024년 3월 15일 사망 → 2027년 3월 14일까지 청구 가능<br />
        2025년 1월 1일 사망 → 2027년 12월 31일까지 청구 가능<br />
        <br />
        ★ 고용센터 청구서 접수증을 받아두면 청구 사실 입증 가능<br />
        ★ 소멸시효 임박 시 서류 미완비라도 먼저 청구서 제출
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 고용보험법 제63조 기준으로 작성됐어요. 미지급 실업급여 청구 관련 세부 사항은 담당 고용센터에 문의하시길 권해요." />
    </ArticleLayout>
  );
}
