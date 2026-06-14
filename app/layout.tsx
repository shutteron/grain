import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

export const metadata: Metadata = {
  title: 'GRAIN — 写真の知識を、感覚に変える。',
  description: '写真初心者が撮影現場で使える教本アプリ。用語・失敗解決・ライティングを感覚で理解できる。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <FavoritesProvider>
          {/* PCで中央寄せ・最大幅 / pb-28=112px でNavBarに隠れない */}
          <div className="max-w-[480px] mx-auto min-h-screen pb-28 bg-g-bg">
            {children}
          </div>
          <NavBar />
        </FavoritesProvider>
      </body>
    </html>
  );
}
