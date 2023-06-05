import { createTRPCRouter } from '@/server/api/trpc'
import { contactRouter } from '@/server/api/routers/contact'

export const appRouter = createTRPCRouter({
  contact: contactRouter
})

export type AppRouter = typeof appRouter
