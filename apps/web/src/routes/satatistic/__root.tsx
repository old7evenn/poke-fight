import type { QueryClient } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RouterContext {
  queryClient: QueryClient;
}

const Root = () => (
  <div className="flex justify-center">
    <Outlet />
    <TanStackRouterDevtools />
    <ReactQueryDevtools />
  </div>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
});
