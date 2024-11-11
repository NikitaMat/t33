import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const userRouter = createTRPCRouter({
    getUserData: publicProcedure
      .input(z.object({ userId: z.string() })) // Eingabedaten validieren
      .query(async ({ctx, input }) => {
        const user = await ctx.db.user.findUnique({
          where: { id: input.userId },
        });
  
        if (!user) {
          throw new Error('Benutzer nicht gefunden');
        }
  
        return user;
      }),
});

