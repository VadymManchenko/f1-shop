import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { RaceCalendarStrip } from '@/features/calendar/RaceCalendarStrip';

export function Layout() {
  return (
    <div className="flex min-h-full flex-col bg-ink-50">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <RaceCalendarStrip />
      <Footer />
    </div>
  );
}
