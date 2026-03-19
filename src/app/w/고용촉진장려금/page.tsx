"use client";
// Q1. 취약계층을 채용했거나 채용 예정인 사업주가 지원금을 받을 수 있는지 궁금한 상황
// Q2. 고용촉진장려금 자격 확인 → 고용24에서 신청
// Q3. 지원 대상 근로자(장애인, 여성가장, 고령자 등), 금액(1인당 최대 720만원/1년), 신청 시기
// Q4. EligibilityChecker + GreenBox(지원 금액) + Steps + FAQ

import { H2, EligibilityChecker, GreenBox, Steps, FAQ, References, Disclaimer } from "@/components/article-ui";

const p = { fontSize: "15.5px", lineHeight: 2.0, color: "#374151", marginBottom: "1.1rem" } as const;

export default function Page() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, lineHeight: 1.35, marginBottom: "16px" }}>
        <span style={{ color: "#1D9E75" }}>고용촉진장려금 자격과 지원 금액</span>
      </h1>
      <p style={p}>장기실업자, 고령자(만 55세 이상), 장애인 등 취업 취약계층을 채용하면 정부에서 인건비 일부를 지원해주는 제도가 있죠. 고용촉진장려금이에요. 채용 근로자 1인당 월 최대 60만원씩 최대 1년간, 총 최대 720만원을 받을 수 있죠.</p>
      <p style={p}>고용보험 가입 사업장이면 규모나 업종에 관계없이 신청 가능하죠. 채용 전에 고용센터에서 대상자 여부를 먼저 확인받는 게 핵심이에요. 채용 후에 확인하면 지원에서 제외될 수 있는데요.</p>
      <a href="https://www.work24.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>고용24에서 고용촉진장려금 신청하기 →</a>

      <H2>지원 대상 근로자와 사업주 자격</H2>
      <p style={p}>지원 대상 근로자는 장기실업자(6개월 이상 실직), 고령자(만 55세 이상), 장애인 등록자, 북한이탈주민, 결혼이민자, 여성가장 등 취업 취약계층이에요. 고용센터에서 발급한 확인서가 있어야 인정되죠.</p>
      <p style={p}>사업주는 고용보험에 가입된 사업장이면 돼요. 1인 사업장이든 법인이든 무관하죠. 다만 채용 근로자와 가족 관계인 경우는 제외되고, 도박·유흥 등 일부 업종도 대상에서 빠져요.</p>
      <EligibilityChecker
        items={[
          { id: "e1", label: "고용보험에 가입된 사업장을 운영하고 있죠" },
          { id: "e2", label: "취업 취약계층(장기실업자, 고령자, 장애인 등)을 채용했어요" },
          { id: "e3", label: "채용 근로자를 고용보험에 가입시켰어요" },
          { id: "e4", label: "해당 근로자가 6개월 이상 재직 중이에요" },
        ]}
      />

      <H2>지원 금액과 지급 방식</H2>
      <p style={p}>1인당 월 최대 60만원씩 최대 12개월 지원이에요. 실제 지급 임금의 일정 비율로 계산되고 상한선이 있죠. 최저임금 이상을 지급해야 장려금을 온전히 받을 수 있죠.</p>
      <p style={p}>지급은 6개월 단위예요. 채용 후 6개월 재직이 확인되면 첫 6개월치를 일괄 지급하고, 추가 6개월 재직 시 나머지를 받을 수 있죠. 근로자가 6개월 이내 퇴직하면 장려금이 환수될 수 있죠.</p>
      <GreenBox>
        <strong>지원 금액</strong><br />
        1인당 월 최대 60만원 x 12개월 = 총 최대 720만원<br />
        6개월 단위 일괄 지급 (6개월 재직 확인 후)
      </GreenBox>

      <H2>신청 절차</H2>
      <p style={p}>신청 기한은 채용일로부터 6개월 이후 3개월 이내예요. 이 기한을 놓치면 지원받지 못하니까 달력에 미리 메모해 두는 게 좋죠. 고용24 알림 서비스를 설정하면 자동으로 안내받을 수 있죠.</p>
      <Steps
        steps={[
          { title: "대상자 확인서 발급", desc: "채용 전 고용센터에서 해당 근로자의 취약계층 여부 확인서를 발급받아요." },
          { title: "채용 및 고용보험 가입", desc: "근로자를 채용하고 고용보험에 가입시켜요. 임금 지급 내역을 꼼꼼히 보관해야 해요." },
          { title: "6개월 재직 확인 후 신청", desc: "채용일로부터 6개월 후 고용24 온라인 또는 고용센터 방문으로 신청해요." },
          { title: "장려금 지급", desc: "심사 후 6개월치 장려금이 일괄 지급돼요. 추가 6개월 지원도 신청 가능하죠." },
        ]}
      />
      <a href="https://www.work24.go.kr" style={{ display: "block", background: "linear-gradient(135deg,#1D9E75,#0D8B66)", color: "#fff", textAlign: "center" as const, padding: "16px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", margin: "24px 0", textDecoration: "none", boxShadow: "0 4px 12px rgba(29,158,117,0.3)" }}>고용24에서 고용촉진장려금 신청하기 →</a>

      <H2>자주 묻는 질문</H2>
      <p style={{ ...p, marginBottom: "16px" }}>고용촉진장려금에 대해 자주 묻는 질문이에요.</p>
      <FAQ
        items={[
          { q: "장기실업자는 몇 개월 이상 실직해야 하나요?", a: "고용센터에 구직 등록된 날부터 6개월이 지난 분이 해당돼요. 채용 전 고용센터에서 확인서를 발급받으면 되죠." },
          { q: "근로자가 중간에 퇴사하면 어떻게 되나요?", a: "6개월 미만 재직 후 퇴사하면 장려금을 반환해야 할 수 있죠. 근로자 귀책 사유라면 환수 예외가 될 수 있죠." },
          { q: "여러 명 채용하면 각각 받을 수 있나요?", a: "취약계층 근로자를 여러 명 채용하면 인원별로 각각 장려금을 받을 수 있죠. 인원당 별도로 신청해야 해요." },
        ]}
      />
      <References groups={[{ category: "출처", items: [{ label: "고용24 고용촉진장려금 신청", url: "https://www.work24.go.kr" }, { label: "고용노동부 고용장려금 안내", url: "https://www.moel.go.kr" }] }]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
