export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { pathname } = new URL(req.url);
    // 주소 경로를 슬래시 단위로 파싱
    const segments = pathname.split('/').filter(Boolean);
    
    // api/status 뒤에 나오는 동적 스탯 배열들만 분리
    const data = segments.slice(2);

    // 슬래시 순서대로 정확하게 데이터 변수 할당 (기본값 방어막 구축)
    const name     = data[0] ? decodeURIComponent(data[0]) : '유저';
    const race     = data[1] ? decodeURIComponent(data[1]) : '인간';
    const level    = data[2] ? decodeURIComponent(data[2]) : '0';
    const familia  = data[3] ? decodeURIComponent(data[3]) : '소속_패밀리아_없음';
    const mind     = data[4] ? decodeURIComponent(data[4]) : '0_/_0';
    const stroke   = data[5] ? decodeURIComponent(data[5]) : '-_0';
    const end      = data[6] ? decodeURIComponent(data[6]) : '-_0';
    const dex      = data[7] ? decodeURIComponent(data[7]) : '-_0';
    const agi      = data[8] ? decodeURIComponent(data[8]) : '-_0';
    const mag      = data[9] ? decodeURIComponent(data[9]) : '-_0';
    const tStr     = data[10] ? decodeURIComponent(data[10]) : '0';
    const tEnd     = data[11] ? decodeURIComponent(data[11]) : '0';
    const tDex     = data[12] ? decodeURIComponent(data[12]) : '0';
    const tAgi     = data[13] ? decodeURIComponent(data[13]) : '0';
    
    // 마지막 인자인 스킬 정보에서 바베챗 이미지 로드용 우회 확장자(.png) 정리
    let rawSkill   = data[14] ? decodeURIComponent(data[14]) : '발현된_스킬_없음';
    if (rawSkill.endsWith('.png')) {
      rawSkill = rawSkill.substring(0, rawSkill.length - 4);
    }
    const skill = rawSkill;

    // 화면 출력을 위해 언더바(_) 기호를 부드러운 공백 문자로 복원
    const dFamilia = familia.replace(/_/g, ' ');
    const dName = name.replace(/_/g, ' ');
    const dRace = race.replace(/_/g, ' ');
    const dMind = mind.replace(/_/g, ' ');
    const dStr = stroke.replace(/_/g, ' ');
    const dEnd = end.replace(/_/g, ' ');
    const dDex = dex.replace(/_/g, ' ');
    const dAgi = agi.replace(/_/g, ' ');
    const dMag = mag.replace(/_/g, ' ');
    const dAbility = '획득한 어빌리티 없음';
    const dMagic = '발현된 마법 없음';
    const dSkill = skill.replace(/_/g, ', ');

    // 100% 브라우저 호환 표준 SVG 카드 그래픽 코드 연산
    const svgContent = `
    <svg xmlns="http://w3.org" viewBox="0 0 540 760" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5edd6"/>
          <stop offset="50%" stop-color="#eadaa6"/>
          <stop offset="100%" stop-color="#ceba7f"/>
        </linearGradient>
        <style>
          .txt { font-family: 'sans-serif', 'Pretendard', system-ui; fill: #7a6b53; }
          .bold { font-weight: bold; }
          .ac { fill: #8a6f27; }
          .dk { fill: #4a3611; }
        </style>
      </defs>
      
      <!-- 양지피 테두리 외형 감싸기 -->
      <rect x="10" y="10" width="520" height="740" rx="8" fill="url(#bgGrad)" stroke="#614a1a" stroke-width="4"/>
      
      <!-- 상단 정보 라인 -->
      <text x="40" y="60" font-size="14" class="txt bold dk" letter-spacing="2">&lt; ${dFamilia} &gt;</text>
      <text x="40" y="98" font-size="26" class="txt bold">${dName}</text>
      <text x="170" y="96" font-size="16" class="txt ac">[종족: ${dRace}]</text>
      
      <!-- 레벨 플레이트 고정 상자 -->
      <rect x="410" y="40" width="80" height="55" rx="4" fill="none" stroke="#8a6f27" stroke-width="2"/>
      <text x="450" y="56" font-size="10" text-anchor="middle" class="txt bold ac">LEVEL</text>
      <text x="450" y="86" font-size="24" text-anchor="middle" class="txt bold">${level}</text>
      
      <line x1="40" y1="120" x2="500" y2="120" stroke="#8a6f27" stroke-width="2"/>
      
      <!-- 마인드 수치 -->
      <text x="40" y="155" font-size="15" class="txt bold">정신력 (마인드)</text>
      <text x="500" y="155" font-size="16" text-anchor="end" class="txt bold">${dMind}</text>
      <line x1="40" y1="175" x2="500" y2="175" stroke="#8a6f27" stroke-dasharray="4 4" stroke-width="1"/>
      
      <!-- 스탯 표기 레이아웃 헤더 -->
      <text x="40" y="205" font-size="12" class="txt bold ac">기본 능력치</text>
      <text x="270" y="205" font-size="12" text-anchor="middle" class="txt bold ac">현재 랭크 / 수치</text>
      <text x="500" y="205" font-size="12" text-anchor="end" class="txt bold ac">통합 누적 수치</text>
      <line x1="40" y1="215" x2="500" y2="215" stroke="#8a6f27" stroke-width="2"/>
      
      <!-- 오중 능력 스탯 리스트 주입 -->
      <text x="40" y="250" font-size="16" class="txt bold">힘</text>
      <text x="270" y="250" font-size="16" text-anchor="middle" class="txt">${dStr}</text>
      <text x="500" y="250" font-size="16" text-anchor="end" class="txt bold">${tStr}</text>
      
      <text x="40" y="285" font-size="16" class="txt bold">내구</text>
      <text x="270" y="285" font-size="16" text-anchor="middle" class="txt">${dEnd}</text>
      <text x="500" y="285" font-size="16" text-anchor="end" class="txt bold">${tEnd}</text>
      
      <text x="40" y="320" font-size="16" class="txt bold">기교</text>
      <text x="270" y="320" font-size="16" text-anchor="middle" class="txt">${dDex}</text>
      <text x="500" y="320" font-size="16" text-anchor="end" class="txt bold">${tDex}</text>
      
      <text x="40" y="355" font-size="16" class="txt bold">민첩</text>
      <text x="270" y="355" font-size="16" text-anchor="middle" class="txt">${dAgi}</text>
      <text x="500" y="355" font-size="16" text-anchor="end" class="txt bold">${tAgi}</text>
      
      <text x="40" y="390" font-size="16" class="txt bold">마력</text>
      <text x="270" y="390" font-size="16" text-anchor="middle" class="txt">${dMag}</text>
      <text x="500" y="390" font-size="16" text-anchor="end" class="txt bold">0</text>
      
      <line x1="40" y1="415" x2="500" y2="415" stroke="#8a6f27" stroke-dasharray="4 4" stroke-width="1"/>
      
      <!-- 하단 어빌리티 및 스킬 패널 -->
      <text x="40" y="450" font-size="13" class="txt bold ac">■ 발전 어빌리티</text>
      <text x="40" y="475" font-size="14" class="txt dk">${dAbility}</text>
      
      <text x="40" y="530" font-size="13" class="txt bold ac">■ 마법</text>
      <text x="40" y="555" font-size="14" class="txt dk">${dMagic}</text>
      
      <text x="40" y="610" font-size="13" class="txt bold ac">■ 스킬</text>
      <text x="40" y="635" font-size="14" class="txt dk">${dSkill}</text>
    </svg>
    `;

    return new Response(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e) {
    return new Response('<svg xmlns="http://w3.org"><text y="20">Error</text></svg>', {
      status: 500,
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  }
}
