import { postRouter} from "~/server/api/routers/post";
import { userRouter} from "~/server/api/routers/user";

import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  user : userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
