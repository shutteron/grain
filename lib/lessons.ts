import { lessons } from '@/data/lessons';
import { Lesson, LessonCategory, LessonLevel } from '@/types/lesson';

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByCategory(category: LessonCategory): Lesson[] {
  return lessons.filter((l) => l.category === category);
}

export function getLessonsByLevel(level: LessonLevel): Lesson[] {
  return lessons.filter((l) => l.level === level);
}

export function searchLessons(query: string): Lesson[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(q) ||
      l.tags.some((t) => t.toLowerCase().includes(q)) ||
      l.summary.toLowerCase().includes(q) ||
      l.beginnerExplanation.toLowerCase().includes(q) ||
      l.fieldUse.toLowerCase().includes(q)
  );
}

export function getRelatedLessons(relatedIds: string[]): Lesson[] {
  return relatedIds
    .map((id) => getLessonById(id))
    .filter((l): l is Lesson => l !== undefined);
}

export const levelOrder: LessonLevel[] = [
  'intro',
  'basic',
  'intermediate',
  'advanced',
  'field',
];

export const levelLabel: Record<LessonLevel, string> = {
  intro: '入門',
  basic: '初級',
  intermediate: '中級',
  advanced: '上級',
  field: '現場編',
};

export const categoryLabel: Record<LessonCategory, string> = {
  term: '用語',
  trouble: '失敗解決',
  genre: '撮りたい写真',
  lighting: '光',
  setting: '設定',
};

/** レベル順に並べた全教材から、current の次の教材を返す */
export function getNextLesson(current: Lesson): Lesson | undefined {
  const sorted = levelOrder.flatMap((level) =>
    lessons.filter((l) => l.level === level)
  );
  const idx = sorted.findIndex((l) => l.id === current.id);
  if (idx === -1 || idx === sorted.length - 1) return undefined;
  return sorted[idx + 1];
}
