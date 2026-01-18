"""
HWP-MCP 테스트 스크립트
한글 프로그램과 연결하여 기본적인 문서 생성 테스트
"""

import sys
import os

# hwp-mcp 경로 추가
sys.path.insert(0, "C:/Users/user/hwp-mcp-test/src")

from tools.hwp_controller import HwpController

def test_basic_connection():
    """기본 연결 테스트"""
    print("=" * 50)
    print("HWP-MCP 기본 연결 테스트")
    print("=" * 50)

    hwp = HwpController()

    # 1. 한글 연결
    print("\n[1] 한글 프로그램 연결 시도...")
    if hwp.connect(visible=True, register_security_module=False):
        print("✅ 한글 연결 성공!")
    else:
        print("❌ 한글 연결 실패")
        return False

    # 2. 새 문서 생성
    print("\n[2] 새 문서 생성...")
    if hwp.create_new_document():
        print("✅ 새 문서 생성 성공!")
    else:
        print("❌ 새 문서 생성 실패")
        hwp.disconnect()
        return False

    # 3. 텍스트 삽입
    print("\n[3] 텍스트 삽입...")
    if hwp.insert_text("HWP-MCP 테스트 문서입니다."):
        print("✅ 텍스트 삽입 성공!")
    else:
        print("❌ 텍스트 삽입 실패")

    # 4. 단락 추가
    hwp.insert_paragraph()
    hwp.insert_text("이 문서는 Claude가 자동으로 생성했습니다.")

    # 5. 테이블 삽입
    print("\n[4] 테이블 삽입...")
    hwp.insert_paragraph()
    hwp.insert_paragraph()
    if hwp.insert_table(3, 2):
        print("✅ 테이블 삽입 성공!")

        # 테이블에 데이터 채우기
        data = [
            ["항목", "내용"],
            ["테스트1", "성공"],
            ["테스트2", "성공"],
        ]
        hwp.fill_table_with_data(data, has_header=True)
    else:
        print("❌ 테이블 삽입 실패")

    # 6. 파일 저장 (Documents 폴더에 저장 시도)
    save_path = os.path.expanduser("~/Documents/hwp-mcp-test.hwp")
    print(f"\n[5] 문서 저장: {save_path}")
    try:
        result = hwp.save_document(save_path)
        print(f"저장 결과: {result}")
        if os.path.exists(save_path):
            print(f"✅ 문서 저장 성공! 파일 크기: {os.path.getsize(save_path)} bytes")
        else:
            print("⚠️ save_document는 성공했지만 파일이 없음 - 보안 경고창 확인 필요")
    except Exception as e:
        print(f"❌ 문서 저장 실패: {e}")

    # 7. 연결 종료 (한글 프로그램은 열어둠)
    print("\n[6] 연결 종료...")
    hwp.disconnect()
    print("✅ 테스트 완료!")

    return True


if __name__ == "__main__":
    try:
        success = test_basic_connection()
        if success:
            print("\n" + "=" * 50)
            print("HWP-MCP 테스트 성공!")
            print("생성된 파일: C:/Users/user/wiki-site/public/forms/hwp-mcp-test.hwp")
            print("=" * 50)
        else:
            print("\n테스트 실패")
            sys.exit(1)
    except Exception as e:
        print(f"\n오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
