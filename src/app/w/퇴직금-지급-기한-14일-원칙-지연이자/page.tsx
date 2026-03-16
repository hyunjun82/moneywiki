"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-지급-기한-14일-원칙-지연이자";

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar data={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      <article>
        {/* 타이틀 */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
            퇴직금 · 14일기한 · 지연이자
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, color: "#111827", marginBottom: "0.5rem" }}>
            퇴직금 지급 기한 14일 원칙, 넘기면 연 20%?
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#374151", fontWeight: 500 }}>
            지연이자 계산법부터 신고 절차까지
          </p>
        </div>

        {/* 인트로 */}
        <p style={body.prose}>
          퇴직금은 퇴직 후 14일 이내에 받아야 해요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75" }}>근로기준법 제36조</a>에 명시된 기한이에요. 14일이 지나면 연 20% 지연이자가 붙기 시작해요. 1,000만원 퇴직금이 60일 지연되면 이자만 약 33만원이에요. 기한 체크부터 지연이자 청구까지 정리했어요.
        </p>

        <Divider />

        {/* 섹션 1: 14일 기한 원칙 */}
        <H2>14일 기한, 어디서 어떻게 세는 건가요</H2>
        <SectionBadge>기한 계산법</SectionBadge>

        <p style={body.prose}>
          퇴직일 다음 날부터 14일째가 지급 마감이에요. 3월 1일에 퇴직했다면 3월 15일이 기한이에요. 공휴일이나 주말도 기한에 포함되니까, "이번 주말 빼고" 같은 계산은 통하지 않아요.
        </p>

        <GreenBox>
          <strong>14일 기한 계산 공식</strong><br />
          퇴직일 + 1일 = 기산일 → 기산일부터 14일째 = 마감일<br />
          예) 3월 1일 퇴직 → 3월 2일 기산 → 3월 15일까지 지급 필수
        </GreenBox>

        <p style={body.prose}>
          단, 당사자 간 <strong>서면 합의</strong>가 있으면 기한을 연장할 수 있어요. 핵심은 "서면"이에요. 회사가 전화나 말로 "다음 달에 주겠다"고 해도 법적 효력이 없어요. 서면 합의 없이 14일이 지나면 그 순간부터 지연이자가 발생해요.
        </p>

        <BorderBox>
          <strong>기한 연장이 가능한 경우</strong><br />
          - 당사자 간 서면(서명 있는 문서) 합의가 있을 때<br />
          - 회사 도산·경영난으로 지급이 불가능할 때 (단, 신고 후 법원 판단)
        </BorderBox>

        <p style={body.prose}>
          "회사 자금이 없다"는 건 기한 면제 사유가 아니에요. 그건 회사 내부 사정이고, 법적 의무는 그대로예요. 14일을 넘긴 순간 <a href="/w/퇴직금-지연이자">지연이자 청구권</a>이 자동으로 생겨요.
        </p>

        <Divider />

        {/* 섹션 2: 지연이자 계산기 */}
        <H2>지연이자 얼마나 붙을지 바로 계산해보세요</H2>
        <SectionBadge>지연이자 계산기</SectionBadge>

        <p style={body.prose}>
          연 20% 기준으로 하루하루 쌓여요. 미지급 퇴직금에 0.2를 곱하고, 지연 일수를 365로 나누면 돼요. 금액이 클수록, 기간이 길수록 이자도 눈덩이처럼 불어나요.
        </p>

        <Calculator
          sliders={[
            {
              key: "amount",
              label: "미지급 퇴직금",
              min: 100,
              max: 5000,
              step: 100,
              defaultValue: 1000,
              format: (v) => `${v.toLocaleString()}만원`,
            },
            {
              key: "days",
              label: "14일 초과 지연 일수",
              min: 1,
              max: 365,
              step: 1,
              defaultValue: 60,
              format: (v) => `${v}일`,
            },
          ]}
          results={[
            {
              key: "result1",
              label: "지연이자 (연 20%)",
              highlight: true,
              getValue: (v) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
              format: (v) => v < 10000 ? `${v.toLocaleString()}원` : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
            },
            {
              key: "result2",
              label: "총 청구 금액 (원금+이자)",
              highlight: false,
              getValue: (v) => v.amount * 10000 + Math.round(v.amount * 10000 * 0.2 * v.days / 365),
              format: (v) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
            },
          ]}
          note="※ 근로기준법 제37조 연 20% 기준. 퇴직 후 14일 초과 시점부터 계산."
        />

        <CategoryButton href="/w/퇴직금" label="퇴직금 전체 가이드 보기" />

        <RelatedArticles
          items={[
            { href: "/w/퇴직금-지급-기한", label: "퇴직금 지급 기한 14일", desc: "기한 초과 시 대응" },
            { href: "/w/퇴직금-지연이자", label: "퇴직금 지연이자 연 20%", desc: "청구 방법" },
            { href: "/w/퇴직금-미지급-신고", label: "퇴직금 미지급 신고", desc: "노동청 진정 절차" },
          ]}
        />

        <Divider />

        {/* 섹션 3: 나에게 해당하는지 체크 */}
        <H2>지연이자 청구 대상인지 먼저 체크해보세요</H2>
        <SectionBadge>해당 여부 확인</SectionBadge>

        <p style={body.prose}>
          지연이자는 아무나 받는 게 아니에요. 아래 항목에 해당해야 청구권이 생겨요. 4개 중 하나라도 빠지면 상황이 달라질 수 있으니 꼼꼼히 체크해요.
        </p>

        <EligibilityChecker
          title="지연이자 청구 가능 여부"
          items={[
            "퇴사일로부터 14일이 넘었어요",
            "회사에서 입금 날짜를 미루고 있어요",
            "기한 연장 서면 동의를 한 적 없어요",
            "퇴직 후 3년이 안 됐어요",
          ]}
          passMessage="지연이자 청구 가능해요. 아래 절차대로 진행하세요."
          failMessage="일부 항목이 해당되지 않아요. 상황에 따라 법률 전문가 상담이 필요할 수 있어요."
        />

        <p style={body.prose}>
          소멸시효는 퇴직일부터 3년이에요. 3년이 지나면 <a href="/w/퇴직금-소멸시효">청구권이 사라져요</a>. 늦어질수록 불리하니까 가능한 빨리 행동하는 게 맞아요.
        </p>

        <Divider />

        {/* 섹션 4: 신고 절차 */}
        <H2>기한 넘겼을 때 이렇게 단계별로 움직이세요</H2>
        <SectionBadge>단계별 대응</SectionBadge>

        <p style={body.prose}>
          막막하게 느껴지지만 순서대로 하면 어렵지 않아요. 첫 단계는 증거 남기기, 마지막 단계는 노동청 진정이에요. 각 단계마다 팁도 챙겨두면 실전에서 훨씬 수월해요.
        </p>

        <Steps
          items={[
            {
              title: "14일 기한 확인",
              description: "퇴직일 다음날부터 14일째가 마감",
              tip: "공휴일·주말도 기한에 포함",
            },
            {
              title: "지급 요청 문자 발송",
              description: "\"○월 ○일 기준 14일 경과, 지급 요청\" 문자 발송",
              tip: "날짜 명시해서 증거 남기기",
            },
            {
              title: "내용증명 발송",
              description: "지연이자 포함 청구",
              tip: "카카오 전자내용증명 10분 완성",
            },
            {
              title: "노동청 진정",
              description: "임금체불 진정 접수, 지연이자 항목 포함 명시",
              tip: "minwon.moel.go.kr 온라인 접수",
            },
          ]}
        />

        <p style={body.prose}>
          노동청 진정을 넣을 때 "지연이자 청구"를 명시해야 해요. 그냥 "퇴직금 못 받았다"만 적으면 지연이자는 빠질 수 있어요. 진정서에 <strong>근로기준법 제37조, 연 20% 지연이자</strong>를 직접 써넣으세요.
        </p>

        <DocTable
          docs={[
            { name: "퇴직일 증빙", required: true, source: "본인보관" },
            { name: "근로계약서", required: true, source: "인사팀" },
            { name: "급여명세서", required: true, source: "인사팀" },
            { name: "문자·메일 기록", required: false, source: "직접캡처" },
          ]}
        />

        <Divider />

        {/* 섹션 5: 체크리스트 + FAQ */}
        <H2>놓치기 쉬운 포인트, 하나씩 짚어볼게요</H2>
        <SectionBadge>핵심 체크리스트</SectionBadge>

        <p style={body.prose}>
          퇴직금 분쟁에서 패하는 이유 대부분은 증거 부족이에요. 특히 기한 계산을 잘못하거나, IRP 계좌 준비를 안 해서 입금 자체가 안 되는 경우가 많아요. 아래 항목은 출력해서 옆에 두고 하나씩 체크해요.
        </p>

        <Checklist
          items={[
            "14일 기한 계산 — 퇴직일 다음날부터",
            "지급 요청 — 문자·메일 증거 보관",
            "지연이자 명시 — 내용증명에 연 20% 포함",
            "소멸시효 3년 — 퇴직일 기준",
            "IRP 계좌 — 300만원 초과 시 필수",
          ]}
        />

        <p style={body.prose}>
          퇴직금이 300만원을 넘으면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있어요. 계좌가 없으면 회사가 입금 자체를 못 해요. 퇴직 전에 미리 <a href="/w/IRP-계좌-개설">IRP 계좌를 개설</a>해두는 게 안전해요.
        </p>

        <ArticleAd />

        <FAQ
          items={[
            {
              question: "14일이 언제부터인가요?",
              answer: "퇴직일 다음 날부터 계산해요. 3월 1일 퇴직이면 3월 15일까지가 기한이에요.",
            },
            {
              question: "기한 연장이 가능한가요?",
              answer: "당사자 간 서면 합의가 있으면 연장 가능해요. 회사가 일방적으로 \"다음 달에 준다\"고 하는 건 불법이에요.",
            },
            {
              question: "지연이자는 자동으로 받나요?",
              answer: "자동 발생하지만 청구해야 받아요. 진정·소송에서 명시적으로 요청해야 해요.",
            },
            {
              question: "14일 초과했는데 회사가 자금 없다고 하면?",
              answer: "그건 회사 사정이에요. 법적 의무는 변하지 않아요. 바로 신고 가능해요.",
            },
            {
              question: "회사가 폐업하면 퇴직금을 못 받나요?",
              answer: "체당금 제도로 정부가 대신 지급해줘요. 대표이사 개인에게도 진정 가능해요.",
            },
          ]}
        />

        <Divider />

        <References
          items={[
            {
              label: "근로기준법 제36조 (14일 이내 지급)",
              href: "https://www.law.go.kr/법령/근로기준법",
            },
            {
              label: "근로기준법 제37조 (지연이자 연 20%)",
              href: "https://www.law.go.kr/법령/근로기준법",
            },
            {
              label: "고용노동부 민원마당",
              href: "https://minwon.moel.go.kr",
            },
          ]}
        />

        <Disclaimer />
      </article>
    </ArticleLayout>
  );
}
