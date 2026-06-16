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
                className="text-[14px] font-medium leading-relaxed mb-3"
                style={{ color: '#7A7168' }}
              >
                写真の知識を、感覚に変える。
              </p>
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: '#8B8270' }}
              >
                写真は、最初から全部分からなくて大丈夫。<br />
                うまく撮れなかった理由が少し分かるだけで、<br />
                次の一枚は変わります。
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
                F値、露出、ピント、逆光。<br />
                分からない言葉や撮影の失敗を、<br />
                検索して学べます。
              </p>
            </div>
          </div>

          {/* 画像領域（プレースホルダー） */}
          <div
            className="flex-1 rounded-md overflow-hidden md:min-h-[360px] min-h-[240px] flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #2A2420 0%, #3D3431 100%)',
              border: '1px solid #DDD4C6',
            }}
          >
            {/* グレイン質感 */}
            <div
              className="w-full h-full opacity-[0.04] absolute pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              }}
            />
            {/* プレースホルダー テキスト */}
            <div className="text-center relative z-10">
              <p
                className="text-[11px] font-bold tracking-widest uppercase mb-2"
                style={{ color: 'rgba(255, 255, 255, 0.25)' }}
              >
                Photo Example
              </p>
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.15)' }}
              >
                coming soon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 検索 ── */}
      <div className="px-5">
        <SearchBar />
        <p
          className="text-[12px] leading-relaxed mt-3 mb-3"
          style={{ color: '#8B8270' }}
        >
          F値、露出、ピント、白い服、ストロボなどで検索できます。
        </p>
        <div className="flex flex-wrap gap-2">
          {['F値', '露出', 'ピント', '逆光', 'ストロボ', '白い服'].map((term) => (
            <a
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="inline-block px-3 py-1.5 rounded-full text-[11px] font-medium transition-all active:scale-95"
              style={{
                background: '#F0EDE5',
                color: '#7A7168',
                border: '1px solid #DDD4C6',
              }}
            >
              {term}
            </a>
          ))}
        </div>
      </div>

      {/* ── こんな時に見る ── */}
      <div className="px-5 pb-2">
        <div
          className="flex items-center gap-3 mb-4"
          style={{ borderBottom: '1px solid #DDD4C6', paddingBottom: '12px' }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.15em] uppercase"
            style={{ color: '#7A7168' }}
          >
            こんな時に見る
          </p>
        </div>
        <p
          className="text-[12px] leading-relaxed mb-4"
          style={{ color: '#8B8270' }}
        >
          用語が分からなくても大丈夫。困っていることから探せます。
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '写真が暗い', id: 'dark-photo-trouble' },
            { label: '顔が暗い', id: 'dark-face-trouble' },
            { label: 'ピントが合わない', id: 'focus-trouble' },
            { label: '背景がボケない', id: 'background-blur-trouble' },
            { label: '白い服が暗く写る', id: 'white-clothes-dark-trouble' },
            { label: '黒い服が明るく写る', id: 'black-clothes-bright-trouble' },
          ].map(({ label, id }) => (
            <a
              key={id}
              href={`/lessons/${id}`}
              className="inline-block px-4 py-2 rounded-full text-[12px] font-medium transition-all active:scale-95 select-none"
              style={{
                background: '#F8F7F4',
                border: '1px solid #DDD4C6',
                color: '#6F4E2E',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── まず読む3つ ── */}
      <div className="px-5 pb-2">
        <div
          className="flex items-center gap-3 mb-4"
          style={{ borderBottom: '1px solid #DDD4C6', paddingBottom: '12px' }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.15em] uppercase"
            style={{ color: '#7A7168' }}
          >
            まず読む3つ
          </p>
        </div>
        <p
          className="text-[12px] leading-relaxed mb-4"
          style={{ color: '#8B8270' }}
        >
          何から見ればいいか迷ったら、まずこの3つだけで大丈夫です。
        </p>
        <div className="flex flex-col gap-2.5">
          {['camera-auto-graduate', 'exposure-basic', 'dark-photo-trouble']
            .map((id) => all.find((l) => l.id === id))
            .filter((l): l is typeof all[0] => l !== undefined)
            .map((l) => (
              <LessonCard key={l.id} lesson={l} />
            ))}
        </div>
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

      {/* ── GRAINの使い方 ── */}
      <div className="px-5 pb-2">
        <a
          href="/guide"
          className="flex items-center justify-between px-4 py-3 rounded-[10px] transition-all active:scale-95"
          style={{
            background: '#F8F7F4',
            border: '1px solid #DDD4C6',
            color: '#6F4E2E',
          }}
        >
          <span className="text-[12px] font-medium">GRAINの使い方</span>
          <span className="text-[12px]">→</span>
        </a>
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
