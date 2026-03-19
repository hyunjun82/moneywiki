'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface MobileStickyBarProps {
  text?: string;
  sub?: string;
  href?: string;
  buttonText?: string;
}

export default function MobileStickyBar({
  text = '숨은 정부지원금 17가지',
  sub = '나도 받을 수 있는지 30초 체크',
  href = '/w/숨은-정부지원금',
  buttonText = '확인하기',
}: MobileStickyBarProps) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current + 8) setVisible(false);
      else if (y < lastY.current - 4) setVisible(true);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const slideStyle = {
    transform: visible ? 'translateY(0)' : 'translateY(100%)',
    transition: 'transform 0.28s ease',
  };

  const buttonStyle: React.CSSProperties = {
    flexShrink: 0,
    backgroundColor: '#fff',
    color: '#0BAF7A',
    fontWeight: 700,
    fontSize: '13px',
    borderRadius: '999px',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
  };

  return (
    <>
      <style>{`
        @keyframes waveGreen {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmerMove {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .sbar-wave {
          background: linear-gradient(110deg, #0BAF7A, #1DE0A0, #0BAF7A, #05C47E, #1DC98E);
          background-size: 300% 300%;
          animation: waveGreen 3.5s ease infinite;
        }
        .sbar-shimmer {
          position: relative;
          overflow: hidden;
        }
        .sbar-shimmer::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmerMove 2.6s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* 스티바가 차지하는 공간 — 모바일 64px / PC 52px */}
      <div className="h-[64px] md:h-[52px]" />

      {/* ── 모바일 (md 미만) ─────────────────────────── */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          ...slideStyle,
        }}
      >
        <Link
          href={href}
          className="sbar-wave sbar-shimmer"
          style={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '64px',
            padding: '0 16px',
            boxShadow: '0 -2px 16px rgba(11,175,122,0.35)',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '22px', marginRight: '10px', flexShrink: 0 }}>🎁</span>
          <div style={{ flex: 1, minWidth: 0, marginRight: '10px' }}>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px', lineHeight: '1.3', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {text}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '11px', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {sub}
            </p>
          </div>
          <span style={{ ...buttonStyle, padding: '8px 16px' }}>
            {buttonText}
          </span>
        </Link>
      </div>

      {/* ── PC (md 이상) ──────────────────────────────── */}
      <div
        className="hidden md:block"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          ...slideStyle,
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Link
              href={href}
              className="sbar-wave sbar-shimmer"
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '52px',
                padding: '0 24px',
                borderTopLeftRadius: '14px',
                borderTopRightRadius: '14px',
                boxShadow: '0 -2px 20px rgba(11,175,122,0.3)',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '18px', marginRight: '10px', flexShrink: 0 }}>🎁</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{text}</span>
                <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '12px', marginLeft: '10px' }}>{sub}</span>
              </div>
              <span style={{ ...buttonStyle, padding: '7px 20px' }}>
                {buttonText} →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
