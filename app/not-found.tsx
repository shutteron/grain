import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center gap-7"
      style={{ background: '#F8F7F4' }}
    >
      <p
        className="text-[5rem] font-black leading-none"
        style={{ color: '#E5E0D8' }}
      >
        404
      </p>
      <div>
        <h1 className="text-[16px] font-bold mb-1" style={{ color: '#1F1F1F' }}>
          ページが見つかりません
        </h1>
        <p className="text-[13px]" style={{ color: '#9E9E9E' }}>
          このURLは存在しないか、削除された可能性があります。
        </p>
      </div>
      <Link
        href="/"
        className="text-sm font-semibold text-white px-8 py-3 rounded-full transition-opacity active:opacity-70"
        style={{ background: '#8A6F4D' }}
      >
        ホームに戻る
      </Link>
    </div>
  );
}
