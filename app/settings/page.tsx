import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';

const rows = [
  { scene: '背景をぼかした人物', f: 'F1.8〜F2.8', ss: '1/250以上',  iso: 'AUTO〜800',  point: '目にピントを合わせる', relatedIds: ['aperture-basic', 'background-blur-trouble'] },
  { scene: '動く子ども・ペット', f: 'F2.8〜F5.6', ss: '1/500以上',  iso: 'AUTO',       point: 'ブレ防止を最優先に', relatedIds: ['shutter-speed-basic', 'camera-shake-trouble'] },
  { scene: '料理',               f: 'F4〜F8',     ss: '1/125以上',  iso: '400〜1600',  point: '斜め45度か逆光で撮る', relatedIds: ['light-and-shadow-basic'] },
  { scene: 'スポーツ',           f: 'F2.8〜F4',   ss: '1/1000以上', iso: '1600〜6400', point: 'AF-Cと連写を使う', relatedIds: ['shutter-speed-basic'] },
  { scene: 'プロフィール写真',   f: 'F2.8〜F5.6', ss: '1/250以上',  iso: 'AUTO〜800',  point: '背景情報を残すか考える', relatedIds: ['profile-photo-basic'] },
  { scene: '逆光ポートレート',   f: 'F2〜F4',     ss: '1/250以上',  iso: 'AUTO',       point: '顔に光を戻す工夫をする', relatedIds: ['dark-face-trouble', 'strobe-purpose'] },
];

function Row({ scene, f, ss, iso, point, relatedIds }: typeof rows[0]) {
  return (
    <div
      className="rounded-[14px] px-5 py-4"
      style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
    >
      <p className="font-bold text-[14px] mb-3" style={{ color: '#1F1F1F' }}>
        {scene}
      </p>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'F値',  value: f },
          { label: 'SS',   value: ss },
          { label: 'ISO',  value: iso },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[10px] px-3 py-2.5"
            style={{ background: '#F8F7F4' }}
          >
            <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: '#B0A898' }}>
              {item.label}
            </p>
            <p className="text-[12px] font-semibold leading-tight" style={{ color: '#1F1F1F' }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[12px] mb-3" style={{ color: '#8A6F4D' }}>
        ↳ {point}
      </p>
      {relatedIds && relatedIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t pt-3" style={{ borderColor: '#E5E0D8' }}>
          <span className="text-[10px]" style={{ color: '#B0A898' }}>
            関連して学ぶ：
          </span>
          {relatedIds.map((id) => (
            <Link
              key={id}
              href={`/lessons/${id}`}
              className="text-[10px] px-2 py-1 rounded hover:opacity-70 transition-opacity"
              style={{ background: '#F8F7F4', color: '#6F4E2E', border: '1px solid #DDD4C6' }}
            >
              →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="px-5 pt-12 pb-6">
      <SectionTitle sub="シーン別の設定チートシート">設定早見表</SectionTitle>

      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <Row key={row.scene} {...row} />
        ))}
      </div>

      <p
        className="text-[11px] text-center mt-6 leading-relaxed"
        style={{ color: '#B0A898' }}
      >
        数値はあくまで目安です。<br />
        光の状況・カメラの種類によって調整してください。
      </p>
    </div>
  );
}
