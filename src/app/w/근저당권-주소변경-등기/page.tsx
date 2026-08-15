"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 근저당권자(회사 또는 본인) 주소가 여러 번 바뀌었는데, 등기부상 주소를 변경하지 않아서 처리 방법이 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 중간 주소 없이 현재 주소로 바로 변경등기를 신청하는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 중간 주소 생략 가능(1번만 등기), 단독 신청 가능, 비용(등록면허세 7,200원+수수료), 필요 서류, 인터넷등기소 전자신청.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론) + Steps(신청 절차) + BorderBox(서류·비용) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "주소가 5번 바뀌었는데 5번 다 등기해야 하나요?",
    a: "아니요. 중간 주소를 건너뛰고 현재 주소로 바로 1번만 등기하면 돼요.",
  },
  {
    q: "상대방 동의가 필요한가요?",
    a: "필요 없어요. 등기명의인 표시변경은 등기명의인이 단독으로 신청할 수 있어요.",
  },
  {
    q: "비용은 얼마나 드나요?",
    a: "등록면허세 7,200원(교육세 포함) + 등기신청 수수료(서면 3,000원, 전자 1,000원)이에요. 총 1만원 안팎이에요.",
  },
  {
    q: "인터넷으로 신청할 수 있나요?",
    a: "네, 대법원 인터넷등기소(iros.go.kr)에서 전자신청이 가능해요. 공동인증서나 금융인증서가 필요해요.",
  },
  {
    q: "처리 기간은 얼마나 걸리나요?",
    a: "보통 1~2 영업일이면 등기가 완료돼요. 서류에 문제가 없으면 당일 처리되는 경우도 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "부동산등기법", url: "https://www.law.go.kr/법령/부동산등기법" },
      { label: "찾기쉬운 생활법령정보 — 등기명의인 표시변경", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=566&ccfNo=7&cciNo=1&cnpClsNo=1" },
      { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "부동산 거래 시 취득세가 얼마인지 확인해보세요." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "부동산 거래 후 신고 절차를 정리했어요." },
  { slug: "공인중개사-업무범위", title: "공인중개사 업무범위", description: "등기 관련 공인중개사에게 어디까지 맡길 수 있는지 확인하세요." },
];

const APPLY_STEPS = [
  { title: "인터넷등기소 접속·로그인", desc: "대법원 인터넷등기소(iros.go.kr)에 접속해서 공동인증서로 로그인해요." },
  { title: "등기신청 → 표시변경 선택", desc: "'등기신청' 메뉴에서 '등기명의인 표시변경'을 선택해요." },
  { title: "변경 전·후 주소 입력", desc: "변경 전 주소에는 현재 등기부 기재 주소를, 변경 후에는 실제 현재 주소를 입력해요.", tip: "중간 주소는 적을 필요 없어요." },
  { title: "증빙서류 첨부", desc: "법인등기부등본(법인) 또는 주민등록표초본(개인)을 스캔해서 업로드해요.", tip: "주소 변동 이력이 나오는 서류여야 해요." },
  { title: "등록면허세 납부", desc: "7,200원(교육세 포함)을 납부하고 영수증을 첨부해요." },
  { title: "제출·완료 확인", desc: "신청서를 제출하면 1~2 영업일 내 등기 완료돼요. 등기부등본을 뽑아서 주소가 바뀌었는지 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 등기</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근저당권 등기명의인 주소변경<br />
        중간 주소 없이 현재 주소로 바로 등기하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근저당권을 설정한 회사 주소가 여러 번 바뀌었는데 변경등기를 안 했죠.
        중간 주소를 전부 거쳐서 등기해야 하나 걱정하셨을 거예요.
        결론부터 말하면, <strong>현재 주소로 바로 1번만 등기</strong>하면 돼요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>중간 주소 생략 가능, 현재 주소로 바로 등기해요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/부동산등기법" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산등기법</a>은
        중간 과정을 모두 증명하라고 요구하지 않아요.
        주소가 A → B → C → D → E로 5번 바뀌었다면, A에서 E로 바로 변경등기하면 돼요.
      </p>

      <GreenBox title="핵심 정리">
        · 중간 주소 변경 과정 <strong>전부 생략 가능</strong> — 1번만 등기하면 돼요<br />
        · 등기명의인이 <strong>단독 신청</strong> 가능 — 상대방 동의 불필요<br />
        · 비용: 등록면허세 7,200원 + 수수료 1,000~3,000원<br />
        · 인터넷등기소에서 <strong>전자신청</strong> 가능
      </GreenBox>

      <p style={body}>
        등기명의인 표시변경등기는 등기부상 이름이나 주소가 실제와 달라졌을 때 일치시키기 위한 등기예요.
        권리의 내용이 바뀌는 게 아니라 표시만 고치는 거라서, 절차가 간단하고 비용도 적어요.
      </p>

      <Divider />

      <H2>필요 서류와 비용</H2>
      <p style={body}>
        법인인지 개인인지에 따라 제출 서류가 살짝 달라요.
      </p>

      <SectionBadge>서류·비용 정리</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>법인</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>개인</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["증빙서류", "법인등기부등본 (주소변동 이력 포함)", "주민등록표초본 (주소변동 이력 포함)"],
              ["유효기간", "발행일로부터 3개월 이내", "발행일로부터 3개월 이내"],
              ["등록면허세", "7,200원 (교육세 포함)", "7,200원 (교육세 포함)"],
              ["등기 수수료", "서면 3,000원 / 전자 1,000원", "서면 3,000원 / 전자 1,000원"],
            ].map(([a, b, c], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{a}</td>
                <td style={{ padding: "10px 12px" }}>{b}</td>
                <td style={{ padding: "10px 12px" }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>인터넷등기소에서 전자신청하는 절차</H2>
      <p style={body}>
        <a href="https://www.iros.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원 인터넷등기소</a>에서
        전자신청하면 수수료도 저렴하고 방문할 필요도 없어요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        등기가 완료되면 등기부등본을 출력해서 근저당권자 주소가 현재 주소로 바뀌었는지 확인하세요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 부동산등기법을 바탕으로 작성했어요. 복잡한 등기 사안은 법무사에게 상담받는 것을 권장해요." />
    </ArticleLayout>
  );
}
