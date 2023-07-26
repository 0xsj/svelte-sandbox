import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'

/**
 *
 */
export const userRouter = router({
  current: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({ where: { id: ctx.user.id } })
  }),
  create: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      //create user and link it to the user
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          id: input.id,
        },
      })
    }),
})
