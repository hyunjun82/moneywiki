"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 신용카드를 처음 만들려는데 내 신용점수·소득으로 발급 가능한지 궁금한 상황
Q2. 발급 조건(신용점수, 소득)을 확인하고 내 상황에서 카드 신청 가능 여부를 판단
Q3. NICE 720점/KCB 621점 이상, 월 가처분소득 50만원, 연체 없어야 함, 3개 이상 카드대출 시 거절 위험
Q4. EligibilityChecker(내 상황 체크) + DocTable(카드사별 기준) + GreenBox(핵심 기준) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "만 19세 이상이에요 (만 18세 재직자 포함)" },
  { id: "c2", label: "NICE 720점 또는 KCB 621점 이상이에요" },
  { id: "c3", label: "월 가처분소득이 50만원 이상이에요" },
  { id: "c4", label: "금융기관 연체 기록이 없어요" },
];

const SCORE_TABLE = {
  headers: ["구분", "NICE 기준", "KCB 기준"],
  rows: [
    ["발급 가능 최소 점수", "720점 이상", "621점 이상"],
    ["적용 기간", "2025.4.1~2026.3.31", "2025.4.1~2026.3.31"],
    ["원활한 발급 점수", "800점 이상", "700점 이상"],
  ],
};

const FAQS = [
  { q: "소득이 없어도 카드를 만들 수 있나요?", a: "통장 평균 잔액이 카드사 기준 이상이면 가능할 수 있어요. 다만 월 가처분소득 50만원 요건을 다른 방식으로 충족해야 하죠." },
  { q: "신용점수가 700점인데 발급 가능한가요?", a: "NICE 기준 720점 미만이면 1차 심사에서 탈락할 수 있어요. KCB 점수가 621점 이상이면 KCB 기준 카드사에서는 가능할 수 있죠." },
  { q: "카드를 여러 장 만들면 불리한가요?", a: "3개 이상 카드사에서 카드대출(현금서비스, 카드론, 리볼빙)을 이용 중이면 추가 발급이 거절될 수 있어요." },
  { q: "발급 거부됐는데 바로 다시 신청해도 되나요?", a: "바로 재신청하면 불리해요. 단기간에 여러 곳에 신청하면 신용점수에 부정적이죠. 3~6개월 정도 기다리는 게 나아요." },
  { q: "체크카드를 쓰면 신용점수가 올라가나요?", a: "체크카드도 금융거래 실적으로 반영돼요. 꾸준히 사용하면 신용점수에 긍정적이죠." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "신한카드: 신용카드 발급 기준", url: "https://www.shinhancard.com/pconts/html/helpdesk/consumer/MOBFM12313/MOBFM12313R01.html" },
    { label: "올크레딧: 내 신용점수 조회", url: "https://www.allcredit.co.kr" },
    { label: "NICE 지키미: 신용점수 확인", url: "https://www.credit.co.kr" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 신용카드 · 발급 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신용카드 발급, 내 점수로 되나?<br />
        2026년 신용점수·소득 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        신용카드 처음 만들려는데 조건이 뭔지 모르겠죠.
        2026년 3월까지 적용되는 기준은 <strong>NICE 720점, KCB 621점 이상</strong>이에요.
        월 가처분소득 <strong>50만원 이상</strong>도 필요하고요. 내 상황에서 발급 가능한지 체크해볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>발급 가능한 신용점수 기준</H2>
      <p style={body}>
        금융당국이 매년 발표하는 신용카드 발급 기준이 있어요. 2025년 4월 발표된 기준은 <strong>2026년 3월 31일까지</strong> 유효하죠. NICE 평가 기준 720점, KCB 기준 621점 이상이면 발급 심사를 통과할 수 있어요.
      </p>
      <p style={body}>
        이건 최소 기준이에요. 이 점수 이상이라고 무조건 되는 건 아니고, 카드사별로 자체 심사 기준이 추가되죠. <a href="/w/신용등급-조회-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>내 신용점수</a>는 NICE 지키미나 올크레딧에서 무료로 확인할 수 있어요.
      </p>

      <SectionBadge>2026년 3월까지 적용 기준</SectionBadge>
      <DocTable headers={SCORE_TABLE.headers} rows={SCORE_TABLE.rows} />

      <Divider />

      <H2>소득 조건과 추가 심사 항목</H2>
      <p style={body}>
        월 가처분소득(월급에서 세금·고정 지출 뺀 금액)이 <strong>50만원 이상</strong>이어야 해요. 직장인이면 급여명세로, 프리랜서면 통장 입금 내역으로 확인하죠.
      </p>
      <p style={body}>
        소득 외에도 직업 안정성, 금융거래 실적, 기존 대출 현황을 봐요. <strong>3개 이상 카드사에서 카드대출</strong>(현금서비스·카드론·리볼빙)을 이용 중이면 추가 발급이 거절될 가능성이 높죠.
      </p>

      <GreenBox>
        신용점수: NICE 720점 / KCB 621점 이상<br />
        월 가처분소득: 50만원 이상<br />
        연체 기록: 없어야 함<br />
        카드대출: 3개사 이상 이용 시 거절 위험
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 충족하네요. 신용카드 발급 가능성이 높아요. 원하는 카드사에 신청해보세요."
        partialMatchText="일부 미충족이에요. 해당 항목을 개선한 뒤 신청하면 승인 확률이 올라가요."
      />

      <ArticleAd position="mid" />
      <Divider />

      <H2>거절되는 대표적인 이유</H2>
      <p style={body}>
        연체 기록이 있으면 금액과 무관하게 거절돼요. 몇 만원이라도 연체가 남아 있으면 안 되죠. 상위누적 구성비가 93%를 초과하거나 장기연체 가능성이 0.65%를 넘으면 기준 미달이에요.
      </p>
      <p style={body}>
        단기간에 여러 카드사에 동시 신청하는 것도 불리해요. 한꺼번에 3~4군데 넣으면 &ldquo;돈이 급한 사람&rdquo;으로 판단되거든요. 거절됐다면 3~6개월 신용 관리 후 다시 시도하는 게 좋죠.
      </p>

      <BorderBox>
        <strong>거절 사유 TOP 3</strong><br />
        1. 연체 기록 (소액이라도)<br />
        2. 신용점수 기준 미달<br />
        3. 단기간 다중 신청
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융당국 모범규준과 카드사 안내를 바탕으로 작성했어요. 카드사별 세부 기준은 다를 수 있으니 해당 카드사에 문의하세요." />
    </ArticleLayout>
  );
}
