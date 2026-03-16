"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-미지급-지급받는-방법";

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* ── 헤더 ── */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.5rem" }}>
          퇴직금 · 미지급 · 해결방법
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.5rem" }}>
          퇴직금 못 받았을 때, 어떻게 받아낼 수 있나요?
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#374151", fontWeight: 500 }}>
          내용증명부터 노동청 신고, 소송까지 완전 정리
        </p>
      </div>

      {/* ── 인트로 ── */}
      <p style={body.prose}>
        퇴직금을 못 받았다면 바로 행동해야 해요. 14일 기한을 넘긴 순간부터 연 20% 지연이자가 붙기
        시작하고, 3년이 지나면 청구권 자체가 소멸해요. 내용증명 → 노동청 진정 순서만 밟으면 대부분
        2~3단계에서 해결돼요.
      </p>
      <p style={body.prose}>
        이 글에서는 퇴직금 미지급 상황에서 실제로 돈을 받아내는 방법을 단계별로 정리했어요.
        내용증명 작성법, 노동청 진정 절차, 지연이자 계산까지 한 번에 볼 수 있어요.
      </p>

      {/* ── 섹션 1: 지금 내 상황 확인 ── */}
      <H2>퇴직금 미지급, 내 상황부터 확인해요</H2>

      <p style={body.prose}>
        퇴직금은 퇴직 후 14일 이내에 지급해야 해요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={body.link} target="_blank" rel="noopener">
          근로기준법 제36조
        </a>
        에 명시된 규정이에요. 14일이 넘으면 그 초과분부터 연 20% 지연이자가 발생해요.
      </p>
      <p style={body.prose}>
        아래 체크리스트로 지금 상황을 먼저 확인해보세요. 해당 항목이 많을수록 빠르게 행동해야 해요.
      </p>

      <EligibilityChecker
        title="퇴직금 미지급 체크리스트"
        items={[
          { id: "unpaid", label: "퇴직금을 아직 못 받았어요" },
          { id: "over14", label: "퇴사한 지 14일이 넘었어요" },
          { id: "nocontact", label: "회사가 연락을 안 받아요" },
          { id: "within3y", label: "퇴직 후 3년이 안 됐어요" },
        ]}
        resultText={(checked) => {
          if (checked.length === 0) return "해당 사항을 선택해주세요.";
          if (checked.includes("within3y") && checked.includes("unpaid")) {
            return "지금 당장 내용증명 발송이 필요한 상황이에요. 아래 절차를 따라주세요.";
          }
          if (!checked.includes("within3y")) {
            return "퇴직 후 3년이 지났다면 소멸시효가 완성됐을 수 있어요. 전문가 상담이 필요해요.";
          }
          return "아래 단계별 방법대로 진행하세요.";
        }}
      />

      <p style={body.prose}>
        소멸시효는 퇴직일로부터 3년이에요. 내용증명을 발송하면 6개월간 시효가 중단되고, 진정·소송을
        제기하면 완전히 새로 시작돼요. 3년이 임박했다면 지금 당장 내용증명부터 보내야 해요.
      </p>

      {/* ── 섹션 2: 지연이자 계산기 ── */}
      <H2>지연이자 얼마나 받을 수 있는지 계산해요</H2>

      <p style={body.prose}>
        14일이 넘은 순간부터 연 20% 이자가 붙어요. 이게 생각보다 금액이 커요. 퇴직금 1,000만원을
        6개월 받지 못했다면 지연이자만 30만원이 넘어요. 노동청 진정 단계에서 이 이자를 함께 청구해야
        받을 수 있어요.
      </p>

      <Calculator
        sliders={[
          {
            id: "amount",
            label: "미지급 퇴직금",
            min: 100,
            max: 5000,
            step: 100,
            defaultValue: 1000,
            format: (v) => `${v.toLocaleString()}만원`,
          },
          {
            id: "months",
            label: "미지급 기간",
            min: 1,
            max: 36,
            step: 1,
            defaultValue: 6,
            format: (v) => `${v}개월`,
          },
        ]}
        results={[
          {
            id: "result1",
            label: "지연이자 (연 20%, 14일 초과분)",
            highlight: true,
            getValue: (v) =>
              Math.round(
                v.amount * 10000 * 0.2 * (Math.max(0, v.months * 30 - 14)) / 365
              ),
            format: (v) =>
              v < 10000
                ? `${v.toLocaleString()}원`
                : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
          },
          {
            id: "result2",
            label: "총 청구 가능 금액 (원금+이자)",
            getValue: (v) => {
              const interest = Math.round(
                v.amount * 10000 * 0.2 * (Math.max(0, v.months * 30 - 14)) / 365
              );
              return v.amount * 10000 + interest;
            },
            format: (v) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
          },
        ]}
        note="※ 퇴직 후 14일 초과분부터 연 20% 지연이자 발생 (근로기준법 제37조). 소멸시효 3년."
      />

      <CategoryButton
        label="퇴직금 지연이자 연 20%"
        href="/w/퇴직금-지연이자"
        description="계산부터 청구까지"
      />

      <RelatedArticles
        items={[
          {
            href: "/w/퇴직금-미지급-신고",
            title: "퇴직금 미지급 신고 방법",
            description: "노동청 접수부터 처리까지",
          },
          {
            href: "/w/퇴직금-지연이자",
            title: "퇴직금 지연이자 연 20%",
            description: "계산부터 청구까지",
          },
          {
            href: "/w/퇴직금-소멸시효",
            title: "퇴직금 소멸시효 3년",
            description: "시효 중단 방법",
          },
        ]}
      />

      <Divider />

      {/* ── 섹션 3: 단계별 해결 절차 ── */}
      <H2>단계별로 이렇게 받아내요</H2>

      <p style={body.prose}>
        퇴직금 미지급 해결은 4단계로 진행해요. 단계별로 다음으로 넘어갈 필요 없이, 대부분은 1~3단계에서
        마무리돼요. 근로감독관 조사까지 가면 90%는 해결된다고 봐도 돼요.
      </p>
      <p style={body.prose}>
        준비 서류를 먼저 챙겨두면 각 단계가 훨씬 빨라져요. 특히 급여명세서와 근로계약서는 진정
        접수 전에 반드시 확보해야 해요.
      </p>

      <SectionBadge text="필요 서류" />
      <DocTable
        items={[
          {
            name: "근로계약서",
            required: true,
            where: "인사팀 또는 입사 시 수령본",
          },
          {
            name: "사직서 또는 해고통지서",
            required: true,
            where: "본인 보관 또는 인사팀",
          },
          {
            name: "급여명세서",
            required: true,
            where: "회사 인사팀 요청",
          },
          {
            name: "4대보험 가입이력",
            required: false,
            where: "고용24 무료 조회",
          },
        ]}
      />

      <SectionBadge text="단계별 절차" />
      <Steps
        items={[
          {
            title: "내용증명 발송",
            description:
              '"퇴직금 ○○만원 + 지연이자 포함 ○일 이내 지급 요청"으로 발송. 우체국 또는 카카오 전자내용증명으로 10분 안에 보낼 수 있어요.',
            tip: "우체국 또는 카카오 전자내용증명 (10분 안에 가능)",
          },
          {
            title: "고용노동부 임금체불 진정",
            description:
              "minwon.moel.go.kr에서 온라인 접수해요. 퇴직금과 지연이자를 모두 명시해야 나중에 함께 받을 수 있어요.",
            tip: "진정 접수 후 1~3개월 내 처리",
          },
          {
            title: "근로감독관 조사",
            description:
              "접수 후 근로감독관이 사실 확인하고 시정 명령을 내려요. 이 단계에서 대부분 해결돼요.",
            tip: "이 단계에서 90%는 해결됨",
          },
          {
            title: "소액심판 또는 민사소송",
            description:
              "그래도 안 주면 법원에 소액심판을 신청해요. 3,000만원 이하는 변호사 없이 직접 가능해요.",
            tip: "대한법률구조공단(132)에서 무료 지원",
          },
        ]}
      />

      <GreenBox>
        회사가 폐업했거나 파산 중이라면 체당금 제도를 활용하세요. 고용노동부가 퇴직금을 대신
        지급해줘요. 파산 선고일로부터 2년 내에 신청해야 해요.
      </GreenBox>

      <ArticleAd />

      {/* ── 섹션 4: 핵심 체크리스트 ── */}
      <H2>놓치면 안 되는 핵심 포인트</H2>

      <p style={body.prose}>
        절차를 밟을 때 놓치기 쉬운 포인트가 있어요. 특히 지연이자를 진정서에 명시하지 않으면 나중에
        따로 청구해야 하는 번거로움이 생겨요. 아래 체크리스트를 보면서 하나씩 확인해보세요.
      </p>
      <p style={body.prose}>
        소멸시효 3년은 진정이나 소송 중에도 계속 흐르는 게 아니라, 진정 접수 시점에 중단돼요. 그래서
        내용증명을 보낸 뒤에도 진정을 빠르게 접수하는 게 좋아요.
      </p>

      <Checklist
        items={[
          {
            id: "cert",
            label: "내용증명 발송",
            description: "지연이자 명시",
          },
          {
            id: "statute",
            label: "소멸시효 3년",
            description: "퇴직일 기준 3년 내",
          },
          {
            id: "petition",
            label: "노동청 진정",
            description: "퇴직금+지연이자 모두 포함",
          },
          {
            id: "docs",
            label: "서류 보관",
            description: "근로계약서, 급여명세서",
          },
          {
            id: "smallclaim",
            label: "소액심판",
            description: "3,000만원 이하 직접 가능",
          },
        ]}
      />

      <BorderBox>
        <strong>지연이자는 자동으로 주지 않아요.</strong> 진정서나 소송장에 명시해야 받을 수 있어요.
        청구 금액을 적을 때 "퇴직금 ○○만원 및 이에 대한 연 20% 지연손해금"으로 써야 해요.
      </BorderBox>

      <Divider />

      {/* ── FAQ ── */}
      <FAQ
        items={[
          {
            q: "내용증명을 보내면 얼마나 효과가 있나요?",
            a: "법적 청구 의사를 공식적으로 전달하는 거예요. 많은 회사가 내용증명을 받으면 바로 지급해요. 소멸시효도 6개월 중단돼요.",
          },
          {
            q: "노동청 진정은 얼마나 걸리나요?",
            a: "보통 1~3개월이에요. 사안이 복잡하면 더 걸릴 수 있지만, 단순 미지급 건은 빠르게 처리되는 경우가 많아요.",
          },
          {
            q: "회사가 폐업했으면 어떻게 받나요?",
            a: "체당금 제도로 고용노동부에서 대신 받을 수 있어요. 파산 선고일로부터 2년 내 신청해야 해요.",
          },
          {
            q: "지연이자도 같이 받을 수 있나요?",
            a: "받을 수 있어요. 진정 또는 소송 단계에서 지연이자를 함께 청구해야 받을 수 있어요. 자동으로 주지는 않아요.",
          },
          {
            q: "소액심판이 뭔가요?",
            a: "3,000만원 이하 분쟁을 법원에서 빠르게 해결하는 절차예요. 변호사 없이 직접 신청 가능하고 인지대가 수만원 수준이에요.",
          },
        ]}
      />

      {/* ── 출처 ── */}
      <References
        items={[
          {
            label: "근로기준법 제36조 — 14일 이내 금품 청산",
            href: "https://www.law.go.kr/법령/근로기준법",
            category: "법령",
          },
          {
            label: "근로기준법 제37조 — 지연이자 연 20%",
            href: "https://www.law.go.kr/법령/근로기준법",
            category: "법령",
          },
          {
            label: "고용노동부 민원마당 — 임금체불 진정",
            href: "https://minwon.moel.go.kr",
            category: "공식",
          },
        ]}
      />

      <Disclaimer />
    </ArticleLayout>
  );
}
