"use client";

// Q1. 중소기업 다니는 청년이 전세대출 금리 혜택을 받을 수 있는지, 소득기준과 한도를 확인하려는 상황
// Q2. 내 소득이 기준 이하인지 확인하고, 중소기업확인서를 준비해서 금리 우대를 받아 전세대출을 신청한다
// Q3. 통합 변경사항, 소득기준(5천만원/부부 7천만원), 금리 우대(0.4%p), 한도(수도권 3억), 나이·무주택 조건, 신청 서류
// Q4. GreenBox(변경사항 요약) + 비교표(기존 vs 통합) + Steps(신청 절차) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "내 소득과 나이가 기준에 맞는지 확인해요",
    desc: "단독세대주 연소득 5천만원 이하, 부부합산 7천만원 이하가 기준이에요. 만 19~34세 무주택자여야 하고, 군 복무 기간은 최대 6년까지 나이에서 빼줘요. 순자산 3.37억원 이하 요건도 있어요.",
    tip: "전년도 소득 기준이라 2026년 신청 시 2025년 소득을 봐요",
  },
  {
    title: "중소기업확인서와 재직증명서를 준비해요",
    desc: "금리 우대를 받으려면 중소기업확인서가 필요해요. 중소벤처기업부 홈페이지(mss.go.kr)에서 회사 사업자등록번호를 입력하면 바로 발급받을 수 있어요. 재직증명서는 회사 인사팀에 요청하세요.",
    tip: "입사 1개월차여도 재직 중이면 우대 가능",
    link: { label: "중소벤처기업부", href: "https://www.mss.go.kr" },
  },
  {
    title: "은행에서 청년버팀목 전세대출을 신청해요",
    desc: "우리은행, 국민은행, 농협 등에서 취급해요. 온라인 신청이 가능하고, 신분증·소득증빙·전세계약서·중소기업확인서·재직증명서를 업로드하면 돼요. 심사는 2~3일 정도 걸려요.",
    tip: "전자계약 시 금리 0.1%p 추가 할인",
  },
  {
    title: "전입신고 + 확정일자 후 대출이 실행돼요",
    desc: "심사 승인 후 전입신고와 확정일자를 완료하면 대출금이 집주인 계좌로 입금돼요. HUG 전세보증보험 가입도 필수예요. 보험료는 보증금의 0.128% 수준이에요.",
    tip: "잔금일에 맞춰 전입신고·확정일자·대출실행을 동시에",
  },
];

const FAQS = [
  { q: "중기청 전세대출이 없어진 건가요?", a: "이름만 바뀐 거예요. 2025년부터 청년버팀목전세대출로 통합됐고, 기존 중기청 대출의 혜택은 그대로 유지되면서 소득기준과 한도가 더 좋아졌어요." },
  { q: "소득 5천만원 넘으면 절대 못 받나요?", a: "단독은 5천만원이지만, 기혼이면 부부합산 7천만원까지 가능해요. 신혼부부(결혼 7년 이내)라면 신혼부부 전세대출도 검토해보세요. 소득기준이 더 넓을 수 있어요." },
  { q: "중소기업 재직 증명은 어떻게 하나요?", a: "두 가지가 필요해요. 재직증명서는 회사 인사팀에서 발급받고, 중소기업확인서는 중소벤처기업부 홈페이지에서 사업자등록번호로 조회·발급해요." },
  { q: "퇴사 예정인데 지금 신청해도 되나요?", a: "신청 시점에 재직 중이면 돼요. 대출 실행 후 퇴사해도 기존 대출 조건은 유지돼요. 다만 만기 연장 때 다시 재직 여부를 확인할 수 있어요." },
  { q: "기존 중기청 대출에서 갈아탈 수 있나요?", a: "만기 연장이나 대환 시 청년버팀목으로 전환할 수 있어요. 소득기준과 한도가 더 넓어졌으니 오히려 유리해요. 은행에 대환 가능 여부를 문의하세요." },
  { q: "디딤돌대출이랑 중복이 되나요?", a: "안 돼요. 둘 다 주택도시기금 대출이라 하나만 선택해야 해요. 소득 7천만원 이하면 청년버팀목이 금리가 더 낮고, 초과하면 디딤돌대출을 검토하세요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>전세대출 · 중소기업 청년 · 금리 우대</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        중소기업 청년 전세대출, 금리가 진짜 낮나요?<br />
        2026년 소득기준과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "중소기업 다니면 전세대출 금리가 1%대라는데, 진짜예요?"
      </p>
      <p style={body}>
        맞아요. 중소기업 재직 청년은 금리 <strong>0.4%p 우대</strong>를 받아서 최저 <strong>1%대 후반</strong>까지 내려갈 수 있어요. 2025년부터 기존 중기청 전세대출이 <a href="/w/전세대출-한도-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>청년버팀목전세대출</a>로 통합되면서 소득기준과 한도가 더 좋아졌어요.
      </p>

      <Divider />

      <H2>뭐가 바뀌었나요? 핵심만 보세요</H2>

      <GreenBox>
        2025년 통합 변경사항{"\n"}
        · 소득기준: 3,500만원 → 5,000만원 (부부 5천 → 7천만원){"\n"}
        · 한도: 수도권 2억 → 3억, 지방 1.5억 → 2억{"\n"}
        · 금리: 중소기업 재직자 0.4%p 우대 유지{"\n"}
        · 전자계약 시 추가 0.1%p 할인
      </GreenBox>

      <SectionBadge>기존 중기청 vs 청년버팀목 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기존 중기청</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>청년버팀목 (2026)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["소득기준 (단독)", "3,500만원", "5,000만원"],
              ["소득기준 (부부)", "5,000만원", "7,000만원"],
              ["한도 (수도권)", "2억원", "3억원"],
              ["한도 (지방)", "1.5억원", "2억원"],
              ["LTV", "80%", "80%"],
              ["중기 금리 우대", "0.4%p", "0.4%p"],
              ["나이", "만 19~34세", "만 19~34세"],
            ].map(([item, old, current], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#9ca3af" }}>{old}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{current}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>소득기준과 자격 요건이에요</H2>

      <BorderBox>
        2026년 청년버팀목 자격 요건{"\n"}
        · 나이: 만 19~34세 (군 복무 최대 6년 차감){"\n"}
        · 소득: 단독 5,000만원 이하 / 부부 7,000만원 이하{"\n"}
        · 자산: 순자산 3.37억원 이하{"\n"}
        · 주택: 세대 전체 무주택{"\n"}
        · 면적: 전용 85㎡ 이하, 보증금 3억원 이하
      </BorderBox>

      <p style={body}>
        소득은 전년도 기준이에요. 2026년에 신청하면 2025년 소득을 봐요. 근로소득자는 원천징수영수증의 총급여액, 사업자는 종합소득금액이 기준이에요.
      </p>

      <Divider />

      <H2>신청은 이 순서대로 해요</H2>
      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 서류 체크리스트</H2>
      <Checklist items={[
        "신분증 (주민등록증 또는 운전면허증)",
        "소득증빙 (근로소득원천징수영수증 또는 종합소득세 신고서)",
        "전세계약서 원본 (확정일자 전이라도 신청 가능)",
        "재직증명서 (회사 인사팀 발급)",
        "중소기업확인서 (mss.go.kr에서 발급)",
        "주민등록등본 (무주택 확인용)",
      ]} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.8 }}>
        출처: <a href="https://nhuf.molit.go.kr" style={{ color: "#9ca3af" }}>주택도시기금</a> · <a href="https://www.hf.go.kr" style={{ color: "#9ca3af" }}>한국주택금융공사</a> · <a href="https://www.mss.go.kr" style={{ color: "#9ca3af" }}>중소벤처기업부</a>
      </p>
      <Disclaimer text="이 글은 2026년 3월 기준 주택도시기금 대출 조건을 참고했어요. 은행별로 세부 금리와 조건이 다를 수 있으니 신청 전 확인하세요." />
    </div>
  );
}
