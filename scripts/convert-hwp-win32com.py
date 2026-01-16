#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
HWP → PDF, DOCX 자동 변환 스크립트 (한글 프로그램 사용)

win32com을 통해 설치된 한글(HWP) 프로그램을 제어하여 변환합니다.
가장 정확하고 안정적인 변환 방법입니다.

요구사항:
    - 한글(HWP) 프로그램 설치
    - pip install pywin32

사용법:
    python convert-hwp-win32com.py              # public/files/forms/ 전체 변환
    python convert-hwp-win32com.py --register   # 보안 모듈 등록 (최초 1회)
    python convert-hwp-win32com.py --file 파일.hwp  # 특정 파일만 변환
"""

import os
import sys
import time
import glob
import argparse
import winreg
from pathlib import Path

# pywin32 설치 확인
try:
    import win32com.client as win32
    import pythoncom
except ImportError:
    print("❌ pywin32가 설치되지 않았습니다.")
    print("설치: pip install pywin32")
    sys.exit(1)


# ============================================================
# 설정
# ============================================================
PROJECT_ROOT = Path(__file__).parent.parent
FORMS_DIR = PROJECT_ROOT / "public" / "files" / "forms"

# 한글 저장 포맷 상수
HWP_FORMAT = "HWP"
PDF_FORMAT = "PDF"
DOCX_FORMAT = "OOXML"  # 한글에서 DOCX는 "OOXML" 포맷 사용

# SaveAs 포맷 코드 (한글 2020 기준)
# 참고: https://forum.developer.hancom.com/t/hwp-docx/975
SAVE_FORMATS = {
    "pdf": "PDF",      # PDF
    "docx": "OOXML",   # Microsoft Word DOCX (OOXML 포맷)
    "doc": "DOC",      # Microsoft Word DOC
    "hwpx": "HWPX",    # HWPX (새 한글 포맷)
    "txt": "TEXT",     # 텍스트
    "html": "HTML",    # HTML
}


# ============================================================
# 보안 모듈 등록 (FilePathChecker 우회)
# ============================================================
def register_security_module():
    """
    한글 보안 팝업(FilePathChecker)을 우회하기 위한 레지스트리 등록

    한글 프로그램은 스크립트에서 파일을 열거나 저장할 때 보안 경고를 표시합니다.
    이 함수는 신뢰할 수 있는 모듈로 등록하여 팝업을 방지합니다.
    """
    print("🔐 보안 모듈 등록 중...")

    # 레지스트리 경로 (한글 버전에 따라 다를 수 있음)
    registry_paths = [
        r"SOFTWARE\HNC\HwpAutomation\Modules",  # 한글 2020+
        r"SOFTWARE\Hnc\Hwp\10.0\HwpAutomation\Modules",  # 한글 2018
        r"SOFTWARE\Hnc\Hwp\9.0\HwpAutomation\Modules",   # 한글 2014
        r"SOFTWARE\Hnc\HwpOffice\HwpAutomation\Modules", # 한글오피스
    ]

    # 현재 스크립트 경로
    script_path = os.path.abspath(__file__)
    module_name = "HwpConvertScript"

    success = False

    for reg_path in registry_paths:
        try:
            # 키 생성 또는 열기
            key = winreg.CreateKey(winreg.HKEY_CURRENT_USER, reg_path)

            # 값 설정 (모듈 이름 = 스크립트 경로)
            winreg.SetValueEx(key, module_name, 0, winreg.REG_SZ, script_path)
            winreg.CloseKey(key)

            print(f"  ✓ 등록됨: HKCU\\{reg_path}")
            success = True

        except WindowsError as e:
            # 해당 경로가 없으면 다음 시도
            continue

    if not success:
        print("  ⚠️  레지스트리 경로를 찾을 수 없습니다.")
        print("  → 한글 프로그램이 설치되어 있는지 확인하세요.")
        print("  → 또는 관리자 권한으로 실행해보세요.")

    # 추가: FilePathCheckerModule 비활성화
    try:
        # 한글 보안 설정 경로
        security_paths = [
            r"SOFTWARE\HNC\Hwp\Security",
            r"SOFTWARE\Hnc\HwpOffice\Security",
        ]

        for sec_path in security_paths:
            try:
                key = winreg.CreateKey(winreg.HKEY_CURRENT_USER, sec_path)
                # FilePathChecker 비활성화 (0 = 비활성화)
                winreg.SetValueEx(key, "FilePathCheckerDisable", 0, winreg.REG_DWORD, 1)
                winreg.CloseKey(key)
                print(f"  ✓ FilePathChecker 비활성화됨")
                break
            except WindowsError:
                continue

    except Exception as e:
        print(f"  ⚠️  보안 설정 변경 실패: {e}")

    print("")
    return success


# ============================================================
# HWP 변환 클래스
# ============================================================
class HwpConverter:
    """한글(HWP) 파일 변환기"""

    def __init__(self):
        self.hwp = None

    def start(self):
        """한글 프로그램 시작 (백그라운드)"""
        print("📄 한글 프로그램 시작 중...")

        pythoncom.CoInitialize()

        try:
            # 한글 자동화 객체 생성 (여러 ProgID 시도)
            hwp_progids = [
                "HWPFrame.HwpObject",      # 한글 2018-2022 (가장 일반적)
                "HWPFrame.HwpObject.1",    # 대체
                "Hwp.HwpObject",           # 한글 2020+
            ]

            for progid in hwp_progids:
                try:
                    self.hwp = win32.Dispatch(progid)
                    print(f"  ✓ 연결됨: {progid}")
                    break
                except:
                    continue
            else:
                raise Exception("한글 ProgID를 찾을 수 없습니다")

        except Exception as e:
            print(f"❌ 한글 프로그램을 시작할 수 없습니다: {e}")
            print("  → 한글(HWP)이 설치되어 있는지 확인하세요.")
            return False

        # 보안 모듈 등록 (스크립트 실행 허용)
        try:
            self.hwp.RegisterModule("FilePathCheckDLL", "FilePathCheckerModule")
            print("  ✓ 보안 모듈 등록됨")
        except:
            pass  # 구버전 한글에서는 지원하지 않을 수 있음

        # 메시지 박스 자동 확인 설정 (OOXML 저장 시 팝업 방지)
        # 참고: https://forum.developer.hancom.com/t/hwp-docx/975
        try:
            # 0x10000 = 메시지 박스 자동 확인 (예/확인 버튼 자동 클릭)
            self.hwp.SetMessageBoxMode(0x10000)
            print("  ✓ 메시지 박스 자동 확인 설정됨")
        except:
            pass  # HwpObjectLib에서는 지원하지 않을 수 있음

        # 창 숨기기 (백그라운드 실행) - 여러 방법 시도
        try:
            self.hwp.XHwpWindows.Active_XHwpWindow.Visible = False
        except:
            pass

        try:
            # 대체 방법: 창 크기 최소화
            self.hwp.ShowWindow(0)  # SW_HIDE
        except:
            pass

        print("  ✓ 한글 프로그램 준비 완료\n")
        return True

    def stop(self):
        """한글 프로그램 종료"""
        if self.hwp:
            try:
                self.hwp.Clear(1)  # 문서 닫기
                self.hwp.Quit()
            except:
                pass
            self.hwp = None

        pythoncom.CoUninitialize()
        print("\n✓ 한글 프로그램 종료됨")

    def open_file(self, hwp_path: str) -> bool:
        """HWP 파일 열기"""
        try:
            # 절대 경로로 변환
            abs_path = os.path.abspath(hwp_path)

            # 파일 열기 (arg: "파일경로", 포맷, 인자)
            result = self.hwp.Open(abs_path, "HWP", "forceopen:true")
            return result
        except Exception as e:
            print(f"    ✗ 파일 열기 실패: {e}")
            return False

    def save_as_pdf(self, output_path: str) -> bool:
        """PDF로 저장"""
        try:
            abs_path = os.path.abspath(output_path)

            # PDF 저장 옵션 설정
            self.hwp.HAction.GetDefault("FileSaveAsPdf", self.hwp.HParameterSet.HFileOpenSave.HSet)
            self.hwp.HParameterSet.HFileOpenSave.filename = abs_path
            self.hwp.HParameterSet.HFileOpenSave.Format = "PDF"
            self.hwp.HAction.Execute("FileSaveAsPdf", self.hwp.HParameterSet.HFileOpenSave.HSet)

            return os.path.exists(abs_path)
        except Exception as e:
            # 대체 방법 시도
            try:
                self.hwp.SaveAs(abs_path, "PDF")
                return os.path.exists(abs_path)
            except Exception as e2:
                print(f"    ✗ PDF 저장 실패: {e2}")
                return False

    def save_as_docx(self, output_path: str) -> bool:
        """DOCX(워드)로 저장"""
        try:
            abs_path = os.path.abspath(output_path)

            # DOCX 저장 - 한글에서는 "OOXML" 포맷 사용
            # 참고: https://forum.developer.hancom.com/t/hwp-docx/975
            self.hwp.SaveAs(abs_path, "OOXML")
            return os.path.exists(abs_path)
        except Exception as e:
            print(f"    ✗ DOCX 저장 실패: {e}")
            return False

    def close_file(self):
        """현재 문서 닫기"""
        try:
            self.hwp.Clear(1)
        except:
            pass

    def convert_file(self, hwp_path: str, output_dir: str = None) -> dict:
        """
        HWP 파일을 PDF, DOCX로 변환

        Args:
            hwp_path: HWP 파일 경로
            output_dir: 출력 디렉토리 (기본: 원본과 같은 위치)

        Returns:
            dict: {"pdf": 경로 or None, "docx": 경로 or None}
        """
        hwp_path = Path(hwp_path)
        output_dir = Path(output_dir) if output_dir else hwp_path.parent

        base_name = hwp_path.stem
        results = {"hwp": str(hwp_path), "pdf": None, "docx": None}

        print(f"📄 {hwp_path.name}")

        # 파일 열기
        if not self.open_file(str(hwp_path)):
            return results

        print("  → 파일 열기 성공")

        # PDF로 저장
        pdf_path = output_dir / f"{base_name}.pdf"
        print(f"  → PDF 변환 중...")
        if self.save_as_pdf(str(pdf_path)):
            results["pdf"] = str(pdf_path)
            print(f"    ✓ PDF 저장: {pdf_path.name}")

        # DOCX로 저장
        docx_path = output_dir / f"{base_name}.docx"
        print(f"  → DOCX 변환 중...")
        if self.save_as_docx(str(docx_path)):
            results["docx"] = str(docx_path)
            print(f"    ✓ DOCX 저장: {docx_path.name}")

        # 문서 닫기
        self.close_file()

        return results


# ============================================================
# 메인 함수
# ============================================================
def convert_all_files(directory: Path):
    """디렉토리 내 모든 HWP 파일 변환"""

    # HWP 파일 찾기
    hwp_files = list(directory.glob("*.hwp"))

    if not hwp_files:
        print(f"❌ HWP 파일이 없습니다: {directory}")
        return

    print(f"📁 {len(hwp_files)}개 HWP 파일 발견\n")
    print("=" * 50)

    # 변환기 시작
    converter = HwpConverter()
    if not converter.start():
        return

    results = []

    try:
        for hwp_file in hwp_files:
            result = converter.convert_file(hwp_file, directory)
            results.append(result)
            print("")

    finally:
        converter.stop()

    # 결과 요약
    print("\n" + "=" * 50)
    print("📊 변환 결과 요약")
    print("=" * 50)

    for result in results:
        hwp_name = Path(result["hwp"]).stem
        pdf_ok = "✓" if result["pdf"] else "✗"
        docx_ok = "✓" if result["docx"] else "✗"
        print(f"  {hwp_name}: PDF {pdf_ok} | DOCX {docx_ok}")

    # 성공/실패 카운트
    pdf_success = sum(1 for r in results if r["pdf"])
    docx_success = sum(1 for r in results if r["docx"])
    total = len(results)

    print(f"\n  총 {total}개 파일")
    print(f"  PDF 변환: {pdf_success}/{total}")
    print(f"  DOCX 변환: {docx_success}/{total}")


def main():
    parser = argparse.ArgumentParser(description="HWP → PDF, DOCX 변환 (한글 프로그램 사용)")
    parser.add_argument("--file", "-f", help="특정 HWP 파일만 변환")
    parser.add_argument("--output", "-o", help="출력 디렉토리")
    parser.add_argument("--register", action="store_true", help="보안 모듈 등록 (최초 1회)")
    parser.add_argument("--dir", "-d", default=str(FORMS_DIR), help=f"HWP 파일 디렉토리 (기본: {FORMS_DIR})")

    args = parser.parse_args()

    print("=" * 50)
    print("🔄 HWP → PDF/DOCX 변환 도구")
    print("   (한글 프로그램 자동화)")
    print("=" * 50 + "\n")

    # 보안 모듈 등록
    if args.register:
        register_security_module()
        print("✅ 완료! 이제 변환 스크립트를 실행할 수 있습니다.")
        print("   python convert-hwp-win32com.py")
        return

    # 디렉토리 확인
    forms_dir = Path(args.dir)
    if not forms_dir.exists():
        forms_dir.mkdir(parents=True, exist_ok=True)
        print(f"📁 디렉토리 생성: {forms_dir}")

    output_dir = Path(args.output) if args.output else forms_dir

    # 특정 파일 변환
    if args.file:
        hwp_path = Path(args.file)
        if not hwp_path.exists():
            print(f"❌ 파일 없음: {hwp_path}")
            return

        converter = HwpConverter()
        if converter.start():
            try:
                converter.convert_file(hwp_path, output_dir)
            finally:
                converter.stop()
    else:
        # 전체 변환
        convert_all_files(forms_dir)

    print("\n✅ 완료!")


if __name__ == "__main__":
    main()
