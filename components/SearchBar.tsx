'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
};

export default function SearchBar({
  defaultValue = '',
  placeholder = 'F値、逆光、ピント、背景ボケなど',
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;

    const trimmedQuery = inputRef.current.value.trim();
    if (!trimmedQuery) return;

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="flex-1 rounded-sm px-4 py-3 text-sm outline-none"
        style={{
          background: '#FFFDF8',
          border: '1px solid #DDD4C6',
          color: '#171717',
        }}
      />
      <button
        type="submit"
        className="shrink-0 rounded-sm px-5 py-3 text-sm font-semibold text-white"
        style={{ background: '#6F4E2E', cursor: 'pointer' }}
      >
        検索
      </button>
    </form>
  );
}
