'use client';

import { useFavorites } from '@/contexts/FavoritesContext';

type FavoriteButtonProps = {
  id: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function FavoriteButton({ id, size = 'md' }: FavoriteButtonProps) {
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(id);

  const sizeClass =
    size === 'lg' ? 'text-2xl w-10 h-10' :
    size === 'sm' ? 'text-[15px] w-7 h-7' :
    'text-xl w-9 h-9';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-label={fav ? 'お気に入りを解除する' : 'お気に入りに追加する'}
      className={`${sizeClass} shrink-0 flex items-center justify-center rounded-full transition-all active:scale-90 select-none`}
    >
      <span style={{ color: fav ? '#8A6F4D' : '#D4C9BC' }}>
        {fav ? '★' : '☆'}
      </span>
    </button>
  );
}
