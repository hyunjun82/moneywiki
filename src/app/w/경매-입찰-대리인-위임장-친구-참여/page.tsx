"use client";

/*
Q1. 경매 입찰일에 갑자기 못 가게 됐는데, 친구나 가족이 대신 참여할 수 있는지 궁금한 상황이에요.
Q2. 위임장을 작성하고 필요 서류를 준비해서 대리인이 입찰에 참여할 수 있어야 해요.
Q3. 대리인 자격(누구나 가능), 위임장 양식(대법원 경매정보 다운), 인감도장·인감증명서 필수, 대리인 신분증·도장, 입찰보증금은 본인 명의.
Q4. Steps(준비 절차) + DocTable(서류 목록) + Checklist(입찰 당일 체크) + FAQ.
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const PREP_STEPS = [
  { title: "위임장 양식 다운로드", desc: "대법원 경매정보(courtauction.go.kr)에서 위임장 양식을 받아요." },
  { title: "위임장 작성", desc: "본인(위임인) 이름·주민번호, 대리인 이름·주민번호, 사건번호·물건 주소를 빠짐없이 적어요." },
  { title: "인감도장 날인", desc: "위임장에 구청에 등록된 인감도장을 찍어요. 일반 도장은 안 돼요." },
  { title: "인감증명서 발급", desc: "구청 또는 주민센터에서 인감증명서를 발급받아요. 발급일로부터 3개월 이내여야 유효하죠." },
  { title: "서류 전달", desc: "위임장 + 인감증명서를 대리인에게 전달하고, 최고 입찰가와 전략도 미리 공유해요." },
];

const DOCS = [
  { name: "위임장 (인감도장 날인)", required: true, where: "대법원 경매정보 사이트에서 양식 다운로드" },
  { name: "본인(위임인) 인감증명서", required: true, where: "주민센터 발급 (3개월 이내)" },
  { name: "대리인 신분증 (원본)", required: true, where: "주민등록증 또는 운전면허증" },
  { name: "대리인 도장", required: true, where: "입찰표에 날인 용도" },
];

const CHECKLIST_ITEMS = [
  "위임장에 인감도장 찍었는지 확인 (일반 도장 불가)",
  "인감증명서 발급일이 3개월 이내인지 체크",
  "위임장의 사건번호·물건 주소가 정확한지 대조",
  "대리인 신분증은 원본으로 준비 (복사본 불가)",
  "입찰보증금은 본인(위임인) 명의로 납부",
  "최고 입찰가와 경쟁 시 전략을 대리인에게 명확히 공유",
];

const FAQS = [
  { q: "대리인이 반드시 가족이어야 하나요?", a: "아니에요. 친구, 지인, 누구든 가능해요. 변호사나 법무사일 필요도 없죠. 위임장과 서류만 제대로 갖추면 돼요." },
  { q: "위임장은 어디서 받나요?", a: "대법원 경매정보(courtauction.go.kr)에서 다운로드하거나, 법원 경매 입찰실에서 직접 받을 수 있어요." },
  { q: "인감증명서 대신 본인서명사실확인서도 되나요?", a: "법원마다 다를 수 있어요. 인감증명서가 가장 확실하니, 인감증명서를 준비하는 게 안전하죠." },
  { q: "입찰보증금은 대리인 명의로 내도 되나요?", a: "본인(위임인) 명의로 납부해야 해요. 낙찰되면 소유권이 본인에게 넘어가니까, 보증금도 본인 명의여야 하죠." },
  { q: "대리인이 낙찰 후 절차도 대신할 수 있나요?", a: "입찰까지만 대리 가능하고, 낙찰 후 대금 납부와 소유권이전등기는 별도 절차예요. 대금 납부도 본인 명의로 해야 해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "대법원 경매정보: 위임장 양식", url: "https://www.courtauction.go.kr" },
    { label: "찾기쉬운 생활법령정보: 부동산 경매 입찰", url: "https://www.easylaw.go.kr" },
  ]},
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 대리인 입찰</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 입찰 대리인 참여, 친구도 되나?<br />
        위임장 작성법과 필요 서류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매 입찰일인데 갑자기 출장이 잡혔어요. 몇 달 기다린 물건을 포기해야 하나 고민되죠.
      </p>
      <p style={body}>
        포기할 필요 없어요.
        <a href="https://www.easylaw.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에 따르면
        위임장과 인감증명서만 갖추면 친구든 가족이든 누구나 대리인으로 입찰에 참여할 수 있어요.
        서류 4가지만 빠짐없이 챙기면 법적으로 아무 문제 없죠.
      </p>

      <Divider />

      {/* 섹션 1: 대리인 자격 */}
      <H2>누가 대리인이 될 수 있나요?</H2>
      <p style={body}>
        배우자, 부모, 형제뿐 아니라 친구, 직장 동료, 누구든 가능해요.
        꼭 변호사나 법무사일 필요 없고, 성인이면 자격 제한이 없죠.
        중요한 건 서류가 완벽한지 여부예요. 하나라도 빠지면 입찰장에 못 들어가요.
      </p>

      <GreenBox title="대리인 입찰 핵심">
        자격 제한 없음 — 친구, 지인, 가족 누구든 가능<br />
        필수 서류 4가지: 위임장 + 인감증명서 + 대리인 신분증 + 대리인 도장<br />
        입찰보증금은 본인(위임인) 명의로 납부
      </GreenBox>

      <Divider />

      {/* 섹션 2: 준비 절차 */}
      <H2>위임장은 어떻게 준비하나요?</H2>
      <p style={body}>
        <a href="https://www.courtauction.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원 경매정보</a> 사이트에서
        위임장 양식을 다운받아 작성하면 돼요.
        본인 정보, 대리인 정보, 입찰 물건 사건번호를 정확히 기재하고 인감도장을 찍으세요.
      </p>
      <Steps steps={PREP_STEPS} />

      <Divider />

      {/* 섹션 3: 필요 서류 */}
      <H2>대리인이 입찰 당일 가져갈 서류는?</H2>
      <p style={body}>
        이 4가지가 전부예요. 하나라도 없으면 입찰 자체가 안 되니 꼼꼼히 챙기세요.
      </p>
      <DocTable docs={DOCS} />

      <Divider />

      {/* 섹션 4: 입찰 당일 체크리스트 */}
      <H2>입찰 당일, 빠뜨리면 안 되는 것들</H2>
      <p style={body}>
        서류 준비는 했는데 정작 입찰장에서 탈락하는 경우가 꽤 있어요. 마지막으로 한 번 더 확인하세요.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        낙찰 후 <a href="/w/경매-낙찰-후-등기-소유권이전" style={{ color: "#1D9E75", textDecoration: "underline" }}>소유권이전등기</a>는
        본인 명의로 진행되니, 대금 납부와 등기 절차도 미리 파악해두세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정보를 바탕으로 작성됐어요. 법원마다 세부 절차가 다를 수 있으니, 입찰 전에 해당 법원 경매계에 확인하세요." />
    </div>
  );
}
