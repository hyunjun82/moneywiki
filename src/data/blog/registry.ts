import type { BlogEntry } from "./types";

import Article41Component from "./실업급여-구직활동";
import Article42Component from "./실업급여-기준기간";
import Article43Component from "./실업급여-기초일액";
import Article44Component from "./실업급여-미지급-상속";
import Article45Component from "./실업급여-반복수급";

const BLOGS: BlogEntry[] = [
  {
    slug: "실업급여-구직활동",
    meta: {
      title: "실업급여 구직활동 인정 증빙 방법 | 워크넷 입사지원 온라인 교육",
      description: "실업급여 구직활동 인정 기준이 차수마다 다른 거 아시나요? 1차는 온라인 교육 수강만으로 끝나지만, 5차부터는 갑자기 까다로워져요.",
      keywords: ["실업급여 구직활동", "인정 증빙 방법", "워크넷 입사지원", "온라인 교육"],
      ogTitle: "실업급여 구직활동 인정 증빙 방법 | 머니위키",
      ogDescription: "워크넷 입사지원 자동 연동부터 증빙 방법까지 정리했어요.",
      datePublished: "2026-01-09",
      lastUpdated: "2026-02-21",
      category: "실업급여",
      faq: [
        { question: "실업급여 구직활동 인정 횟수가 차수마다 다른가요?", answer: "네, 달라요. 1차는 온라인 교육, 2~4차는 재취업 활동 1회, 5차 이후는 2회(구직활동 1회 필수)예요." },
        { question: "사람인이나 잡코리아 입사지원도 실업급여 구직활동으로 인정되나요?", answer: "고용24와 연동되는 민간 채용사이트는 자동으로 인정돼요. 연동이 안 되는 사이트라면 지원 완료 화면을 캡처해서 첨부하면 돼요." },
      ],
    },
    Component: Article41Component,
  },
  {
    slug: "실업급여-기준기간",
    meta: {
      title: "실업급여 기준기간 이직일 18개월 | 피보험 180일 합산",
      description: "이직일 기준 18개월 안에 피보험기간 180일 이상이면 실업급여 수급자격이 돼요. 기준기간 연장 사유와 합산 방법을 정리했어요.",
      keywords: ["실업급여 기준기간", "이직일 18개월", "피보험 180일", "합산"],
      ogTitle: "실업급여 기준기간 이직일 18개월 | 머니위키",
      ogDescription: "18개월 기준기간과 피보험 180일 합산 방법을 정리했어요.",
      datePublished: "2026-01-09",
      lastUpdated: "2026-02-20",
      category: "실업급여",
      faq: [
        { question: "실업급여 기준기간 18개월은 언제부터 계산하나요?", answer: "이직일(퇴사일) 기준으로 거꾸로 18개월을 계산해요. 2026년 2월 20일에 퇴사했다면 2024년 8월 21일부터 2026년 2월 20일까지가 기준기간이에요." },
        { question: "실업급여 피보험기간 180일에 주말도 포함되나요?", answer: "아니요, 피보험기간은 보수 지급 기초가 되는 날만 계산해요. 월급제라면 주말도 포함되지만, 일급제·시급제는 실제 근무일만 계산해요." },
      ],
    },
    Component: Article42Component,
  },
  {
    slug: "실업급여-기초일액",
    meta: {
      title: "실업급여 기초일액 평균임금 60% | 상한액 하한액 기준",
      description: "퇴직 전 평균임금의 60%가 기초일액이에요. 2026년 상한액 68,100원, 하한액 66,048원이고 둘의 차이가 겨우 2,052원이에요.",
      keywords: ["실업급여 기초일액", "평균임금 60%", "상한액 하한액", "기준"],
      ogTitle: "실업급여 기초일액 평균임금 60% | 머니위키",
      ogDescription: "상한액 68,100원, 하한액 66,048원 기준을 정리했어요.",
      datePublished: "2026-01-09",
      lastUpdated: "2026-02-20",
      category: "실업급여",
      faq: [
        { question: "실업급여 기초일액 계산에서 퇴직금도 포함되나요?", answer: "퇴직금은 평균임금 계산에 포함되지 않아요. 퇴직 전 3개월간 실제로 받은 기본급, 수당, 분기별 상여금의 해당 기간 분만 합산해요." },
        { question: "실업급여 기초일액 상한액과 하한액 차이가 얼마나 나나요?", answer: "2026년 기준으로 상한액(68,100원)과 하한액(66,048원)의 차이는 2,052원이에요. 최저임금이 꾸준히 올라 두 금액이 가까워졌어요." },
      ],
    },
    Component: Article43Component,
  },
  {
    slug: "실업급여-미지급-상속",
    meta: {
      title: "실업급여 미지급 사망 유족 | 배우자 자녀 기한",
      description: "실업급여 수급자가 사망하면 유족이 대신 받을 수 있는지 고민이시죠? 배우자·자녀 수급 순위부터 3년 청구 시효까지 알려드려요.",
      keywords: ["실업급여 미지급", "사망 유족", "배우자 자녀", "기한"],
      ogTitle: "실업급여 미지급 사망 유족 | 머니위키",
      ogDescription: "유족 청구 순위부터 3년 소멸시효까지 정리했어요.",
      datePublished: "2026-02-20",
      lastUpdated: "2026-02-20",
      category: "실업급여",
      faq: [
        { question: "실업급여 미지급 청구 시 유족 간 순위가 같으면 어떻게 되나요?", answer: "같은 순위의 유족이 여러 명이면 동등하게 나눠 받아요. 예를 들어 자녀가 2명이면 각각 절반씩 청구할 수 있어요." },
        { question: "실업급여 미지급 사망 시 수급자의 빚이 있으면 어떻게 되나요?", answer: "미지급 실업급여는 상속재산과 별도로 취급돼요. 수급자에게 채무가 있어도 유족의 고유 청구권이기 때문에 채권자가 압류할 수 없어요." },
      ],
    },
    Component: Article44Component,
  },
  {
    slug: "실업급여-반복수급",
    meta: {
      title: "실업급여 반복수급 5년 3회 감액 | 50% 단계별 삭감",
      description: "5년간 3회 이상 받으면 최대 50%까지 감액된다는 사실, 알고 계셨나요? 반복수급 감액 기준부터 단계별 삭감률까지 정리해드려요.",
      keywords: ["실업급여 반복수급", "5년 3회 감액", "50% 단계별 삭감", "반복수급 단계별 감액"],
      ogTitle: "실업급여 반복수급 5년 3회 감액 | 머니위키",
      ogDescription: "3회 10%, 4회 25%, 5회 이상 50% 삭감 기준을 정리했어요.",
      datePublished: "2026-02-20",
      lastUpdated: "2026-02-20",
      category: "실업급여",
      faq: [
        { question: "실업급여 반복수급 감액은 전체 금액에서 삭감되나요?", answer: "네, 소정급여일수 전체에 감액이 적용돼요. 3회째 수급이면 전체 기간 수령액의 10%를 깎아요." },
        { question: "실업급여 반복수급 5년 기산점은 언제인가요?", answer: "이직일 기준으로 직전 5년 내 실업급여 수급 횟수를 계산해요. 이직일이 같은 해이더라도 과거 수급 횟수에 따라 감액 여부가 달라져요." },
      ],
    },
    Component: Article45Component,
  },
];

const blogMap = new Map<string, BlogEntry>(BLOGS.map((b) => [b.slug, b]));

export function getBlogBySlug(slug: string): BlogEntry | undefined {
  return blogMap.get(slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOGS.map((b) => b.slug);
}

export type { BlogEntry, BlogMeta } from "./types";
