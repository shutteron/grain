'use client';

import { useFavorites } from '@/contexts/FavoritesContext';

export default function FavoriteButtonFull({ id }: { id: string }) {
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all active:scale-95 select-none w-full justify-center"
      style={
        fav
          ? { background: '#6F4E2E', color: '#fff', border: '1.5px solid #6F4E2E' }
          : { background: 'transparent', color: '#6F4E2E', border: '1.5px solid #DDD4C6' }
      }
      aria-label={fav ? 'お気に入りを解除する' : 'お気に入りに追加する'}
    >
      <span className="text-[15px] leading-none">{fav ? '★' : '☆'}</span>
      <span>{fav ? '保存済み' : 'お気に入りに追加'}</span>
    </button>
  );
}
