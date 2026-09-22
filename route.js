import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// 폰트 데이터를 가져오는 헬퍼 함수
async function loadFont() {
  // 예시로 원활한 한글 출력을 위해 Pretendard 폰트(이진 데이터)를 가져옵니다.
  const res = await fetch(
    new URL('https://jsdelivr.net')
  );
  if (!res.ok) throw new Error('Failed to load font');
  return await res.arrayBuffer();
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    const name = searchParams.get('name') || '유저';
    const race = searchParams.get('race') || '인간';
    const level = searchParams.get('level') || '0';
    const familia = searchParams.get('familia') || '소속 패밀리아 없음';
    const mind = searchParams.get('mind') || '0 / 0';
    const str = searchParams.get('str') || '- 0';
    const end = searchParams.get('end') || '- 0';
    const dex = searchParams.get('dex') || '- 0';
    const agi = searchParams.get('agi') || '- 0';
    const mag = searchParams.get('mag') || '- 0';
    const tStr = searchParams.get('tStr') || '0';
    const tEnd = searchParams.get('tEnd') || '0';
    const tDex = searchParams.get('tDex') || '0';
    const tAgi = searchParams.get('tAgi') || '0';
    const tMag = searchParams.get('tMag') || '0';
    const ability = searchParams.get('ability') || '획득한 어빌리티 없음';
    const magic = searchParams.get('magic') || '발현된 마법 없음';
    const skill = searchParams.get('skill') || '발현된 스킬 없음';

    const dFamilia = decodeURIComponent(familia).replace(/_/g, ' ');
    const dName = decodeURIComponent(name).replace(/_/g, ' ');
    const dRace = decodeURIComponent(race).replace(/_/g, ' ');
    const dMind = decodeURIComponent(mind).replace(/_/g, ' ');
    const dStr = decodeURIComponent(str).replace(/_/g, ' ');
    const dEnd = decodeURIComponent(end).replace(/_/g, ' ');
    const dDex = decodeURIComponent(dex).replace(/_/g, ' ');
    const dAgi = decodeURIComponent(agi).replace(/_/g, ' ');
    const dMag = decodeURIComponent(mag).replace(/_/g, ' ');
    const dAbility = decodeURIComponent(ability).replace(/_/g, ', ');
    const dMagic = decodeURIComponent(magic).replace(/_/g, ', ');
    const dSkill = decodeURIComponent(skill).replace(/_/g, ', ');

    // 폰트 로드
    const fontData = await loadFont();

    return new ImageResponse(
      (
        // 채팅창 정렬을 위해 불필요한 바깥 회색 배경 제거 및 크기 맞춤
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '540px', height: '740px', padding: '30px', borderRadius: '8px', border: '4px solid #614a1a', background: 'linear-gradient(135deg, #f5edd6 0%, #eadaa6 50%, #ceba7f 100%)', position: 'relative', fontFamily: 'Pretendard' }}>
            {/* 상단 프로필 */}
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
        fonts: [
          {
            name: 'Pretendard',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
