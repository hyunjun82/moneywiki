"use client";

import { useState } from "react";

declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    naver: `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const shareKakao = () => {
    if (typeof window !== "undefined" && window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: description || title,
          imageUrl: "https://www.jjyu.co.kr/og-image.png",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-neutral-500 mr-1">공유</span>

      {/* 카카오톡 */}
      <button
        onClick={shareKakao}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FEE500] hover:opacity-80 transition-opacity"
        title="카카오톡 공유"
        aria-label="카카오톡으로 공유하기"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#000000]">
          <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.82 5.32 4.58 6.73l-.81 3.56c-.06.27.2.5.44.38l4.13-2.17c.54.06 1.09.1 1.66.1 5.52 0 10-3.58 10-8S17.52 3 12 3z"/>
        </svg>
      </button>

      {/* 네이버 */}
      <a
        href={shareLinks.naver}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#03C75A] hover:opacity-80 transition-opacity"
        title="네이버 공유"
        aria-label="네이버로 공유하기"
      >
        <span className="text-white font-bold text-xs">N</span>
      </a>

      {/* 페이스북 */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1877F2] hover:opacity-80 transition-opacity"
        title="페이스북 공유"
        aria-label="페이스북으로 공유하기"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* 트위터/X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-black hover:opacity-80 transition-opacity"
        title="X(트위터) 공유"
        aria-label="X로 공유하기"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      {/* 링크 복사 */}
      <button
        onClick={copyToClipboard}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors relative"
        title="링크 복사"
        aria-label="링크 복사하기"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-emerald-600">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neutral-600">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
