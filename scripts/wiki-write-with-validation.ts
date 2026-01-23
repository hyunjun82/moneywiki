/**
 * wegive 규칙 검증 + 파일 작성 통합 시스템
 *
 * Claude가 위키 파일을 작성하기 전에 자동으로 검증
 * 규칙 위반 감지 → 즉시 중단 → 에러 출력
 *
 * 사용:
 * import { validateBeforeWrite } from './wiki-write-with-validation'
 * await validateBeforeWrite(filePath, newContent)
 */

import * as fs from 'fs';
import * as path from 'path';
import { validateWikiArticle, ValidationResult } from './validate-wiki-wegive';

interface WriteResult {
  success: boolean;
  message: string;
  validationErrors?: string[];
}

/**
 * 파일 작성 전 wegive 규칙 검증
 * 검증 실패 시 작성 중단
 */
export async function validateBeforeWrite(
  filePath: string,
  content: string,
  options: { force?: boolean } = {}
): Promise<WriteResult> {
  // 1. 임시 파일에 내용 작성
  const tempFile = path.join(path.dirname(filePath), `.temp-${path.basename(filePath)}`);

  try {
    fs.writeFileSync(tempFile, content, 'utf-8');

    // 2. 검증 실행
    const result: ValidationResult = validateWikiArticle(tempFile);

    // 3. 검증 실패 → 중단
    if (!result.valid && !options.force) {
      // 임시 파일 삭제
      fs.unlinkSync(tempFile);

      return {
        success: false,
        message: '🚨 wegive 규칙 위반 감지! 작성 중단됨',
        validationErrors: result.errors,
      };
    }

    // 4. 검증 통과 → 실제 파일에 작성
    fs.renameSync(tempFile, filePath);

    return {
      success: true,
      message: result.warnings.length > 0 ? '⚠️ 경고 있음 (작성 완료)' : '✅ 검증 통과 (작성 완료)',
      validationErrors: result.warnings.length > 0 ? result.warnings : undefined,
    };
  } catch (error: any) {
    // 에러 발생 시 임시 파일 정리
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }

    throw new Error(`검증 중 오류: ${error.message}`);
  }
}

/**
 * 파일 수정 전 wegive 규칙 검증
 */
export async function validateBeforeEdit(filePath: string, newContent: string): Promise<WriteResult> {
  return validateBeforeWrite(filePath, newContent);
}

/**
 * Claude 작성 시 자동 검증 (강제)
 * 이 함수는 절대 건너뛸 수 없음
 */
export async function enforceValidation(filePath: string, content: string): Promise<void> {
  const result = await validateBeforeWrite(filePath, content, { force: false });

  if (!result.success) {
    console.error('\n🚨 ===== wegive 규칙 위반 감지 =====\n');
    console.error(result.message);
    console.error('\n오류 목록:\n');
    result.validationErrors?.forEach((err) => console.error(`  ${err}`));
    console.error('\n===== 작성 중단됨 =====\n');

    throw new Error('wegive 규칙 위반으로 작성 중단');
  }

  if (result.validationErrors && result.validationErrors.length > 0) {
    console.warn('\n⚠️ ===== 경고 =====\n');
    result.validationErrors.forEach((warn) => console.warn(`  ${warn}`));
    console.warn('\n');
  }
}

// ===== CLI 실행 =====

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('사용법: npx tsx scripts/wiki-write-with-validation.ts <파일경로> <내용파일>');
    process.exit(1);
  }

  const [targetFile, contentFile] = args;

  const content = fs.readFileSync(contentFile, 'utf-8');

  enforceValidation(targetFile, content)
    .then(() => {
      console.log('✅ 검증 통과 및 작성 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    });
}
