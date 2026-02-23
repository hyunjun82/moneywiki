"use client";

import { useState } from "react";
import {
  C, Btn, Info, InlineLink, SpokeLink, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
} from "@/components/wiki/BlogShared";

// ── 체커 로직: 유족관계별 청구 순위 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; rank?: string; links: ResLink[] };

const commonLinks: ResLink[] = [
  { icon: "📋", title: "청구 절차와 필요 서류 확인", href: "#section-03" },
  { icon: "📊", title: "소정급여일수 — 남은 급여일수 확인", href: "/w/실업급여-소정급여일수" },
  { icon: "📝", title: "실업급여 신청방법 전체 안내", href: "/w/실업급여-신청방법" },
];

function getResult(sel: Record<string, string>): Res | null {
  const { relation } = sel;
  if (!relation) return null;

  if (relation === "spouse_child") return { pass: true, headline: "1순위 청구권자예요", detail: "배우자와 자녀는 1순위 청구권자예요. 생계를 같이하지 않아도 청구할 수 있어요. 사망일로부터 3년 이내에 고용센터에 청구하면 돼요.", badges: ["1순위", "청구 가능"], rank: "1순위", links: commonLinks };
  if (relation === "parent") return { pass: true, headline: "2순위 청구권자예요", detail: "배우자나 자녀가 없을 때 부모가 2순위로 청구할 수 있어요. 1순위 청구권자가 있으면 청구할 수 없어요. 사망일로부터 3년 이내에 신청해야 해요.", badges: ["2순위", "1순위 없을 때"], rank: "2순위", links: commonLinks };
  if (relation === "grandchild_grandparent") return { pass: true, headline: "3순위 청구권자예요", detail: "1·2순위 청구권자가 모두 없을 때 손자녀 또는 조부모가 3순위로 청구할 수 있어요. 선순위 유족이 청구권을 포기한 경우에도 청구할 수 있어요.", badges: ["3순위", "선순위 없을 때"], rank: "3순위", links: commonLinks };
  if (relation === "sibling") return { pass: true, headline: "4순위 청구권자예요", detail: "형제자매는 가장 마지막 순위로, 1~3순위 청구권자가 모두 없을 때만 청구할 수 있어요. 생계를 같이했는지 여부는 관계없어요.", badges: ["4순위", "선순위 전원 없을 때"], rank: "4순위", links: commonLinks };

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "미지급 유족 청구"]}
      tags={["2026년 기준", "실업급여", "미지급"]}
      date="2026-02-20"
      title="실업급여 미지급 사망 유족 | 배우자 자녀 기한"
      description={
        <>
          실업급여 수급 중 사망하면 남은 급여를 유족이 받을 수 있어요. 청구 순위는 배우자·자녀 → 부모 → 조부모 → 형제자매 순이고, <strong style={{ color: C.t1 }}>3년 소멸시효</strong>가 있어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제63조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="소멸시효"
      stickyValue="사망일로부터 3년"
      stickyBtn="고용24 청구 안내 →"
      stickyHref="https://www.work24.go.kr/cm/c/d/UECMCDA0101.do"
    >
      <TOC items={[
        { t: "유족 청구 자격 확인 체크", sub: "수급자와의 관계별 순위" },
        { t: "실업급여 미지급은 누가 받나요?", sub: null },
        { t: "사망 시 유족 청구는 어떻게 하나요?", sub: "필요 서류 안내" },
        { t: "배우자 자녀 순위는 어떻게 되나요?", sub: "유족 청구 순위표" },
        { t: "유족 청구 기한은 언제까지인가요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "실업급여 수급자가 사망하면 미지급 급여는 <strong>유족이 청구</strong>할 수 있어요.",
        "수급 순위는 배우자·자녀 → 부모 → 손자녀·조부모 → <strong>형제자매</strong> 순이에요.",
        "청구권은 사망일로부터 <strong>3년</strong>이 지나면 소멸시효가 완성돼요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="유족 청구 자격 확인 체크" sub="사망한 수급자와의 관계를 선택하면 청구 순위를 알려드려요" />

      <P>실업급여 미지급 유족 청구는 관계에 따라 순위가 정해져요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제63조</A>에서 순위를 명시하고 있어요. 선순위 청구권자가 있으면 후순위는 청구할 수 없으니 먼저 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>유족 청구 순위 확인</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>30초면 확인할 수 있어요</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              사망한 수급자와 어떤 관계인가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="relation" value="spouse_child" label="배우자 또는 자녀" sel={sel} pick={pick} />
              <Btn group="relation" value="parent" label="부모 (친부모·양부모)" sel={sel} pick={pick} />
              <Btn group="relation" value="grandchild_grandparent" label="손자녀 또는 조부모" sel={sel} pick={pick} />
              <Btn group="relation" value="sibling" label="형제자매" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: C.navyLight, border: "1px solid rgba(30,58,95,.1)" }}>
              {result.rank && (
                <div style={{ fontSize: 22, fontWeight: 900, color: C.navy, marginBottom: 6 }}>
                  {result.rank} <span style={{ fontSize: 12, color: C.t3, fontWeight: 400 }}>청구권자</span>
                </div>
              )}
              <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginBottom: 4 }}>{result.headline}</div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: C.navy, color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(30,58,95,.08)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>{"📖 다음 단계 안내"}</div>
                  {result.links.map((lnk, li) => (
                    <a key={li} href={lnk.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: "1px solid rgba(30,58,95,.06)", textDecoration: "none" }}>
                      <span>{lnk.icon} {lnk.title}</span>
                      <span style={{ fontSize: 11, color: C.t4 }}>{"\u2192"}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 02. 미지급 수급 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 미지급은 누가 받나요?" sub="유족의 고유 청구권 — 상속재산과 별도" />

      <P>실업급여 수급자가 사망하면 아직 지급되지 않은 급여는 유족이 본인 명의로 청구할 수 있어요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제63조</A>에서 미지급 실업급여는 수급자격자의 유족이 청구할 수 있다고 정하고 있어요.</P>

      <P>여기서 중요한 점이 있어요. 미지급 실업급여는 상속재산이 아니에요. 유족의 고유 청구권이기 때문에 수급자에게 채무가 있어도 채권자가 압류할 수 없어요. 상속을 포기해도 미지급 실업급여는 별도로 청구할 수 있어요.</P>

      <P>청구 대상은 사망일 이전에 발생한 실업인정 기간 중 지급이 완료되지 않은 금액이에요. 예를 들어 실업인정일에 신청은 했지만 지급 전에 사망했다면 그 금액을 청구할 수 있어요.</P>

      <P>유족이 청구할 수 있는 건 미지급 급여만이에요. 수급자가 아직 실업인정을 받지 않은 기간의 급여는 청구 대상이 아니에요. 이미 발생한 급여 채권 중에서 실제 지급이 안 된 부분만 해당돼요.</P>

      <Info type="tip">{'<strong>상속 포기와 별개:</strong> 수급자의 채무가 많아서 상속을 포기해도 미지급 실업급여는 <strong>별도로 청구할 수 있어요</strong>. 유족 고유 권리이기 때문이에요.'}</Info>

      <InlineLink icon="📊" title="실업급여 소정급여일수 — 나이별 수급 기간표" desc="사망한 수급자의 남은 급여일수를 파악하려면 나이와 피보험기간으로 확인하세요." href="/w/실업급여-소정급여일수" />

      {/* ── SECTION 03. 청구 절차 ── */}
      <Divider />
      <Sec n="SECTION 03" title="사망 시 유족 청구는 어떻게 하나요?" sub="고용센터 방문 신청 — 온라인은 불가" />

      <P>미지급 실업급여를 청구하려면 수급자가 마지막으로 다니던 고용센터에 방문해야 해요. 온라인 신청은 되지 않고, 직접 방문해서 청구서를 제출해야 해요.</P>

      <P>필요한 서류는 미지급 실업급여 청구서, 수급자의 사망 사실을 확인할 수 있는 사망진단서 또는 가족관계증명서, 그리고 청구인 본인 신분증과 통장 사본이에요. 가족관계를 증명하는 서류가 추가로 필요할 수 있어요.</P>

      <P>청구서 양식은 고용센터 방문 시 현장에서 받을 수 있어요. 사전에 <A href="https://www.work24.go.kr">고용24</A>에서 서류를 확인해두면 방문 시 빠르게 처리할 수 있어요.</P>

      <P><B>사망일로부터 3년 이내에 청구해야 소멸시효가 완성되기 전에 받을 수 있어요.</B> 바쁘더라도 3년 안에는 꼭 청구해두세요.</P>

      <Info type="warn">{'<strong>서류 체크리스트:</strong> ① 미지급 청구서(현장 수령) ② 사망진단서 또는 가족관계증명서 ③ 청구인 신분증 ④ 청구인 명의 통장 사본'}</Info>

      <InlineLink icon="📋" title="실업급여 구비서류 — 신청 시 필요한 서류 전체" desc="수급자격 신청부터 실업인정까지 단계별 필요 서류를 정리했어요." href="/w/실업급여-구비서류" />

      {/* ── SECTION 04. 순위 ── */}
      <Divider />
      <Sec n="SECTION 04" title="배우자 자녀 순위는 어떻게 되나요?" sub="고용보험법 제63조 기준 유족 순위" />

      <P>유족 청구 순위는 고용보험법에서 정한 순서가 있어요. 선순위 청구권자가 있으면 후순위는 청구할 수 없어요.</P>

      <P>1순위는 배우자와 자녀예요. 법률혼 배우자와 혼인 외 출생자를 포함한 자녀 모두 해당해요. 생계를 같이하지 않아도 되고, 배우자와 자녀가 여러 명이면 같은 순위로 동등하게 나눠요. 2순위는 부모예요. 친부모·양부모 모두 포함되고, 1순위 청구권자가 없을 때 청구할 수 있어요. 3순위는 손자녀 또는 조부모예요. 4순위는 형제자매예요.</P>

      <P>선순위 유족이 청구권을 포기하거나 모두 사망한 경우 후순위가 청구할 수 있어요. 순위가 같은 유족이 여러 명이면 대표 청구인을 지정해서 일괄 신청하거나 각각 청구할 수 있어요.</P>

      <TableTitle>미지급 실업급여 유족 청구 순위</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>순위</THL><TH>대상</TH><TH>조건</TH></tr>
          </thead>
          <tbody>
            {[
              ["1순위", "배우자·자녀", "동등하게 나눔"],
              ["2순위", "부모 (친부모·양부모)", "1순위 없을 때"],
              ["3순위", "손자녀·조부모", "1~2순위 없을 때"],
              ["4순위", "형제자매", "1~3순위 없을 때"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 같은 순위 유족이 여러 명이면 동등하게 나눠서 청구</TableNote>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.t1, marginBottom: 10 }}>{"📖 실업급여 청구 더 알아보기"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <SpokeLink num="01" title="실업급여 신청방법 — 고용센터 방문부터 온라인까지" desc="수급자격 신청 전체 절차 안내" href="/w/실업급여-신청방법" />
          <SpokeLink num="02" title="실업급여 지급일 — 실업인정 후 입금까지 기간" desc="지급 주기와 입금 시점 확인" href="/w/실업급여-지급일" />
          <SpokeLink num="03" title="실업급여 수급자격 — 비자발적 퇴사 기준" desc="자발적·비자발적 퇴사별 수급자격 판단" href="/w/실업급여-수급자격" />
        </div>
      </div>

      {/* ── SECTION 05. 소멸시효 ── */}
      <Divider />
      <Sec n="SECTION 05" title="유족 청구 기한은 언제까지인가요?" sub="사망일로부터 3년 — 소멸시효" />

      <P>미지급 실업급여 청구권의 소멸시효는 <B>사망일로부터 3년</B>이에요. 3년이 지나면 청구권이 소멸해서 더 이상 받을 수 없어요. 고용보험법에서 실업급여 청구권의 소멸시효를 3년으로 정하고 있어요.</P>

      <P>소멸시효 기산점은 수급자가 사망한 날이에요. 사망 사실을 나중에 알았더라도 사망일 기준으로 기산해요. 예를 들어 2024년 3월에 사망했다면 2027년 3월까지 청구해야 해요.</P>

      <P>소멸시효가 완성되기 전에 청구서를 제출하면 시효가 중단돼요. 고용센터에서 접수증을 받아두면 청구 사실을 입증할 수 있어요.</P>

      <P>상속 절차와 별개로 진행할 수 있으니, 상속 정리가 끝나지 않았더라도 미지급 실업급여는 먼저 청구해두는 게 좋아요. 특히 3년 시효가 임박했다면 서류가 완비되지 않아도 일단 청구서를 제출해서 시효를 중단시키는 게 중요해요.</P>

      <InlineLink icon="📊" title="소정급여일수 기준표 — 나이와 피보험기간별 수급 기간" desc="수급자의 남은 급여일수를 확인하려면 나이·피보험기간 기준표를 참고하세요." href="/w/실업급여-소정급여일수" />

      <BridgeCard
        question="상속 포기해도 미지급 급여는 받을 수 있다는 거 아셨나요?"
        body={<>미지급 실업급여는 상속재산이 아니에요. 수급자에게 채무가 있어서 <strong style={{ color: C.navy }}>상속을 포기</strong>해도 유족 고유 청구권으로 별도 청구가 가능해요.</>}
        btnText="청구 절차와 서류 확인 →"
        href="/w/실업급여-신청방법"
      />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 미지급 청구 시 유족 간 순위가 같으면 어떻게 되나요?", a: '같은 순위의 유족이 여러 명이면 <strong>동등하게 나눠 받아요</strong>. 예를 들어 자녀가 2명이면 각각 절반씩 청구할 수 있어요. 대표 청구인을 지정해서 일괄 신청하는 경우도 있어요.' },
        { q: "실업급여 미지급 사망 시 수급자의 빚이 있으면 어떻게 되나요?", a: '미지급 실업급여는 상속재산과 <strong>별도로 취급</strong>돼요. 수급자에게 채무가 있어도 유족의 고유 청구권이기 때문에 채권자가 압류할 수 없어요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 신청방법 — 고용센터 방문부터 온라인까지", desc: "실업급여 · 신청", href: "/w/실업급여-신청방법" },
        { title: "실업급여 수급자격 — 자발적·비자발적 퇴사 기준", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급자격" },
        { title: "실업급여 지급일 — 실업인정 후 입금까지 기간", desc: "실업급여 · 지급일", href: "/w/실업급여-지급일" },
        { title: "실업급여 소정급여일수 — 나이별 기간표", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 기초일액 상한·하한", href: "/w/실업급여-기초일액" }}
        next={{ title: "실업급여 반복수급 감액", href: "/w/실업급여-반복수급" }}
      />
    </BlogLayout>
  );
}
