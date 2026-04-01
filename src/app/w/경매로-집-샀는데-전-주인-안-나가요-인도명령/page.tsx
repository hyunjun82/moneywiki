"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 경매로 집을 낙찰받아서 대금도 다 냈는데 전 주인이 나가지 않아서 법적으로 어떻게 해야 하는지 모르는 상황
// Q2. 인도명령(6개월 이내)이나 명도소송을 신청해서 집을 인도받는다
// Q3. 인도명령 6개월 기한, 대상 제한(대항력 있는 임차인 불가), 명도소송과 비교, 점유이전금지가처분, 강제집행 절차·비용
// Q4. GreenBox(인도명령 vs 명도소송 비교) + Steps(신청 절차) + BorderBox(비용) + Checklist(사전 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const INDO_STEPS = [
  {
    title: "매각대금을 낸 법원에 인도명령 신청서를 제출하세요",
    desc: "매각대금 완납일로부터 6개월 이내에 신청해야 해요. 인도명령 신청서, 매각허가결정문, 대금 납부영수증, 등기부등본을 준비해서 경매를 진행한 법원에 제출하면 돼요.",
    tip: "인지대 5,000원 + 송달료 5,000원 내외",
  },
  {
    title: "점유이전금지가처분을 함께 신청하세요",
    desc: "인도명령 진행 중에 점유자가 제3자한테 집을 넘기면 처음부터 다시 소송해야 해요. 이걸 막으려면 점유이전금지가처분을 같이 신청하세요. 법원 집행관이 현관에 표시를 붙이고, 이후 점유를 넘기면 형사처벌 대상이에요.",
    tip: "가처분 비용 3~5만원, 넘기면 수백만원 절약",
  },
  {
    title: "법원 결정을 기다리세요 (보통 2~4주)",
    desc: "법원이 채무자·점유자에게 신청서를 보내고 사실관계를 확인해요. 대항력 있는 임차인인지, 정당한 점유 권원이 있는지 심리하고 결정을 내려요. 인용되면 '14일 이내에 부동산을 인도하라'는 결정문이 나와요.",
    tip: "명도소송(3~6개월)보다 훨씬 빨라요",
  },
  {
    title: "안 나가면 강제집행을 신청하세요",
    desc: "결정문을 받고도 안 나가면 법원에 강제집행을 신청해요. 집행문 부여 신청 → 강제집행 신청 → 집행관이 날짜 통보 → 현장에서 짐을 빼고 열쇠 인도. 비용은 50~100만원 정도예요.",
    tip: "강제집행 비용은 매수인이 먼저 내고 채무자에게 청구 가능",
  },
];

const PRE_CHECK = [
  "매각대금 완납일로부터 6개월이 지나지 않았는지",
  "점유자가 대항력 있는 임차인이 아닌지 (전입일·확정일자 확인)",
  "유치권 주장하는 사람이 아닌지",
  "점유자가 채무자·소유자·단순 점유자 중 누구인지",
  "점유이전금지가처분 신청 서류 준비됐는지",
];

const FAQS = [
  { q: "6개월이 지났으면 어떻게 하나요?", a: "명도소송을 제기해야 해요. 인도명령과 달리 일반 민사소송이라 3~6개월 걸리고 변호사 비용도 50~100만원 들어요. 그래서 6개월 안에 빨리 인도명령을 신청하는 게 훨씬 유리해요." },
  { q: "대항력 있는 세입자가 안 나가면요?", a: "인도명령 대상이 아니에요. 보증금을 돌려줘야 나가요. 배당으로 전액 받았으면 나가야 하지만, 일부만 받았거나 배당요구를 안 했으면 매수인이 잔액을 돌려줘야 해요." },
  { q: "전 주인이 다른 사람한테 집을 넘겼으면요?", a: "채무자가 제3자에게 점유를 넘겼으면 인도명령 대상이 바뀌어서 명도소송이 필요할 수 있어요. 이런 상황을 막으려면 점유이전금지가처분을 미리 신청해야 해요." },
  { q: "강제집행하면 짐은 어떻게 되나요?", a: "집행관이 짐을 빼서 보관 창고에 옮겨요. 보관 비용은 매수인이 먼저 부담하고 나중에 채무자에게 청구해요. 일정 기간이 지나면 경매로 처분할 수도 있어요." },
  { q: "인도명령 비용이 총 얼마 정도 드나요?", a: "인도명령 자체는 인지대·송달료 합쳐서 1만원 내외예요. 점유이전금지가처분 3~5만원. 강제집행까지 가면 50~100만원이 추가돼요. 명도소송(100만원 이상)보다 훨씬 저렴하죠." },
  { q: "이사비를 줘야 하나요?", a: "법적 의무는 없어요. 하지만 실무에서는 이사비 100~300만원 정도를 주고 합의하는 경우가 많아요. 강제집행 비용이 비슷하거나 더 들 수 있기 때문에, 합의가 빠르고 저렴한 경우가 많죠." },
];

const SOURCES = [
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=306&ccfNo=5&cciNo=1&cnpClsNo=2" },
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
  { name: "대법원 법원경매정보", href: "https://www.courtauction.go.kr" },
];

const RELATED = [
  { slug: "경매-권리분석-말소기준권리-인수-소멸", title: "경매 권리분석과 말소기준권리", description: "인수·소멸 권리를 구분하는 말소기준권리 분석법." },
  { slug: "경매-물건-현장조사-체크리스트-점유자-확인", title: "경매 현장조사 체크리스트", description: "입찰 전 현장에서 점유자·체납관리비 확인하는 법." },
  { slug: "임차권등기명령-보증금-못받고-이사-대항력", title: "임차권등기명령 신청 방법", description: "보증금 못 받고 이사할 때 대항력 유지하는 법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 경매 · 인도명령 · 명도</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매로 집 샀는데 전 주인이 안 나가요<br />
        인도명령 신청부터 강제집행까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "대금 다 냈는데 전 주인이 '갈 데가 없다'면서 버티고 있어요. 어떻게 해야 하나요?"
      </p>
      <p style={body}>
        매각대금을 완납했다면 법적으로 소유권은 이미 넘어온 상태예요. 전 주인이 안 나가면 <strong>인도명령</strong>을 신청하면 돼요. 핵심은 <strong>대금 납부 후 6개월 이내</strong>라는 기한이에요. 이 기한을 놓치면 시간과 비용이 훨씬 더 드는 명도소송을 해야 하죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 인도명령 vs 명도소송 비교 */}
      <H2>인도명령이랑 명도소송, 뭐가 다른가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법 제136조</a>에서 경매 매수인의 인도명령을 규정하고 있어요. 명도소송은 일반 민사소송이에요. 둘의 차이가 크니까 꼭 비교해 보세요.
      </p>

      <SectionBadge>인도명령 vs 명도소송 비교</SectionBadge>
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
              ["신청 기한", "매각대금 납부 후 6개월 이내", "기한 없음"],
              ["대상", "채무자·소유자·단순 점유자", "누구나 (제3자 포함)"],
              ["소요 기간", "2~4주", "3~6개월 (항소 시 1년 이상)"],
              ["비용", "1~5만원 (강제집행 별도)", "50~100만원 (변호사 비용 포함)"],
              ["절차", "서류 심사 위주", "변론·증거조사 필요"],
              ["대항력 있는 임차인", "신청 불가", "소송 가능 (보증금 반환 함께)"],
            ].map(([item, indo, myeongdo], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75" }}>{indo}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{myeongdo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        6개월 안이라면 무조건 인도명령이 유리해요. 2주면 결정 나오고 비용도 1만원이면 돼요. 기한을 놓치면 3~6개월에 100만원 이상 드는 명도소송밖에 남지 않으니, 대금 납부하자마자 바로 신청하는 게 좋아요.
      </p>

      <CategoryButton label="부동산 경매 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 인도명령 절차 */}
      <H2>인도명령 신청은 이렇게 하면 돼요</H2>
      <p style={body}>
        복잡하지 않아요. 서류 4종만 들고 법원에 가면 돼요. 변호사 없이 본인이 직접 할 수 있어요.
      </p>

      <SectionBadge>인도명령 4단계</SectionBadge>
      <Steps steps={INDO_STEPS} />

      <p style={body}>
        전체 과정이 빠르면 2주, 강제집행까지 가면 한 달 반 정도 걸려요. 점유자와 합의가 되면 더 빨리 끝나고요.
      </p>

      <Divider />

      {/* H2-3: 신청 못 하는 경우 */}
      <H2>인도명령을 신청할 수 없는 경우가 있어요</H2>
      <p style={body}>
        모든 점유자에게 인도명령을 쓸 수 있는 건 아니에요. 법적으로 보호받는 권리가 있는 사람한테는 신청 자체가 안 돼요.
      </p>

      <BorderBox>
        <strong>인도명령 대상이 아닌 점유자</strong>{"\n"}
        {"· 대항력 있는 임차인: 전입신고 + 확정일자가 말소기준권리보다 빠른 세입자\n· 최우선변제권 있는 소액임차인: 소액보증금 보호 대상\n· 유치권자: 공사비 등 채권으로 건물을 점유하고 있는 사람\n· 매각대금 납부 후 6개월이 지난 경우: 기한 도과 시 명도소송으로"}
      </BorderBox>

      <p style={body}>
        이런 경우에는 명도소송을 제기해야 해요. 대항력 있는 임차인은 보증금 반환 청구와 함께 소송을 진행하게 돼요. 경매 전에 <a href="/w/경매-권리분석-말소기준권리-인수-소멸" style={{ color: "#1D9E75", textDecoration: "underline" }}>권리분석</a>을 제대로 했다면 이런 상황을 미리 파악할 수 있었을 거예요.
      </p>

      <Divider />

      {/* H2-4: 사전 확인 체크리스트 */}
      <H2>신청 전에 이것부터 확인하세요</H2>
      <p style={body}>
        인도명령이 기각되면 시간만 낭비돼요. 신청 전에 아래 항목을 먼저 체크하세요.
      </p>

      <SectionBadge>사전 확인 체크리스트</SectionBadge>
      <Checklist items={PRE_CHECK} />

      <Divider />

      {/* H2-5: 비용 정리 */}
      <H2>전체 비용은 얼마 정도 드나요?</H2>
      <p style={body}>
        인도명령 자체는 거의 안 드는데, 강제집행까지 가면 비용이 올라가요. 합의로 끝내는 게 가장 경제적이에요.
      </p>

      <GreenBox title="비용 비교">
        {"인도명령만으로 해결: 1~5만원\n+ 점유이전금지가처분: 3~5만원 추가\n+ 강제집행: 50~100만원 추가\n\n명도소송으로 해결: 50~100만원 (변호사 비용)\n+ 강제집행: 50~100만원 추가\n\n합의금(실무 관행): 100~300만원"}
      </GreenBox>

      <p style={body}>
        실무에서는 이사비 100~300만원을 주고 합의하는 경우가 많아요. 강제집행 비용과 시간을 따지면 합의가 더 경제적일 때가 있거든요. 상대가 합의 의사가 있다면 이사비를 제안하는 것도 방법이에요.
      </p>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        경매 후 명도 과정에서 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법 및 생활법령정보로 작성했어요. 구체적인 사건은 법률 전문가에게 상담받으시고, 인도명령 기한(6개월)을 놓치지 않도록 주의하세요." />
    </ArticleLayout>
  );
}
