'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/',          label: 'ホーム',    icon: '⌂' },
  { href: '/terms',     label: '用語',      icon: '◎' },
  { href: '/troubles',  label: '失敗',      icon: '△' },
  { href: '/lighting',  label: '光',        icon: '○' },
  { href: '/levels',    label: 'レベル',    icon: '≡' },
  { href: '/favorites', label: 'お気に入り', icon: '☆' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ borderTop: '1px solid #E5E0D8' }}
    >
      {/* PCでも中央寄せ */}
      <div
        className="max-w-[480px] mx-auto flex"
        style={{ background: '#F8F7F4' }}
      >
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center py-3 gap-0.5"
            >
              <span
                className="text-base leading-none transition-colors"
                style={{ color: active ? '#8A6F4D' : '#B0A898' }}
              >
                {item.icon}
              </span>
              <span
                className="text-[9px] font-semibold leading-none tracking-wide transition-colors"
                style={{ color: active ? '#8A6F4D' : '#B0A898' }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
