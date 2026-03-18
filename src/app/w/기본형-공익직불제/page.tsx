"use client";
import { H2, FAQ, Checklist, GreenBox, Steps, DocTable, EligibilityChecker, References, Disclaimer } from "@/components/article-ui";

export default function Page() {
  return (
    <div style={{maxWidth:"720px",margin:"0 auto",padding:"0 16px 40px"}}>
      <h1 style={{fontSize:"clamp(20px,4vw,26px)",fontWeight:800,lineHeight:1.35,marginBottom:"16px"}}>
        <span style={{color:"#1D9E75"}}>기본형 공익직불제 신청 방법과 자격</span>
      </h1>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>논밭을 직접 경작하는 농업인이라면 매년 2~5월에 신청만 해도 면적에 따라 수십만~수백만 원을 받을 수 있죠. 기본형 공익직불제는 농업인이 환경 보전과 농촌 유지에 기여하는 대가로 정부가 지급하는 직불금이에요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>소득 기준과 상관없이 농업경영체 등록 요건만 갖추면 신청할 수 있죠. 직전 3년 중 1년 이상 농업에 종사한 기록만 있으면 되죠. 신청 창구는 거주지 읍면동 주민센터나 시군구 농업기술센터예요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>신청하지 않으면 자동으로 지급되지 않아요. 매년 신청 기간이 2~5월로 정해져 있어서 이 기간을 놓치면 다음 해를 기다려야 해요. 처음 받는 분도 절차는 동일하니까 망설이지 말고 주민센터에 문의해봐요.</p>
        <a href="https://www.gov.kr/portal/service/serviceInfo/SD0000052052" style={{display:"block",background:"linear-gradient(135deg,#1D9E75,#0D8B66)",color:"#fff",textAlign:"center" as const,padding:"16px 24px",borderRadius:"12px",fontWeight:700,fontSize:"16px",margin:"24px 0",textDecoration:"none",boxShadow:"0 4px 12px rgba(29,158,117,0.3)"}}>
      정부24에서 신청 방법 보기 →
    </a>

      <H2>신청 자격, 이 조건을 갖춰야 해요</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>기본형 공익직불금을 받으려면 국립농산물품질관리원에 농업경영체 등록이 되어 있어야 해요. 신청 면적이 본인 소유 또는 임차 중임을 증명할 수 있어야 하고, 직전 3년 중 1년 이상 농업에 종사한 이력도 필요하죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>면적 기준은 0.1ha 이상이에요. 소규모 농가도 모두 포함되니까 작은 밭이라도 등록해서 신청해봐요. 단, 농지법상 농지로 등록되지 않은 토지나 국공유지, 불법 전용 농지는 제외돼요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>임차 농지를 경작하는 경우에도 신청할 수 있죠. 이때는 임차 계약서를 제출해야 하고 임대인 동의가 필요한 경우도 있죠. 비공식 구두 계약이라면 서면 계약서를 미리 작성해두는 게 좋죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>자격 여부가 불확실하면 읍면동 주민센터에 문의하면 빠르게 안내받을 수 있죠. 담당자가 농업경영체 등록 정보를 직접 조회해줄 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>아래 항목을 하나씩 체크해봐요. 모두 해당된다면 바로 신청 가능한 상태예요. 하나라도 불확실하다면 주민센터에 전화해서 먼저 확인해봐요.</p>
      <EligibilityChecker
        items={[
          {id:"e1",label:"농업경영체에 등록되어 있죠"},
          {id:"e2",label:"신청 농지가 본인 소유 또는 임차 중이에요"},
          {id:"e3",label:"직전 3년 중 1년 이상 농업에 종사했어요"},
          {id:"e4",label:"신청 면적이 0.1ha 이상이에요"},
        ]}
      />

      <H2>지원 단가와 지급 금액</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>지원 단가는 농지 면적에 따라 달라요. 0.5ha 미만 소농은 연 120만원을 정액으로 받고, 0.5ha 이상이면 면적 기준 단가가 적용돼요. 논은 ha당 약 178만원, 밭은 약 136만원 수준이에요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>지급 상한은 농가당 최대 6ha까지예요. 6ha를 초과하는 농지는 직불금 계산에서 빠져요. 논 1ha를 경작하면 약 178만원, 논밭 합쳐 2ha면 약 314만원 수준이죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>정확한 단가는 신청 연도 고시 기준으로 결정돼요. 매년 단가가 조금씩 바뀔 수 있어서 신청 전에 농업기술센터나 주민센터에서 그 해 단가를 먼저 확인하는 게 좋아요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>임차 농지도 본인이 실경작하고 있다면 직불금을 받을 수 있죠. 임대인이 아닌 실경작자가 신청하는 구조예요. 임차 계약서를 반드시 지참해야 신청이 처리돼요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>소농 직불금은 0.5ha 미만 농가를 위한 특례예요. 실제 경작 면적과 무관하게 연 120만원을 정액으로 지급받아요. 0.5ha가 안 되더라도 0.1ha 이상이라면 소농 직불금 대상이에요.</p>
      <DocTable
        docs={[
          { name: "소농 직불금(0.5ha 미만)", required: true, where: "연 120만원 정액, 면적 무관" },
          { name: "논", required: true, where: "ha당 약 178만원, 임차 포함" },
          { name: "밭", required: true, where: "ha당 약 136만원, 과수원·채소밭 포함" },
          { name: "상한", required: true, where: "최대 6ha, 초과분 미지급" },
        ]}
      />

      <H2>신청 방법과 준비 서류</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>신청 기간은 매년 2월~5월이에요. 이 기간을 놓치면 다음 해에 다시 신청해야 해요. 신청 창구는 거주지 읍면동 주민센터이고, 농업경영체 변경 사항이 있으면 신청 전에 미리 업데이트해야 해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>방문 신청이 기본이지만 일부 지역에서는 온라인도 가능해요. 인터넷으로는 농업경영체 등록정보 포털(agrix.go.kr)에서 신청할 수 있죠. 처음 신청하는 분이라면 담당자가 도와주는 주민센터 방문이 더 빠르게 처리돼요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>이행 조건도 지켜야 해요. 농약 사용 기록, 농지 원형 유지, 마을 공동체 활동 참여 등의 준수 사항이 있죠. 이를 어기면 직불금 일부 또는 전액이 환수될 수 있죠. 매년 점검을 받는다고 생각하고 관리해야 해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>신청에 필요한 서류는 신분증, 농업경영체 등록 확인서, 임차 계약서(임차 시)예요. 서류 미비로 반려되는 경우가 많으니 사전에 체크리스트를 꼼꼼하게 확인해봐요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>아래 절차대로 진행하면 첫 신청도 복잡하지 않아요. 단계별로 확인하면서 빠뜨린 서류가 없는지 점검해봐요. 방문 전에 주민센터에 전화해서 필요 서류를 미리 확인하면 왕복을 줄일 수 있죠.</p>
      <Steps
        steps={[
          {title:"농업경영체 등록 확인",desc:"등록 정보가 현재 경작 농지와 일치하는지 확인해요. 미등록이면 신청 전에 등록이 필요해요."},
          {title:"주민센터 방문 또는 온라인",desc:"거주지 읍면동 주민센터를 방문하거나 agrix.go.kr에 접속해요. 신청 기간(2~5월)을 지켜야 해요."},
          {title:"서류 제출",desc:"신분증, 농지 목록, 임차 계약서를 지참해요. 담당자가 신청서 작성을 도와줘요."},
          {title:"이행 조건 준수",desc:"농약 기록부 작성, 농지 원형 유지 등 이행 조건을 지켜요. 위반 시 환수 처분을 받아요."},
          {title:"직불금 수령",desc:"심사 후 연말 또는 다음 해 초에 계좌로 지급돼요."},
        ]}
      />

      <H2>신청 시 자주 막히는 지점</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>가장 흔한 문제는 농업경영체 등록 정보가 실제 경작 농지와 다른 경우예요. 팔았거나 임차가 끝난 농지가 등록에 남아 있으면 신청 자체가 불가능해요. 신청 전에 등록 정보를 먼저 업데이트하는 게 필수예요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>임차 계약서가 없거나 구두 계약인 경우 서류 준비가 어려워요. 임대인과 미리 서면 계약서를 작성해두면 이런 문제를 예방할 수 있죠. 임차 기간이 신청 연도를 포함해야 한다는 점도 확인해봐요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>이행 조건 위반도 주의해야 해요. 직불금을 받고 나서 농지를 방치하거나 타 용도로 사용하면 전액 환수 처분을 받아요. 농지 전용이나 건물 신축 등은 환수 사유가 돼요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>부부 공동 소유 농지는 실제 경작자 중 1명이 신청해야 해요. 공동 명의라도 2명이 동시에 신청할 수 없어요. 누가 신청할지 미리 정해두고 그 사람 명의로만 진행해야 해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>농지 소재지와 신청자 주소지가 다른 경우에도 실경작 사실만 확인되면 신청 가능해요. 다만 확인 과정이 일반 신청보다 조금 더 걸릴 수 있죠. 이 경우에는 경작 사실 확인서를 별도로 제출하도록 요청받을 수 있죠.</p>
      <Checklist
        items={[
          "농업경영체 등록 정보가 현재 경작 농지와 일치하는지 확인",
          "임차 농지라면 서면 임차 계약서 준비",
          "신청 기간(2~5월) 내 접수",
          "이행 조건 내용 파악",
        ]}
      />
        <a href="https://www.gov.kr/portal/service/serviceInfo/SD0000052052" style={{display:"block",background:"linear-gradient(135deg,#1D9E75,#0D8B66)",color:"#fff",textAlign:"center" as const,padding:"16px 24px",borderRadius:"12px",fontWeight:700,fontSize:"16px",margin:"24px 0",textDecoration:"none",boxShadow:"0 4px 12px rgba(29,158,117,0.3)"}}>
      정부24에서 신청 방법 보기 →
    </a>

      <H2>자주 묻는 질문</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>공익직불제 신청 시 자주 나오는 질문들을 모았어요. 미리 읽으면 불필요한 왕복을 줄일 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>신청 기간 중에 담당자가 바쁘면 전화 연결이 힘들 수 있죠. 방문 전에 주민센터 민원 예약 시스템을 이용하면 대기 시간을 줄일 수 있죠. 오전 10시~11시 사이가 비교적 한산한 시간대이고, 담당자와 1:1로 차분하게 이야기할 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>직불금을 받기 시작하면 매년 이행 조건 준수 여부가 점검돼요. 점검에 탈락하면 해당 연도 직불금 일부를 반환해야 해요. 이행 조건 목록을 미리 주민센터에서 안내받아 놓는 게 좋죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>처음 신청 후 등록 농지가 바뀌거나 임차가 종료된 경우에는 변경 신고가 반드시 필요해요. 변경 없이 이전 정보로만 신청하면 심사에서 반려될 수 있죠. 변경 신고는 읍면동 주민센터에서 바로 처리할 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>노령으로 직접 신청이 어렵다면 농협 지역본부나 읍면동 주민센터 복지 담당자에게 도움을 요청할 수 있죠. 거동이 불편한 어르신을 위해 현장 방문 신청 서비스도 운영하고 있으니 전화 한 통이면 돼요.</p>
      <FAQ
        items={[
          {q:"농지가 0.05ha밖에 없는데 신청할 수 있나요?",a:"소농 직불금은 0.5ha 미만도 가능하지만 최소 0.1ha 이상이어야 해요. 0.05ha는 해당되지 않아요."},
          {q:"임차 중인데 임대인이 직접 신청하면 어떻게 되나요?",a:"실제 경작자가 신청 자격을 가져요. 임대인이 신청하려면 본인이 직접 경작하고 있어야 해요."},
          {q:"처음 신청하는 경우 절차가 다른가요?",a:"동일한 절차예요. 다만 신규 신청 시 담당자가 현장 확인을 나오는 경우가 있죠."},
        ]}
      />
      <References
        groups={[{ category: "출처", items: [
          {label:"농림축산식품부 공익직불제 안내",url:"https://www.mafra.go.kr"},
          {label:"정부24 기본형 공익직불금 신청",url:"https://www.gov.kr/portal/service/serviceInfo/SD0000052052"},
          {label:"국립농산물품질관리원 농업경영체 등록",url:"https://www.agrix.go.kr"},
        ]}]}
      />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}