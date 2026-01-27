"use client";

import dynamic from "next/dynamic";
import type { ChartDataItem, ComparisonBarChartProps } from "./charts/ComparisonBarChart";

// 차트 설정 타입 (frontmatter에서 전달)
export interface ChartConfig {
  title?: string;
  primaryLabel?: string;
  primaryUnit?: string;
  secondaryLabel?: string;
  secondaryUnit?: string;
  categoryColors?: Record<string, string>;
  defaultColor?: string;
  height?: number;
  sourceText?: string;
  disclaimerText?: string;
  showSecondaryToggle?: boolean;
  sortOptions?: Array<{
    key: string;
    label: string;
    ascending?: boolean;
  }>;
  legendItems?: Array<{
    color: string;
    label: string;
  }>;
  data?: ChartDataItem[];
}

// 차트 컴포넌트 동적 임포트 - 코드 스플리팅으로 초기 로딩 최적화
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const charts: Record<string, React.ComponentType<any>> = {};

// 동적 로딩 함수 - 필요할 때만 로드
const loadChart = (name: string) => {
  if (!charts[name]) {
    charts[name] = dynamic(
      () => import(`@/components/charts/${name}`),
      {
        loading: () => (
          <div className="animate-pulse bg-neutral-100 rounded-xl p-8 text-center">
            <div className="text-neutral-500">차트 로딩 중...</div>
          </div>
        ),
      }
    );
  }
  return charts[name];
};

interface ChartLoaderProps {
  chartName?: string;
  chartConfig?: ChartConfig;
}

export default function ChartLoader({ chartName, chartConfig }: ChartLoaderProps) {
  if (!chartName) {
    return null;
  }

  const Chart = loadChart(chartName);

  // ComparisonBarChart인 경우 config를 props로 전달
  if (chartName === "ComparisonBarChart" && chartConfig) {
    const props: Partial<ComparisonBarChartProps> = {
      data: chartConfig.data || [],
      title: chartConfig.title || "",
      primaryLabel: chartConfig.primaryLabel || "값",
      primaryUnit: chartConfig.primaryUnit,
      secondaryLabel: chartConfig.secondaryLabel,
      secondaryUnit: chartConfig.secondaryUnit,
      categoryColors: chartConfig.categoryColors,
      defaultColor: chartConfig.defaultColor,
      height: chartConfig.height,
      sourceText: chartConfig.sourceText,
      disclaimerText: chartConfig.disclaimerText,
      showSecondaryToggle: chartConfig.showSecondaryToggle,
      sortOptions: chartConfig.sortOptions,
      legendItems: chartConfig.legendItems,
    };
    return (
      <div className="mb-8">
        <Chart {...props} />
      </div>
    );
  }

  // 기존 차트 (PensionBarChart 등)는 props 없이 렌더링
  return (
    <div className="mb-8">
      <Chart />
    </div>
  );
}
