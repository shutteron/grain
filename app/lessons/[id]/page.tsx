import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllLessons,
  getLessonById,
  getRelatedLessons,
  getNextLesson,
  levelLabel,
  categoryLabel,
} from '@/lib/lessons';
import FavoriteButton from '@/components/FavoriteButton';
import FavoriteButtonFull from '@/components/FavoriteButtonFull';
import LessonCard from '@/components/LessonCard';
import type { Lesson } from '@/types/lesson';

export async function generateStaticParams() {
  return getAllLessons().map((l) => ({ id: l.id }));
}

const levelStyle: Record<Lesson['level'], { bg: string; text: string }> = {
  intro:        { bg: '#F4F0E8', text: '#7A6040' },
  basic:        { bg: '#EDF2E8', text: '#506840' },
  intermediate: { bg: '#EAE8F4', text: '#4A4870' },
  advanced:     { bg: '#F4EBE0', text: '#7A4830' },
  field:        { bg: '#F4E8EC', text: '#783848' },
};

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-bold tracking-[0.12em] uppercase mb-3"
      style={{ color: '#9E9E9E' }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <hr style={{ borderColor: '#E5E0D8', margin: '0' }} />;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  /* 関連記事：現在の教材自身を除外 */
  const related = getRelatedLessons(lesson.relatedIds).filter(
    (l) => l.id !== lesson.id
  );

  /* 次に読む */
  const next = getNextLesson(lesson);

  const lvStyle = levelStyle[lesson.level];

  return (
    <article>

      {/* ── ヘッダー ── */}
      <div className="px-5 pt-7 pb-7" style={{ borderBottom: '1px solid #E5E0D8' }}>

        {/* パンくず */}
        <div className="flex items-center gap-1.5 mb-5">
          <Link href="/" className="text-[11px] transition-colors" style={{ color: '#B0A898' }}>
            ホーム
          </Link>
          <span className="text-[11px]" style={{ color: '#C4B8A8' }}>/</span>
          <span className="text-[11px]" style={{ color: '#B0A898' }}>
            {levelLabel[lesson.level]}
          </span>
        </div>

        {/* タイトル + 小さな★ */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h1
            className="text-[22px] font-black leading-tight flex-1"
            style={{ color: '#1F1F1F' }}
          >
            {lesson.title}
          </h1>
          <FavoriteButton id={lesson.id} size="md" />
        </div>

        {/* レベル + カテゴリ */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full"
            style={{ background: lvStyle.bg, color: lvStyle.text }}
          >
            {levelLabel[lesson.level]}
          </span>
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full"
            style={{ background: '#F4F0EB', color: '#8A6F4D' }}
          >
            {categoryLabel[lesson.category]}
          </span>
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {lesson.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: '#F8F7F4', color: '#B0A898', border: '1px solid #E5E0D8' }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* テキスト付きお気に入りボタン */}
        <FavoriteButtonFull id={lesson.id} />

        {/* 一言でいうと */}
        <div
          className="rounded-[12px] px-4 py-4 mt-5"
          style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2"
            style={{ color: '#C4B8A8' }}
          >
            一言でいうと
          </p>
          <p
            className="text-[14px] font-semibold leading-relaxed"
            style={{ color: '#1F1F1F' }}
          >
            {lesson.summary}
          </p>
        </div>
      </div>

      {/* ── 本文 ── */}
      <div className="flex flex-col">

        {/* まず何を覚える？ */}
        <section className="px-5 py-7">
          <SLabel>まず何を覚える？</SLabel>
          <div className="flex flex-col gap-3">
            {lesson.beginnerExplanation.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-[13px] leading-[1.8]"
                style={{ color: '#3A3A3A' }}
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        <Divider />

        {/* 現場ではどう使う？ */}
        <section className="px-5 py-7">
          <SLabel>現場ではどう使う？</SLabel>
          <div className="flex flex-col gap-3">
            {lesson.fieldUse.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-[13px] leading-[1.8]"
                style={{ color: '#3A3A3A' }}
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        <Divider />

        {/* よくある失敗 */}
        <section className="px-5 py-7">
          <SLabel>よくある失敗</SLabel>
          <ul className="flex flex-col gap-3.5">
            {lesson.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-0.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: '#F4ECE8', color: '#8A6F4D', border: '1px solid #E5D8CF' }}
                >
                  {i + 1}
                </span>
                <span className="text-[13px] leading-[1.75]" style={{ color: '#3A3A3A' }}>
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* じゅんいちさんの現場メモ */}
        <section className="px-5 py-7">
          <SLabel>じゅんいちさんの現場メモ</SLabel>
          <div
            className="rounded-[14px] px-5 py-5"
            style={{ background: '#FDFAF4', border: '1px solid #EDE4D0' }}
          >
            <p
              className="text-[10px] font-bold tracking-[0.1em] uppercase mb-3"
              style={{ color: '#C4A870' }}
            >
              Field Note
            </p>
            <div className="flex flex-col gap-3">
              {lesson.junichiNote.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="text-[13px] leading-[1.8]"
                  style={{ color: '#4A3820' }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* 練習課題 */}
        <section className="px-5 py-7">
          <SLabel>練習課題</SLabel>
          <div
            className="rounded-[14px] px-5 py-5"
            style={{ background: '#F4F6FA', border: '1px solid #D8DDE8' }}
          >
            <p
              className="text-[10px] font-bold tracking-[0.1em] uppercase mb-3"
              style={{ color: '#8898B0' }}
            >
              Practice
            </p>
            <p className="text-[13px] leading-[1.8]" style={{ color: '#2A3040' }}>
              {lesson.practice}
            </p>
          </div>
        </section>

        {/* 関連記事 */}
        {related.length > 0 && (
          <>
            <Divider />
            <section className="px-5 py-7">
              <SLabel>関連記事</SLabel>
              <div className="flex flex-col gap-3">
                {related.map((l) => (
                  <LessonCard key={l.id} lesson={l} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* 次に読む */}
        {next && (
          <>
            <Divider />
            <section className="px-5 py-7">
              <SLabel>次に読む</SLabel>
              <LessonCard lesson={next} />
            </section>
          </>
        )}

        {/* 最下部お気に入りボタン */}
        <Divider />
        <div className="px-5 py-7 flex flex-col items-center gap-3">
          <p className="text-[11px]" style={{ color: '#B0A898' }}>
            この教材をブックマークする
          </p>
          <div className="w-full max-w-[240px]">
            <FavoriteButtonFull id={lesson.id} />
          </div>
        </div>

      </div>
    </article>
  );
}
