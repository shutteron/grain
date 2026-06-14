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
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E0D8',
          color: '#1F1F1F',
        }}
      />
      <button
        type="submit"
        className="rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity active:opacity-70"
        style={{ background: '#8A6F4D' }}
      >
        検索
      </button>
    </form>
  );
}
