"use client";

// Q1. 해외직구 처음이라 개인통관고유부호가 뭔지 모르거나, 2026년 갱신 의무화 때문에 기존 부호를 갱신하려는 상황.
// Q2. 관세청 유니패스에서 개인통관고유부호를 발급(또는 갱신)하고 배송주소를 등록하는 행동.
// Q3. P로 시작하는 13자리, 유니패스/모바일 관세청 앱, 2026년부터 매년 갱신 필수, 배송주소 등록 필수, 재발급 시 기존 부호 무효화.
// Q4. Steps(발급 절차) + GreenBox(2026년 변경사항) + 표(PC vs 모바일) + Checklist(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Steps, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ISSUE_STEPS = [
  { title: "유니패스 접속", desc: "관세청 유니패스(unipass.customs.go.kr)에 접속하거나 모바일 관세청 앱을 설치해요." },
  { title: "신규발급 클릭", desc: "메인 화면에서 '신규발급' 버튼을 클릭해요. 이름과 주민등록번호(또는 생년월일)를 입력해요." },
  { title: "본인인증", desc: "휴대전화 인증 또는 공동인증서로 본인 확인을 해요." },
  { title: "정보 입력·발급", desc: "영문 성명, 연락처, 배송주소(최대 20건)를 입력하고 저장하면 P로 시작하는 13자리 번호가 즉시 발급돼요.", tip: "자주 쓰는 배송지를 미리 다 등록해두세요" },
];

const FAQS = [
  { q: "발급 비용이 있나요?", a: "완전 무료예요. 신규든 재발급이든 비용이 없어요." },
  { q: "2026년부터 매년 갱신해야 하나요?", a: "네, 2026년 1월 5일부터 유효기간이 1년이에요. 매년 갱신하지 않으면 통관이 지연될 수 있어요." },
  { q: "진행 중인 주문이 있는데 재발급해도 되나요?", a: "통관 완료될 때까지 기다리세요. 재발급하면 이전 부호가 바로 무효화돼서 통관이 막힐 수 있어요." },
  { q: "번호를 잊어버렸는데 어떻게 찾나요?", a: "유니패스에서 '조회/재발급/해지' 메뉴에 들어가 본인인증하면 바로 확인돼요. 모바일 앱에서도 같은 방법으로 조회할 수 있어요." },
  { q: "외국인도 발급받을 수 있나요?", a: "네, 외국인등록번호로 발급 가능해요. 유니패스 메인 화면에 외국인 안내 매뉴얼이 있어요." },
  { q: "배송주소를 등록 안 하면 어떻게 되나요?", a: "2026년부터 배송주소 등록이 필수예요. 등록 안 하면 통관이 지연되고, 등록 주소와 실제 배송지가 다르면 통관이 보류될 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "관세청 유니패스", url: "https://unipass.customs.go.kr" },
      { label: "관세청 개인통관고유부호 안내", url: "https://www.customs.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "해외직구-관세-면제-기준", title: "해외직구 관세 면제 기준", description: "150달러 이하 면세 기준과 예외 품목을 정리했어요." },
  { slug: "관세-계산-방법", title: "관세 계산 방법", description: "해외직구 시 관세·부가세 계산법을 알려드려요." },
  { slug: "해외직구-배송대행-이용방법", title: "해외직구 배송대행", description: "배송대행 서비스 이용 방법과 비교 정보예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활 · 해외직구 · 통관</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인통관고유부호 발급·변경·조회<br />
        2026년 매년 갱신 필수, 5분 발급 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해외직구하려면 개인통관고유부호가 필요하죠. 주민등록번호 대신 쓰는 통관용 번호예요.
        2026년부터 규정이 바뀌어서 매년 갱신해야 하고, 배송주소 등록도 필수가 됐어요.
        발급부터 변경, 조회까지 한 번에 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>2026년부터 뭐가 달라졌나요?</H2>
      <p style={body}>
        2026년 1월 5일부터 <a href="https://www.customs.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>관세청</a> 규정이 바뀌었어요. 두 가지가 핵심이에요.
      </p>

      <GreenBox>
        · 유효기간: 무기한 → <strong>1년 (매년 갱신 필수)</strong><br />
        · 배송주소: 선택 → <strong>필수 등록</strong> (최대 20건)<br />
        · 영문 성명: 선택 → <strong>필수 등록</strong><br />
        · 갱신 안 하면 → 통관 <strong>지연·보류</strong> 가능
      </GreenBox>

      <SectionBadge>2025년 이전 vs 2026년 이후</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2025년 이전</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2026년 이후</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["유효기간", "무기한", "1년 (매년 갱신)"],
              ["배송주소", "선택", "필수 등록"],
              ["영문 성명", "선택", "필수 등록"],
            ].map(([item, before, after], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500 }}>{item}</td>
                <td style={{ padding: "9px 12px", color: "#888" }}>{before}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>발급은 이렇게 하면 돼요</H2>
      <p style={body}>
        <a href="https://unipass.customs.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>관세청 유니패스</a>나 모바일 관세청 앱에서 5분이면 끝나요.
        PC와 모바일 절차가 동일하고, 비용은 무료예요.
      </p>

      <Steps steps={ISSUE_STEPS} />

      <Divider />

      <H2>변경·재발급·조회할 때 주의사항</H2>
      <p style={body}>
        재발급이나 갱신도 유니패스에서 같은 방식으로 해요.
        다만 재발급하면 이전 부호가 즉시 무효화되니까 타이밍을 잘 맞춰야 해요.
      </p>

      <Checklist items={[
        "진행 중인 해외직구 주문이 있으면 통관 완료 후 재발급",
        "재발급 후 새 부호를 판매업체·특송업체에 반드시 전달",
        "자주 쓰는 배송지(집, 회사, 부모님 댁 등) 미리 등록",
        "매년 갱신 시기를 놓치지 않도록 캘린더에 메모",
        "문의: 관세청 기술지원 1544-1285 (평일 09~18시)",
      ]} />

      <BorderBox>
        <strong>번호를 잊어버렸다면?</strong><br /><br />
        유니패스에서 '조회/재발급/해지' → 본인인증 → 바로 확인 가능해요.<br />
        모바일 관세청 앱에서도 같은 방법으로 조회할 수 있어요.<br />
        급할 때는 유니패스 챗봇(24시간)이나 카카오톡 상담도 이용 가능해요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 관세청 발표 자료를 바탕으로 작성됐어요. 통관 규정은 변경될 수 있으니 관세청 유니패스에서 최신 정보를 확인해봐요." />
    </ArticleLayout>
  );
}
