import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import LessonCard from '@/components/LessonCard';
import { getAllLessons } from '@/lib/lessons';

export const dynamic = 'force-dynamic';

const categories = [
  {
    href: '/terms',
    en: 'TERMS',
    label: '用語から探す',
    desc: '露出・F値・ISO・WBなど基礎用語',
  },
  {
    href: '/troubles',
    en: 'TROUBLE',
    label: '失敗から探す',
    desc: 'ブレる・暗い・ピントが合わないなど',
  },
  {
    href: '/genres',
    en: 'SCENE',
    label: '撮りたい写真から探す',
    desc: 'ポートレート・構図・プロフィール写真',
  },
  {
    href: '/lighting',
    en: 'LIGHT',
    label: '光を学ぶ',
    desc: '順光・逆光・サイド光・ストロボ',
  },
  {
    href: '/levels',
    en: 'LEVEL',
    label: 'レベル順に学ぶ',
    desc: '入門 → 初級 → 中級 → 現場編',
  },
  {
    href: '/settings',
    en: 'SETTINGS',
    label: '設定早見表',
    desc: 'シーン別のF値・SS・ISO早見表',
  },
  {
    href: '/favorites',
    en: 'FAVORITES',
    label: 'お気に入り',
    desc: 'ブックマークした教材をまとめて確認',
  },
];

export default function Home() {
  const all = getAllLessons();
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  const pickup = shuffled.slice(0, 3);

  return (
    <div className="flex flex-col gap-10 pb-4">

      {/* ── ギャラリー風ヒーロー ── */}
      <div className="px-5 pt-2">
        <div
          className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch"
          style={{ borderTop: '1px solid #DDD4C6', paddingTop: '32px' }}
        >
          {/* テキスト領域 */}
          <div className="flex flex-col gap-6 flex-1 md:py-2">
            <div>
              <p
                className="text-[8px] font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: '#7A7168' }}
              >
                Photography Textbook
              </p>
              <h1
                className="font-black tracking-tight leading-tight mb-4"
                style={{ fontSize: '2.6rem', color: '#171717' }}
              >
                GRAIN
              </h1>
              <p
                className="text-[14px] font-medium leading-relaxed"
                style={{ color: '#7A7168' }}
              >
                写真の知識を、感覚に変える。
              </p>
            </div>

            {/* 補助コピー */}
            <div
              className="pt-4"
              style={{ borderTop: '1px solid #DDD4C6' }}
            >
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: '#171717', lineHeight: '1.8' }}
              >
                一枚の写真は、<br />
                設定ではなく、<br />
                「何を見せたいか」から始まる。
              </p>
            </div>
          </div>

          {/* 画像領域（プレースホルダー） */}
          <div
            className="flex-1 rounded-md overflow-hidden md:min-h-[360px] min-h-[240px]"
            style={{
              background: 'linear-gradient(135deg, #2A2420 0%, #3D3431 100%)',
              border: '1px solid #DDD4C6',
            }}
          >
            {/* グレイン質感 */}
            <div
              className="w-full h-full opacity-[0.04]"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── 検索 ── */}
      <div className="px-5">
        <SearchBar />
      </div>

      {/* ── カテゴリ（目次風） ── */}
      <div className="px-5 pb-2">
        <p
          className="text-[10px] font-bold tracking-[0.15em] uppercase mb-4"
          style={{ color: '#7A7168', letterSpacing: '0.12em' }}
        >
          知りたいことから探す
        </p>
        <div className="flex flex-col gap-2">
          {categories.map((c, i) => (
            <CategoryCard key={c.href} {...c} index={i + 1} />
          ))}
        </div>
      </div>

      {/* ── ピックアップ ── */}
      <div className="px-5 pb-2">
        <div
          className="flex items-center gap-3 mb-4"
          style={{ borderBottom: '1px solid #DDD4C6', paddingBottom: '12px' }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.15em] uppercase"
            style={{ color: '#7A7168' }}
          >
            ここから始める
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          {pickup.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      </div>

      <p
        className="text-center text-[10px] pb-2"
        style={{ color: '#A9A093' }}
      >
        全 {all.length} 教材
      </p>
    </div>
  );
}
