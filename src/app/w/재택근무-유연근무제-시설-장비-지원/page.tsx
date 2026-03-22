"use client";

// Q1. 재택근무를 도입하거나 확대하려는 중소기업 대표 또는 인사담당자가 정부 지원금이 있는지, 얼마까지 받을 수 있는지 궁금한 상황.
// Q2. 정부 지원 내용(비용 50%, 최대 2천만원)을 확인하고 일·생활 균형 지원사업에 신청할 수 있어야 해요.
// Q3. 지원 대상(중소·중견기업), 지원 항목(시스템 구축비만, PC 제외), 지원 방식(직접지원+융자), 신청 방법과 절차.
// Q4. GreenBox(지원 요약) + Steps(신청 절차) + Checklist(지원 가능 항목 체크) + BorderBox(지원 항목표) + FAQ
// MAP-INTRO: 재택근무 도입하려는데 정부 지원금이 있는지 궁금함
// MAP-TYPE: 절차
// MAP-H2: 지원 내용 요약 > 지원 항목 구분 > 신청 절차 > 주의사항 > FAQ
// MAP-COMP: GreenBox > BorderBox > Steps > Checklist > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  { title: "재택근무 제도 도입 계획 수립", desc: "회사에서 재택근무 제도를 도입하거나 확대할 계획을 먼저 세워야 해요." },
  { title: "일·생활 균형 캠페인 사이트 접속", desc: "worklife.kr에서 지원사업 공고를 확인하고 신청서를 작성하세요.", tip: "매년 상·하반기 공고가 나오니 시기를 확인하세요" },
  { title: "필요 서류 제출", desc: "사업계획서, 견적서, 재무제표 등을 첨부해서 제출해요." },
  { title: "심사 및 승인", desc: "고용노동부에서 서류 심사 후 지원 여부를 결정해요. 보통 2~4주 소요돼요." },
  { title: "시스템 구축 후 정산", desc: "승인 후 시스템을 구축하고, 완료되면 정산 절차를 거쳐 지원금을 받아요." },
];

const SUPPORT_CHECK = [
  "우리 회사가 중소기업 또는 중견기업이에요",
  "재택근무 제도를 새로 도입하거나 확대할 계획이에요",
  "정보시스템이나 인사노무관리시스템을 구축할 예정이에요",
  "PC·노트북 같은 개인 장비가 아닌 회사 시스템이에요",
];

const FAQS = [
  { q: "재택근무 노트북 구입비도 지원받을 수 있나요?", a: "아니요. PC·노트북 같은 개인 통신장비 구입비는 지원 대상이 아니에요. 화상회의 시스템, 보안 프로그램 같은 회사 전체 시스템 구축비만 지원돼요." },
  { q: "지원금은 어디서 신청하나요?", a: "고용노동부 일·생활 균형 지원사업(worklife.kr)에서 온라인 신청해요. 매년 공고 시기가 달라서 사이트에서 확인해야 해요." },
  { q: "대기업도 받을 수 있나요?", a: "아니요. 중소기업과 중견기업만 신청 대상이에요. 대기업은 지원받을 수 없어요." },
  { q: "지원금을 받으면 갚아야 하나요?", a: "시스템 구축비는 직접 지원(무상)이에요. 설비·장비 구입비는 융자 방식이라 갚아야 하지만, 이자가 저리예요." },
  { q: "신청부터 지급까지 얼마나 걸리나요?", a: "보통 2~3개월 정도 걸려요. 심사 2~4주 + 시스템 구축 기간 + 정산까지 포함한 기간이에요." },
];

const REFS = [
  { category: "공식 자료", items: [
    { label: "일생활균형 캠페인 재택근무 지원", url: "https://www.worklife.kr/website/index/m2/support3.asp" },
    { label: "고용노동부", url: "https://www.moel.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard','Apple SD Gothic Neo',sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 유연근무 · 정부지원</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재택근무 시설·장비 지원, 얼마 받나요?<br />
        정부 지원금 조건과 신청 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        재택근무를 도입하려는데 시스템 구축 비용이 부담되시죠? 정부가 중소·중견기업을 대상으로
        재택근무 인프라 구축비의 50%를 최대 2천만원까지 지원해요.
        <a href="https://www.worklife.kr/website/index/m2/support3.asp" style={{ color: "#1D9E75" }}>일·생활 균형 지원사업</a>을 통해 신청할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>지원 내용이 어떻게 되나요?</H2>
      <p style={body}>
        재택근무 시스템 구축비용의 50%를 최대 2천만원까지 지원해요. 4천만원짜리 시스템을 구축하면 2천만원,
        1천만원짜리면 500만원을 지원받아요. 시스템 구축비는 직접 지원(무상)이고, 설비·장비 구입비는 융자 방식이에요.
      </p>
      <GreenBox title="지원 요약">
        대상: 중소·중견기업 | 지원율: 비용의 50% | 한도: 최대 2천만원 | 방식: 시스템 구축비 직접 지원 + 설비 구입비 융자
      </GreenBox>

      <Divider />

      <H2>뭐가 지원되고 뭐가 안 되나요?</H2>
      <p style={body}>
        지원 대상은 회사 전체 시스템이에요. 화상회의 시스템, 보안 프로그램, 협업 도구, 인사노무관리시스템 같은 거죠.
        개인이 쓸 노트북이나 모니터, 키보드 같은 개인 통신장비 구입비는 지원 대상이 아니에요.
      </p>
      <BorderBox title="지원 항목 구분">
        지원 가능: 정보시스템 구축, 인사노무관리시스템, 화상회의 시스템, 보안 프로그램, 협업 도구 |
        지원 불가: PC·노트북, 모니터, 키보드, 건물·토지 임차비, 개인 통신장비
      </BorderBox>
      <SectionBadge>우리 회사가 신청 가능한지 체크해보세요</SectionBadge>
      <Checklist items={SUPPORT_CHECK} />

      <Divider />

      <H2>어떻게 신청하나요?</H2>
      <p style={body}>
        고용노동부 일·생활 균형 지원사업을 통해 온라인으로 신청해요. 매년 상·하반기 공고가 나오니까 시기를 잘 확인해야 해요.
        신청부터 지급까지 보통 2~3개월 정도 걸려요.
      </p>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>신청할 때 주의할 점이 있나요?</H2>
      <p style={body}>
        지원금은 사후 정산이에요. 먼저 시스템을 구축하고, 완료 후 증빙 서류를 제출해야 받아요.
        견적서와 실제 비용이 크게 차이나면 지원이 삭감될 수 있으니 견적을 정확히 받으세요.
      </p>
      <BorderBox title="주의사항">
        사후 정산 방식이라 먼저 비용을 지출해야 해요 | 지원 기간 내 완료하지 못하면 지원금이 취소될 수 있어요 | 대기업은 신청 대상이 아니에요 | 개인 장비 구입비는 지원 범위 밖이에요
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 1월 기준 고용노동부 지원사업 정보를 바탕으로 작성됐어요. 지원 조건과 금액은 매년 변경될 수 있으니 공식 사이트에서 최신 공고를 확인하세요." />
    </div>
  );
}
