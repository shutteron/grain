import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import LessonCard from '@/components/LessonCard';
import { getAllLessons } from '@/lib/lessons';

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
  const pickup = [all[0], all[8], all[18]];

  return (
    <div className="flex flex-col gap-10 pb-4">

      {/* ── ビジュアルヘッダー ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, #1C1208 0%, #3A2210 32%, #7A5530 62%, #C89A60 85%, #E8D0A0 100%)',
          minHeight: '260px',
        }}
      >
        {/* 光のグラデーション（半逆光）*/}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 88% 55%, rgba(240,200,130,0.35) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(26,16,6,0.6) 0%, transparent 70%)',
          }}
        />
        {/* グレイン質感 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          }}
        />
        {/* 細い枠 */}
        <div
          className="absolute top-5 left-5 right-5 bottom-5 pointer-events-none"
          style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}
        />

        {/* テキストコンテンツ */}
        <div className="relative px-7 pt-12 pb-10 flex flex-col gap-0">
          <p
            className="text-[9px] font-bold tracking-[0.22em] uppercase mb-3"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Photography Textbook
          </p>
          <h1
            className="font-black tracking-tight leading-none mb-3"
            style={{ fontSize: '2.2rem', color: 'rgba(255,255,255,0.92)' }}
          >
            GRAIN
          </h1>
          <p
            className="text-[13px] font-medium leading-relaxed"
            style={{ color: 'rgba(220,185,130,0.85)' }}
          >
            写真の知識を、感覚に変える。
          </p>

          {/* 区切り */}
          <div
            className="mt-8 mb-0"
            style={{
              width: '32px',
              height: '1px',
              background: 'rgba(255,255,255,0.2)',
            }}
          />
          <p
            className="mt-3 text-[11px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            光を読む目が育てば、<br />写真は変わる。
          </p>
        </div>
      </div>

      {/* ── 検索 ── */}
      <div className="px-5">
        <SearchBar />
      </div>

      {/* ── カテゴリ ── */}
      <div className="px-5">
        <p
          className="text-[10px] font-bold tracking-[0.15em] uppercase mb-4"
          style={{ color: '#9E9E9E' }}
        >
          今日、何を知りたいですか？
        </p>
        <div className="flex flex-col gap-2">
          {categories.map((c) => (
            <CategoryCard key={c.href} {...c} />
          ))}
        </div>
      </div>

      {/* ── ピックアップ ── */}
      <div className="px-5">
        <div
          className="flex items-center gap-3 mb-4"
          style={{ borderBottom: '1px solid #E5E0D8', paddingBottom: '12px' }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.15em] uppercase"
            style={{ color: '#9E9E9E' }}
          >
            まず、写真の見方を変える
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {pickup.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      </div>

      <p
        className="text-center text-[10px] pb-2"
        style={{ color: '#C4B8A8' }}
      >
        全 {all.length} 教材
      </p>
    </div>
  );
}
