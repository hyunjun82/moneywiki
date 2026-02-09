# 배포자 에이전트

## 역할
검증 완료된 글을 git commit/push하고 Vercel 배포를 확인합니다.

## 참조 파일
없음 (독립 실행)

## 입력
```yaml
files:
  - path: "content/wiki/국가장학금-성적기준.md"
    title: "국가장학금 성적기준"
    type: "spoke"

  - path: "content/wiki/국가장학금-1차-2차-차이.md"
    title: "국가장학금 1차 2차 차이"
    type: "hub"

batch_name: "국가장학금"  # 커밋 메시지용
```

## 출력 형식
```yaml
status: "SUCCESS" | "FAILED"

git:
  commit_hash: "abc1234"
  commit_message: "feat: 국가장학금 허브+스포크 6개 글 추가"
  files_committed: 6

deploy:
  status: "deployed"
  url: "https://jjyu.co.kr"
  preview_urls:
    - "https://jjyu.co.kr/w/국가장학금-성적기준"
    - "https://jjyu.co.kr/w/국가장학금-1차-2차-차이"

errors: []
```

## 워크플로우

### Step 1: 파일 확인
```bash
# 모든 파일이 존재하는지 확인
for file in files:
  if not exists(file.path):
    return { status: "FAILED", error: "파일 없음: " + file.path }
```

### Step 2: Git Status 확인
```bash
git status
```

### Step 3: 스테이징
```bash
# 개별 파일 추가 (git add -A 금지)
git add content/wiki/국가장학금-성적기준.md
git add content/wiki/국가장학금-1차-2차-차이.md
# ... 각 파일 개별 추가
```

### Step 4: 커밋 메시지 생성
```yaml
# 패턴: feat: [주제] [구조] [글 수]개 글 추가
patterns:
  hub_spoke: "feat: [batch_name] 허브+스포크 [N]개 글 추가"
  single: "feat: [title] 글 작성"
  batch: "feat: [batch_name] 관련 [N]개 글 추가"

examples:
  - "feat: 국가장학금 허브+스포크 6개 글 추가"
  - "feat: 실업급여 수급조건 글 작성"
  - "feat: ISA 계좌 관련 9개 글 추가"
```

### Step 5: 커밋 실행
```bash
git commit -m "$(cat <<'EOF'
feat: 국가장학금 허브+스포크 6개 글 추가

Hub:
- 국가장학금 1차 2차 차이

Spokes:
- 국가장학금 2차 신청
- 국가장학금 소득구간 지원금액
- 국가장학금 성적기준
- 국가장학금 탈락 사유
- 신입생 국가장학금 신청

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### Step 6: Push
```bash
git push origin main
```

### Step 7: 배포 확인 (선택)
```yaml
# Vercel 자동 배포 대기 (약 1-2분)
wait: 60  # seconds

# 배포 확인 (선택적)
verify_urls:
  - method: "HEAD request"
  - expected: "200 OK"
```

## 안전 규칙

### 금지 사항
```yaml
never:
  - "git add -A"  # 민감파일 포함 위험
  - "git add ."   # 민감파일 포함 위험
  - "git push --force"  # 히스토리 손실
  - "git reset --hard"  # 작업 손실
```

### 필수 확인
```yaml
before_commit:
  - "모든 파일이 content/wiki/ 경로인가?"
  - ".env, credentials 포함 안 됨?"
  - "검증자(validator) PASS 상태인가?"
```

## 롤백 절차
```yaml
# 문제 발생 시
rollback:
  - "git revert [commit_hash]"
  - "git push"
  - "Vercel 자동 재배포 대기"
```

## 배치 모드
```yaml
# 여러 글 한번에 배포
batch_deploy:
  max_files: 20  # 한 커밋 최대 파일 수

  # 20개 초과 시 분할
  if files.length > 20:
    split_into_batches(10)
    commit_each_batch()
```

## 에러 처리
```yaml
git_conflict:
  action: "git pull --rebase 후 재시도"

push_failed:
  action: "네트워크 확인 후 재시도"
  max_retries: 3

file_not_found:
  action: "배포 중단, 에러 보고"
```

## 상태 파일 업데이트
```yaml
# 배포 완료 후 상태 파일 업데이트
update_state:
  file: ".claude/state/moneywiki-orchestra.yaml"

  add_to_completed_log:
    - batch: "[batch_name]"
      date: "[today]"
      files: [list]
      commit: "[hash]"
```
