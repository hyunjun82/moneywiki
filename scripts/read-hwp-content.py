"""HWP 파일 내용 읽기"""
import sys
sys.path.insert(0, "C:/Users/user/hwp-mcp-test/src")

from tools.hwp_controller import HwpController

hwp = HwpController()
hwp.connect(visible=False, register_security_module=False)

# 표준근로계약서 열기
hwp.open_document("C:/Users/user/wiki-site/public/files/forms/표준근로계약서.hwp")

# 텍스트 추출
text = hwp.get_text()
print(text[:2000] if text else "텍스트 추출 실패")

hwp.disconnect()
