import Link from 'next/link';

type CategoryCardProps = {
  href: string;
  en: string;
  label: string;
  desc: string;
};

export default function CategoryCard({ href, en, label, desc }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="category-card flex items-center justify-between gap-4 px-4 py-4 rounded-[14px] active:opacity-60"
      style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
    >
      <div className="flex-1 min-w-0">
        {/* 英字ラベル */}
        <p
          className="text-[9px] font-bold tracking-[0.18em] uppercase mb-1"
          style={{ color: '#C4B8A8' }}
        >
          {en}
        </p>
        {/* 日本語タイトル */}
        <p className="font-semibold text-[14px] leading-snug" style={{ color: '#1F1F1F' }}>
          {label}
        </p>
        {/* 説明 */}
        <p className="text-[11px] mt-0.5 leading-snug" style={{ color: '#A09888' }}>
          {desc}
        </p>
      </div>
      <span
        className="shrink-0 text-[12px] font-light"
        style={{ color: '#C4B8A8' }}
      >
        →
      </span>
    </Link>
  );
}
