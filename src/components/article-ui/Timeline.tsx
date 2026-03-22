import { colors } from "./styles";

interface TimelineItem {
  date: string;
  label: string;
  desc?: string;
  active?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div style={{ margin: "1.2rem 0", paddingLeft: 4 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={i} style={{ display: "flex", gap: 14, minHeight: isLast ? "auto" : 56 }}>
            {/* 좌측 도트 + 라인 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: item.active ? colors.mainGreen : colors.border,
                  border: item.active ? `3px solid ${colors.greenBg}` : "none",
                  flexShrink: 0,
                  marginTop: 4,
                }}
              />
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    backgroundColor: colors.lineFaint,
                    marginTop: 4,
                  }}
                />
              )}
            </div>

            {/* 우측 텍스트 */}
            <div style={{ paddingBottom: isLast ? 0 : 16 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: item.active ? colors.mainGreen : colors.muted,
                }}
              >
                {item.date}
              </span>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: item.active ? colors.heading : colors.body,
                  margin: "2px 0 0",
                  lineHeight: 1.6,
                }}
              >
                {item.label}
              </p>
              {item.desc && (
                <p style={{ fontSize: 13, color: colors.sub, margin: "2px 0 0", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
