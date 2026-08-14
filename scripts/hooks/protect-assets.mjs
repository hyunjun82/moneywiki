#!/usr/bin/env node
/**
 * PreToolUse 훅 — 불가침 자산 차단.
 *
 * 계산기 54개(scripts/calc-protected-slugs.json)와 양식 다운로드는
 * 어떤 글쓰기 작업으로도 수정·삭제되지 않는다. 도구 단계에서 막는다.
 *
 * 대상: Write / Edit / NotebookEdit 의 file_path, Bash 의 command 문자열
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");

function protectedSlugs() {
  try {
    const raw = JSON.parse(
      fs.readFileSync(path.join(ROOT, "scripts", "calc-protected-slugs.json"), "utf8")
    );
    return (Array.isArray(raw) ? raw : raw.slugs ?? [])
      .map((s) => (typeof s === "string" ? s : s?.slug))
      .filter(Boolean);
  } catch {
    return [];
  }
}

/** 경로 하나가 보호 대상이면 사유를, 아니면 null을 돌려준다. */
function violation(p, slugs) {
  if (!p) return null;
  const n = p.replace(/\\/g, "/");

  // 양식 다운로드
  if (/(^|\/)src\/app\/forms(\/|$)/.test(n)) return "양식 다운로드 라우트(src/app/forms)";
  if (/(^|\/)\.claude\/references\/form-template\.md$/.test(n)) return "양식 템플릿(form-template.md)";
  if (/(^|\/)public\/forms(\/|$)/.test(n)) return "양식 파일(public/forms)";

  // 계산기 — src/app/w/<slug>/ 와 content/wiki/<slug>.md 양쪽
  for (const slug of slugs) {
    if (n.includes(`/src/app/w/${slug}/`) || n.endsWith(`/src/app/w/${slug}`)) {
      return `계산기 페이지(${slug})`;
    }
    if (n.endsWith(`/content/wiki/${slug}.md`)) {
      return `계산기 MD(${slug})`;
    }
  }
  return null;
}

/** Bash 명령에서 파괴적 동작의 대상 경로만 추린다. 읽기 명령은 통과시킨다. */
function bashTargets(cmd) {
  if (!cmd) return [];
  if (!/\b(rm|mv|sed\s+-i|truncate|tee|cp)\b|>\s*\S|>>\s*\S/.test(cmd)) return [];
  return (cmd.match(/[^\s'"|;&<>]*[\/\\][^\s'"|;&<>]*/g) ?? []).map((t) =>
    t.startsWith("/") || /^[A-Za-z]:/.test(t) ? t : `/${t}`
  );
}

function main() {
  let raw = "";
  try {
    raw = fs.readFileSync(0, "utf8");
  } catch {
    return;
  }

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return;
  }

  const tool = input.tool_name ?? "";
  const ti = input.tool_input ?? {};
  const slugs = protectedSlugs();

  let targets = [];
  if (tool === "Write" || tool === "Edit" || tool === "NotebookEdit") {
    targets = [ti.file_path ?? ti.notebook_path];
  } else if (tool === "Bash") {
    targets = bashTargets(ti.command ?? "");
  } else {
    return;
  }

  for (const t of targets) {
    const why = violation(t, slugs);
    if (why) {
      process.stdout.write(
        JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason:
              `불가침 자산입니다 — ${why}.\n` +
              `계산기 54개와 양식 다운로드는 수정·삭제할 수 없습니다.\n` +
              `대상: ${t}`,
          },
        })
      );
      return;
    }
  }
}

try {
  main();
} catch {
  /* 훅 오류가 작업을 막지 않는다 */
}
process.exit(0);
