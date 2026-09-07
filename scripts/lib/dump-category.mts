/**
 * 카테고리 파일 하나를 실제로 import 해서 JSON 으로 찍는다.
 *   npx tsx scripts/lib/dump-category.mts 고용
 * article-io.loadCategory 가 부른다. (tsx -e 는 Windows 에서 인자가 잘려 쓰지 않는다)
 */
import { pathToFileURL } from "node:url";
import path from "node:path";

const name = process.argv[2];
if (!name) { console.error("사용법: tsx scripts/lib/dump-category.mts <카테고리>"); process.exit(1); }
const abs = path.resolve("src", "data", "articles", `${name}.ts`);
const mod = await import(pathToFileURL(abs).href);
const cat = mod[name] ?? mod.default;
if (!cat) { console.error(`${abs} 에 export const ${name} 이 없습니다`); process.exit(1); }
process.stdout.write(JSON.stringify(cat));
