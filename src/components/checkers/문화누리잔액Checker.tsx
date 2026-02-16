'use client'

import GenericChecker from '@/components/GenericChecker'
import type { CheckerConfig, CheckerResult } from '@/data/checker-types'

const config: CheckerConfig = {
  title: '남은 잔액으로 뭘 할 수 있을까?',
  subtitle: '잔액, 관심 분야, 지역을 선택하면 추천 사용처를 알려드려요',
  intro: (
    <p>
      문화누리카드 잔액이 얼마 남았는지에 따라 이용할 수 있는 활동이 달라져요.
      아래에서 <strong>남은 잔액</strong>과 <strong>관심 분야</strong>를 선택해 보세요.
    </p>
  ),
  groups: [
    {
      key: 'balance',
      label: '남은 잔액',
      options: [
        { value: '15', text: '15만원 (전액)' },
        { value: '10', text: '약 10만원' },
        { value: '5', text: '약 5만원' },
        { value: '3', text: '3만원 이하' },
      ],
    },
    {
      key: 'interest',
      label: '관심 분야',
      options: [
        { value: 'movie', text: '영화 관람' },
        { value: 'perform', text: '공연/전시 관람' },
        { value: 'travel', text: '여행/숙박' },
        { value: 'sports', text: '스포츠 관람/체육' },
      ],
    },
    {
      key: 'region',
      label: '거주 지역',
      options: [
        { value: 'seoul', text: '서울' },
        { value: 'metro', text: '수도권 (경기/인천)' },
        { value: 'local', text: '지방' },
      ],
    },
  ],
  evaluate: (sel): CheckerResult => {
    const balance = parseInt(sel.balance)

    const moviePrice = 14000
    const movieCount = Math.floor((balance * 10000) / moviePrice)

    const usageMap: Record<string, { activity: string; estimate: string; tip: string }> = {
      movie: {
        activity: '영화 관람',
        estimate: `일반 영화 약 ${movieCount}회 관람`,
        tip: '평일 조조 할인을 활용하면 더 많이 볼 수 있어요.',
      },
      perform: {
        activity: '공연/전시 관람',
        estimate: balance >= 10 ? '소극장 공연 2~3회 또는 박물관/미술관 여러 회' : balance >= 5 ? '소극장 공연 1~2회 관람' : '박물관/미술관 관람 2~3회',
        tip: '국공립 미술관은 무료인 곳도 많으니 잔액을 공연에 집중해 보세요.',
      },
      travel: {
        activity: '여행/숙박',
        estimate: balance >= 10 ? 'KTX 왕복 1회 + 숙박 1박 가능' : balance >= 5 ? '시외버스 왕복 + 저가 숙박 1박' : '시내 관광지 입장료 활용',
        tip: sel.region === 'local' ? '가까운 관광지 당일치기로 교통비를 아끼는 것도 방법이에요.' : 'KTX, SRT, 시외버스 모두 사용 가능해요.',
      },
      sports: {
        activity: '스포츠 관람/체육',
        estimate: balance >= 10 ? '프로야구 관람 약 5~7회' : balance >= 5 ? '프로야구 관람 약 2~3회' : '헬스장/수영장 1~2회 이용',
        tip: '프로스포츠 입장권과 체육시설 이용료 모두 결제 가능해요.',
      },
    }

    const usage = usageMap[sel.interest]

    return {
      pass: true,
      headline: `${usage.activity}에 활용해 보세요`,
      detail: (
        <>잔액 {balance}만원 기준으로 {usage.estimate}이 가능해요.
        {' '}{usage.tip}
        {balance <= 3 && ' 12월 31일에 잔액이 소멸되니 남은 금액은 빨리 사용하는 게 좋아요.'}</>
      ),
      amount: {
        value: `${balance}만원`,
        unit: '현재 잔액',
      },
      badges: [usage.activity, `잔액 ${balance}만원`],
      links: [
        { icon: '🔍', title: '가맹점 찾기', desc: '내 주변 문화누리 가맹점 검색', href: '/w/문화누리카드-사용처-잔액-확인-가맹점-소멸' },
        { icon: '📋', title: '문화누리카드 전체 안내', desc: '신청 방법, 자격 조건 확인', href: '/w/문화누리카드-신청-방법-자격-조건-자동재충전' },
      ],
    }
  },
}

export default function 문화누리잔액Checker() {
  return <GenericChecker config={config} />
}
