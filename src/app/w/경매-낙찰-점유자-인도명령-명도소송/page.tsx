"use client";
// Q1. 경매로 집을 낙찰받았는데 전 주인이 안 나가서 어떻게 해야 하는지 모르는 상황
// Q2. 대금납부 후 6개월 안에 인도명령을 신청해서 점유자를 퇴거시킨다
// Q3. 인도명령 vs 명도소송 차이, 6개월 기한, 대상자(대항력 유무), 비용, 강제집행
// Q4. GreenBox(결론) + BorderBox(인도명령 vs 명도소송 비교) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "대금납부 직후 점유 상태를 파악하세요",
    desc: "낙찰 대금을 납부하면 소유권이 넘어와요. 바로 현장에 가서 누가 살고 있는지, 자발적으로 나갈 의사가 있는지 알아보세요. 이사 비용을 일부 부담하는 합의(이사비 합의)로 원만하게 해결하는 경우도 많아요.",
    tip: "합의금은 보통 200~500만원 선. 소송보다 저렴할 수 있어요",
  },
  {
    title: "6개월 안에 인도명령을 신청하세요",
    desc: "점유자가 안 나가면 대금납부일로부터 6개월 이내에 집행법원에 인도명령을 신청해요. 신청서에 매각대금 납부 영수증, 등기부등본을 첨부하면 돼요. 인지대 1,000원, 송달료 약 5만원 정도예요.",
    tip: "6개월 넘기면 인도명령 불가 → 명도소송으로 전환",
  },
  {
    title: "법원 결정 후 강제집행을 신청하세요",
    desc: "인도명령 신청 후 2~3주면 법원이 결정을 내려요. 결정문을 받은 후 집행관에게 강제집행을 신청하면 돼요. 점유자가 이의를 제기해도 강제집행이 정지되지 않아요(즉시항고만 가능).",
    tip: "강제집행 비용은 30~100만원 (물건 크기에 따라 다름)",
  },
  {
    title: "강제집행으로 퇴거가 완료돼요",
    desc: "집행관이 현장에 가서 점유자를 퇴거시키고 매수인에게 부동산을 인도해요. 점유자의 물건은 집행관이 지정한 장소에 보관하고, 일정 기간 후 처분할 수 있어요. 여기까지 대금납부 후 1~2개월이면 끝나요.",
  },
];

const FAQS = [
  {
    q: "인도명령 대상이 아닌 점유자도 있나요?",
    a: "네, 선순위 대항력이 있는 임차인은 인도명령 대상이 아니에요. 말소기준권리보다 먼저 전입신고+확정일자를 갖춘 임차인이 보증금을 못 받았다면 매수인에게 대항할 수 있어요. 이런 경우는 보증금을 지급하거나 명도소송으로 해결해야 해요.",
  },
  {
    q: "6개월 기한을 넘기면 어떻게 되나요?",
    a: "인도명령은 쓸 수 없고 명도소송을 제기해야 해요. 명도소송은 6~8개월 걸리고, 변호사 비용까지 합하면 수백만원이 들어요. 그래서 6개월 안에 인도명령으로 처리하는 게 훨씬 유리해요.",
  },
  {
    q: "점유자가 이의를 제기하면요?",
    a: "인도명령에 대해 즉시항고를 할 수 있지만, 항고해도 강제집행이 정지되지 않아요. 별도로 강제집행정지 결정을 받아야 하는데, 이건 쉽지 않아요. 대부분 인도명령 결정대로 집행이 진행돼요.",
  },
  {
    q: "인도명령 비용은 얼마예요?",
    a: "신청 비용은 인지대 1,000원 + 송달료 약 5만원으로 매우 저렴해요. 강제집행 비용은 별도로 30~100만원 정도 들어요. 명도소송(수백만원)에 비하면 훨씬 적은 비용이에요.",
  },
  {
    q: "전세 세입자가 보증금을 못 받았다고 버티면요?",
    a: "대항력 없는 세입자(후순위)는 인도명령으로 퇴거 가능해요. 대항력 있는 세입자(선순위)는 보증금을 돌려줘야 나가요. 배당에서 보증금을 전액 수령했는데도 안 나가면 인도명령 대상이 될 수 있어요.",
  },
  {
    q: "명도소송은 꼭 변호사를 써야 하나요?",
    a: "법적으로는 혼자 할 수 있어요. 하지만 상대방이 반소를 제기하거나 권리관계가 복잡하면 변호사 도움이 필요해요. 대한법률구조공단(132번)에서 무료 상담을 받을 수 있어요.",
  },
];

const SOURCES = [
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "대법원 법원경매정보", href: "https://www.courtauction.go.kr" },
];

const RELATED = [
  { slug: "전세-대항력-확정일자", title: "전세 대항력과 확정일자", description: "임차인의 대항력 발생 요건." },
  { slug: "전세보증금-우선변제권", title: "전세보증금 우선변제권", description: "경매에서 보증금 받는 순서." },
  { slug: "가압류-처분금지가처분-경매-효력", title: "가압류·가처분 경매 효력", description: "경매에서 권리 말소·인수 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 낙찰받았는데 전 주인이 안 나가요<br />
        인도명령과 명도소송 기한·절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        낙찰 대금까지 다 냈는데 전 주인이 &ldquo;나갈 데가 없다&rdquo;며 버틴다면 정말 난감하죠.
      </p>
      <p style={body}>
        핵심은 <strong>대금납부 후 6개월</strong>이에요. 이 안에 <strong>인도명령</strong>을 신청하면 2~3주 만에 법원 결정이 나오고, 1~2개월이면 강제퇴거까지 끝나요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a> 제136조에서 정한 제도예요.
        6개월을 넘기면 명도소송(6~8개월)으로 가야 하니까 시간이 돈이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>인도명령 vs 명도소송, 뭐가 다르죠?</H2>
      <p style={body}>
        둘 다 점유자를 내보내는 법적 절차지만, 속도와 비용이 천지 차이예요.
      </p>

      <SectionBadge>인도명령 vs 명도소송</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>인도명령</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>명도소송</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["신청 기한", "대금납부 후 6개월 이내", "제한 없음"],
              ["처리 기간", "2~3주", "6~8개월"],
              ["비용", "약 5만원 + 집행비", "수백만원 (변호사비 포함)"],
              ["진행 방식", "서류 심사 (변론 없음)", "변론 절차 필요"],
              ["대상", "대항력 없는 점유자", "모든 점유자"],
              ["강제집행", "결정 후 바로 가능", "판결 확정 후 가능"],
            ].map(([label, delivery, lawsuit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{delivery}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{lawsuit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        가능하면 6개월 안에 인도명령으로 처리하는 게 시간·비용 모두 유리해요. 대금납부 직후부터 카운트다운이 시작된다는 걸 잊지 마세요.
      </p>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>인도명령 누구한테 쓸 수 있나요?</H2>
      <p style={body}>
        모든 점유자에게 쓸 수 있는 건 아니에요. 대항력이 있는 선순위 임차인은 제외돼요.
      </p>

      <GreenBox title="인도명령 대상">
        O: 채무자(전 소유자), 경매개시결정 후 입주한 점유자, 대항력 없는 임차인{"\n"}
        X: 선순위 대항력 있는 임차인 (보증금 미수령), 유치권자
      </GreenBox>

      <p style={body}>
        선순위 임차인이 보증금을 배당에서 전액 받았는데도 안 나가면? 이 경우는 인도명령 대상이 될 수 있어요. 배당으로 보증금을 받았으니 대항력이 소멸했기 때문이에요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>대금납부 후 이렇게 움직이세요</H2>
      <p style={body}>
        낙찰 대금을 납부한 날부터 시간 싸움이에요. 합의가 안 되면 즉시 인도명령을 신청하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 법률 정보를 제공하며 법률 자문이 아니에요. 구체적인 사안은 법무사나 변호사와 상담하세요." />
    </ArticleLayout>
  );
}
