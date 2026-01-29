'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// 차트 데이터 아이템 타입
export interface ChartDataItem {
  name: string;           // 차트 표시명 (미래에셋)
  fullName?: string;      // 툴팁 전체명 (미래에셋자산운용)
  primaryValue: number;   // 메인 막대 값 (수익률 14.90)
  secondaryValue?: number; // 보조 값 (수수료 1.17)
  category?: string;       // 색상 구분용 (fund | insurance)
  extra?: Record<string, number | string>; // 추가 데이터
}

// 정렬 옵션 타입
export interface SortOption {
  key: 'primaryValue' | 'secondaryValue' | string;
  label: string;
  ascending?: boolean;
}

// 범례 아이템 타입
export interface LegendItem {
  color: string;
  label: string;
}

// 컴포넌트 Props
export interface ComparisonBarChartProps {
  data: ChartDataItem[];
  title: string;

  // 값 설정
  primaryLabel: string;      // "수익률"
  primaryUnit?: string;      // "%" (기본값)
  secondaryLabel?: string;   // "수수료"
  secondaryUnit?: string;

  // 카테고리별 색상 (예: { fund: "#22c55e", insurance: "#6b7280" })
  categoryColors?: Record<string, string>;
  defaultColor?: string;

  // 정렬 옵션
  sortOptions?: SortOption[];
  defaultSortKey?: string;

  // 보조값 토글
  showSecondaryToggle?: boolean;

  // 레이아웃
  height?: number;

  // 범례
  legendItems?: LegendItem[];

  // 하단 텍스트
  sourceText?: string;
  disclaimerText?: string;
}

// 커스텀 툴팁
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ChartDataItem }>;
  primaryLabel: string;
  primaryUnit: string;
  secondaryLabel?: string;
  secondaryUnit?: string;
}

const CustomTooltip = ({
  active,
  payload,
  primaryLabel,
  primaryUnit,
  secondaryLabel,
  secondaryUnit,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-bold text-gray-800 mb-2">
          {data.fullName || data.name}
        </p>
        <div className="space-y-1 text-sm">
          <p className="text-blue-600">
            {primaryLabel}: <span className="font-semibold">{data.primaryValue.toFixed(2)}{primaryUnit}</span>
          </p>
          {data.secondaryValue !== undefined && secondaryLabel && (
            <p className="text-red-500">
              {secondaryLabel}: <span className="font-semibold">{data.secondaryValue.toFixed(2)}{secondaryUnit || primaryUnit}</span>
            </p>
          )}
          {data.extra && Object.entries(data.extra).map(([key, value]) => (
            <p key={key} className="text-gray-500">
              {key}: <span className="font-semibold">{typeof value === 'number' ? value.toFixed(2) : value}</span>
            </p>
          ))}
          {data.category && (
            <p className="text-xs text-gray-400 mt-1">
              {data.category}
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function ComparisonBarChart({
  data,
  title,
  primaryLabel,
  primaryUnit = '%',
  secondaryLabel,
  secondaryUnit,
  categoryColors = {},
  defaultColor = '#3b82f6',
  sortOptions = [],
  defaultSortKey = 'primaryValue',
  showSecondaryToggle = true,
  height = 400,
  legendItems = [],
  sourceText,
  disclaimerText,
}: ComparisonBarChartProps) {
  const [sortBy, setSortBy] = useState(defaultSortKey);
  const [showSecondary, setShowSecondary] = useState(false);

  // 정렬된 데이터
  const sortedData = [...data].sort((a, b) => {
    const option = sortOptions.find(o => o.key === sortBy);
    const ascending = option?.ascending ?? false;

    let aVal: number, bVal: number;
    if (sortBy === 'primaryValue') {
      aVal = a.primaryValue;
      bVal = b.primaryValue;
    } else if (sortBy === 'secondaryValue') {
      aVal = a.secondaryValue ?? 0;
      bVal = b.secondaryValue ?? 0;
    } else {
      aVal = (a.extra?.[sortBy] as number) ?? 0;
      bVal = (b.extra?.[sortBy] as number) ?? 0;
    }

    return ascending ? aVal - bVal : bVal - aVal;
  });

  // 막대 색상 결정
  const getBarColor = (item: ChartDataItem) => {
    if (item.category && categoryColors[item.category]) {
      return categoryColors[item.category];
    }
    return defaultColor;
  };

  // 동적 높이 계산 (데이터 개수에 따라)
  const chartHeight = Math.max(height, data.length * 35 + 80);

  return (
    <div className="my-6 p-4 bg-gray-50 rounded-lg">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>

        {/* 컨트롤 버튼 */}
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                sortBy === option.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}

          {showSecondaryToggle && secondaryLabel && (
            <button
              onClick={() => setShowSecondary(!showSecondary)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                showSecondary
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {showSecondary ? `${secondaryLabel} 숨기기` : `${secondaryLabel} 표시`}
            </button>
          )}
        </div>
      </div>

      {/* 차트 */}
      <div style={{ height: chartHeight }} className="w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              domain={[0, 'dataMax']}
              tickFormatter={(value) => `${value}${primaryUnit}`}
              fontSize={12}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={70}
              fontSize={12}
              tickLine={false}
            />
            <Tooltip
              content={
                <CustomTooltip
                  primaryLabel={primaryLabel}
                  primaryUnit={primaryUnit}
                  secondaryLabel={secondaryLabel}
                  secondaryUnit={secondaryUnit}
                />
              }
            />

            {/* 메인 막대 */}
            <Bar
              dataKey="primaryValue"
              name={primaryLabel}
              radius={[0, 4, 4, 0]}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))}
            </Bar>

            {/* 보조 막대 (토글 시) */}
            {showSecondary && secondaryLabel && (
              <Bar
                dataKey="secondaryValue"
                name={secondaryLabel}
                fill="#ef4444"
                radius={[0, 4, 4, 0]}
                opacity={0.7}
              />
            )}
          </BarChart>
        </ResponsiveContainer>

        {/* 차트 워터마크 (이미지 캡처 시 포함) */}
        {sourceText && (
          <div className="absolute bottom-1 right-2 text-[10px] text-gray-400 pointer-events-none">
            {sourceText}
          </div>
        )}
      </div>

      {/* 범례 & 출처 */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        {legendItems.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-2">
            {legendItems.map((item, index) => (
              <span key={index} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
            ))}
          </div>
        )}

        {(sourceText || disclaimerText) && (
          <p className="text-xs text-gray-400">
            {sourceText}
            {sourceText && disclaimerText && ' | '}
            {disclaimerText}
          </p>
        )}
      </div>
    </div>
  );
}
