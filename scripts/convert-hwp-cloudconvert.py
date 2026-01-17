#!/usr/bin/env python3
"""
CloudConvert API를 사용한 HWP 파일 변환

CloudConvert는 HWP → PDF, DOCX 직접 변환을 지원합니다.

설치:
    pip install cloudconvert

API 키 발급:
    1. https://cloudconvert.com 가입
    2. Dashboard → API → Create API Key
    3. 환경변수 설정: CLOUDCONVERT_API_KEY=your_key

무료 티어:
    - 매일 25분 변환 시간 무료
    - Sandbox API로 무제한 테스트 가능

참고: https://github.com/cloudconvert/cloudconvert-python
"""

import os
import sys
import time
from pathlib import Path
import argparse

try:
    import cloudconvert
except ImportError:
    print("cloudconvert 패키지가 필요합니다.")
    print("설치: pip install cloudconvert")
    sys.exit(1)

try:
    import requests
except ImportError:
    print("requests 패키지가 필요합니다.")
    print("설치: pip install requests")
    sys.exit(1)


# 프로젝트 경로
PROJECT_ROOT = Path(__file__).parent.parent
PUBLIC_FILES = PROJECT_ROOT / "public" / "files" / "forms"


def setup_api(sandbox: bool = False):
    """CloudConvert API 설정"""
    api_key = os.environ.get("CLOUDCONVERT_API_KEY")

    if not api_key:
        print("❌ API 키가 설정되지 않았습니다.")
        print("\n설정 방법:")
        print("  Windows: set CLOUDCONVERT_API_KEY=your_api_key")
        print("  Linux/Mac: export CLOUDCONVERT_API_KEY=your_api_key")
        print("\nAPI 키 발급: https://cloudconvert.com/dashboard/api/v2/keys")
        return False

    cloudconvert.configure(
        api_key=api_key,
        sandbox=sandbox  # True면 테스트용 (무제한, 결과물 워터마크)
    )
    return True


def convert_hwp_to_formats(hwp_path: Path, output_dir: Path, formats: list = ["pdf", "docx"]) -> dict:
    """HWP 파일을 여러 포맷으로 변환"""
    print(f"\n📄 변환: {hwp_path.name}")

    results = {"hwp": hwp_path}

    for fmt in formats:
        print(f"  → {fmt.upper()} 변환 중...")

        try:
            # 1. Job 생성
            job = cloudconvert.Job.create(payload={
                "tasks": {
                    "upload-file": {
                        "operation": "import/upload"
                    },
                    "convert-file": {
                        "operation": "convert",
                        "input": "upload-file",
                        "output_format": fmt
                    },
                    "export-file": {
                        "operation": "export/url",
                        "input": "convert-file"
                    }
                }
            })

            # 2. 파일 업로드
            upload_task = None
            for task in job["tasks"]:
                if task["name"] == "upload-file":
                    upload_task = task
                    break

            if not upload_task:
                print(f"    ✗ 업로드 태스크 생성 실패")
                continue

            # 업로드 실행
            cloudconvert.Task.upload(
                file_name=hwp_path.name,
                task=upload_task,
                file=open(hwp_path, "rb")
            )

            # 3. 완료 대기
            job = cloudconvert.Job.wait(id=job["id"])

            # 4. 결과 다운로드
            for task in job["tasks"]:
                if task["name"] == "export-file" and task.get("result"):
                    for file_info in task["result"].get("files", []):
                        download_url = file_info.get("url")
                        if download_url:
                            output_path = output_dir / f"{hwp_path.stem}.{fmt}"
                            response = requests.get(download_url)
                            with open(output_path, "wb") as f:
                                f.write(response.content)
                            results[fmt] = output_path
                            print(f"    ✓ {fmt.upper()} 저장: {output_path.name}")

        except cloudconvert.exceptions.APIError as e:
            print(f"    ✗ API 오류: {e}")
        except Exception as e:
            print(f"    ✗ 오류: {e}")

    return results


def convert_all_files(formats: list = ["pdf", "docx"]):
    """public/files/forms/ 내 모든 HWP 파일 변환"""
    PUBLIC_FILES.mkdir(parents=True, exist_ok=True)

    hwp_files = list(PUBLIC_FILES.glob("*.hwp"))

    if not hwp_files:
        print(f"\n⚠️  HWP 파일이 없습니다: {PUBLIC_FILES}")
        return

    print(f"\n🔄 총 {len(hwp_files)}개 파일 변환")

    all_results = []
    for hwp_file in hwp_files:
        result = convert_hwp_to_formats(hwp_file, PUBLIC_FILES, formats)
        all_results.append(result)

    # 결과 요약
    print("\n" + "="*50)
    print("📊 변환 결과")
    print("="*50)

    for result in all_results:
        hwp_name = result["hwp"].stem
        status = " | ".join([
            f"{fmt.upper()}: {'✓' if result.get(fmt) else '✗'}"
            for fmt in formats
        ])
        print(f"  {hwp_name}: {status}")


def main():
    parser = argparse.ArgumentParser(description="CloudConvert API로 HWP 변환")
    parser.add_argument("input", nargs="?", help="HWP 파일 경로")
    parser.add_argument("--all", action="store_true", help="모든 HWP 파일 변환")
    parser.add_argument("--sandbox", action="store_true", help="Sandbox API 사용 (테스트용)")
    parser.add_argument("--formats", default="pdf,docx", help="출력 포맷 (기본: pdf,docx)")
    parser.add_argument("-o", "--output", default=str(PUBLIC_FILES), help="출력 디렉토리")

    args = parser.parse_args()

    print("="*50)
    print("☁️  CloudConvert HWP 변환")
    print("="*50)

    if not setup_api(sandbox=args.sandbox):
        sys.exit(1)

    if args.sandbox:
        print("⚠️  Sandbox 모드 (테스트용, 워터마크 포함)")

    formats = [f.strip() for f in args.formats.split(",")]
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    if args.all:
        convert_all_files(formats)
    elif args.input:
        hwp_path = Path(args.input)
        if not hwp_path.exists():
            print(f"❌ 파일 없음: {hwp_path}")
            sys.exit(1)
        convert_hwp_to_formats(hwp_path, output_dir, formats)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
