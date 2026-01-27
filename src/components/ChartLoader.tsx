"use client";

import dynamic from "next/dynamic";

// 차트 컴포넌트 동적 임포트 - 코드 스플리팅으로 초기 로딩 최적화
const charts: Record<string, React.ComponentType> = {};

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
}

export default function ChartLoader({ chartName }: ChartLoaderProps) {
  if (!chartName) {
    return null;
  }

  const Chart = loadChart(chartName);

  return (
    <div className="mb-8">
      <Chart />
    </div>
  );
}
