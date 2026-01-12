import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '검색 - 머니위키',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
