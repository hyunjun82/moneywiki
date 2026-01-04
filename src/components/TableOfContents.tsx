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

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) return null;

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
              style={{ paddingLeft: `${(item.level - 1) * 20}px` }}
            >
              <a
                href={`#${item.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                {index + 1}. {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
