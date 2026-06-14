'use client';

import { useFavorites } from '@/contexts/FavoritesContext';
import { getAllLessons } from '@/lib/lessons';
import LessonCard from '@/components/LessonCard';
import SectionTitle from '@/components/SectionTitle';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favLessons = getAllLessons().filter((l) => favorites.includes(l.id));

  return (
    <div className="px-5 pt-12 pb-6">
      <SectionTitle sub={favLessons.length > 0 ? `${favLessons.length}件` : undefined}>
        お気に入り
      </SectionTitle>

      {favLessons.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 gap-5">
          <span className="text-5xl leading-none" style={{ color: '#E5E0D8' }}>☆</span>
          <div>
            <p className="text-sm font-medium" style={{ color: '#6B6B6B' }}>
              お気に入りはまだありません
            </p>
            <p className="text-[12px] mt-1" style={{ color: '#B0A898' }}>
              教材の ☆ をタップして追加できます
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {favLessons.map((l) => <LessonCard key={l.id} lesson={l} />)}
        </div>
      )}
    </div>
  );
}
