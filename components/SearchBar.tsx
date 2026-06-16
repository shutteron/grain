'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
};

export default function SearchBar({
  defaultValue = '',
  placeholder = 'F値、逆光、ピント、背景ボケなど',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" noValidate>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-sm px-4 py-3 text-sm outline-none transition-colors"
        style={{
          background: '#FFFDF8',
          border: '1px solid #DDD4C6',
          color: '#171717',
        }}
        aria-label="教材検索"
      />
      <button
        type="submit"
        className="shrink-0 rounded-sm px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-70 cursor-pointer"
        style={{ background: '#6F4E2E' }}
        aria-label="検索実行"
      >
        検索
      </button>
    </form>
  );
}
