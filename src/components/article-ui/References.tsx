"use client";

import { colors } from "./styles";

interface RefItem {
  label: string;
  url: string;
}

interface RefGroup {
  category: string;
  items: RefItem[];
}

interface ReferencesProps {
  groups: RefGroup[];
}

export function References({ groups }: ReferencesProps) {
  return (
    <div
      style={{
        backgroundColor: colors.bgFaint,
        borderRadius: 10,
        padding: "1rem 1.2rem",
        margin: "1.2rem 0",
      }}
    >
      <p
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: colors.sub,
          marginBottom: 10,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        참고 자료
      </p>
      {groups.map((group, i) => (
        <div key={i} style={{ marginBottom: i < groups.length - 1 ? 10 : 0 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.sub,
              marginBottom: 4,
            }}
          >
            {group.category}
          </p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {group.items.map((item, j) => (
              <li
                key={j}
                style={{
                  fontSize: 12.5,
                  color: colors.sub,
                  lineHeight: 1.8,
                }}
              >
                <a
                  href={item.url}
                  style={{
                    color: colors.mainGreen,
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
