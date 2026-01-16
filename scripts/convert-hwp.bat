@echo off
chcp 65001 > nul
echo.
echo ============================================
echo   HWP → PDF/DOCX 자동 변환
echo ============================================
echo.

REM Python 경로 설정
set PYTHON_PATH=C:\Users\user\AppData\Local\Programs\Python\Python313\python.exe

REM 스크립트 경로
set SCRIPT_PATH=%~dp0convert-hwp-win32com.py

REM 파이썬 확인
if not exist "%PYTHON_PATH%" (
    echo [오류] Python이 설치되지 않았습니다.
    echo        경로: %PYTHON_PATH%
    pause
    exit /b 1
)

REM pywin32 확인 및 설치
echo [1/3] pywin32 패키지 확인 중...
"%PYTHON_PATH%" -c "import win32com" 2>nul
if errorlevel 1 (
    echo       pywin32 설치 중...
    "%PYTHON_PATH%" -m pip install pywin32
)
echo       완료!
echo.

REM 보안 모듈 등록 확인
echo [2/3] 보안 모듈 확인 중...
reg query "HKCU\SOFTWARE\HNC\HwpAutomation\Modules" /v HwpConvertScript >nul 2>&1
if errorlevel 1 (
    echo       보안 모듈 등록 중...
    "%PYTHON_PATH%" "%SCRIPT_PATH%" --register
)
echo       완료!
echo.

REM 변환 실행
echo [3/3] HWP 파일 변환 시작...
echo.
"%PYTHON_PATH%" "%SCRIPT_PATH%"

echo.
echo ============================================
echo   변환이 완료되었습니다!
echo   결과 확인: public\files\forms\
echo ============================================
echo.
pause
