import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };
export const dynamic = 'force-dynamic';

async function loadFont() {
  const res = await fetch(
    new URL('https://jsdelivr.net')
  );
  if (!res.ok) throw new Error('Failed to load font');
  return await res.arrayBuffer();
}

export async function GET(req, context) {
  try {
    // Catch-all 파라미터에서 배열을 안전하게 가져옵니다.
    const params = await context.params;
    const statusArray = params.status || [];

    // 슬래시(/) 단위로 들어온 값들을 순서대로 매핑합니다.
    const name     = statusArray[0] ? decodeURIComponent(statusArray[0]) : '유저';
    const race     = statusArray[1] ? decodeURIComponent(statusArray[1]) : '인간';
    const level    = statusArray[2] ? decodeURIComponent(statusArray[2]) : '0';
    const familia  = statusArray[3] ? decodeURIComponent(statusArray[3]) : '소속_패밀리아_없음';
    const mind     = statusArray[4] ? decodeURIComponent(statusArray[4]) : '0_/_0';
    const str      = statusArray[5] ? decodeURIComponent(statusArray[5]) : '-_0';
    const end      = statusArray[6] ? decodeURIComponent(statusArray[6]) : '-_0';
    const dex      = statusArray[7] ? decodeURIComponent(statusArray[7]) : '-_0';
    const agi      = statusArray[8] ? decodeURIComponent(statusArray[8]) : '-_0';
    const mag      = statusArray[9] ? decodeURIComponent(statusArray[9]) : '-_0';
    const tStr     = statusArray[10] ? decodeURIComponent(statusArray[10]) : '0';
    const tEnd     = statusArray[11] ? decodeURIComponent(statusArray[11]) : '0';
    const tDex     = statusArray[12] ? decodeURIComponent(statusArray[12]) : '0';
    const tAgi     = statusArray[13] ? decodeURIComponent(statusArray[13]) : '0';
    const tMag     = statusArray[14] ? decodeURIComponent(statusArray[14]) : '0';
    const ability  = statusArray[15] ? decodeURIComponent(statusArray[15]) : '획득한_어빌리티_없음';
    const magic    = statusArray[16] ? decodeURIComponent(statusArray[16]) : '발현된_마법_없음';
    const skill    = statusArray[17] ? decodeURIComponent(statusArray[17]) : '발현된_스킬_없음';

    // 화면 출력을 위해 언더바(_) 기호를 자연스러운 공백 및 쉼표로 변환
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

    const fontData = await loadFont();

    return new ImageResponse(
      (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '540px', height: '740px', padding: '30px', borderRadius: '8px', border: '4px solid #614a1a', background: 'linear-gradient(135deg, #f5edd6 0%, #eadaa6 50%, #ceba7f 100%)', position: 'relative', fontFamily: 'Pretendard' }}>
            {/* 상단 프로필 영역 */}
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

            {/* 마인드 영역 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#7a6b53' }}>정신력 (마인드)</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#7a6b53' }}>{dMind}</span>
            </div>
            <div style={{ width: '100%', height: '1px', borderTop: '1px dashed #8a6f27', marginBottom: '20px' }} />

            {/* 스탯 리스트 영역 */}
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
                { label: '마력', val: dMag, total: tMag },
              ].map((row, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#7a6b53', padding: '4px 0' }}>
                  <span style={{ width: '100px', fontWeight: 'bold' }}>{row.label}</span>
                  <span style={{ width: '150px', textAlign: 'center' }}>{row.val}</span>
                  <span style={{ width: '120px', textAlign: 'right', fontWeight: 'bold' }}>{row.total}</span>
                </div>
              ))}
            </div>
            <div style={{ width: '100%', height: '1px', borderTop: '1px dashed #8a6f27', marginBottom: '20px' }} />

            {/* 스킬 및 어빌리티 영역 */}
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
