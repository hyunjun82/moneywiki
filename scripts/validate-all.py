#!/usr/bin/env python3
"""
통합 검증 스크립트 - 빌드 전 모든 검증 실행
"""

import subprocess
import sys
import json
from pathlib import Path
from datetime import datetime

def run_script(script_name: str, description: str) -> dict:
    """
    Python 스크립트 실행

    Returns:
        dict: {
            'success': bool,
            'output': str,
            'errors': int
        }
    """

    script_path = Path(__file__).parent / script_name

    if not script_path.exists():
        return {
            'success': False,
            'output': f"❌ {script_name} 파일 없음",
            'errors': 1
        }

    print(f"🔍 {description}...")

    try:
        result = subprocess.run(
            [sys.executable, str(script_path)],
            capture_output=True,
            text=True,
            encoding='utf-8'
        )

        success = result.returncode == 0
        output = result.stdout + result.stderr

        # 오류 개수 파악
        errors = 0
        if '오류' in output or 'ERROR' in output or '❌' in output:
            # JSON 결과 파일 확인
            json_files = {
                'fact_checker.py': 'fact_check_result.json',
                'verify_all.py': 'verify_result.json',
                'verify-calculations.py': 'calculation_errors.json',
                'check-wiki-quality.py': 'quality_check_result.json'
            }

            if script_name in json_files:
                json_path = Path(__file__).parent / json_files[script_name]
                if json_path.exists():
                    with open(json_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        errors = data.get('error_count', 0) or data.get('total_errors', 0)

        return {
            'success': success,
            'output': output,
            'errors': errors
        }

    except Exception as e:
        return {
            'success': False,
            'output': f"❌ 실행 오류: {str(e)}",
            'errors': 1
        }

def main():
    """
    통합 검증 실행

    실행 순서:
    1. fact_checker.py - 팩트체크
    2. verify-calculations.py - 계산 검증
    3. verify_all.py - 계산기 검증
    4. check-wiki-quality.py - 품질 검증
    """

    print("="*60)
    print("🚀 머니위키 통합 검증 시작")
    print("="*60)
    print(f"⏰ 시작 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    # 검증 단계
    steps = [
        {
            'script': 'fact_checker.py',
            'description': 'Step 1/4: 팩트체크 실행',
            'critical': True
        },
        {
            'script': 'verify-calculations.py',
            'description': 'Step 2/4: 계산 검증',
            'critical': True
        },
        {
            'script': 'verify_all.py',
            'description': 'Step 3/4: 계산기 검증',
            'critical': True
        },
        {
            'script': 'check-wiki-quality.py',
            'description': 'Step 4/4: 품질 검증',
            'critical': False  # 경고만 (빌드 중단 X)
        }
    ]

    results = {}
    total_errors = 0

    for step in steps:
        result = run_script(step['script'], step['description'])
        results[step['script']] = result

        print(result['output'])

        if not result['success']:
            if step['critical']:
                total_errors += result['errors']
            else:
                print(f"⚠️  {step['script']} 실패 (경고 - 빌드 계속)\n")

    # 최종 결과
    print("\n" + "="*60)
    print("📊 검증 결과 요약")
    print("="*60)

    for script, result in results.items():
        status = "✅ 통과" if result['success'] else f"❌ 실패 ({result['errors']}개 오류)"
        print(f"{script:30s} {status}")

    print("="*60)

    if total_errors > 0:
        print(f"\n❌ 총 {total_errors}개 오류 발견!")
        print("⚠️  빌드를 중단합니다. 위 오류를 수정한 후 다시 시도하세요.\n")

        # 통합 결과 JSON 저장
        output_path = Path(__file__).parent / 'validation_summary.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'total_errors': total_errors,
                'results': results
            }, f, ensure_ascii=False, indent=2)

        print(f"💾 상세 결과: {output_path}\n")

        sys.exit(1)  # 빌드 중단

    print("\n✅ 모든 검증 통과! 빌드를 진행합니다.\n")
    sys.exit(0)

if __name__ == '__main__':
    main()
