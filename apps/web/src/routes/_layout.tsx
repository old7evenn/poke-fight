import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Header } from './-components/Header/Header';

const RootLayout = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden md:p-6 p-2 max-w-[90rem] mx-auto">
      <div>
        <Header />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_layout')({
  component: RootLayout,
});
