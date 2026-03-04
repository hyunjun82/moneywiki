"use client";

import { AlertTriangle, Lightbulb, Info, ShieldAlert } from "lucide-react";

const STYLES = {
  warning: { bg: "bg-amber-50", border: "border-l-amber-500", icon: AlertTriangle, iconColor: "text-amber-600" },
  tip:     { bg: "bg-blue-50",  border: "border-l-blue-500",  icon: Lightbulb,     iconColor: "text-blue-600" },
  info:    { bg: "bg-gray-50",  border: "border-l-gray-400",  icon: Info,           iconColor: "text-gray-500" },
  danger:  { bg: "bg-red-50",   border: "border-l-red-500",   icon: ShieldAlert,    iconColor: "text-red-600" },
};

export function WarningBox({ type = "warning", title, children }: {
  type?: "warning" | "tip" | "info" | "danger";
  title?: string;
  children: React.ReactNode;
}) {
  const s = STYLES[type];
  const Icon = s.icon;
  return (
    <div className={`my-6 rounded-r-xl border-l-4 ${s.border} ${s.bg} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${s.iconColor} shrink-0 mt-0.5`} />
        <div>
          {title && <p className="text-sm font-bold text-gray-800 mb-1">{title}</p>}
          <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function TipBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return <WarningBox type="tip" title={title}>{children}</WarningBox>;
}
