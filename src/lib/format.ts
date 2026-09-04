// 머니위키 사이트 메타 상수 + 한국식 숫자/통화 변환
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jjyu.co.kr',
  name: '머니위키',
  short: 'Money Wiki',
  desc: '어려운 금융 정보를, 친구가 알려주듯 정확하게. 1,961개 검수 가이드와 8개 30초 계산기.',
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
};

/** 5000000 → "5,000,000" */
export const fmtKRW = (n: number) =>
  new Intl.NumberFormat('ko-KR').format(Math.round(n));

/** 5000 (만원 단위) → "5천만원" / 12345 → "1억 2천 3백 4십 5만원" */
export function manToKorean(manValue: number): string {
  const man = Math.round(Math.max(0, manValue));
  if (man === 0) return '';
  const eok = Math.floor(man / 10000);
  const rest = man % 10000;
  const cheon = Math.floor(rest / 1000);
  const baek = Math.floor((rest % 1000) / 100);
  const sip = Math.floor((rest % 100) / 10);
  const il = rest % 10;
  const parts: string[] = [];
  if (eok) parts.push(`${eok}억`);
  if (cheon) parts.push(`${cheon}천`);
  if (baek) parts.push(`${baek}백`);
  if (sip) parts.push(`${sip}십`);
  if (il) parts.push(`${il}`);
  return parts.join(' ') + '만원';
}

/** 본문 텍스트에서 "50,000,000" → "5천만원" 자동 변환 (한국화 #3) */
export function autoKoreanCurrency(text: string): string {
  return text.replace(/(\d{1,3}(?:,\d{3})+)/g, (match) => {
    const num = parseInt(match.replace(/,/g, ''), 10);
    if (num < 10000) return match;
    const manValue = Math.floor(num / 10000);
    return manToKorean(manValue);
  });
}
