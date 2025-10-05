import type { FastifyPluginCallback } from 'fastify'

const userController: FastifyPluginCallback = (app, options, done) => {
  app.get('/', async (_, reply) => {
    const users = await app.prisma.user.findMany({
      select: {
        id: true,
        ip: true,
        votes: {
          select: {
            id: true,
            value: true,
            ideaId: true,
          },
        },
      },
    })

    if (!users) {
      return reply.code(404).send({ error: 'Пользователи не найдены' })
    }

    return reply.code(200).send(users)
  })

  done()
}

export default userController
