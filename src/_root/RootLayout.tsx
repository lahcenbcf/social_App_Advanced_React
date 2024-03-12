import BottomBar from '@/components/shared/BottomBar';
import LeftBar from '@/components/shared/LeftBar';
import TopBar from '@/components/shared/TopBar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftBar />

      <section className="w-full px-6">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
