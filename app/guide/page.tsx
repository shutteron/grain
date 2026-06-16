import Link from 'next/link';

export default function GuidePage() {
  return (
    <div className="flex flex-col gap-8 px-5 pt-12 pb-6">
      {/* ページタイトル */}
      <div>
        <h1
          className="text-[28px] font-black leading-tight mb-6"
          style={{ color: '#171717' }}
        >
          GRAINの使い方
        </h1>

        {/* リード文 */}
        <div
          className="rounded-[14px] px-5 py-5"
          style={{ background: '#F8F7F4', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[14px] leading-[1.8]"
            style={{ color: '#171717' }}
          >
            GRAINは、写真を始めたばかりの人が「分からない」「うまく撮れない」を少しずつ解決していくための教本アプリです。
          </p>
          <p
            className="text-[14px] leading-[1.8] mt-3"
            style={{ color: '#171717' }}
          >
            最初から全部読む必要はありません。<br />
            今の自分に必要なところから読んで大丈夫です。
          </p>
        </div>
      </div>

      {/* セクション 1: 困っていることから探す */}
      <section>
        <h2
          className="text-[16px] font-bold mb-4"
          style={{ color: '#171717' }}
        >
          まずは、困っていることから探す
        </h2>
        <div
          className="rounded-[14px] px-5 py-5 mb-4"
          style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[13px] leading-[1.8]"
            style={{ color: '#3A3A3A' }}
          >
            写真が暗い、顔が暗い、ピントが合わない、背景がボケない。<br />
            そんな時は、用語から探すよりも「こんな時に見る」から入るのがおすすめです。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: '写真が暗い', id: 'dark-photo-trouble' },
            { label: '顔が暗い', id: 'dark-face-trouble' },
            { label: 'ピントが合わない', id: 'focus-trouble' },
            { label: '背景がボケない', id: 'background-blur-trouble' },
          ].map(({ label, id }) => (
            <Link
              key={id}
              href={`/lessons/${id}`}
              className="inline-block px-4 py-3 rounded-[10px] text-[13px] font-medium transition-all active:scale-95"
              style={{
                background: '#F8F7F4',
                border: '1px solid #DDD4C6',
                color: '#6F4E2E',
              }}
            >
              → {label}
            </Link>
          ))}
        </div>
      </section>

      {/* セクション 2: 検索 */}
      <section>
        <h2
          className="text-[16px] font-bold mb-4"
          style={{ color: '#171717' }}
        >
          言葉が分からない時は検索する
        </h2>
        <div
          className="rounded-[14px] px-5 py-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[13px] leading-[1.8] mb-3"
            style={{ color: '#3A3A3A' }}
          >
            F値、ISO、露出、ホワイトバランスなど、聞いたことはあるけれど意味があいまいな言葉は検索してみてください。
          </p>
          <p
            className="text-[13px] leading-[1.8]"
            style={{ color: '#3A3A3A' }}
          >
            GRAINでは、用語の意味だけでなく、実際の撮影でどう使うかまで読めるようにしています。
          </p>
        </div>
        <p
          className="text-[12px] mt-4 mb-2"
          style={{ color: '#8B8270' }}
        >
          検索例：
        </p>
        <div className="flex flex-wrap gap-2">
          {['F値', '露出', 'ピント', '逆光', 'ストロボ'].map((term) => (
            <span
              key={term}
              className="px-3 py-1.5 rounded-full text-[12px]"
              style={{
                background: '#F0EDE5',
                color: '#7A7168',
                border: '1px solid #DDD4C6',
              }}
            >
              {term}
            </span>
          ))}
        </div>
      </section>

      {/* セクション 3: 何から読めばいいか迷ったら */}
      <section>
        <h2
          className="text-[16px] font-bold mb-4"
          style={{ color: '#171717' }}
        >
          何から読めばいいか迷ったら
        </h2>
        <div
          className="rounded-[14px] px-5 py-5 mb-4"
          style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[13px] leading-[1.8]"
            style={{ color: '#3A3A3A' }}
          >
            何から読めばいいか迷ったら、まずはこの3つだけで大丈夫です。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: 'カメラ任せから卒業する', id: 'camera-auto-graduate' },
            { label: '露出とは何か', id: 'exposure-basic' },
            { label: '写真が暗い時の考え方', id: 'dark-photo-trouble' },
          ].map(({ label, id }) => (
            <Link
              key={id}
              href={`/lessons/${id}`}
              className="inline-block px-4 py-3 rounded-[10px] text-[13px] font-medium transition-all active:scale-95"
              style={{
                background: '#F8F7F4',
                border: '1px solid #DDD4C6',
                color: '#6F4E2E',
              }}
            >
              → {label}
            </Link>
          ))}
        </div>
      </section>

      {/* セクション 4: お気に入り */}
      <section>
        <h2
          className="text-[16px] font-bold mb-4"
          style={{ color: '#171717' }}
        >
          気になる記事はお気に入りに入れる
        </h2>
        <div
          className="rounded-[14px] px-5 py-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[13px] leading-[1.8]"
            style={{ color: '#3A3A3A' }}
          >
            あとで読み返したい教材は、お気に入りに入れておくと便利です。<br />
            撮影前や、撮影で失敗したあとに見返す使い方がおすすめです。
          </p>
        </div>
      </section>

      {/* セクション 5: 作例写真 */}
      <section>
        <h2
          className="text-[16px] font-bold mb-4"
          style={{ color: '#171717' }}
        >
          作例写真について
        </h2>
        <div
          className="rounded-[14px] px-5 py-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[13px] leading-[1.8]"
            style={{ color: '#3A3A3A' }}
          >
            現在、作例写真は順次追加予定です。<br />
            今後は、露出補正、F値、ストロボ、逆光などを写真で見比べられるようにしていきます。
          </p>
        </div>
      </section>

      {/* ホームへのリンク */}
      <div className="mt-4">
        <Link
          href="/"
          className="inline-block px-5 py-3 rounded-[10px] text-[13px] font-medium transition-all active:scale-95 text-white"
          style={{ background: '#6F4E2E', cursor: 'pointer' }}
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
