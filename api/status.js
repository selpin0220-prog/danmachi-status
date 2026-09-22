export default async function handler(req, res) {
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
    <text x="0" y="0" fill="#4a3611" font-family="sans-serif" font-size="14" font-weight="bold" letter-spacing="2">&lt; ${familia} &gt;</text>
    <text x="0" y="32" font-family="sans-serif" font-weight="bold" letter-spacing="1">
      <tspan fill="#7a6b53" font-size="26">${name}</tspan>
      <tspan fill="#8a6f27" font-size="16" font-weight="normal" dx="10">[종족: ${race}]</tspan>
    </text>
    <rect x="420" y="-10" width="100" height="45" rx="4" fill="none" stroke="#8a6f27" stroke-width="2"/>
    <text x="470" y="12" fill="#8a6f27" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">레벨</text>
    <text x="470" y="34" fill="#7a6b53" font-family="sans-serif" font-size="22" text-anchor="middle">${level}</text>
    <line x1="0" y1="48" x2="520" y2="48" stroke="#8a6f27" stroke-width="2" />
  </g>
  <g transform="translate(40, 135)">
    <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="15" font-weight="bold">정신력 (마인드)</text>
    <text x="160" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${mind}</text>
    <line x1="0" y1="30" x2="520" y2="30" stroke="#8a6f27" stroke-width="1" stroke-dasharray="4,2"/>
  </g>
  <g transform="translate(40, 200)">
    <text x="0" y="0" fill="#8a6f27" font-family="sans-serif" font-size="13" font-weight="bold">기본 능력치</text>
    <text x="140" y="0" fill="#8a6f27" font-family="sans-serif" font-size="13" font-weight="bold">현재 랭크 / 수치</text>
    <text x="360" y="0" fill="#8a6f27" font-family="sans-serif" font-size="13" font-weight="bold">통합 누적 수치</text>
    <line x1="0" y1="10" x2="520" y2="10" stroke="#8a6f27" stroke-width="1.5" />
    <g transform="translate(0, 35)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">힘</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${str}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${tStr}</text>
    </g>
    <g transform="translate(0, 70)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">내구</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${end}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${tEnd}</text>
    </g>
    <g transform="translate(0, 105)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">기교</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${dex}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${tDex}</text>
    </g>
    <g transform="translate(0, 140)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">민첩</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${agi}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${tAgi}</text>
    </g>
    <g transform="translate(0, 175)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="16" font-weight="bold">마력</text>
      <text x="140" y="15" fill="#7a6b53" font-family="monospace" font-size="16">${mag}</text>
      <text x="360" y="15" fill="#7a6b53" font-family="monospace" font-size="16" font-weight="bold">${tMag}</text>
    </g>
    <line x1="0" y1="205" x2="520" y2="205" stroke="#8a6f27" stroke-width="1" stroke-dasharray="4,2"/>
  </g>
  <g transform="translate(40, 435)" opacity="0.4">
    <text x="0" y="0" fill="#8a6f27" font-family="sans-serif" font-size="15" font-weight="bold">발전 어빌리티</text>
    <line x1="0" y1="8" x2="520" y2="8" stroke="#8a6f27" stroke-width="1.5"/>
    <g transform="translate(0, 25)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="14">${ability}</text>
    </g>
  </g>
  <g transform="translate(40, 510)" opacity="0.4">
    <text x="0" y="0" fill="#8a6f27" font-family="sans-serif" font-weight="bold" font-size="15">마법</text>
    <line x1="0" y1="8" x2="520" y2="8" stroke="#8a6f27" stroke-width="1.5"/>
    <g transform="translate(0, 25)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="14">${magic}</text>
    </g>
  </g>
  <g transform="translate(40, 615)" opacity="0.4">
    <text x="0" y="0" fill="#8a6f27" font-family="sans-serif" font-weight="bold" font-size="15">스킬</text>
    <line x1="0" y1="8" x2="520" y2="8" stroke="#8a6f27" stroke-width="1.5"/>
    <g transform="translate(0, 25)">
      <text x="0" y="15" fill="#7a6b53" font-family="sans-serif" font-size="14">${skill}</text>
    </g>
  </g>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(svg);
}
