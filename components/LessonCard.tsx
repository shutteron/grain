'use client';

import Link from 'next/link';
import { Lesson } from '@/types/lesson';
import { levelLabel, categoryLabel } from '@/lib/lessons';
import FavoriteButton from './FavoriteButton';

const levelStyle: Record<Lesson['level'], { bg: string; text: string }> = {
  intro:        { bg: '#EFE5D6', text: '#6F4E2E' },
  basic:        { bg: '#E8ECDF', text: '#4A5C38' },
  intermediate: { bg: '#E8E5F0', text: '#433F62' },
  advanced:     { bg: '#EFE0D6', text: '#6F3F28' },
  field:        { bg: '#EFE5EB', text: '#6F3548' },
};

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const lvStyle = levelStyle[lesson.level];

  return (
    <div
      className="lesson-card rounded-md overflow-hidden"
      style={{ background: '#FFFDF8', border: '1px solid #DDD4C6' }}
    >
      <Link href={`/lessons/${lesson.id}`} className="block p-4">
        {/* 1. タイトル */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="font-semibold text-[14px] leading-snug flex-1"
            style={{ color: '#171717' }}
          >
            {lesson.title}
          </h3>
          <FavoriteButton id={lesson.id} size="sm" />
        </div>

        {/* 2. 一言要約 */}
        <p
          className="text-[12px] leading-relaxed mb-3"
          style={{ color: '#7A7168' }}
        >
          {lesson.summary}
        </p>

        {/* 3. レベル + カテゴリ */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <span
            className="text-[10px] font-medium px-2 py-1 rounded"
            style={{ background: lvStyle.bg, color: lvStyle.text }}
          >
            {levelLabel[lesson.level]}
          </span>
          <span
            className="text-[10px] font-medium px-2 py-1 rounded"
            style={{ background: '#EFE5D6', color: '#6F4E2E' }}
          >
            {categoryLabel[lesson.category]}
          </span>
        </div>

        {/* 4. タグ */}
        <div className="flex flex-wrap gap-1">
          {lesson.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-1.5 py-0.5 rounded"
              style={{
                background: '#F6F2EA',
                color: '#8B8270',
                border: '1px solid #DDD4C6',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
