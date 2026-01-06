#!/bin/bash
# 출처 섹션 추가 스크립트

for file in /c/Users/user/wiki-site/content/wiki/연말정산*.md; do
  # 이미 ## 출처 섹션 있으면 스킵
  if grep -q "^## 출처" "$file"; then
    continue
  fi
  
  # sources frontmatter에서 URL과 name 추출
  sources=$(awk '/^sources:/{found=1} found && /^  - name:/{name=$0} found && /url:/{url=$0; gsub(/.*url: /,"",url); gsub(/'\''|"/,"",url); gsub(/  - name: /,"",name); gsub(/'\''|"/,"",name); if(name && url) print "- ["name"]("url")"; name=""} /^[a-z]/ && !/^  /{if(found) exit}' "$file")
  
  if [ -n "$sources" ]; then
    # 파일 끝에 출처 섹션 추가
    echo "" >> "$file"
    echo "---" >> "$file"
    echo "" >> "$file"
    echo "## 출처" >> "$file"
    echo "" >> "$file"
    echo "$sources" >> "$file"
  fi
done
echo "출처 섹션 추가 완료"
