'use client';

import Link from 'next/link';
import { Lesson } from '@/types/lesson';
import { levelLabel, categoryLabel } from '@/lib/lessons';
import FavoriteButton from './FavoriteButton';

const levelStyle: Record<Lesson['level'], { bg: string; text: string }> = {
  intro:        { bg: '#F4F0E8', text: '#7A6040' },
  basic:        { bg: '#EDF2E8', text: '#506840' },
  intermediate: { bg: '#EAE8F4', text: '#4A4870' },
  advanced:     { bg: '#F4EBE0', text: '#7A4830' },
  field:        { bg: '#F4E8EC', text: '#783848' },
};

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const lvStyle = levelStyle[lesson.level];

  return (
    <div
      className="lesson-card rounded-[14px] overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
    >
      <Link href={`/lessons/${lesson.id}`} className="block p-5">
        {/* 1. タイトル */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3
            className="font-bold text-[15px] leading-snug flex-1"
            style={{ color: '#1F1F1F' }}
          >
            {lesson.title}
          </h3>
          <FavoriteButton id={lesson.id} size="sm" />
        </div>

        {/* 2. 一言要約 */}
        <p
          className="text-[13px] leading-relaxed mb-4"
          style={{ color: '#6B6B6B' }}
        >
          {lesson.summary}
        </p>

        {/* 3. レベル + カテゴリ */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span
            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: lvStyle.bg, color: lvStyle.text }}
          >
            {levelLabel[lesson.level]}
          </span>
          <span
            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
            style={{ background: '#F4F0EB', color: '#8A6F4D' }}
          >
            {categoryLabel[lesson.category]}
          </span>
        </div>

        {/* 4. タグ */}
        <div className="flex flex-wrap gap-1">
          {lesson.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: '#F8F7F4',
                color: '#B0A898',
                border: '1px solid #E5E0D8',
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
