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
  Legend,
} from 'recharts';

interface PensionData {
  company: string;
  shortName: string;
  returnRate: number;
  feeRate: number;
  assets: number;
  returnRate3Y?: number;
  type: 'fund' | 'insurance';
}

const pensionData: PensionData[] = [
  { company: '미래에셋자산운용', shortName: '미래에셋', returnRate: 14.90, feeRate: 1.17, assets: 4205923, returnRate3Y: -1.11, type: 'fund' },
  { company: '삼성자산운용', shortName: '삼성자산', returnRate: 9.16, feeRate: 0.91, assets: 3071141, returnRate3Y: -1.90, type: 'fund' },
  { company: '한국투자신탁운용', shortName: '한투운용', returnRate: 7.54, feeRate: 0.86, assets: 1812634, type: 'fund' },
  { company: '삼성생명보험', shortName: '삼성생명', returnRate: 2.71, feeRate: 0.63, assets: 14780226, returnRate3Y: 2.68, type: 'insurance' },
  { company: 'DB손해보험', shortName: 'DB손보', returnRate: 2.69, feeRate: 0.38, assets: 3557799, returnRate3Y: 2.63, type: 'insurance' },
  { company: '한화생명보험', shortName: '한화생명', returnRate: 2.55, feeRate: 0.74, assets: 5098862, returnRate3Y: 2.43, type: 'insurance' },
  { company: 'KB손해보험', shortName: 'KB손보', returnRate: 2.44, feeRate: 0.32, assets: 3671833, returnRate3Y: 2.47, type: 'insurance' },
  { company: '삼성화재해상보험', shortName: '삼성화재', returnRate: 2.36, feeRate: 0.28, assets: 16601673, returnRate3Y: 2.30, type: 'insurance' },
  { company: '현대해상화재보험', shortName: '현대해상', returnRate: 2.13, feeRate: 0.38, assets: 6223291, returnRate3Y: 2.14, type: 'insurance' },
  { company: '농협생명보험', shortName: '농협생명', returnRate: 1.78, feeRate: 0.79, assets: 3056017, returnRate3Y: 1.71, type: 'insurance' },
  { company: '교보생명보험', shortName: '교보생명', returnRate: 1.76, feeRate: 0.56, assets: 5633511, returnRate3Y: 2.33, type: 'insurance' },
];

type SortKey = 'returnRate' | 'feeRate' | 'assets';

const formatAssets = (assets: number) => {
  if (assets >= 1000000) return `${(assets / 1000000).toFixed(1)}조`;
  return `${(assets / 1000).toFixed(0)}억`;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: PensionData;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-bold text-gray-800 mb-2">{data.company}</p>
        <div className="space-y-1 text-sm">
          <p className="text-green-600">
            수익률: <span className="font-semibold">{data.returnRate.toFixed(2)}%</span>
          </p>
          <p className="text-red-500">
            수수료: <span className="font-semibold">{data.feeRate.toFixed(2)}%</span>
          </p>
          <p className="text-gray-600">
            적립금: <span className="font-semibold">{formatAssets(data.assets)}</span>
          </p>
          {data.returnRate3Y !== undefined && (
            <p className="text-gray-500">
              3년 평균: <span className={data.returnRate3Y >= 0 ? 'text-blue-600' : 'text-red-400'}>
                {data.returnRate3Y.toFixed(2)}%
              </span>
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            {data.type === 'fund' ? '펀드형 (원금 비보장)' : '보험형 (원금 보장)'}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function PensionBarChart() {
  const [sortBy, setSortBy] = useState<SortKey>('returnRate');
  const [showFee, setShowFee] = useState(false);

  const sortedData = [...pensionData].sort((a, b) => {
    if (sortBy === 'feeRate') return a[sortBy] - b[sortBy];
    return b[sortBy] - a[sortBy];
  });

  const getBarColor = (entry: PensionData) => {
    if (entry.type === 'fund') {
      return entry.returnRate >= 10 ? '#22c55e' : '#3b82f6';
    }
    return '#6b7280';
  };

  return (
    <div className="my-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h3 className="text-lg font-bold text-gray-800">2025년 3분기 연금저축 수익률 비교</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSortBy('returnRate')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              sortBy === 'returnRate'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            수익률순
          </button>
          <button
            onClick={() => setSortBy('feeRate')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              sortBy === 'feeRate'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            수수료순
          </button>
          <button
            onClick={() => setSortBy('assets')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              sortBy === 'assets'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            적립금순
          </button>
          <button
            onClick={() => setShowFee(!showFee)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              showFee
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {showFee ? '수수료 숨기기' : '수수료 표시'}
          </button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              domain={[0, 'dataMax']}
              tickFormatter={(value) => `${value}%`}
              fontSize={12}
            />
            <YAxis
              type="category"
              dataKey="shortName"
              width={70}
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
            <Bar
              dataKey="returnRate"
              name="수익률"
              radius={[0, 4, 4, 0]}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))}
            </Bar>
            {showFee && (
              <Bar
                dataKey="feeRate"
                name="수수료"
                fill="#ef4444"
                radius={[0, 4, 4, 0]}
                opacity={0.7}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-green-500 rounded"></span>
            펀드 고수익 (10%+)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-blue-500 rounded"></span>
            펀드 (5~10%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-gray-500 rounded"></span>
            보험 (원금보장)
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          출처: 금융감독원 통합연금포털 (2025년 3분기 기준) | 펀드형은 원금손실 가능
        </p>
      </div>
    </div>
  );
}
