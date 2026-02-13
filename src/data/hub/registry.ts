import type { HubData } from './types'
import 원천세전체가이드 from './원천세-전체-가이드'
import 개인파산면책신청절차비용 from './개인파산-면책-신청-절차-비용'
import 가처분신청요건관할비용집행 from './가처분-신청-요건-관할-비용-집행'
import 장기보유특별공제공제율계산거주요건 from './장기보유특별공제-공제율-계산-거주요건'
import 다주택양도세중과유예세율절세전략 from './다주택양도세-중과유예-세율-절세-전략'
import 경영안정바우처신청사용처금액 from './경영안정바우처-신청-사용처-금액'
import 생계비계좌압류방지통장개설한도 from './생계비계좌-압류방지통장-개설-한도'
import 소상공인시설개선지원금종류신청방법2026 from './소상공인-시설개선-지원금-종류-신청-방법-2026'
import 실업급여수급조건신청방법총정리2026 from './실업급여-수급-조건-신청-방법-총정리-2026'
import 기초생활수급자조건총정리 from './기초생활수급자-조건-총정리'
import K패스모두의카드교통카드할인비교 from './K패스-모두의카드-교통카드-할인-비교'
import ISA계좌세금혜택비과세한도중개형서민형비교 from './ISA계좌-세금혜택-비과세-한도-중개형-서민형-비교'
import 실업급여퇴사유형별수급자격권고사직자진퇴사해고 from './실업급여-퇴사유형별-수급-자격-권고사직-자진퇴사-해고'
import 실업급여취업촉진수당연장급여부정수급2026 from './실업급여-취업촉진수당-연장급여-부정수급-2026'

// 새 허브 추가: 여기에 import + HUBS에 등록
const HUBS: HubData[] = [
  원천세전체가이드,
  개인파산면책신청절차비용,
  가처분신청요건관할비용집행,
  장기보유특별공제공제율계산거주요건,
  다주택양도세중과유예세율절세전략,
  경영안정바우처신청사용처금액,
  생계비계좌압류방지통장개설한도,
  소상공인시설개선지원금종류신청방법2026,
  실업급여수급조건신청방법총정리2026,
  기초생활수급자조건총정리,
  K패스모두의카드교통카드할인비교,
  ISA계좌세금혜택비과세한도중개형서민형비교,
  실업급여퇴사유형별수급자격권고사직자진퇴사해고,
  실업급여취업촉진수당연장급여부정수급2026,
]

// slug → data 맵
const hubMap = new Map<string, HubData>()
for (const hub of HUBS) {
  hubMap.set(hub.slug, hub)
}

export function getHubBySlug(slug: string): HubData | undefined {
  return hubMap.get(slug)
}

export function getAllHubSlugs(): string[] {
  return HUBS.map(h => h.slug)
}
