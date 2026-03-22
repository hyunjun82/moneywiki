"use client";

// Q1. 청년월세지원에 선정됐거나 신청했는데, 돈이 언제 들어오는지, 어디 계좌로 들어오는지 알고 싶은 상황
// Q2. 지급일 시기와 입금 계좌(본인/임대인)를 확인하고, 입금이 안 됐을 때 어떻게 해야 하는지 파악한다
// Q3. 신청 후 심사 30~60일, 매월 25일 전후 입금, 본인 계좌 또는 임대인 계좌, 소급 지급 가능, 미입금 시 문의처
// Q4. GreenBox(지급 일정 요약) + BorderBox(입금 방식 설명) + Steps(미입금 시 확인 절차) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 청년월세지원_SIDEBAR, 청년월세지원_HIGHLIGHT } from "@/data/청년월세지원-guide";

const SIDEBAR_ITEMS = 청년월세지원_SIDEBAR;

const CHECK_STEPS = [
  { title: "복지로 마이페이지 확인", desc: "bokjiro.go.kr에 로그인해서 마이페이지 > 서비스 이력에서 현재 진행 상태를 확인해요. '심사 중', '선정', '지급 예정' 등 상태가 표시돼요." },
  { title: "지자체 담당 부서 전화", desc: "복지로에서 상태 확인이 안 되면, 거주지 주민센터나 시·군·구청 주거복지 담당 부서에 전화해요. 접수번호를 알려주면 빠르게 확인해줘요." },
  { title: "계좌 정보 확인", desc: "입금 계좌가 잘못 등록됐거나 해지된 경우 지급이 지연될 수 있어요. 복지로 마이페이지에서 등록된 계좌 정보를 확인하고, 변경이 필요하면 수정해요." },
];

const FAQS = [
  { q: "선정되면 바로 입금이 되나요?", a: "선정 통보 후 다음 달부터 월세가 지급되는 게 일반적이에요. 심사가 완료된 시점에 따라 소급 지급되는 경우도 있으니, 선정 통보 문자에서 지급 시작 시기를 확인하면 돼요." },
  { q: "매달 언제 입금되나요?", a: "지자체마다 다르지만 보통 매월 25일 전후로 입금돼요. 정확한 날짜는 거주지 지자체에 확인해야 해요. 공휴일이 있으면 앞당겨지거나 뒤로 밀릴 수 있어요." },
  { q: "본인 계좌로 받을 수 있나요, 임대인 계좌로 가나요?", a: "지자체에 따라 다를 수 있지만, 대부분 청년 본인 명의 계좌로 입금돼요. 일부 지자체는 임대인 계좌로 직접 지급하는 경우도 있으니, 신청 시 계좌 선택 항목을 확인해야 해요." },
  { q: "입금이 안 들어왔는데 어떻게 해요?", a: "복지로 마이페이지에서 지급 상태를 먼저 확인하고, '지급 완료'인데 입금이 안 됐다면 등록 계좌를 확인해요. 계좌 문제가 없다면 거주지 주민센터에 전화해서 확인받으면 돼요." },
  { q: "중간에 이사하면 계좌도 바꿔야 하나요?", a: "이사하면 주소 변경 신고를 해야 하고, 새 임대차계약서도 제출해야 해요. 계좌 자체는 본인 계좌가 바뀌지 않았다면 그대로 유지돼요. 다만 이사 후에도 자격 조건을 충족하는지 재심사가 진행될 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "복지로 청년월세지원", url: "https://www.bokjiro.go.kr" },
    { label: "청년월세 한시 특별지원사업 안내 (국토교통부)", url: "https://www.molit.go.kr" },
    { label: "마이홈포털", url: "https://www.myhome.go.kr" },
  ]},
];

const RELATED = [
  { slug: "청년월세지원-복지로-신청방법-서류", title: "복지로 신청 방법", description: "아직 신청 전이라면 신청 절차부터 확인해봐요." },
  { slug: "청년월세지원-탈락사유-재신청-방법", title: "탈락 사유와 재신청", description: "선정이 안 됐다면 사유 확인과 재신청 방법을 정리했어요." },
  { slug: "청년월세지원-24개월-확대-변경내용", title: "24개월 확대 변경 내용", description: "지원 기간이 어떻게 바뀌었는지 확인해봐요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="청년월세지원 가이드" items={SIDEBAR_ITEMS} highlightSlugs={청년월세지원_HIGHLIGHT} currentSlug="청년월세지원-지급일-입금시기-계좌" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        청년 지원 · 주거 · 지급 안내
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년월세지원 언제 입금될까?<br />
        지급일과 입금 계좌 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        신청은 했는데, 심사가 끝나면 돈이 언제 들어오는지, 내 통장으로 오는지 임대인 통장으로 가는지 궁금하죠.
        신청 후 흐름을 알아야 기다리는 동안에도 마음이 편하니까요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        결론부터 말하면, 선정 후 매달 25일 전후로 본인 계좌에 입금돼요.
        아래에서 심사부터 입금까지의 전체 흐름을 정리해줄게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지급 일정 요약</H2>
      <p style={body}>
        신청부터 입금까지의 전체 흐름이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { item: "심사 기간", val: "접수 후 약 30~60일" },
              { item: "선정 통보", val: "복지로 마이페이지 + 문자" },
              { item: "지급 시작", val: "선정 통보 다음 달 (소급 가능)" },
              { item: "매월 지급일", val: "매월 25일 전후 (지자체별 상이)" },
              { item: "지급 방식", val: "본인 명의 계좌 입금 (지자체별 상이)" },
              { item: "지급 기간", val: "최대 24개월" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600, minWidth: 90 }}>{r.item}</td>
                <td style={{ padding: "5px 8px" }}>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        심사 기간은 접수량에 따라 달라져요. 상시 접수라 특정 시기에 몰리면 좀 더 걸릴 수 있고,
        서류 보완이 필요하면 그만큼 지연돼요. 서류를 처음부터 꼼꼼하게 제출하는 게 빠른 입금의 핵심이에요.
      </p>

      <Divider />

      <H2>입금 계좌와 지급 방식</H2>
      <p style={body}>
        대부분 청년 본인 명의 계좌로 입금돼요. 신청 시 입금받을 계좌를 등록하면 돼요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>본인 계좌 입금이 기본</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          신청 시 등록한 본인 명의 통장으로 매달 지원금이 입금돼요.
          계좌가 해지되거나 변경된 경우 복지로 마이페이지에서 수정할 수 있어요.
          타인 명의 계좌는 등록이 안 되니까 반드시 본인 명의 통장을 준비해야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>일부 지자체는 임대인 직접 지급</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          지자체에 따라 월세를 임대인 계좌로 직접 지급하는 경우도 있어요.
          이 경우 임대인 계좌 정보를 신청 시 함께 제출해야 해요.
          어떤 방식인지는 거주지 주민센터나 복지로 신청 화면에서 확인할 수 있어요.
        </p>
      </BorderBox>

      <Divider />

      <H2>입금이 안 됐을 때 확인 절차</H2>
      <p style={body}>
        선정 통보를 받았는데 입금이 안 될 때는 아래 순서로 확인하면 돼요.
      </p>

      <Steps steps={CHECK_STEPS} />

      <p style={body}>
        대부분 계좌 오류나 서류 보완 미완료 때문에 지연되는 경우가 많아요.
        복지로 마이페이지를 주기적으로 확인하는 습관을 들이면 좋아요.
      </p>

      <CategoryButton label="청년월세지원 가이드" count={SIDEBAR_ITEMS.length} href="/w/청년월세지원-2026-신청조건-소득기준" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국토교통부 청년월세지원사업 안내를 기준으로 작성됐어요. 지급일과 지급 방식은 지자체별로 다를 수 있으니 복지로나 주민센터에서 확인해야 해요." />
    </ArticleLayout>
  );
}
