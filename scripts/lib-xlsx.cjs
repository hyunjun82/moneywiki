// xlsx = zip. 의존성 없이 모든 시트의 셀 텍스트를 뽑는다 (sharedStrings + inlineStr 둘 다).
const fs = require("fs"), zlib = require("zlib");

function entries(buf) {
  const out = {};
  let eo = buf.length - 22;
  while (eo >= 0 && buf.readUInt32LE(eo) !== 0x06054b50) eo--;
  if (eo < 0) throw new Error("EOCD 없음");
  const count = buf.readUInt16LE(eo + 10);
  let p = buf.readUInt32LE(eo + 16);
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const nameLen = buf.readUInt16LE(p + 28), extraLen = buf.readUInt16LE(p + 30), cmtLen = buf.readUInt16LE(p + 32);
    const lho = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nameLen);
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20);
    const lnLen = buf.readUInt16LE(lho + 26), leLen = buf.readUInt16LE(lho + 28);
    const start = lho + 30 + lnLen + leLen;
    const raw = buf.subarray(start, start + csize);
    out[name] = method === 8 ? zlib.inflateRawSync(raw) : raw;
    p += 46 + nameLen + extraLen + cmtLen;
  }
  return out;
}
const unesc = (s) => s.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const texts = (frag) => unesc([...frag.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((m) => m[1]).join(""));

function readBook(file) {
  const z = entries(fs.readFileSync(file));
  const ssXml = z["xl/sharedStrings.xml"] ? z["xl/sharedStrings.xml"].toString("utf8") : "";
  const shared = [...ssXml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => texts(m[1]));
  const wb = z["xl/workbook.xml"].toString("utf8");
  const names = [...wb.matchAll(/<sheet\b[^>]*name="([^"]+)"[^>]*\/>/g)].map((m) => unesc(m[1]));
  const files = Object.keys(z).filter((k) => /^xl\/worksheets\/sheet\d+\.xml$/.test(k))
    .sort((a, b) => +a.match(/\d+/)[0] - +b.match(/\d+/)[0]);
  const book = {};
  files.forEach((f, idx) => {
    const xml = z[f].toString("utf8");
    const rows = [];
    for (const rm of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
      const cells = [];
      for (const cm of rm[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
        const attrs = cm[1], inner = cm[2];
        const type = (attrs.match(/\st="([^"]+)"/) || [])[1] || "n";
        const col = ((attrs.match(/\sr="([A-Z]+)/) || [])[1] || "").split("").reduce((a, ch) => a * 26 + (ch.charCodeAt(0) - 64), 0) - 1;
        let val = "";
        if (type === "inlineStr") val = texts((inner.match(/<is>([\s\S]*?)<\/is>/) || ["", inner])[1]);
        else if (type === "s") { const v = (inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1]; val = shared[+v] ?? ""; }
        else if (type === "str") val = texts(inner) || unesc((inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1] || "");
        else val = unesc((inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1] || "");
        if (col >= 0) cells[col] = val.trim(); else cells.push(val.trim());
      }
      rows.push([...cells].map((c) => c ?? ""));
    }
    book[names[idx] || f] = rows;
  });
  return book;
}

if (require.main === module) {
  const book = readBook(process.argv[2]);
  const preview = +(process.argv[3] || 8);
  for (const [name, rows] of Object.entries(book)) {
    console.log(`\n■ ${name} — ${rows.length}행`);
    rows.slice(0, preview).forEach((r, i) => console.log(`  ${i}`, JSON.stringify(r).slice(0, 320)));
  }
  if (process.argv[4]) { fs.writeFileSync(process.argv[4], JSON.stringify(book), "utf8"); console.log("\n저장:", process.argv[4]); }
}
module.exports = { readBook };
