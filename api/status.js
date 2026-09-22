export default async function handler(req, res) {
  // 1. 주소창 파라미터를 읽어오고 기본값 설정
  const {
    familia = '소속 패밀리아 없음',
    name = '유저',
    race = '인간',
    level = '0',
    mind = '0 / 0',
    str = '- 0',
    end = '- 0',
    dex = '- 0',
    agi = '- 0',
    mag = '- 0',
    tStr = '0',
    tEnd = '0',
    tDex = '0',
    tAgi = '0',
    tMag = '0',
    ability = '획득한 어빌리티 없음',
    magic = '발현된 마법 없음',
    skill = '발현된 스킬 없음'
  } = req.query;

  // 2. 특수문자 충돌을 방지하기 위해 XML 안전 문자로 변환하는 내부 함수
  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  // 모든 동적 변수를 안전하게 치환
  const sFamilia = escapeXml(familia);
  const sName = escapeXml(name);
  const sRace = escapeXml(race);
  const sLevel = escapeXml(level);
  const sMind = escapeXml(mind);
  const sStr = escapeXml(str);
  const sEnd = escapeXml(end);
  const sDex = escapeXml(dex);
  const sAgi = escapeXml(agi);
  const sMag = escapeXml(mag);
  const sTStr = escapeXml(tStr);
  const sTEnd = escapeXml(tEnd);
  const sTDex = escapeXml(tDex);
  const sTAgi = escapeXml(tAgi);
  const sTMag = escapeXml(tMag);
  const sAbility = escapeXml(ability);
  const sMagic = escapeXml(magic);
  const sSkill = escapeXml(skill);

  // 3. 브라우저가 온전히 해석할 수 있는 SVG 구조
  const svg = `<svg xmlns="http://w3.org" viewBox="0 0 600 780" width="100%" height="100%">
  <defs>
    <linearGradient id="parchment" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5edd6"/>
      <stop offset="50%" stop-color="#eadaa6"/>
      <stop offset="100%" stop-color="#ceba7f"/>
    </linearGradient>
  </defs>

  <rect x="10" y="10" width="580" height="760" rx="8" fill="url(#parchment)" stroke="#614a1a" stroke-width="4" />
  <rect x="20" y="20" width="560" height="740" rx="6" fill="none" stroke="#8a6f27" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.6"/>

  <g transform="translate(40, 55)">
    <text x="0" y="0" fill="#4a3611" font-family="sans-serif" font-size="14" font-weight="bold" letter-spacing="2">&amp;lt; ${sFamilia} &amp;gt;</text>
    
    <text x="0" y="32" font-family="sans-serif" font-weight="bold" letter-spacing="1">
      <tspan fill="#7a6b53" font-size="26">${sName}</tspan>
      <tspan fill="#8a6f27" font-size="16" font-weight="normal" dx="10">[종족: ${sRace}]</tspan>
    </text>
    
    <rect x="420" y="-10" width="100" height="45" rx="4" fill="none" stroke="#8a6f27" stroke-width="2"/>
    <text x="470" y="12" fill="#8a6f27" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">레벨</text>
    <text x="470" y="34" fill="#7a6b53" font-family="sans-serif" font-size="22" text-anchor="middle">${sLevel}</text>
    
    <line x1="0" y1="48" x2="520" y2="48" stroke="#8a6f27" stroke-width="2" />
  </g>

  <g transform="translate(40, 135)">
    <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="15" font-weight="bold">정신력 (마인드)</text>
    <text x="160" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${sMind}</text>
    <line x1="0" y1="30" x2="520" y2="30" stroke="#8a6f27" stroke-width="1" stroke-dasharray="4,2"/>
  </g>

  <g transform="translate(40, 200)">
    <text x="0" y="0" fill="#8a6f27" font-family="sans-serif" font-size="13" font-weight="bold">기본 능력치</text>
    <text x="140" y="0" fill="#8a6f27" font-family="sans-serif" font-size="13" font-weight="bold">현재 랭크 / 수치</text>
    <text x="360" y="0" fill="#8a6f27" font-family="sans-serif" font-size="13" font-weight="bold">통합 누적 수치</text>
    <line x1="0" y1="10" x2="520" y2="10" stroke="#8a6f27" stroke-width="1.5" />

    <g transform="translate(0, 35)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">힘</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${sStr}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${sTStr}</text>
    </g>

    <g transform="translate(0, 70)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">내구</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${sEnd}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${sTEnd}</text>
    </g>

    <g transform="translate(0, 105)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">기교</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${sDex}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${sTDex}</text>
    </g>

    <g transform="translate(0, 140)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">민첩</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${sAgi}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${sTAgi}</text>
    </g>

    <g transform="translate(0, 175)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">마력</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${sMag}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${sTMag}</text>
    </g>
    <line x1="0" y1="205" x2="520" y2="205" stroke="#8a6f27" stroke-width="1" stroke-dasharray="4,2"/>
  </g>

  <g transform="translate(40, 435)" opacity="0.4">
    <text x="0" y="0" fill="#8a6f27" font-family="sans-serif" font-size="15" font-weight="bold">발전 어빌리티</text>
    <line x1="0" y1="8" x2="520" y2="8" stroke="#8a6f27" stroke-width="1.5"/>
    <g transform="translate(0, 25)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="14">${sAbility}</text>
    </g>
  </g>

  <g transform="translate(40, 510)" opacity="0.4">
    <text x="0" y="0" fill="#8a6f27" font-family="sans-serif" font-weight="bold" font-size="15">마법</text>
    <line x1="0" y1="8" x2="520" y2="8" stroke="#8a6f27" stroke-width="1.5"/>
    <g transform="translate(0, 25)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="14">${sMagic}</text>
    </g>
  </g>

  <g transform="translate(40, 615)" opacity="0.4">
    <text x="0" y="0" fill="#8a6f27" font-family="sans-serif" font-weight="bold" font-size="15">스킬</text>
    <line x1="0" y1="8" x2="520" y2="8" stroke="#8a6f27" stroke-width="1.5"/>
    <g transform="translate(0, 25)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="14">${sSkill}</text>
    </g>
  </g>
</svg>`;

  // 4. Vercel 완벽 이미지 출력 헤더 선언
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(svg);
}
