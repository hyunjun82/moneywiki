"use client";
import { FAQ, GreenBox, Steps, DocTable, EligibilityChecker, References, Disclaimer } from "@/components/article-ui";
import H2 from "@/components/article-ui/H2";
export default function Page() {
  return (
    <div style={{maxWidth:"720px",margin:"0 auto",padding:"0 16px 40px"}}>
      <h1 style={{fontSize:"clamp(20px,4vw,26px)",fontWeight:800,lineHeight:1.35,marginBottom:"16px"}}>
        <span style={{color:"#1D9E75"}}>장애인연금 신청 자격과 월 최대 42만원</span>
      </h1>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인연금은 중증 장애인의 생활 안정을 위해 국가가 매월 직접 지급하는 급여예요. 기초급여와 부가급여 두 가지로 구성되어 있고, 소득과 나이에 따라 최대 월 42만원까지 받을 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애수당과는 달리 중증 장애인(장애 정도가 심한)만 대상이에요. 만 18세 이상이면 바로 신청할 수 있고, 국민연금 가입 여부와 무관하게 받는 제도예요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>신청하지 않으면 전혀 받을 수 없어요. 장애 판정을 받은 시점부터 빨리 신청할수록 유리해요. 소급 적용이 안 되거든요. 주민센터 복지 담당자에게 문의하면 본인 자격을 바로 확인받을 수 있죠.</p>
        <a href="https://www.bokjiro.go.kr" style={{display:"block",background:"linear-gradient(135deg,#1D9E75,#0D8B66)",color:"#fff",textAlign:"center" as const,padding:"16px 24px",borderRadius:"12px",fontWeight:700,fontSize:"16px",margin:"24px 0",textDecoration:"none",boxShadow:"0 4px 12px rgba(29,158,117,0.3)"}}>
      복지로에서 신청하기 →
    </a>

      <H2>신청 자격, 세 가지를 모두 충족해야 해요</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인연금 수급 자격은 세 가지 조건을 모두 만족해야 해요. 첫째, 장애인복지법에 따른 중증 장애인(장애 정도가 심한)이어야 해요. 둘째, 만 18세 이상이어야 해요. 셋째, 소득인정액이 선정 기준액 이하여야 해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>소득인정액 기준액은 매년 보건복지부에서 고시해요. 2024년 기준 단독 가구는 약 130만원 이하, 부부 가구는 약 208만원 이하예요. 소득인정액 계산 방법이 복잡해서 주민센터에서 실제 금액을 산정받는 게 정확하죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>만 65세 이상이 되면 기초연금으로 전환돼요. 자동 전환이 아니라 별도로 기초연금을 신청해야 해요. 기초연금과 장애인연금 중 유리한 것을 선택하거나 동시 지급이 되는 경우도 있으니 담당자에게 문의해봐요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>중증 장애인이지만 직계 가족의 재산이 많으면 소득인정액에 포함될 수 있죠. 가구원 소득과 재산도 함께 산정하기 때문에 혼자 살더라도 부양 의무자 기준이 영향을 줄 수 있죠. 아래 항목을 하나씩 확인하고 모두 해당되면 신청을 바로 진행해봐요.</p>
      <EligibilityChecker
        title="장애인연금 신청 자격 체크"
        items={[
          {id:"e1",label:"장애 정도가 심한 중증 장애인으로 등록되어 있죠"},
          {id:"e2",label:"만 18세 이상이에요"},
          {id:"e3",label:"소득인정액이 선정 기준액 이하예요"},
          {id:"e4",label:"만 65세 미만이에요 (65세 이상은 기초연금으로 전환)"},
        ]}
      />

      <H2>기초급여와 부가급여, 얼마나 받나요?</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인연금은 기초급여와 부가급여로 나뉘어요. 기초급여는 소득 보전 목적으로 지급하고, 부가급여는 추가 복지 비용을 지원해요. 두 급여를 합산한 금액이 매월 지급돼요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>기초급여는 2024년 기준 월 최대 약 34만원이에요. 소득이 선정 기준액에 가까울수록 기초급여가 줄어드는 방식이에요. 부가급여는 기초수급자, 차상위, 일반에 따라 월 2만원~8만원 수준이에요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>기초수급자이면서 재가 생활을 하는 경우 두 급여를 합해 월 최대 42만원까지 받을 수 있죠. 시설 입소자는 기초급여 지급이 제한될 수 있죠. 시설에서 기본 생활비를 지원받기 때문이에요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>금액은 매년 기준 중위소득 변동에 따라 조정돼요. 매년 1월에 기준이 바뀌니까 해마다 지급액이 달라질 수 있죠. 지급액 변동이 생기면 사전에 안내 문자를 받게 돼요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>연금 지급이 시작되면 매년 수급 자격 유지 여부를 확인해요. 소득이나 재산에 변동이 생기면 주민센터에 신고해야 하고 신고하지 않으면 과지급분을 환수당할 수 있죠. 아래 표에서 본인 수급 유형에 따른 연금 금액을 확인해봐요.</p>
      <DocTable
        headers={["구분","기초급여","부가급여","합계"]}
        rows={[
          ["기초수급자 재가","월 최대 ~34만원","월 최대 8만원","월 최대 42만원"],
          ["차상위 계층","월 최대 ~34만원","월 7만원","최대 41만원"],
          ["일반(기준 이하)","월 최대 ~34만원","월 2만원","최대 36만원"],
        ]}
      />

      <H2>신청 방법과 준비 서류</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>신청은 거주지 읍면동 주민센터 방문 또는 복지로(bokjiro.go.kr) 온라인으로 할 수 있죠. 주민센터 방문이 처음이라면 복지 담당자에게 서류 작성을 도와달라고 하면 돼요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>신청 후 소득과 재산 조사가 이루어지고 자격이 확인되면 다음 달부터 지급돼요. 심사 기간은 30일 이내예요. 조사 결과에 이의가 있으면 이의 신청도 가능하죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>거동이 불편한 경우 주민센터 담당자가 직접 방문해서 신청을 도와주는 서비스도 있죠. 전화로 먼저 방문 신청 서비스가 가능한지 문의해봐요. 이 서비스를 신청하면 담당자가 직접 가정을 방문해줘요. 주민센터 복지 담당 번호는 지역 주민센터에 전화하면 바로 연결돼요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>준비 서류는 신분증, 장애인 등록증, 금융 정보 제공 동의서, 통장 사본이에요. 임차 거주 중이라면 임대차 계약서도 필요할 수 있죠. 서류 목록을 미리 전화로 확인하면 왕복을 줄일 수 있죠.</p>
      <Steps
        steps={[
          {title:"장애 정도 확인",desc:"내 장애 정도가 심한지 확인해요. 장애인 등록증이나 주민센터에서 확인할 수 있죠."},
          {title:"소득인정액 모의계산",desc:"복지로 홈페이지의 복지 서비스 모의계산으로 대략적인 자격을 확인해봐요."},
          {title:"주민센터 또는 복지로 신청",desc:"거주지 읍면동 주민센터 방문 또는 복지로 온라인 신청을 해요."},
          {title:"소득·재산 조사",desc:"담당자가 30일 이내에 소득과 재산을 조사해요. 추가 서류를 요청받을 수 있죠."},
          {title:"연금 지급 시작",desc:"자격 확인 후 다음 달부터 계좌로 매월 입금돼요."},
        ]}
      />

      <H2>65세 이후에는 어떻게 되나요?</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>만 65세가 되면 장애인연금 기초급여 지급이 중단되고 기초연금으로 전환돼요. 이때 기초연금을 새로 신청해야 해요. 자동으로 연결되지 않아서 별도 신청이 필요하죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>부가급여는 65세 이후에도 계속 받을 수 있죠. 기초수급자인 경우 부가급여 금액이 유지되니까 65세 이후에도 일부 지원금은 계속 들어와요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>기초연금 금액이 장애인연금 기초급여보다 많을 수도 있죠. 담당자에게 65세 전환 시점에 어떤 선택이 더 유리한지 미리 상담받는 게 좋아요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>65세 전환 시점이 다가오면 주민센터에서 사전 안내를 받을 수 있죠. 전환 과정에서 지급 공백이 생기지 않도록 65세 생일 3개월 전쯤 미리 상담해봐요.</p>

      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>65세 도래 약 3개월 전에 안내 통지를 받게 돼요. 이 시점에 기초연금 신청 안내를 잘 챙겨봐요. 놓치면 지급 공백이 생길 수 있죠. 공백 없이 이어서 받으려면 생일 전 3개월 안에 신청을 완료해야 해요.</p>
      <GreenBox>만 65세 도달 시 기초연금 신청 필수 (자동 전환 안 됨). 부가급여는 계속 지급돼요.</GreenBox>
        <a href="https://www.bokjiro.go.kr" style={{display:"block",background:"linear-gradient(135deg,#1D9E75,#0D8B66)",color:"#fff",textAlign:"center" as const,padding:"16px 24px",borderRadius:"12px",fontWeight:700,fontSize:"16px",margin:"24px 0",textDecoration:"none",boxShadow:"0 4px 12px rgba(29,158,117,0.3)"}}>
      복지로에서 신청하기 →
    </a>

      <H2>자주 묻는 질문</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인연금 신청 시 자주 나오는 질문들을 모았어요. 미리 읽으면 불필요한 왕복을 줄일 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인연금을 받다가 소득이 늘거나 재산이 증가하면 지급이 줄거나 중단될 수 있죠. 이를 막으려면 소득 변동이 생길 때마다 주민센터에 신고해야 해요. 미신고 시 부정 수급으로 환수 처분을 받을 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>직계 가족이 장애인연금을 대신 신청해줄 수 있죠. 위임장, 가족관계증명서, 대리인 신분증을 지참하면 주민센터에서 대리 신청이 가능해요. 복지로 온라인 신청은 본인 인증이 필요하니 직접 해야 해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>연금 지급액이 갑자기 줄었다면 소득인정액이 증가해 기초급여가 감액된 경우가 많아요. 담당자에게 현재 소득인정액과 감액 이유를 확인해봐요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인연금은 신청일 기준으로 지급이 시작되는 제도예요. 자격이 생겼다면 망설이지 말고 바로 신청해봐요. 신청을 미루면 그 기간만큼 연금을 받지 못하는 금전적 손해가 발생하죠. 자격이 생긴 시점에 바로 신청하지 않으면 그만큼 못 받아요. 소급이 안 되기 때문에 빠를수록 유리하죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애 정도가 심하지 않다고 판정됐지만 본인이 심하다고 생각된다면 장애 정도 재심사를 신청할 수 있죠. 재심사 결과 중증으로 변경되면 장애인연금으로 전환 신청이 가능해요. 주민센터 복지 담당자에게 재심사 절차를 문의해봐요.</p>
      <FAQ
        items={[
          {q:"국민연금을 내고 있어도 장애인연금을 받을 수 있나요?",a:"국민연금 가입 여부와 별개로 장애인연금을 신청할 수 있죠. 단, 국민연금 장애연금과 장애인연금을 동시에 받는 경우 금액 조정이 될 수 있죠."},
          {q:"배우자 소득이 있으면 자격이 안 되나요?",a:"배우자 소득도 소득인정액에 포함돼요. 부부 합산 소득이 기준액을 초과하면 자격이 안 될 수 있죠. 정확한 금액은 주민센터에서 산정받아봐요."},
          {q:"시설에 입소해 있어도 신청할 수 있나요?",a:"신청은 가능하지만 시설 입소자는 기초급여 지급이 제한될 수 있죠. 시설에서 기본 생활을 지원받기 때문에 일부 급여가 차감돼요."},
        ]}
      />
      <References
        items={[
          {label:"복지로 장애인연금 신청",url:"https://www.bokjiro.go.kr"},
          {label:"보건복지부 장애인연금 안내",url:"https://www.mohw.go.kr"},
        ]}
      />
      <Disclaimer />
    </div>
  );
}