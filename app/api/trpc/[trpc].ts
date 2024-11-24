import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server/router";

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
  });

export { handler as GET, handler as POST };
