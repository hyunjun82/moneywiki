"use client";
import { FAQ, Checklist, GreenBox, Steps, DocTable, EligibilityChecker, References, Disclaimer } from "@/components/article-ui";
import H2 from "@/components/article-ui/H2";
export default function Page() {
  return (
    <div style={{maxWidth:"720px",margin:"0 auto",padding:"0 16px 40px"}}>
      <h1 style={{fontSize:"clamp(20px,4vw,26px)",fontWeight:800,lineHeight:1.35,marginBottom:"16px"}}>
        <span style={{color:"#1D9E75"}}>장애수당 신청 자격과 월 지급액</span>
      </h1>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인으로 등록되어 있어도 장애수당은 따로 신청해야 받을 수 있죠. 기초생활수급자나 차상위 계층에 해당하는 장애인에게 매월 일정 금액을 지급하는 제도예요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인연금(중증장애인 대상)과는 별개 제도예요. 경증 장애인도 소득 요건을 갖추면 받을 수 있죠. 이미 장애인연금을 받고 있다면 장애수당은 중복 수급이 안 되죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>신청하지 않으면 한 푼도 받지 못해요. 소급 지급도 되지 않으니까 자격이 된다면 빨리 신청하는 게 유리해요. 주민센터에 전화 한 통이면 본인이 해당되는지 빠르게 확인할 수 있죠.</p>
        <a href="https://www.bokjiro.go.kr" style={{display:"block",background:"linear-gradient(135deg,#1D9E75,#0D8B66)",color:"#fff",textAlign:"center" as const,padding:"16px 24px",borderRadius:"12px",fontWeight:700,fontSize:"16px",margin:"24px 0",textDecoration:"none",boxShadow:"0 4px 12px rgba(29,158,117,0.3)"}}>
      복지로에서 신청하기 →
    </a>

      <H2>신청 자격, 두 가지를 동시에 갖춰야 해요</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애수당은 장애 등록 여부와 소득 요건을 동시에 충족해야 받을 수 있죠. 장애인복지법에 따라 등록된 장애인이어야 하고, 기초생활수급자 또는 차상위 계층이어야 해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>만 18세 이상 성인 장애인이 대상이에요. 만 18세 미만 장애아동은 장애아동수당을 신청해야 해요. 나이에 따라 신청하는 제도가 다르니까 먼저 연령을 확인해봐요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>소득인정액 기준은 기준 중위소득 50% 이하(수급자) 또는 차상위 계층(중위소득 50~100%)이에요. 소득인정액에는 근로소득뿐 아니라 재산 환산액도 포함돼요. 정확한 기준은 주민센터에서 산정받는 게 가장 정확해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>중증 장애인(장애 정도가 심한)은 장애수당 대신 장애인연금 대상이에요. 2019년 장애 등급제 폐지 이후 중증·경증 구분이 생겼으니 본인이 어느 쪽인지 먼저 파악해야 해요. 잘못 신청하면 반려될 수 있죠. 경증과 중증 구분이 2019년부터 바뀌어서 오래된 장애 등록증이라면 재확인이 필요해요. 아래 4가지 조건을 모두 충족하면 신청 자격을 갖춘 거예요. 하나라도 불확실하다면 주민센터에서 먼저 확인해봐요.</p>
      <EligibilityChecker
        title="장애수당 신청 자격 체크"
        items={[
          {id:"e1",label:"장애인복지법에 따라 장애인으로 등록되어 있죠"},
          {id:"e2",label:"만 18세 이상이에요"},
          {id:"e3",label:"기초생활수급자 또는 차상위 계층이에요"},
          {id:"e4",label:"장애 정도가 심하지 않은 장애인이에요"},
        ]}
      />

      <H2>장애수당 월 지급액</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>지급액은 수급 자격과 거주 형태에 따라 달라요. 기초생활수급자 재가(가정 거주)는 월 6만원, 시설 입소자는 월 3만원이에요. 차상위 계층은 거주 형태와 무관하게 월 3만원이죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>매월 정기적으로 신청자 명의 계좌로 입금돼요. 소액처럼 보여도 연간으로 보면 수급자 최대 72만원이에요. 신청하지 않으면 소급 지급이 안 되니까 빠르게 신청하는 게 유리해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>지자체마다 추가 수당을 지급하는 경우도 있죠. 서울시 일부 자치구에서는 자체 장애수당을 추가 지급하죠. 거주 지역 구청 복지과에 추가 혜택이 있는지 별도로 문의해봐요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>수당을 받다가 소득이 늘거나 재산이 증가하면 자격 요건에서 벗어날 수 있죠. 변동 사항이 생기면 주민센터에 신고 의무가 있죠. 신고하지 않으면 부정 수급으로 환수될 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>정확한 지급 금액은 주민센터에서 소득인정액을 산정받아야 확정돼요. 수급 유형(기초수급/차상위)에 따라 금액이 달라지니 신청 전에 본인 자격을 확인해봐요. 아래 표에서 본인 상황에 맞는 금액을 확인해봐요.</p>
      <DocTable
        headers={["대상","지급액","비고"]}
        rows={[
          ["기초수급자 재가","월 6만원","가정 거주 기준"],
          ["기초수급자 시설","월 3만원","시설 입소 기준"],
          ["차상위 계층","월 3만원","중위소득 50~100%"],
        ]}
      />

      <H2>신청 방법과 필요 서류</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>신청은 거주지 읍면동 주민센터 방문 또는 복지로(bokjiro.go.kr) 온라인으로 할 수 있죠. 주민센터 방문 시 복지 담당자가 신청서 작성을 도와줘요. 처음이라면 방문이 더 편할 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>신청 후 소득·재산 조사가 이루어지고 자격이 확인되면 다음 달부터 지급돼요. 심사 기간은 보통 30일 이내예요. 조사 결과에 이의가 있으면 이의 신청도 가능하죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>대리 신청도 가능해요. 보호자나 가족이 위임장과 신분증을 지참하면 주민센터에서 대신 신청할 수 있죠. 복지로 온라인 신청은 본인 인증이 필요해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>수당을 받다가 중증 장애 판정을 받으면 장애인연금으로 전환 신청을 따로 해야 해요. 자동으로 바뀌지 않으니 장애 정도 변경 시 담당자에게 꼭 전환 여부를 문의해야 해요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>아래 단계를 보면 전체 신청 흐름을 한눈에 파악할 수 있죠. 처음 신청하는 분도 담당자의 안내를 받으면 복잡하지 않죠. 신청 전 장애 정도와 소득 자격을 확인하는 게 제일 중요해요.</p>
      <Steps
        steps={[
          {title:"장애인 등록 여부 확인",desc:"복지로 또는 주민센터에서 장애인 등록 여부와 장애 정도를 확인해요."},
          {title:"소득·재산 자가 진단",desc:"복지로 모의계산 기능으로 수급 자격을 미리 계산해봐요."},
          {title:"신청서 제출",desc:"주민센터 방문 또는 복지로 온라인 신청을 해요. 신분증과 통장 사본을 지참해요."},
          {title:"소득·재산 조사",desc:"담당 공무원이 30일 이내에 소득과 재산을 조사해요."},
          {title:"수당 지급 시작",desc:"자격 확인 후 다음 달부터 매월 계좌로 입금돼요."},
        ]}
      />

      <H2>장애수당 vs 장애인연금, 무엇이 다른가요?</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애수당과 장애인연금은 둘 다 저소득 장애인을 위한 제도지만 대상과 금액이 달라요. 중증 장애인(장애 정도가 심한)은 장애인연금, 그 외 장애인은 장애수당 대상이에요. 두 제도를 동시에 받을 수는 없어요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애인연금은 월 최대 42만원까지 받을 수 있어서 장애수당(최대 6만원)보다 금액이 훨씬 커요. 중증 장애인이라면 장애인연금을 신청하는 게 훨씬 유리해요. 본인이 어느 쪽 대상인지 주민센터에서 확인해봐요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>2019년 장애 등급제 폐지로 기존 1~6급 등급 대신 장애 정도로 구분해요. 장애 정도가 심한 장애인이 연금 대상, 심하지 않은 장애인이 수당 대상이에요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"20px"}}>장애아동수당(18세 미만)도 별도로 있죠. 자녀가 장애인이라면 자녀 명의로 장애아동수당을 신청해야 해요. 부모 명의로 신청하면 반려될 수 있으니 꼭 확인해봐요. 나이와 장애 정도를 먼저 확인하면 어느 제도를 신청해야 하는지 바로 알 수 있죠.</p>
      <GreenBox>장애 정도 심함 → 장애인연금 신청 | 심하지 않음 → 장애수당 신청 | 18세 미만 → 장애아동수당 신청</GreenBox>
        <a href="https://www.bokjiro.go.kr" style={{display:"block",background:"linear-gradient(135deg,#1D9E75,#0D8B66)",color:"#fff",textAlign:"center" as const,padding:"16px 24px",borderRadius:"12px",fontWeight:700,fontSize:"16px",margin:"24px 0",textDecoration:"none",boxShadow:"0 4px 12px rgba(29,158,117,0.3)"}}>
      복지로에서 신청하기 →
    </a>

      <H2>자주 묻는 질문</H2>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>신청 과정에서 자주 나오는 질문들을 모았어요. 미리 읽으면 불필요한 왕복을 줄일 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애수당은 신청일 기준으로 지급이 시작돼요. 자격이 됐을 때 바로 신청하지 않으면 그만큼 수당을 못 받는 거예요. 소급 지급이 안 되니까 자격 여부를 빨리 확인해봐요.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>주민센터 방문이 어렵다면 복지로(bokjiro.go.kr) 온라인 신청을 이용할 수 있죠. 공인인증서 또는 간편 인증으로 본인 확인 후 신청서를 작성하면 돼요. 첨부 서류도 스캔해서 올리면 방문 없이 완료할 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>지급이 갑자기 중단됐다면 소득인정액이 기준을 초과한 경우가 많아요. 소득 변동이 생기면 주민센터에 먼저 문의해서 지급 유지 여부를 확인해봐요. 소득이 올라도 신고하면 감액 처리로 끝나지만 미신고 시 환수 처분을 받아요. 이의가 있으면 처분 통지일로부터 90일 이내에 이의 신청을 할 수 있죠. 담당 주민센터에 문의하면 이의 신청 양식을 받을 수 있죠. 처분 통지문을 꼭 보관해두면 이의 신청 시 활용할 수 있죠.</p>
      <p style={{fontSize:"15px",lineHeight:1.8,color:"#374151",marginBottom:"12px"}}>장애수당 수급 중에 취업해서 소득이 생겼다면 반드시 주민센터에 신고해야 해요. 신고하지 않으면 과지급분을 나중에 환수당할 수 있죠. 자진 신고하면 처벌을 피할 수 있지만 늦을수록 불이익이 커져요.</p>
      <FAQ
        items={[
          {q:"65세 이상 장애인도 장애수당을 받을 수 있나요?",a:"받을 수 있죠. 65세 이상 장애인은 장애수당과 기초연금을 동시에 받는 것도 가능해요. 단 장애인연금과 기초연금은 중복 수급에 일부 제한이 있죠."},
          {q:"소득이 늘어서 차상위 기준을 넘으면 어떻게 되나요?",a:"소득인정액이 기준을 초과하면 지급이 중단될 수 있죠. 소득 변동이 생기면 주민센터에 신고 의무가 있죠. 신고하지 않으면 부정 수급으로 환수돼요."},
          {q:"가족이 대신 신청해도 되나요?",a:"위임장과 신분증을 지참하면 가족이 대리 신청할 수 있죠. 복지로 온라인 신청은 본인 인증이 필요해서 직접 해야 해요."},
        ]}
      />
      <References
        items={[
          {label:"복지로 장애수당 신청",url:"https://www.bokjiro.go.kr"},
          {label:"보건복지부 장애수당 안내",url:"https://www.mohw.go.kr"},
        ]}
      />
      <Disclaimer />
    </div>
  );
}