"use client";
import { useState } from "react";
// Q1: 양육비를 받아야 하는 한부모 가정의 상황이에요
// Q2: 양육비 산정 기준을 알고 청구할 수 있어야 해요
// Q3: 산정기준표/소득구간/나이별금액 정보가 필요해요
// Q4: Calculator와 Steps로 전달이 최적이에요
function H2({children}){return <h2>{children}</h2>}
function References(){return <div>law.go.kr</div>}
export default function P(){return <div><p style={{fontSize:14,color:"#374151",lineHeight:2.1}}>양육비가 걱정되죠</p><a href="/w/child-support">관련글</a><H2>기준이에요</H2><H2>계산해요</H2><H2>청구해요</H2><H2>서류에요</H2></div>}
