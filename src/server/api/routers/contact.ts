import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const contactRouter = createTRPCRouter({
  getAllContacts: publicProcedure.query(async ({ ctx }) => {
    const contacts = await ctx.prisma.contact.findMany()
    return contacts
  }),
  createOrUpdateContact: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        contact: z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string()
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        const contactUpdated = await ctx.prisma.contact.update({
          where: {
            id: input.id
          },
          data: input.contact
        })
        return contactUpdated
      }

      const existingContact = await ctx.prisma.contact.findUnique({
        where: {
          email: input.contact.email
        }
      })
      if (existingContact) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already exists'
        })
      }

      const contactCreated = await ctx.prisma.contact.create({
        data: input.contact
      })
      return contactCreated
    }),
  deleteContact: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const contact = await ctx.prisma.contact.findUnique({
        where: {
          id: input.id
        }
      })

      if (!contact) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Contact not found'
        })
      }

      await ctx.prisma.contact.delete({
        where: {
          id: input.id
        }
      })
      return true
    }),
  getContact: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const contact = await ctx.prisma.contact.findUnique({
        where: {
          id: input.id
        }
      })

      if (!contact) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Contact not found'
        })
      }

      return contact
    })
})
