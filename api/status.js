import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

async function loadFont() {
  const res = await fetch(
    new URL('https://jsdelivr.net')
  );
  if (!res.ok) throw new Error('Failed to load font');
  return await res.arrayBuffer();
}

export default async function handler(req) {
  try {
    const { pathname } = new URL(req.url); 
    // 주소를 슬래시(/) 단위로 쪼갭니다.
    const segments = pathname.split('/').filter(Boolean);
    
    // api/status 뒤에 붙어오는 데이터 배열을 잘라냅니다.
    const data = segments.slice(2);

    // 슬래시 순서대로 데이터 할당 (값이 없는 구간은 안전한 기본값으로 채움)
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
    
    // 맨 마지막 항목(스킬)에서 우회용 확장자(.png) 제거 및 디코딩
    let rawSkill = data[14] ? decodeURIComponent(data[14]) : '발현된_스킬_없음';
    if (rawSkill.endsWith('.png')) {
      rawSkill = rawSkill.replace('.png', '');
    }
    const skill = rawSkill;

    // 언더바(_) 기호를 자연스러운 공백 및 쉼표 문자로 변환
    const dFamilia = familia.replace(/_/g, ' ');
    const dName = name.replace(/_/g, ' ');
    const dRace = race.replace(/_/g, ' ');
    const dMind = mind.replace(/_/g, ' ');
    const dStr = str.replace(/_/g, ' ');
    const dEnd = end.replace(/_/g, ' ');
    const dDex = dex.replace(/_/g, ' ');
    const dAgi = agi.replace(/_/g, ' ');
    const dMag = mag.replace(/_/g, ' ');
    // 예외 인자 처리
    const dAbility = '획득한 어빌리티 없음'; 
    const dMagic = '발현된 마법 없음';
    const dSkill = skill.replace(/_/g, ', ');

    const fontData = await loadFont();

    return new ImageResponse(
      (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '540px', height: '740px', padding: '30px', borderRadius: '8px', border: '4px solid #614a1a', background: 'linear-gradient(135deg, #f5edd6 0%, #eadaa6 50%, #ceba7f 100%)', position: 'relative', fontFamily: 'Pretendard' }}>
            {/* 프로필 */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#4a3611', letterSpacing: '2px' }}>&lt; {dFamilia} &gt;</span>
              <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '5px' }}>
                <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#7a6b53' }}>{dName}</span>
                <span style={{ fontSize: '16px', color: '#8a6f27', marginLeft: '10px' }}>[종족: {dRace}]</span>
              </div>
              <div style={{ position: 'absolute', right: '30px', top: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px', padding: '5px', border: '2px solid #8a6f27', borderRadius: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#8a6f27' }}>레벨</span>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#7a6b53', marginTop: '2px' }}>{level}</span>
              </div>
              <div style={{ width: '100%', height: '2px', backgroundColor: '#8a6f27', marginTop: '15px' }} />
            </div>

            {/* 마인드 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#7a6b53' }}>정신력 (마인드)</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#7a6b53' }}>{dMind}</span>
            </div>
            <div style={{ width: '100%', height: '1px', borderTop: '1px dashed #8a6f27', marginBottom: '20px' }} />

            {/* 능력치 리스트 */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#8a6f27', marginBottom: '5px' }}>
                <span style={{ width: '100px' }}>기본 능력치</span>
                <span style={{ width: '150px', textAlign: 'center' }}>현재 랭크 / 수치</span>
                <span style={{ width: '120px', textAlign: 'right' }}>통합 누적 수치</span>
              </div>
              <div style={{ width: '100%', height: '2px', backgroundColor: '#8a6f27', marginBottom: '10px' }} />
              {[
                { label: '힘', val: dStr, total: tStr },
                { label: '내구', val: dEnd, total: tEnd },
                { label: '기교', val: dDex, total: tDex },
                { label: '민첩', val: dAgi, total: tAgi },
                { label: '마력', val: dMag, total: '- 0' },
              ].map((row, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#7a6b53', padding: '4px 0' }}>
                  <span style={{ width: '100px', fontWeight: 'bold' }}>{row.label}</span>
                  <span style={{ width: '150px', textAlign: 'center' }}>{row.val}</span>
                  <span style={{ width: '120px', textAlign: 'right', fontWeight: 'bold' }}>{row.total}</span>
                </div>
              ))}
            </div>
            <div style={{ width: '100%', height: '1px', borderTop: '1px dashed #8a6f27', marginBottom: '20px' }} />

            {/* 어빌리티/마법/스킬 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.8 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: '13px', fontWeight: 'bold', color: '#8a6f27' }}>■ 발전 어빌리티</span><span style={{ fontSize: '14px', color: '#4a3611', marginTop: '2px' }}>{dAbility}</span></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: '13px', fontWeight: 'bold', color: '#8a6f27' }}>■ 마법</span><span style={{ fontSize: '14px', color: '#4a3611', marginTop: '2px' }}>{dMagic}</span></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: '13px', fontWeight: 'bold', color: '#8a6f27' }}>■ 스킬</span><span style={{ fontSize: '14px', color: '#4a3611', marginTop: '2px' }}>{dSkill}</span></div>
            </div>
          </div>
        </div>
      ),
      {
        width: 600,
        height: 780,
        fonts: [{ name: 'Pretendard', data: fontData, style: 'normal' }],
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
