const fs = require("fs");
const path = require("path");

const dir = "data/forms";
const noHwp = [];
for (const f of fs.readdirSync(dir)) {
  if (f.indexOf(".json") === -1) continue;
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  if (data.downloads && data.downloads.hwp) continue;
  noHwp.push(data.slug);
}

console.log("HWP 미보유 양식 " + noHwp.length + "개:");
noHwp.forEach(s => console.log("  " + s));
