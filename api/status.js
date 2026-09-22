export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { pathname } = new URL(req.url);
    const segments = pathname.split('/').filter(Boolean);
    
    // api/status 이후의 인자 배열 추출
    const data = segments.slice(2);

    // 슬래시 위치 순서에 따른 변수 할당 및 안전 매핑
    const name     = data[0] ? decodeURIComponent(data[0]) : '유저';
    const race     = data[1] ? decodeURIComponent(data[1]) : '인간';
    const level    = data[2] ? decodeURIComponent(data[2]) : '0';
    const familia  = data[3] ? decodeURIComponent(data[3]) : '소속_패밀리아_없음';
    const mind     = data[4] ? decodeURIComponent(data[4]) : '0_/_0';
    const str      = data[5] ? decodeURIComponent(data[5]) : '-_0';
    const end      = data[6] ? decodeURIComponent(data[6]) : '-_0';
    const dex      = data[7] ? decodeURIComponent(data[7]) : '-_0';
    const agi      = data[8] ? decodeURIComponent(data[8]) : '-_0';
    const mag      = data[9] ? decodeURIComponent(data[9]) : '-_0';
    const tStr     = data[10] ? decodeURIComponent(data[10]) : '0';
    const tEnd     = data[11] ? decodeURIComponent(data[11]) : '0';
    const tDex     = data[12] ? decodeURIComponent(data[12]) : '0';
    const tAgi     = data[13] ? decodeURIComponent(data[13]) : '0';
    const tMag     = data[14] ? decodeURIComponent(data[14]) : '0';
    const ability  = data[15] ? decodeURIComponent(data[15]) : '획득한_어빌리티_없음';
    const magic    = data[16] ? decodeURIComponent(data[16]) : '발현된_마법_없음';
    
    let rawSkill   = data[17] ? decodeURIComponent(data[17]) : '발현된_스킬_없음';
    if (rawSkill.endsWith('.png')) {
      rawSkill = rawSkill.replace('.png', '');
    }
    const skill = rawSkill;

    // 언더바(_) 기호를 자연스러운 띄어쓰기 및 문장 부호로 파싱 복원
    const dFamilia = familia.replace(/_/g, ' ');
    const dName = name.replace(/_/g, ' ');
    const dRace = race.replace(/_/g, ' ');
    const dMind = mind.replace(/_/g, ' ');
    const dStr = str.replace(/_/g, ' ');
    const dEnd = end.replace(/_/g, ' ');
    const dDex = dex.replace(/_/g, ' ');
    const dAgi = agi.replace(/_/g, ' ');
    const dMag = mag.replace(/_/g, ' ');
    const dAbility = ability.replace(/_/g, ', ');
    const dMagic = magic.replace(/_/g, ', ');
    const dSkill = skill.replace(/_/g, ', ');

    // 바베챗 전용 표준 순수 렌더링 SVG 문자열 조립
    const svgContent = `
    <svg xmlns="http://w3.org" viewBox="0 0 540 760" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5edd6"/>
          <stop offset="50%" stop-color="#eadaa6"/>
          <stop offset="100%" stop-color="#ceba7f"/>
        </linearGradient>
        <style>
          .text-main { font-family: 'sans-serif', 'Pretendard', system-ui; fill: #7a6b53; }
          .text-bold { font-weight: bold; }
          .text-accent { fill: #8a6f27; }
          .text-dark { fill: #4a3611; }
        </style>
      </defs>
      
      <!-- 테두리 배경 상자 -->
      <rect x="10" y="10" width="520" height="740" rx="8" fill="url(#bgGrad)" stroke="#614a1a" stroke-width="4"/>
      
      <!-- 상단 프로필 -->
      <text x="40" y="60" font-size="14" class="text-main text-bold text-dark" letter-spacing="2">&lt; ${dFamilia} &gt;</text>
      <text x="40" y="98" font-size="26" class="text-main text-bold">${dName}</text>
      <text x="170" y="96" font-size="16" class="text-main text-accent">[종족: ${dRace}]</text>
      
      <!-- 레벨 딱지 상자 -->
      <rect x="410" y="40" width="80" height="55" rx="4" fill="none" stroke="#8a6f27" stroke-width="2"/>
      <text x="450" y="56" font-size="10" text-anchor="middle" class="text-main text-bold text-accent">LEVE L</text>
      <text x="450" y="86" font-size="24" text-anchor="middle" class="text-main text-bold">${level}</text>
      
      <line x1="40" y1="120" x2="500" y2="120" stroke="#8a6f27" stroke-width="2"/>
      
      <!-- 정신력 마인드 -->
      <text x="40" y="155" font-size="15" class="text-main text-bold">정신력 (마인드)</text>
      <text x="500" y="155" font-size="16" text-anchor="end" class="text-main text-bold">${dMind}</text>
      <line x1="40" y1="175" x2="500" y2="175" stroke="#8a6f27" stroke-dasharray="4 4" stroke-width="1"/>
      
      <!-- 능력치 테이블 헤더 -->
      <text x="40" y="205" font-size="12" class="text-main text-bold text-accent">기본 능력치</text>
      <text x="270" y="205" font-size="12" text-anchor="middle" class="text-main text-bold text-accent">현재 랭크 / 수치</text>
      <text x="500" y="205" font-size="12" text-anchor="end" class="text-main text-bold text-accent">통합 누적 수치</text>
      <line x1="40" y1="215" x2="500" y2="215" stroke="#8a6f27" stroke-width="2"/>
      
      <!-- 힘 스탯 리스트 조립 -->
      <text x="40" y="250" font-size="16" class="text-main text-bold">힘</text>
      <text x="270" y="250" font-size="16" text-anchor="middle" class="text-main">${dStr}</text>
      <text x="500" y="250" font-size="16" text-anchor="end" class="text-main text-bold">${tStr}</text>
      
      <text x="40" y="285" font-size="16" class="text-main text-bold">내구</text>
      <text x="270" y="285" font-size="16" text-anchor="middle" class="text-main">${dEnd}</text>
      <text x="500" y="285" font-size="16" text-anchor="end" class="text-main text-bold">${tEnd}</text>
      
      <text x="40" y="320" font-size="16" class="text-main text-bold">기교</text>
      <text x="270" y="320" font-size="16" text-anchor="middle" class="text-main">${dDex}</text>
      <text x="500" y="320" font-size="16" text-anchor="end" class="text-main text-bold">${tDex}</text>
      
      <text x="40" y="355" font-size="16" class="text-main text-bold">민첩</text>
      <text x="270" y="355" font-size="16" text-anchor="middle" class="text-main">${dAgi}</text>
      <text x="500" y="355" font-size="16" text-anchor="end" class="text-main text-bold">${tAgi}</text>
      
      <text x="40" y="390" font-size="16" class="text-main text-bold">마력</text>
      <text x="270" y="390" font-size="16" text-anchor="middle" class="text-main">${dMag}</text>
      <text x="500" y="390" font-size="16" text-anchor="end" class="text-main text-bold">${tMag}</text>
      
      <line x1="40" y1="415" x2="500" y2="415" stroke="#8a6f27" stroke-dasharray="4 4" stroke-width="1"/>
      
      <!-- 발전 어빌리티/마법/스킬 특수 컨텐츠 목록 -->
      <text x="40" y="450" font-size="13" class="text-main text-bold text-accent">■ 발전 어빌리티</text>
      <text x="40" y="475" font-size="14" class="text-main text-dark">${dAbility}</text>
      
      <text x="40" y="530" font-size="13" class="text-main text-bold text-accent">■ 마법</text>
      <text x="40" y="555" font-size="14" class="text-main text-dark">${dMagic}</text>
      
      <text x="40" y="610" font-size="13" class="text-main text-bold text-accent">■ 스킬</text>
      <text x="40" y="635" font-size="14" class="text-main text-dark">${dSkill}</text>
    </svg>
    `;

    // 이미지 파일 컨텐츠 타입을 svg+xml로 세팅하여 정적 리턴 처리
    return new Response(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e) {
    return new Response('<svg xmlns="http://w3.org"><text y="20">Error rendering status card</text></svg>', {
      status: 500,
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  }
}
