import fs from 'fs';
import path from 'path';

// 폼 데이터 타입
export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedDoc {
  title: string;
  url: string;
}

export interface ExternalDownload {
  source: string;
  url: string;
  description: string;
}

export interface FormData {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: string;
  source: string;
  sourceUrl: string;
  downloads: {
    hwp?: string;
    doc?: string;
    pdf?: string;
  };
  downloadNames?: {
    hwp?: string;
    doc?: string;
    pdf?: string;
  };
  externalDownload?: ExternalDownload;  // 외부 다운로드 링크 (HWP 파일 없을 때)
  previewDataKey: string;
  relatedArticle?: string;
  relatedDocs?: RelatedDoc[];  // 관련 문서 배열 (하단 내부링크용)
  tips?: string[];
  faq?: FAQItem[];
  createdAt: string;
}

// 완료된 폼 추적 데이터
export interface FormsCompleted {
  completed: string[];
  lastUpdated: string;
  totalCount: number;
}

const FORMS_DIR = path.join(process.cwd(), 'data', 'forms');
const COMPLETED_FILE = path.join(process.cwd(), 'data', 'forms-completed.json');

/**
 * 모든 폼 slug 목록 가져오기 (generateStaticParams용)
 */
export function getAllFormSlugs(): string[] {
  try {
    const files = fs.readdirSync(FORMS_DIR);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch (error) {
    console.error('Error reading forms directory:', error);
    return [];
  }
}

/**
 * 특정 폼 데이터 가져오기
 */
export function getFormData(slug: string): FormData | null {
  try {
    const filePath = path.join(FORMS_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as FormData;
  } catch (error) {
    console.error(`Error reading form data for ${slug}:`, error);
    return null;
  }
}

/**
 * 모든 폼 데이터 가져오기
 */
export function getAllForms(): FormData[] {
  const slugs = getAllFormSlugs();
  return slugs
    .map(slug => getFormData(slug))
    .filter((form): form is FormData => form !== null);
}

/**
 * 완료된 폼 목록 가져오기
 */
export function getCompletedForms(): FormsCompleted {
  try {
    if (!fs.existsSync(COMPLETED_FILE)) {
      return { completed: [], lastUpdated: '', totalCount: 0 };
    }
    const content = fs.readFileSync(COMPLETED_FILE, 'utf-8');
    return JSON.parse(content) as FormsCompleted;
  } catch (error) {
    console.error('Error reading completed forms:', error);
    return { completed: [], lastUpdated: '', totalCount: 0 };
  }
}

/**
 * 폼이 이미 생성되었는지 확인
 */
export function isFormCompleted(slug: string): boolean {
  const completed = getCompletedForms();
  return completed.completed.includes(slug);
}

/**
 * 완료된 폼에 추가 (새 폼 생성 후 호출)
 */
export function markFormAsCompleted(slug: string): void {
  const completed = getCompletedForms();
  if (!completed.completed.includes(slug)) {
    completed.completed.push(slug);
    completed.totalCount = completed.completed.length;
    completed.lastUpdated = new Date().toISOString().split('T')[0];
    fs.writeFileSync(COMPLETED_FILE, JSON.stringify(completed, null, 2), 'utf-8');
  }
}

/**
 * 새 폼 JSON 파일 저장
 */
export function saveFormData(form: FormData): void {
  const filePath = path.join(FORMS_DIR, `${form.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(form, null, 2), 'utf-8');
  markFormAsCompleted(form.slug);
}

/**
 * 카테고리별 폼 가져오기
 */
export function getFormsByCategory(category: string): FormData[] {
  return getAllForms().filter(form => form.category === category);
}

/**
 * 미완료된 키워드 목록 가져오기 (CSV에서)
 */
export function getUncompletedKeywords(limit: number = 10): string[] {
  const completed = getCompletedForms();
  const completedSet = new Set(completed.completed);

  try {
    const csvPath = path.join(process.cwd(), 'data', 'form-keywords.csv');
    if (!fs.existsSync(csvPath)) {
      return [];
    }

    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n').slice(1); // Skip header

    const uncompleted: string[] = [];
    for (const line of lines) {
      if (uncompleted.length >= limit) break;

      const [keyword] = line.split(',');
      if (keyword && !completedSet.has(keyword.trim())) {
        uncompleted.push(keyword.trim());
      }
    }

    return uncompleted;
  } catch (error) {
    console.error('Error reading keywords CSV:', error);
    return [];
  }
}
