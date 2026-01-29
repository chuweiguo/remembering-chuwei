import { ReactNode } from 'react';
import { Header } from './Header';
import { MusicPlayer } from './MusicPlayer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>In loving memory of 郭楚惟 (Chuwei Guo)</p>
        </div>
      </footer>
      <MusicPlayer />
    </div>
  );
}
