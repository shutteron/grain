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
        <div>
          <h2 className="text-lg font-bold mb-1" style={{ color: '#1F1F1F' }}>
            「{q}」の検索結果
          </h2>
          <p className="text-[12px]" style={{ color: '#8B8270' }}>
            {results.length}件の教材が見つかりました
          </p>
        </div>
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
        <div
          className="rounded-[14px] px-5 py-6 text-center mt-4"
          style={{ background: '#F8F7F4', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[13px] font-semibold mb-3"
            style={{ color: '#1F1F1F' }}
          >
            見つかりませんでした。
          </p>
          <p
            className="text-[12px] leading-relaxed mb-3"
            style={{ color: '#8B8270' }}
          >
            別の言葉で検索してみてください。
          </p>
          <p
            className="text-[11px] leading-relaxed"
            style={{ color: '#B0A898' }}
          >
            例：<br />
            写真が暗い、背景がボケない、ピントが合わない、ブレる、逆光
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {results.map((l) => <LessonCard key={l.id} lesson={l} />)}
      </div>
    </div>
  );
}
