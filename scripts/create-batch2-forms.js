const fs = require("fs");
const path = require("path");

const src = "C:/Users/user/Downloads";
const dst = "public/files/forms";
const jsonDir = "data/forms";

const forms = [
  { file: "개인면담표.hwp", slug: "개인면담표", title: "개인 면담표", shortTitle: "개인면담표", category: "인사" },
  { file: "개인별_시간외근무기록표.hwp", slug: "개인별시간외근무기록표", title: "개인별 시간외근무 기록표", shortTitle: "개인별시간외근무기록표", category: "근태" },
  { file: "개인별_연간_결근.휴가_등_기록표.hwp", slug: "개인별연간결근휴가기록표", title: "개인별 연간 결근·휴가 기록표", shortTitle: "개인별연간결근휴가기록표", category: "근태" },
  { file: "개인별_휴가관리카드.hwp", slug: "개인별휴가관리카드", title: "개인별 휴가관리 카드", shortTitle: "개인별휴가관리카드", category: "근태" },
  { file: "개인별인사기록카드.hwp", slug: "개인별인사기록카드", title: "개인별 인사기록 카드", shortTitle: "개인별인사기록카드", category: "인사" },
  { file: "결근계.hwp", slug: "결근계", title: "결근계 양식", shortTitle: "결근계", category: "근태" },
  { file: "경고장.hwp", slug: "경고장", title: "경고장 양식", shortTitle: "경고장", category: "징계" },
  { file: "근무성적평정표.hwp", slug: "근무성적평정표", title: "근무성적 평정표", shortTitle: "근무성적평정표", category: "인사" },
  { file: "근무일지.hwp", slug: "근무일지", title: "근무일지 양식", shortTitle: "근무일지", category: "업무" },
  { file: "급여수령증.hwp", slug: "급여수령증", title: "급여 수령증 양식", shortTitle: "급여수령증", category: "급여" },
  { file: "기안서.hwp", slug: "기안서", title: "기안서 양식", shortTitle: "기안서", category: "업무" },
  { file: "노무수령거부통지서.hwp", slug: "노무수령거부통지서", title: "노무수령 거부 통지서", shortTitle: "노무수령거부통지서", category: "법률" },
  { file: "대근신청원.hwp", slug: "대근신청원", title: "대근 신청원 양식", shortTitle: "대근신청원", category: "근태" },
  { file: "민간인신원진술서.hwp", slug: "민간인신원진술서", title: "민간인 신원진술서", shortTitle: "민간인신원진술서", category: "인사" },
  { file: "부문별.직종별_인원요구표.hwp", slug: "부문별직종별인원요구표", title: "부문별·직종별 인원요구표", shortTitle: "인원요구표", category: "인사" },
  { file: "부양가족신고서.hwp", slug: "부양가족신고서", title: "부양가족 신고서", shortTitle: "부양가족신고서", category: "인사" },
  { file: "설비투자계획서.hwp", slug: "설비투자계획서", title: "설비투자 계획서", shortTitle: "설비투자계획서", category: "업무" },
  { file: "신상명세서.hwp", slug: "신상명세서", title: "신상명세서 양식", shortTitle: "신상명세서", category: "인사" },
  { file: "인사고과표(일반용).hwp", slug: "인사고과표", title: "인사고과표 (일반용)", shortTitle: "인사고과표", category: "인사" },
  { file: "인사기록부.hwp", slug: "인사기록부", title: "인사기록부 양식", shortTitle: "인사기록부", category: "인사" },
  { file: "인적사항.hwp", slug: "인적사항", title: "인적사항 양식", shortTitle: "인적사항", category: "인사" },
  { file: "입사지원서.hwp", slug: "입사지원서", title: "입사지원서 양식", shortTitle: "입사지원서", category: "채용" },
  { file: "직원채용(품의.상신)서.hwp", slug: "직원채용품의서", title: "직원채용 품의서", shortTitle: "직원채용품의서", category: "채용" },
  { file: "징계,경고_처분요구서.hwp", slug: "징계경고처분요구서", title: "징계·경고 처분요구서", shortTitle: "징계경고처분요구서", category: "징계" },
  { file: "추천서.hwp", slug: "추천서", title: "추천서 양식", shortTitle: "추천서", category: "인사" },
  { file: "출장업무보고서.hwp", slug: "출장업무보고서", title: "출장 업무보고서", shortTitle: "출장업무보고서", category: "업무" },
  { file: "출장여비선급신청서및정산서.hwp", slug: "출장여비선급신청서", title: "출장여비 선급신청서 및 정산서", shortTitle: "출장여비선급신청서", category: "업무" },
  { file: "취학자녀신고서.hwp", slug: "취학자녀신고서", title: "취학자녀 신고서", shortTitle: "취학자녀신고서", category: "인사" },
  { file: "통지서.hwp", slug: "통지서", title: "통지서 양식", shortTitle: "통지서", category: "업무" },
  { file: "해외위탁교육지원자_신상조사서.hwp", slug: "해외위탁교육지원자신상조사서", title: "해외위탁교육 지원자 신상조사서", shortTitle: "해외위탁교육지원자신상조사서", category: "교육" },
  { file: "해외출장신청서.hwp", slug: "해외출장신청서", title: "해외출장 신청서", shortTitle: "해외출장신청서", category: "업무" },
  { file: "학자금지급사항.hwp", slug: "학자금지급사항", title: "학자금 지급사항 양식", shortTitle: "학자금지급사항", category: "급여" },
  { file: "학자금지급카드.hwp", slug: "학자금지급카드", title: "학자금 지급 카드", shortTitle: "학자금지급카드", category: "급여" },
  { file: "회사행사예정표.hwp", slug: "회사행사예정표", title: "회사행사 예정표", shortTitle: "회사행사예정표", category: "업무" },
  { file: "회의의사록.hwp", slug: "회의의사록", title: "회의 의사록 양식", shortTitle: "회의의사록", category: "업무" },
];

let copied = 0, skipped = 0, jsonCreated = 0;

for (const f of forms) {
  // 1. 파일 복사
  const srcPath = path.join(src, f.file);
  const ext = path.extname(f.file);
  const dstPath = path.join(dst, f.slug + ext);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    copied++;
  } else {
    console.log("MISS: " + f.file);
    skipped++;
  }

  // 2. JSON 생성
  const jsonPath = path.join(jsonDir, f.slug + ".json");
  if (!fs.existsSync(jsonPath)) {
    const downloads = {};
    if (ext === ".hwp") downloads.hwp = "/files/forms/" + f.slug + ".hwp";
    if (ext === ".xls" || ext === ".xlsx") downloads.xlsx = "/files/forms/" + f.slug + ext;

    const downloadNames = {};
    if (ext === ".hwp") downloadNames.hwp = f.shortTitle + ".hwp";
    if (ext === ".xls" || ext === ".xlsx") downloadNames.xlsx = f.shortTitle + ext;

    const json = {
      slug: f.slug,
      title: f.title,
      shortTitle: f.shortTitle,
      category: f.category,
      description: f.shortTitle + " 무료 양식을 다운로드하세요.",
      previewDataKey: f.slug.replace(/-/g, "") + "_DATA",
      downloads,
      downloadNames,
      tags: [f.shortTitle],
    };
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2), "utf8");
    jsonCreated++;
    console.log("JSON: " + f.slug + ".json");
  } else {
    console.log("SKIP JSON: " + f.slug);
  }
}

console.log("\n완료: 파일 " + copied + "개 복사, JSON " + jsonCreated + "개 생성, " + skipped + "개 파일 없음");
