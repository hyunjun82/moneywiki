'use client';

import { useState } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

// 나무위키 스타일 계층형 번호 생성 (1, 1.1, 1.2, 2, 2.1, ...)
function generateHierarchicalNumbers(items: TocItem[]): string[] {
  const numbers: string[] = [];
  const counters: number[] = [0, 0, 0, 0, 0, 0]; // h1~h6까지 대응

  for (const item of items) {
    const level = item.level; // 2 = h2, 3 = h3, ...
    const idx = level - 2; // h2 -> 0, h3 -> 1, h4 -> 2

    if (idx < 0 || idx >= counters.length) {
      numbers.push('');
      continue;
    }

    // 현재 레벨 카운터 증가
    counters[idx]++;

    // 하위 레벨 카운터 초기화
    for (let i = idx + 1; i < counters.length; i++) {
      counters[i] = 0;
    }

    // 번호 문자열 생성
    const parts: number[] = [];
    for (let i = 0; i <= idx; i++) {
      if (counters[i] > 0) {
        parts.push(counters[i]);
      }
    }

    numbers.push(parts.join('.'));
  }

  return numbers;
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) return null;

  const numbers = generateHierarchicalNumbers(items);

  return (
    <div className="inline-block bg-[#f8f9fa] border border-gray-200 my-4">
      <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <span className="font-bold">목차</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-blue-600 hover:underline"
        >
          [ {isOpen ? '접기' : '펼치기'} ]
        </button>
      </div>

      {isOpen && (
        <ul className="px-4 py-2">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="py-1"
              style={{ paddingLeft: `${(item.level - 2) * 20}px` }}
            >
              <a
                href={`#${item.id}`}
                className="text-[#0275d8] hover:underline text-sm"
              >
                {numbers[index]}. {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
