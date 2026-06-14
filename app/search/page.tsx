import { searchLessons } from '@/lib/lessons';
import LessonCard from '@/components/LessonCard';
import SearchBar from '@/components/SearchBar';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = q ? searchLessons(q) : [];

  return (
    <div className="px-5 pt-12 pb-6 flex flex-col gap-6">
      <h1 className="text-2xl font-black" style={{ color: '#1F1F1F' }}>
        検索
      </h1>

      <SearchBar defaultValue={q ?? ''} />

      {q && (
        <p className="text-[11px] font-medium" style={{ color: '#9E9E9E' }}>
          「{q}」— {results.length}件
        </p>
      )}

      {!q && (
        <p
          className="text-sm text-center mt-16"
          style={{ color: '#B0A898' }}
        >
          キーワードを入力してください
        </p>
      )}

      {q && results.length === 0 && (
        <p
          className="text-sm text-center mt-16"
          style={{ color: '#B0A898' }}
        >
          見つかりませんでした
        </p>
      )}

      <div className="flex flex-col gap-3">
        {results.map((l) => <LessonCard key={l.id} lesson={l} />)}
      </div>
    </div>
  );
}
