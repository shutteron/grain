'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
  icon: (color: string) => React.ReactNode;
};

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'ホーム',
    icon: (color) => (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} />
      </svg>
    ),
  },
  {
    href: '/terms',
    label: '用語',
    icon: (color) => (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/troubles',
    label: '失敗',
    icon: (color) => (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 2L2 20h20L12 2z" fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/lighting',
    label: '光',
    icon: (color) => (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="8" fill={color} />
        <path d="M12 1v2m0 16v2M23 12h-2M3 12H1M20.4 20.4l-1.4-1.4M5 5l-1.4-1.4M20.4 3.6l-1.4 1.4M5 19l-1.4 1.4" stroke={color} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/levels',
    label: 'レベル',
    icon: (color) => (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <rect x="3" y="4" width="18" height="2" fill={color} />
        <rect x="3" y="11" width="18" height="2" fill={color} />
        <rect x="3" y="18" width="18" height="2" fill={color} />
      </svg>
    ),
  },
  {
    href: '/favorites',
    label: 'お気に入り',
    icon: (color) => (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke={color} strokeWidth="1.2" />
      </svg>
    ),
  },
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
              className="flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors"
              style={{
                borderBottom: active ? '2px solid #8A6F4D' : '2px solid transparent',
                color: active ? '#8A6F4D' : '#B0A898',
              }}
            >
              <div className="transition-colors">
                {item.icon(active ? '#8A6F4D' : '#B0A898')}
              </div>
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
