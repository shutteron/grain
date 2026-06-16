'use client';

import { useState } from 'react';

interface ExpandableSectionProps {
  lessonId: string;
  isBeginnerLesson: boolean;
  explanationParagraphs: string[];
  showFirstParagraph: boolean;
  labelWhenClosed: string;
  labelWhenOpen: string;
}

export default function LessonExpandableSection({
  lessonId,
  isBeginnerLesson,
  explanationParagraphs,
  showFirstParagraph,
  labelWhenClosed,
  labelWhenOpen,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isBeginnerLesson || explanationParagraphs.length <= 1) {
    return (
      <div className="flex flex-col gap-3">
        {explanationParagraphs.map((para, i) => (
          <p
            key={i}
            className="text-[13px] leading-[1.8]"
            style={{ color: '#3A3A3A' }}
          >
            {para}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div>
      {showFirstParagraph && (
        <div className="flex flex-col gap-3 mb-4">
          <p
            className="text-[13px] leading-[1.8]"
            style={{ color: '#3A3A3A' }}
          >
            {explanationParagraphs[0]}
          </p>
        </div>
      )}
      {isExpanded && (
        <div className="flex flex-col gap-3 mb-4">
          {explanationParagraphs.slice(showFirstParagraph ? 1 : 0).map((para, i) => (
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
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-colors"
        style={{
          background: '#F0EBE5',
          color: '#7A6040',
        }}
      >
        {isExpanded ? '閉じる' : labelWhenClosed}
      </button>
    </div>
  );
}
