import { getLessonsByLevel, levelOrder, levelLabel } from '@/lib/lessons';
import LessonCard from '@/components/LessonCard';
import SectionTitle from '@/components/SectionTitle';

const levelDesc: Record<string, string> = {
  intro:        'カメラの基礎と考え方を身につける',
  basic:        'よくある失敗を自力で解決できるようにする',
  intermediate: '光をコントロールして写真を設計する',
  advanced:     '作品レベルのライティングを習得する',
  field:        '現場での判断力と仕事への応用',
};

export default function LevelsPage() {
  return (
    <div className="px-5 pt-12 pb-6 flex flex-col gap-10">
      <SectionTitle sub="入門から現場編まで順番に積み上げる">
        レベル順に学ぶ
      </SectionTitle>

      {levelOrder.map((level) => {
        const items = getLessonsByLevel(level);
        if (items.length === 0) return null;
        return (
          <div key={level}>
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <h2
                  className="text-[15px] font-bold"
                  style={{ color: '#1F1F1F' }}
                >
                  {levelLabel[level]}
                </h2>
                <span
                  className="text-[11px]"
                  style={{ color: '#B0A898' }}
                >
                  {items.length}件
                </span>
              </div>
              <p className="text-[11px]" style={{ color: '#9E9E9E' }}>
                {levelDesc[level]}
              </p>
              <div
                className="mt-3 mb-1"
                style={{ height: '1px', background: '#E5E0D8' }}
              />
            </div>
            <div className="flex flex-col gap-3">
              {items.map((l) => <LessonCard key={l.id} lesson={l} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
