import Link from 'next/link';

type CategoryCardProps = {
  href: string;
  en: string;
  label: string;
  desc: string;
  index?: number;
};

export default function CategoryCard({ href, en, label, desc, index }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="category-card flex items-start justify-between gap-6 px-4 py-5 rounded-md active:opacity-60"
      style={{
        background: '#FFFDF8',
        border: '1px solid #DDD4C6',
        transition: 'all 0.15s ease',
      }}
    >
      <div className="flex-1 min-w-0">
        {/* 番号 / 英字ラベル */}
        <p
          className="text-[9px] font-bold tracking-[0.16em] uppercase mb-2"
          style={{ color: '#7A7168' }}
        >
          {index !== undefined ? `${String(index).padStart(2, '0')} / ${en}` : en}
        </p>
        {/* 日本語タイトル */}
        <p className="font-semibold text-[13px] leading-snug mb-1" style={{ color: '#171717' }}>
          {label}
        </p>
        {/* 説明 */}
        <p className="text-[11px] leading-relaxed" style={{ color: '#8B8270' }}>
          {desc}
        </p>
      </div>
    </Link>
  );
}
