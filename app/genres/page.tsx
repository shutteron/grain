import { getLessonsByCategory } from '@/lib/lessons';
import LessonCard from '@/components/LessonCard';
import SectionTitle from '@/components/SectionTitle';

export default function GenresPage() {
  const items = getLessonsByCategory('genre');
  return (
    <div className="px-5 pt-12 pb-6">
      <SectionTitle sub={`${items.length}件`}>撮りたい写真から探す</SectionTitle>
      <div className="flex flex-col gap-3">
        {items.map((l) => <LessonCard key={l.id} lesson={l} />)}
      </div>
    </div>
  );
}
