'use client'

import GenericChecker from './GenericChecker'
import type { CheckerConfig } from '@/data/checker-types'
import type { FrontmatterCheckerConfig } from '@/lib/wiki'

/**
 * MD 프론트매터의 YAML 체커 설정을 GenericChecker용 CheckerConfig로 변환하여 렌더링.
 * evaluate 함수를 선언적 rules(results 배열 + default)로 대체.
 */
export default function FrontmatterChecker({ data }: { data: FrontmatterCheckerConfig }) {
  const config: CheckerConfig = {
    title: data.title,
    subtitle: data.subtitle,
    intro: data.intro,
    groups: data.groups,
    evaluate: (selections) => {
      // results 배열에서 when 조건이 모두 일치하는 첫 번째 결과 반환
      for (const r of data.results) {
        const match = Object.entries(r.when).every(
          ([key, val]) => selections[key] === val
        )
        if (match) {
          return {
            pass: r.pass,
            headline: r.headline,
            detail: r.detail,
            amount: r.amount,
            badges: r.badges || [],
            links: r.links || [],
          }
        }
      }
      // 매칭 없으면 default 반환
      return {
        pass: data.default.pass,
        headline: data.default.headline,
        detail: data.default.detail,
        badges: data.default.badges || [],
        links: data.default.links || [],
      }
    },
  }

  return <GenericChecker config={config} />
}
