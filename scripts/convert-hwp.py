#!/usr/bin/env python3
"""
HWP 파일을 PDF, DOCX로 변환하는 스크립트

방법 1: pyhwp → ODT → LibreOffice → PDF/DOCX
방법 2: CloudConvert API (설정 시)

사용법:
    python convert-hwp.py <input.hwp> [--output-dir <dir>]
    python convert-hwp.py --all  # public/files/forms/*.hwp 전체 변환

필요 패키지:
    pip install pyhwp

필요 프로그램:
    - LibreOffice (headless 모드 사용)

참고:
    - pyhwp: https://github.com/mete0r/pyhwp
    - LibreOffice headless: soffice --headless --convert-to pdf
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path
import shutil
import tempfile

# 프로젝트 루트 경로
PROJECT_ROOT = Path(__file__).parent.parent
PUBLIC_FILES = PROJECT_ROOT / "public" / "files" / "forms"


def check_dependencies():
    """필요한 도구들이 설치되어 있는지 확인"""
    errors = []

    # pyhwp 확인
    try:
        import hwp5
        print("✓ pyhwp 설치됨")
    except ImportError:
        errors.append("pyhwp가 설치되지 않았습니다. 설치: pip install pyhwp")

    # LibreOffice 확인
    libreoffice_paths = [
        r"C:\Program Files\LibreOffice\program\soffice.exe",
        r"C:\Program Files (x86)\LibreOffice\program\soffice.exe",
        "/usr/bin/soffice",
        "/usr/bin/libreoffice",
        "/Applications/LibreOffice.app/Contents/MacOS/soffice",
    ]

    soffice_path = None
    for path in libreoffice_paths:
        if os.path.exists(path):
            soffice_path = path
            break

    if soffice_path:
        print(f"✓ LibreOffice 발견: {soffice_path}")
    else:
        # PATH에서 찾기
        soffice_path = shutil.which("soffice") or shutil.which("libreoffice")
        if soffice_path:
            print(f"✓ LibreOffice 발견: {soffice_path}")
        else:
            errors.append("LibreOffice가 설치되지 않았습니다. https://www.libreoffice.org/download/download/")

    return errors, soffice_path


def hwp_to_odt(hwp_path: Path, output_dir: Path) -> Path:
    """pyhwp를 사용하여 HWP를 ODT로 변환"""
    print(f"  [1/3] HWP → ODT 변환 중...")

    odt_path = output_dir / f"{hwp_path.stem}.odt"

    try:
        # hwp5odt 명령 실행
        result = subprocess.run(
            ["hwp5odt", "--output", str(odt_path), str(hwp_path)],
            capture_output=True,
            text=True,
            timeout=60
        )

        if result.returncode != 0:
            print(f"    경고: hwp5odt 오류 - {result.stderr}")
            return None

        if odt_path.exists():
            print(f"    ✓ ODT 생성: {odt_path.name}")
            return odt_path
        else:
            print(f"    ✗ ODT 파일 생성 실패")
            return None

    except FileNotFoundError:
        print("    ✗ hwp5odt 명령을 찾을 수 없습니다. pyhwp 설치 확인: pip install pyhwp")
        return None
    except subprocess.TimeoutExpired:
        print("    ✗ 변환 시간 초과")
        return None


def odt_to_pdf(odt_path: Path, output_dir: Path, soffice_path: str) -> Path:
    """LibreOffice를 사용하여 ODT를 PDF로 변환"""
    print(f"  [2/3] ODT → PDF 변환 중...")

    try:
        result = subprocess.run(
            [
                soffice_path,
                "--headless",
                "--convert-to", "pdf",
                "--outdir", str(output_dir),
                str(odt_path)
            ],
            capture_output=True,
            text=True,
            timeout=120
        )

        pdf_path = output_dir / f"{odt_path.stem}.pdf"
        if pdf_path.exists():
            print(f"    ✓ PDF 생성: {pdf_path.name}")
            return pdf_path
        else:
            print(f"    ✗ PDF 생성 실패: {result.stderr}")
            return None

    except subprocess.TimeoutExpired:
        print("    ✗ 변환 시간 초과")
        return None


def odt_to_docx(odt_path: Path, output_dir: Path, soffice_path: str) -> Path:
    """LibreOffice를 사용하여 ODT를 DOCX로 변환"""
    print(f"  [3/3] ODT → DOCX 변환 중...")

    try:
        result = subprocess.run(
            [
                soffice_path,
                "--headless",
                "--convert-to", "docx",
                "--outdir", str(output_dir),
                str(odt_path)
            ],
            capture_output=True,
            text=True,
            timeout=120
        )

        docx_path = output_dir / f"{odt_path.stem}.docx"
        if docx_path.exists():
            print(f"    ✓ DOCX 생성: {docx_path.name}")
            return docx_path
        else:
            print(f"    ✗ DOCX 생성 실패: {result.stderr}")
            return None

    except subprocess.TimeoutExpired:
        print("    ✗ 변환 시간 초과")
        return None


def convert_hwp(hwp_path: Path, output_dir: Path, soffice_path: str) -> dict:
    """HWP 파일을 PDF, DOCX로 변환"""
    print(f"\n📄 변환 시작: {hwp_path.name}")

    results = {"hwp": hwp_path, "odt": None, "pdf": None, "docx": None}

    # 임시 디렉토리 사용
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)

        # 1. HWP → ODT
        odt_path = hwp_to_odt(hwp_path, temp_path)
        if not odt_path:
            print("  ✗ ODT 변환 실패, 대체 방법 시도...")
            # 직접 LibreOffice로 HWP → PDF 시도
            return convert_hwp_direct(hwp_path, output_dir, soffice_path)

        # 2. ODT → PDF
        pdf_path = odt_to_pdf(odt_path, temp_path, soffice_path)
        if pdf_path:
            final_pdf = output_dir / pdf_path.name
            shutil.copy(pdf_path, final_pdf)
            results["pdf"] = final_pdf

        # 3. ODT → DOCX
        docx_path = odt_to_docx(odt_path, temp_path, soffice_path)
        if docx_path:
            final_docx = output_dir / docx_path.name
            shutil.copy(docx_path, final_docx)
            results["docx"] = final_docx

    return results


def convert_hwp_direct(hwp_path: Path, output_dir: Path, soffice_path: str) -> dict:
    """LibreOffice로 직접 HWP → PDF/DOCX 변환 시도 (pyhwp 실패 시 대체)"""
    print("  직접 변환 시도 (LibreOffice)...")

    results = {"hwp": hwp_path, "pdf": None, "docx": None}

    # HWP → PDF
    try:
        subprocess.run(
            [soffice_path, "--headless", "--convert-to", "pdf",
             "--outdir", str(output_dir), str(hwp_path)],
            capture_output=True, timeout=120
        )
        pdf_path = output_dir / f"{hwp_path.stem}.pdf"
        if pdf_path.exists():
            results["pdf"] = pdf_path
            print(f"    ✓ PDF 직접 변환 성공")
    except Exception as e:
        print(f"    ✗ PDF 직접 변환 실패: {e}")

    # HWP → DOCX
    try:
        subprocess.run(
            [soffice_path, "--headless", "--convert-to", "docx",
             "--outdir", str(output_dir), str(hwp_path)],
            capture_output=True, timeout=120
        )
        docx_path = output_dir / f"{hwp_path.stem}.docx"
        if docx_path.exists():
            results["docx"] = docx_path
            print(f"    ✓ DOCX 직접 변환 성공")
    except Exception as e:
        print(f"    ✗ DOCX 직접 변환 실패: {e}")

    return results


def convert_all_hwp_files(soffice_path: str):
    """public/files/forms/ 내 모든 HWP 파일 변환"""
    PUBLIC_FILES.mkdir(parents=True, exist_ok=True)

    hwp_files = list(PUBLIC_FILES.glob("*.hwp"))

    if not hwp_files:
        print(f"\n⚠️  {PUBLIC_FILES}에 HWP 파일이 없습니다.")
        print("먼저 HWP 파일을 해당 폴더에 넣어주세요.")
        return

    print(f"\n🔄 총 {len(hwp_files)}개 HWP 파일 변환 시작")

    all_results = []
    for hwp_file in hwp_files:
        result = convert_hwp(hwp_file, PUBLIC_FILES, soffice_path)
        all_results.append(result)

    # 결과 요약
    print("\n" + "="*50)
    print("📊 변환 결과 요약")
    print("="*50)

    for result in all_results:
        hwp_name = result["hwp"].stem
        pdf_ok = "✓" if result.get("pdf") else "✗"
        docx_ok = "✓" if result.get("docx") else "✗"
        print(f"  {hwp_name}: PDF {pdf_ok} | DOCX {docx_ok}")


def main():
    parser = argparse.ArgumentParser(description="HWP 파일을 PDF, DOCX로 변환")
    parser.add_argument("input", nargs="?", help="변환할 HWP 파일 경로")
    parser.add_argument("--output-dir", "-o", default=str(PUBLIC_FILES),
                       help="출력 디렉토리 (기본: public/files/forms/)")
    parser.add_argument("--all", action="store_true",
                       help="public/files/forms/ 내 모든 HWP 파일 변환")
    parser.add_argument("--check", action="store_true",
                       help="필요한 도구 설치 확인만")

    args = parser.parse_args()

    print("="*50)
    print("🔧 HWP → PDF/DOCX 변환 도구")
    print("="*50)

    # 의존성 확인
    errors, soffice_path = check_dependencies()

    if args.check:
        if errors:
            print("\n⚠️  해결 필요:")
            for error in errors:
                print(f"  - {error}")
        else:
            print("\n✅ 모든 도구가 준비되었습니다.")
        return

    if errors:
        print("\n❌ 필요한 도구가 없습니다:")
        for error in errors:
            print(f"  - {error}")
        sys.exit(1)

    # 출력 디렉토리 생성
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    if args.all:
        convert_all_hwp_files(soffice_path)
    elif args.input:
        hwp_path = Path(args.input)
        if not hwp_path.exists():
            print(f"❌ 파일을 찾을 수 없습니다: {hwp_path}")
            sys.exit(1)
        convert_hwp(hwp_path, output_dir, soffice_path)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
