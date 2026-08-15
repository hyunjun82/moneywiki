"use client";
/*
Q1. 소득이 적은데 근로장려금을 받을 수 있는지, 얼마 받는지 궁금한 상황
Q2. 내 소득·재산 기준으로 자격 확인하고 홈택스에서 신청까지 완료
Q3. 가구 유형별 소득 기준(단독 2,200/홑벌이 3,200/맞벌이 4,400만원), 재산 2.4억 미만, 지급액(최대 330만원), 신청 시기(5월·9월), 신청 방법
Q4. EligibilityChecker(자격 확인) + DocTable(가구별 기준표) + Steps(신청 절차) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, DocTable, Steps, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "2025년에 근로소득·사업소득·종교인소득이 있어요" },
  { id: "c2", label: "배우자·부양자녀·70세 이상 부모 유무로 가구 유형을 구분할 수 있어요" },
  { id: "c3", label: "가구 유형별 소득 기준(단독 2,200만원, 홑벌이 3,200만원, 맞벌이 4,400만원) 이하예요" },
  { id: "c4", label: "2025.6.1 기준 가구원 재산 합계가 2.4억원 미만이에요" },
];

const INCOME_TABLE = {
  headers: ["가구 유형", "소득 기준", "최대 지급액"],
  rows: [
    ["단독가구", "2,200만원 미만", "165만원"],
    ["홑벌이가구", "3,200만원 미만", "285만원"],
    ["맞벌이가구", "4,400만원 미만", "330만원"],
  ],
};

const APPLY_STEPS = [
  { title: "가구 유형 확인", desc: "배우자·부양자녀·70세 이상 부모 유무에 따라 단독·홑벌이·맞벌이로 구분해요." },
  { title: "소득·재산 요건 확인", desc: "총소득이 기준 이하인지, 2025.6.1 기준 재산이 2.4억원 미만인지 체크하세요." },
  { title: "홈택스 또는 손택스 접속", desc: "홈택스(www.hometax.go.kr)나 손택스 앱에서 공동인증서·간편인증으로 로그인해요." },
  { title: "근로장려금 신청서 작성", desc: "소득 유형, 계좌번호를 입력하고 신청서를 제출하면 돼요. ARS(1544-9944)도 가능하죠." },
  { title: "심사·지급", desc: "정기신청(5월)은 9월에, 반기신청(9월·3월)은 12월·6월에 지급돼요." },
];

const FAQS = [
  { q: "근로장려금 신청 기간은 언제예요?", a: "정기신청은 매년 5월 1일~31일이에요. 반기신청은 상반기 9월, 하반기 3월이죠. 기한 후 신청은 6~11월까지 되는데 10% 감액돼요." },
  { q: "재산이 1.7억원 넘으면 못 받나요?", a: "받을 수 있죠. 다만 1.7억~2.4억 미만 구간이면 산정액의 50%만 지급돼요. 2.4억 이상이면 자격이 안 되고요." },
  { q: "자녀장려금도 같이 받을 수 있나요?", a: "조건만 맞으면 동시에 받을 수 있어요. 자녀 1명당 최대 100만원이 추가되죠." },
  { q: "사업소득자도 신청 가능한가요?", a: "가능하죠. 근로소득자, 사업소득자, 종교인소득자 모두 소득·재산 요건 충족 시 신청할 수 있어요." },
  { q: "기한 후 신청하면 얼마나 깎이나요?", a: "산정액의 10%가 감액돼요. 200만원이면 180만원만 받는 거죠. 5월에 꼭 신청하는 게 유리해요." },
  { q: "체납액이 있으면 어떻게 되나요?", a: "근로장려금에서 체납액을 먼저 충당하고 나머지를 지급해요. 전액 충당될 수도 있으니 체납 정리가 우선이에요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "국세청: 근로장려금 신청자격", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2452&cntntsId=7783" },
    { label: "조세특례제한법 제100조의3", url: "https://www.law.go.kr/법령/조세특례제한법" },
    { label: "홈택스: 근로장려금 신청", url: "https://www.hometax.go.kr" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 근로장려금 · 장려세제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로장려금, 나도 받을 수 있을까?<br />
        자격 조건부터 신청 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일은 하는데 소득이 적어서 생활이 빠듯하죠.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2452&cntntsId=7783" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>에서 운영하는 근로장려금은 저소득 근로자·사업자에게 최대 <strong>330만원</strong>까지 돌려주는 제도예요.
        2026년부터 맞벌이 소득 기준이 <strong>4,400만원</strong>으로 올랐고요. 내 자격부터 신청 절차까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>나도 받을 수 있나? 자격 요건</H2>
      <p style={body}>
        근로장려금은 <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법</a>에 근거한 제도예요. 소득 요건과 재산 요건을 동시에 충족해야 하죠. 2025년 귀속 기준으로 가구 유형에 따라 소득 기준이 다르고요.
      </p>
      <p style={body}>
        단독가구는 배우자·부양자녀·70세 이상 부모가 모두 없는 경우예요. 홑벌이는 배우자나 부양가족이 있는데 한 쪽만 소득이 있는 경우, 맞벌이는 부부 모두 소득이 있는 경우죠. 재산은 2025년 6월 1일 기준으로 가구원 전체 합산 <strong>2.4억원 미만</strong>이어야 해요.
      </p>
      <p style={body}>
        재산이 1.7억~2.4억 미만이면 산정액의 <strong>50%만</strong> 지급돼요. 예를 들어 계산된 금액이 200만원인데 재산이 1.8억이면 100만원만 받는 거죠.
      </p>

      <SectionBadge>자격 요건 체크리스트</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당되네요. 근로장려금 신청 자격이 있어요. 5월에 홈택스에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 해당되지 않는 항목을 다시 확인해보세요. 국세청 상담센터(126)에 문의하면 정확히 알 수 있죠."
      />

      <Divider />

      <H2>가구 유형별 소득 기준과 지급액</H2>
      <p style={body}>
        가구 유형에 따라 소득 기준과 최대 지급액이 달라요. 2026년 신청분(2025년 귀속)부터 맞벌이가구 소득 기준이 3,800만원에서 <strong>4,400만원</strong>으로 상향됐죠. 단독·홑벌이 기준은 그대로예요.
      </p>

      <SectionBadge>2025년 귀속 기준</SectionBadge>
      <DocTable headers={INCOME_TABLE.headers} rows={INCOME_TABLE.rows} />

      <p style={body}>
        소득이 일정 구간에 있을 때 최대 금액을 받아요. 너무 적거나 많으면 점점 줄어들죠. 단독가구는 연 900만원쯤일 때 165만원을 최대로 받고, 소득이 2,100만원이면 약 16만원 정도만 나와요.
      </p>

      <BorderBox>
        <strong>근로소득만 있으면</strong> 정기신청(5월)·반기신청(9월·3월) 모두 가능<br />
        <strong>사업소득이 섞여 있으면</strong> 정기신청(5월)만 가능
      </BorderBox>

      <ArticleAd position="mid" />
      <Divider />

      <H2>신청 방법, 5단계면 끝나요</H2>
      <p style={body}>
        정기신청은 매년 <strong>5월 1일~31일</strong>이에요. <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>나 손택스 앱으로 신청하는 게 가장 빠르죠. ARS(1544-9944)로 전화 신청도 되고, 세무서 방문도 가능해요.
      </p>
      <p style={body}>
        반기신청은 근로소득만 있는 사람이 선택할 수 있어요. 상반기 소득은 9월에 신청해서 12월에 받고, 하반기 소득은 3월에 신청해서 6월에 받죠. 기한 후 신청은 6~11월까지인데 10% 감액되니까 5월에 하는 게 이득이에요.
      </p>

      <SectionBadge>신청 5단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 조세특례제한법과 국세청 안내를 바탕으로 작성했어요. 개인별 자격 여부는 국세청 상담센터(126)에서 정확히 확인할 수 있어요." />
    </ArticleLayout>
  );
}
