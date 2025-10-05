import fp from 'fastify-plugin'
import type { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '../../dist/generated/prisma/client.js'
import { withAccelerate } from '@prisma/extension-accelerate'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export const initPrisma = () => new PrismaClient().$extends(withAccelerate())

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = initPrisma()

  await prisma.$connect()

  server.decorate('prisma', prisma as unknown as any)

  server.addHook('onClose', async server => {
    await server.prisma.$disconnect()
  })
})

export default prismaPlugin
