import os
import re
import glob

wiki_dir = r'/c/Users/user/wiki-site/content/wiki'

for filepath in glob.glob(os.path.join(wiki_dir, '연말정산*.md')):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 이미 ## 출처 섹션 있으면 스킵
    if '## 출처' in content:
        continue
    
    # sources frontmatter 파싱
    sources_match = re.search(r'^sources:\s*\n((?:  - .*\n)+)', content, re.MULTILINE)
    if not sources_match:
        continue
    
    sources_block = sources_match.group(1)
    
    # 각 source 파싱
    source_entries = []
    current_name = None
    current_url = None
    
    for line in sources_block.split('\n'):
        name_match = re.match(r"  - name: ['\"]?(.+?)['\"]?$", line)
        url_match = re.match(r"    url: ['\"]?(.+?)['\"]?$", line)
        
        if name_match:
            current_name = name_match.group(1)
        elif url_match:
            current_url = url_match.group(1)
            if current_name and current_url:
                source_entries.append(f'- [{current_name}]({current_url})')
                current_name = None
                current_url = None
    
    if source_entries:
        # 파일 끝에 출처 섹션 추가
        sources_section = '\n---\n\n## 출처\n\n' + '\n'.join(source_entries) + '\n'
        
        # 기존 관련 문서 섹션 뒤에 추가
        if '## 관련 문서' in content:
            # 관련 문서 섹션 뒤에 추가
            content = content.rstrip() + sources_section
        else:
            content = content.rstrip() + sources_section
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print('출처 섹션 추가 완료')
