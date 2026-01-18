#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Playwright 브라우저 자동화로 양식 다운로드

방식:
1. 네이버에서 "양식명 양식 hwp site:gov.kr" 검색
2. 검색 결과 페이지 방문
3. HWP/PDF 다운로드 링크 클릭
4. 파일 저장

사용법:
    python download-forms-playwright.py 각서
    python download-forms-playwright.py --all
    python download-forms-playwright.py --batch 10
"""

import os
import sys
import json
import time
import re
import argparse
import asyncio
from pathlib import Path
from urllib.parse import quote, unquote, urlparse

from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout

# ============================================================
# 설정
# ============================================================
PROJECT_ROOT = Path(__file__).parent.parent
FORMS_DIR = PROJECT_ROOT / "public" / "files" / "forms"
DATA_DIR = PROJECT_ROOT / "data" / "forms"

# 신뢰할 수 있는 정부기관 도메인
TRUSTED_DOMAINS = [
    'gov.kr', 'go.kr',
    'nts.go.kr', 'hometax.go.kr',
    'moel.go.kr', 'law.go.kr', 'scourt.go.kr',
    'gangnam.go.kr', 'seoul.go.kr',
    'sejong.go.kr', 'busan.go.kr',
    'incheon.go.kr', 'daegu.go.kr',
]


# ============================================================
# 직접 사이트 검색 (강남구청 민원서식)
# ============================================================
async def search_gangnam_direct(form_name, page):
    """강남구청 민원서식에서 직접 검색"""
    print(f"  🔍 강남구청 직접 검색...")

    try:
        url = f"https://www.gangnam.go.kr/board/B_000060/list.do?searchKeyword={quote(form_name)}"
        await page.goto(url, timeout=30000)
        await page.wait_for_load_state('networkidle', timeout=10000)

        # 검색 결과에서 양식 링크 찾기
        links = await page.query_selector_all('a[href*="view.do"]')

        for link in links:
            text = await link.inner_text() or ''
            if form_name in text:
                href = await link.get_attribute('href')
                if href:
                    # 상세 페이지로 이동
                    detail_url = f"https://www.gangnam.go.kr{href}" if href.startswith('/') else href
                    await page.goto(detail_url, timeout=30000)
                    await page.wait_for_load_state('networkidle', timeout=10000)

                    # 다운로드 링크 찾기
                    dl_links = await page.query_selector_all('a[href*="download.do"], a[href*=".hwp"]')

                    for dl in dl_links:
                        dl_text = await dl.inner_text() or ''
                        if '.hwp' in dl_text.lower() or '다운로드' in dl_text or form_name in dl_text:
                            return dl

        return None

    except Exception as e:
        print(f"    ⚠️ 강남구청 검색 실패: {e}")
        return None


# ============================================================
# 네이버 검색
# ============================================================
async def search_naver(form_name, page):
    """네이버에서 정부 사이트 양식 검색"""
    print(f"  🔍 네이버 검색...")

    try:
        query = f"{form_name} 양식 hwp 다운로드 site:gov.kr"
        url = f"https://search.naver.com/search.naver?query={quote(query)}"

        await page.goto(url, timeout=30000)
        await page.wait_for_load_state('networkidle', timeout=10000)

        # 정부 사이트 링크 찾기
        all_links = await page.query_selector_all('a[href]')

        gov_links = []
        for link in all_links:
            href = await link.get_attribute('href') or ''
            if any(domain in href for domain in TRUSTED_DOMAINS):
                if href.startswith('http') and 'naver.com' not in href:
                    gov_links.append(href)

        return list(dict.fromkeys(gov_links))[:5]

    except Exception as e:
        print(f"    ⚠️ 네이버 검색 실패: {e}")
        return []


# ============================================================
# 페이지에서 다운로드 시도
# ============================================================
async def try_download_from_page(form_name, page, url):
    """페이지에서 다운로드 링크 찾아서 다운로드"""
    try:
        print(f"    🌐 방문: {url[:50]}...")
        await page.goto(url, timeout=30000)
        await page.wait_for_load_state('networkidle', timeout=10000)

        # 다운로드 링크 후보 찾기
        dl_selectors = [
            f'a:has-text("{form_name}")',
            'a[href*=".hwp"]',
            'a[href*="download"]',
            'a[href*="fileDown"]',
            'a:has-text("다운로드")',
            'a:has-text("양식")',
            'a:has-text("hwp")',
        ]

        for selector in dl_selectors:
            try:
                links = await page.query_selector_all(selector)
                for link in links:
                    href = await link.get_attribute('href') or ''
                    text = await link.inner_text() or ''

                    # 관련성 체크
                    is_relevant = (
                        form_name in text or
                        '.hwp' in href.lower() or
                        '.hwp' in text.lower() or
                        ('download' in href.lower() and ('양식' in text or '서식' in text))
                    )

                    if is_relevant:
                        print(f"    ⬇️ 다운로드 시도: {text[:30]}...")

                        try:
                            async with page.expect_download(timeout=30000) as download_info:
                                await link.click()

                            download = await download_info.value

                            # 확장자 결정
                            suggested_name = download.suggested_filename
                            ext = 'hwp'
                            if '.pdf' in suggested_name.lower():
                                ext = 'pdf'
                            elif '.doc' in suggested_name.lower():
                                ext = 'docx'

                            save_path = FORMS_DIR / f"{form_name}.{ext}"
                            await download.save_as(str(save_path))

                            # 검증
                            if save_path.exists() and save_path.stat().st_size > 1000:
                                # HWP 파일 시그니처 체크
                                with open(save_path, 'rb') as f:
                                    header = f.read(8)

                                if ext == 'hwp' and not header.startswith(b'\xd0\xcf\x11\xe0'):
                                    print(f"    ⚠️ 유효한 HWP 아님")
                                    save_path.unlink()
                                    continue

                                print(f"    ✅ 다운로드 완료: {save_path.name} ({save_path.stat().st_size:,} bytes)")
                                return ext

                        except PlaywrightTimeout:
                            pass
                        except Exception as e:
                            pass

            except Exception:
                pass

        return None

    except Exception as e:
        print(f"    ⚠️ 페이지 방문 실패: {e}")
        return None


# ============================================================
# 메인 다운로드 로직
# ============================================================
async def download_form(form_name, browser):
    """양식 다운로드"""
    print(f"\n{'='*60}")
    print(f"📋 {form_name}")
    print('='*60)

    # 이미 다운로드됐는지 확인
    for ext in ['hwp', 'pdf', 'docx']:
        existing = FORMS_DIR / f"{form_name}.{ext}"
        if existing.exists() and existing.stat().st_size > 1000:
            print(f"  ✅ 이미 존재: {form_name}.{ext}")
            return True

    context = await browser.new_context(
        accept_downloads=True,
        user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    )
    page = await context.new_page()

    try:
        # 1. 강남구청 직접 검색
        dl_link = await search_gangnam_direct(form_name, page)
        if dl_link:
            try:
                async with page.expect_download(timeout=30000) as download_info:
                    await dl_link.click()

                download = await download_info.value
                save_path = FORMS_DIR / f"{form_name}.hwp"
                await download.save_as(str(save_path))

                if save_path.exists() and save_path.stat().st_size > 1000:
                    print(f"    ✅ 강남구청에서 다운로드: {save_path.name}")
                    update_json(form_name, 'hwp')
                    await context.close()
                    return True

            except:
                pass

        # 2. 네이버 검색 → 정부 사이트 방문
        gov_links = await search_naver(form_name, page)

        if gov_links:
            print(f"  📄 {len(gov_links)}개 정부 사이트 발견")

            for url in gov_links:
                ext = await try_download_from_page(form_name, page, url)
                if ext:
                    update_json(form_name, ext)
                    await context.close()
                    return True

        print(f"  ❌ 다운로드 실패")
        await context.close()
        return False

    except Exception as e:
        print(f"  ❌ 오류: {e}")
        await context.close()
        return False


# ============================================================
# JSON 업데이트
# ============================================================
def update_json(form_name, ext):
    """양식 JSON 파일 업데이트"""
    json_path = DATA_DIR / f"{form_name}.json"

    if not json_path.exists():
        return

    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if 'downloads' not in data or not data['downloads']:
            data['downloads'] = {}
        if 'downloadNames' not in data or not data['downloadNames']:
            data['downloadNames'] = {}

        data['downloads'][ext] = f"/files/forms/{form_name}.{ext}"
        data['downloadNames'][ext] = f"{form_name}.{ext}"

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"    📝 JSON 업데이트 완료")

    except Exception as e:
        print(f"    ❌ JSON 업데이트 실패: {e}")


# ============================================================
# 메인
# ============================================================
def get_missing_forms():
    """다운로드 파일이 없는 양식"""
    missing = []
    for json_file in DATA_DIR.glob('*.json'):
        form_name = json_file.stem
        has_file = any((FORMS_DIR / f"{form_name}.{ext}").exists()
                       for ext in ['hwp', 'pdf', 'docx'])
        if not has_file:
            missing.append(form_name)
    return sorted(missing)


async def main_async(args):
    FORMS_DIR.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=['--no-sandbox', '--disable-setuid-sandbox']
        )

        try:
            if args.form_name:
                await download_form(args.form_name, browser)

            elif args.all or args.batch:
                missing = get_missing_forms()
                limit = args.batch if args.batch else len(missing)

                print(f"\n🚀 다운로드 시작: {min(limit, len(missing))}개")

                success = 0
                fail = 0

                for form in missing[:limit]:
                    if await download_form(form, browser):
                        success += 1
                    else:
                        fail += 1

                    await asyncio.sleep(2)

                print(f"\n{'='*60}")
                print(f"📊 결과: 성공 {success}개, 실패 {fail}개")

            elif args.list:
                missing = get_missing_forms()
                downloaded = list(FORMS_DIR.glob('*.hwp')) + list(FORMS_DIR.glob('*.pdf'))
                print(f"\n📊 현황: 다운로드 {len(downloaded)}개 / 미다운로드 {len(missing)}개")
                print(f"\n미다운로드 목록 (상위 20개):")
                for f in missing[:20]:
                    print(f"  ⬜ {f}")

        finally:
            await browser.close()


def main():
    parser = argparse.ArgumentParser(description='Playwright 양식 다운로더')
    parser.add_argument('form_name', nargs='?', help='양식명')
    parser.add_argument('--all', '-a', action='store_true', help='전체 다운로드')
    parser.add_argument('--batch', '-b', type=int, help='N개만 다운로드')
    parser.add_argument('--list', '-l', action='store_true', help='목록 확인')

    args = parser.parse_args()

    if not any([args.form_name, args.all, args.batch, args.list]):
        print("\n사용법:")
        print("  python download-forms-playwright.py 각서           # 특정 양식")
        print("  python download-forms-playwright.py --batch 10    # 10개 다운로드")
        print("  python download-forms-playwright.py --all         # 전체 다운로드")
        print("  python download-forms-playwright.py --list        # 목록 확인")
        return

    asyncio.run(main_async(args))


if __name__ == "__main__":
    main()
