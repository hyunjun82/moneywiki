/**
 * 은행 표기 — 로고 대신 쓰는 색상 배지.
 *
 * 갱신기(은행연합회 공시)는 은행 이름만 준다. 로고 이미지는 저작권이 있어
 * 쓰지 않고, 시안처럼 은행 상징색 배지에 약칭을 얹는다.
 *
 * 키는 공시에 나오는 이름 그대로다. 없는 은행은 회색 배지 + 앞 두 글자로
 * 떨어지므로 새 은행이 들어와도 화면이 깨지지 않는다.
 */

export interface BankBrand {
  mark: string;
  bg: string;
  fg: string;
}

const BRANDS: Record<string, BankBrand> = {
  KB국민은행: { mark: "KB", bg: "#FFBC00", fg: "#5A4A00" },
  신한은행: { mark: "신한", bg: "#0046FF", fg: "#FFFFFF" },
  하나은행: { mark: "하나", bg: "#008485", fg: "#FFFFFF" },
  우리은행: { mark: "우리", bg: "#0067AC", fg: "#FFFFFF" },
  NH농협은행: { mark: "NH", bg: "#00A04B", fg: "#FFFFFF" },
  IBK기업은행: { mark: "IBK", bg: "#00549F", fg: "#FFFFFF" },
  SC제일은행: { mark: "SC", bg: "#0473EA", fg: "#FFFFFF" },
  한국씨티은행: { mark: "citi", bg: "#003B70", fg: "#FFFFFF" },
  한국산업은행: { mark: "KDB", bg: "#003A70", fg: "#FFFFFF" },
  Sh수협은행: { mark: "Sh", bg: "#0080C8", fg: "#FFFFFF" },
  "iM뱅크(구 대구은행)": { mark: "iM", bg: "#007B84", fg: "#FFFFFF" },
  BNK부산은행: { mark: "BNK", bg: "#E4032E", fg: "#FFFFFF" },
  BNK경남은행: { mark: "BNK", bg: "#C8102E", fg: "#FFFFFF" },
  광주은행: { mark: "광주", bg: "#0067B1", fg: "#FFFFFF" },
  제주은행: { mark: "제주", bg: "#0C4DA2", fg: "#FFFFFF" },
  전북은행: { mark: "전북", bg: "#00A0E9", fg: "#FFFFFF" },
  카카오뱅크: { mark: "kakao", bg: "#FFE300", fg: "#3C1E1E" },
  토스뱅크: { mark: "toss", bg: "#0064FF", fg: "#FFFFFF" },
  케이뱅크: { mark: "K", bg: "#1A1A1A", fg: "#FFFFFF" },
};

export function brandOf(bank: string): BankBrand {
  return BRANDS[bank] ?? { mark: bank.slice(0, 2), bg: "#E9F0F7", fg: "#1F4E79" };
}
