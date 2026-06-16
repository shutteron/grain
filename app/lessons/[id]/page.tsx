'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState, use } from 'react';
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

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const isBeginnerLesson = lesson.level === 'intro' || lesson.level === 'basic';

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

        {/* まずここだけ読めばOK */}
        <div
          className="rounded-[12px] px-4 py-4 mt-4"
          style={{ background: '#F8F7F4', border: '1px solid #E5E0D8' }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2"
            style={{ color: '#C4B8A8' }}
          >
            まずここだけ読めばOK
          </p>
          <div className="flex flex-col gap-2">
            {lesson.beginnerExplanation.split('\n\n').slice(0, lesson.id === 'iso-basic' ? 2 : 1).map((para, i) => (
              <p
                key={i}
                className="text-[13px] leading-relaxed"
                style={{ color: '#3A3A3A' }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── 本文 ── */}
      <div className="flex flex-col">

        {/* まず何を覚える？ or もっと詳しく知りたい人へ */}
        <section className="px-5 py-7">
          <SLabel>{lesson.id === 'iso-basic' ? 'もっと詳しく知りたい人へ' : 'まず何を覚える？'}</SLabel>
          {isBeginnerLesson && lesson.beginnerExplanation.split('\n\n').length > 1 ? (
            <div>
              {lesson.id !== 'iso-basic' && (
                <div className="flex flex-col gap-3 mb-4">
                  <p
                    className="text-[13px] leading-[1.8]"
                    style={{ color: '#3A3A3A' }}
                  >
                    {lesson.beginnerExplanation.split('\n\n')[0]}
                  </p>
                </div>
              )}
              {expandedSection === 'beginner-explanation' && (
                <div className="flex flex-col gap-3 mb-4">
                  {lesson.beginnerExplanation.split('\n\n').slice(1).map((para, i) => (
                    <p
                      key={i}
                      className="text-[13px] leading-[1.8]"
                      style={{ color: '#3A3A3A' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
              {lesson.id === 'iso-basic' && expandedSection !== 'beginner-explanation' && (
                <div className="flex flex-col gap-3 mb-4">
                  {lesson.beginnerExplanation.split('\n\n').slice(2).map((para, i) => (
                    <p
                      key={i}
                      className="text-[13px] leading-[1.8]"
                      style={{ color: '#3A3A3A' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
              {(lesson.id !== 'iso-basic' || expandedSection === 'beginner-explanation') && (
                <button
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === 'beginner-explanation' ? null : 'beginner-explanation'
                    )
                  }
                  className="text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-colors"
                  style={{
                    background: '#F0EBE5',
                    color: '#7A6040',
                  }}
                >
                  {expandedSection === 'beginner-explanation'
                    ? '閉じる'
                    : 'もっと詳しく知りたい人へ'}
                </button>
              )}
            </div>
          ) : (
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
          )}
        </section>

        {lesson.id !== 'iso-basic' && (
          <>
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
          </>
        )}

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

        {!isBeginnerLesson && (
          <>
            <Divider />

            {/* 撮影現場メモ */}
            <section className="px-5 py-7">
              <SLabel>撮影現場メモ</SLabel>
              <div
                className="rounded-[14px] px-5 py-5"
                style={{ background: '#FDFAF4', border: '1px solid #EDE4D0' }}
              >
                <p
                  className="text-[10px] font-bold tracking-[0.1em] uppercase mb-3"
                  style={{ color: '#C4A870' }}
                >
                  プロのワンポイント
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
          </>
        )}

        {/* 作例で見る */}
        <section className="px-5 py-7">
          <SLabel>作例で見る</SLabel>
          {lesson.imageExamples && lesson.imageExamples.length > 0 ? (
            <div className="flex flex-col gap-6">
              {lesson.imageExamples.map((example, i) => (
                <div
                  key={i}
                  className="rounded-[14px] overflow-hidden"
                  style={{ border: '1px solid #E5E0D8' }}
                >
                  {/* 画像比較または単体表示 */}
                  {example.beforeImage && example.afterImage ? (
                    <div className="flex flex-col">
                      <div className="flex gap-1 bg-[#F8F7F4]">
                        <div className="flex-1">
                          <img
                            src={example.beforeImage}
                            alt="Before"
                            className="w-full h-auto block"
                          />
                        </div>
                        <div className="flex-1">
                          <img
                            src={example.afterImage}
                            alt="After"
                            className="w-full h-auto block"
                          />
                        </div>
                      </div>
                      <div className="px-4 py-4 bg-white">
                        <p
                          className="text-[12px] font-semibold mb-1"
                          style={{ color: '#1F1F1F' }}
                        >
                          {example.title}
                        </p>
                        <p
                          className="text-[11px] leading-relaxed"
                          style={{ color: '#8B8270' }}
                        >
                          {example.description}
                        </p>
                      </div>
                    </div>
                  ) : example.beforeImage || example.afterImage ? (
                    <div>
                      <img
                        src={example.beforeImage || example.afterImage || ''}
                        alt={example.title}
                        className="w-full h-auto block"
                      />
                      <div className="px-4 py-4 bg-white">
                        <p
                          className="text-[12px] font-semibold mb-1"
                          style={{ color: '#1F1F1F' }}
                        >
                          {example.title}
                        </p>
                        <p
                          className="text-[11px] leading-relaxed"
                          style={{ color: '#8B8270' }}
                        >
                          {example.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-4">
                      <p
                        className="text-[12px] font-semibold mb-1"
                        style={{ color: '#1F1F1F' }}
                      >
                        {example.title}
                      </p>
                      <p
                        className="text-[11px] leading-relaxed"
                        style={{ color: '#8B8270' }}
                      >
                        {example.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-[14px] px-4 py-5 text-center"
              style={{
                background: 'transparent',
                border: '1px solid #E5E0D8',
              }}
            >
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: '#B0A898' }}
              >
                作例写真は準備中です。<br />
                この教材では、あとから比較写真を<br />
                追加していきます。
              </p>
            </div>
          )}
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

        {/* 撮影現場メモ（初級レッスン向け - ページ最下部） */}
        {isBeginnerLesson && (
          <>
            <Divider />
            <section className="px-5 py-7">
              <SLabel>撮影現場メモ</SLabel>
              <div
                className="rounded-[14px] px-5 py-5"
                style={{ background: '#FDFAF4', border: '1px solid #EDE4D0' }}
              >
                <p
                  className="text-[10px] font-bold tracking-[0.1em] uppercase mb-3"
                  style={{ color: '#C4A870' }}
                >
                  プロのワンポイント
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
          </>
        )}

        {/* 現場ではどう使う？（iso-basic のみ下部に表示） */}
        {lesson.id === 'iso-basic' && (
          <>
            <Divider />
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
