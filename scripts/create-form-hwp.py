"""
HWP-MCP를 사용하여 양식 HWP 파일 생성
"""

import sys
import os
import time

# hwp-mcp 경로 추가
sys.path.insert(0, "C:/Users/user/hwp-mcp-test/src")

from tools.hwp_controller import HwpController


def create_gakseo_form(hwp: HwpController, save_path: str) -> bool:
    """각서 양식 생성"""
    print("\n[각서 양식 생성 중...]")

    # 새 문서 생성
    hwp.create_new_document()

    # 제목
    hwp.set_font_style(font_name="맑은 고딕", font_size=20, bold=True)
    hwp.insert_text("각    서")
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 본문 글꼴로 변경
    hwp.set_font_style(font_name="맑은 고딕", font_size=11, bold=False)

    # 작성자 정보 테이블
    hwp.insert_table(4, 4)

    # 작성자 정보
    data1 = [
        ["작성자", "성명", "(성명)", ""],
        ["", "주민번호", "000000-0000000", ""],
        ["", "주소", "(주소)", ""],
        ["", "연락처", "(연락처)", ""],
    ]
    hwp.fill_table_with_data(data1, has_header=True)

    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 상대방 정보 테이블
    hwp.insert_table(4, 4)
    data2 = [
        ["상대방", "성명", "(성명)", ""],
        ["", "주민번호", "000000-0000000", ""],
        ["", "주소", "(주소)", ""],
        ["", "연락처", "(연락처)", ""],
    ]
    hwp.fill_table_with_data(data2, has_header=True)

    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 각서 내용
    hwp.set_font_style(font_name="맑은 고딕", font_size=12, bold=True)
    hwp.insert_text("각서 내용")
    hwp.insert_paragraph()
    hwp.set_font_style(font_name="맑은 고딕", font_size=11, bold=False)

    hwp.insert_paragraph()
    hwp.insert_text("본인은 아래 사항을 확인하고 이를 준수할 것을 각서합니다.")
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    hwp.insert_text("1. ")
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    hwp.insert_text("2. ")
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    hwp.insert_text("3. ")
    hwp.insert_paragraph()
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 서약 문구
    hwp.insert_text("위 각서 내용을 성실히 이행할 것을 서약하며, 만약 이를 위반할 경우")
    hwp.insert_paragraph()
    hwp.insert_text("민·형사상의 모든 책임을 질 것을 각서합니다.")
    hwp.insert_paragraph()
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 날짜
    hwp.insert_text("          년      월      일")
    hwp.insert_paragraph()
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 서명란
    hwp.insert_text("작성자 :                       (인)")
    hwp.insert_paragraph()
    hwp.insert_paragraph()
    hwp.insert_text("상대방 :                       (인)")
    hwp.insert_paragraph()

    # 저장
    print(f"저장 경로: {save_path}")
    result = hwp.save_document(save_path)

    if os.path.exists(save_path):
        print(f"✅ 각서 양식 생성 완료! ({os.path.getsize(save_path)} bytes)")
        return True
    else:
        print("❌ 저장 실패")
        return False


def create_receipt_form(hwp: HwpController, save_path: str) -> bool:
    """영수증 양식 생성"""
    print("\n[영수증 양식 생성 중...]")

    hwp.create_new_document()

    # 제목
    hwp.set_font_style(font_name="맑은 고딕", font_size=24, bold=True)
    hwp.insert_text("영  수  증")
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 금액
    hwp.set_font_style(font_name="맑은 고딕", font_size=16, bold=True)
    hwp.insert_text("금액 : 일금                원정 (₩           )")
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 본문 글꼴
    hwp.set_font_style(font_name="맑은 고딕", font_size=11, bold=False)

    # 내역
    hwp.insert_text("위 금액을 아래와 같이 영수합니다.")
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 내역 테이블
    hwp.insert_table(3, 2)
    data = [
        ["내역", ""],
        ["비고", ""],
        ["지급일", "    년    월    일"],
    ]
    hwp.fill_table_with_data(data, has_header=True)

    hwp.insert_paragraph()
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 날짜
    hwp.insert_text("          년      월      일")
    hwp.insert_paragraph()
    hwp.insert_paragraph()

    # 수령인 정보
    hwp.set_font_style(font_name="맑은 고딕", font_size=11, bold=True)
    hwp.insert_text("수령인")
    hwp.set_font_style(font_name="맑은 고딕", font_size=11, bold=False)
    hwp.insert_paragraph()
    hwp.insert_text("성명 :                         (인)")
    hwp.insert_paragraph()
    hwp.insert_text("주소 :")
    hwp.insert_paragraph()
    hwp.insert_text("연락처 :")
    hwp.insert_paragraph()

    # 저장
    print(f"저장 경로: {save_path}")
    result = hwp.save_document(save_path)

    if os.path.exists(save_path):
        print(f"✅ 영수증 양식 생성 완료! ({os.path.getsize(save_path)} bytes)")
        return True
    else:
        print("❌ 저장 실패")
        return False


def main():
    print("=" * 60)
    print("HWP-MCP 양식 생성기")
    print("=" * 60)

    hwp = HwpController()

    # 한글 연결
    print("\n[1] 한글 프로그램 연결...")
    if not hwp.connect(visible=True, register_security_module=False):
        print("❌ 한글 연결 실패")
        return 1

    print("✅ 한글 연결 성공!")

    # 저장 디렉토리
    save_dir = os.path.expanduser("~/Documents/wiki-forms")
    os.makedirs(save_dir, exist_ok=True)
    print(f"저장 디렉토리: {save_dir}")

    # 각서 양식 생성
    create_gakseo_form(hwp, os.path.join(save_dir, "각서.hwp"))

    # 영수증 양식 생성
    create_receipt_form(hwp, os.path.join(save_dir, "영수증.hwp"))

    # 연결 종료
    print("\n연결 종료...")
    hwp.disconnect()

    print("\n" + "=" * 60)
    print("완료! 생성된 파일들:")
    for f in os.listdir(save_dir):
        if f.endswith('.hwp'):
            fpath = os.path.join(save_dir, f)
            print(f"  - {f} ({os.path.getsize(fpath)} bytes)")
    print("=" * 60)

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:
        print(f"\n오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
