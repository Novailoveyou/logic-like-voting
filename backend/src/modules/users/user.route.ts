import type { FastifyPluginCallback } from 'fastify'

const userController: FastifyPluginCallback = (app, options, done) => {
  const select = {
    id: true,
    ip: true,
    votes: {
      select: {
        id: true,
        value: true,
        ideaId: true,
      },
    },
  } as const satisfies Required<
    Parameters<(typeof app.prisma.user)['findMany' | 'findUnique']>
  >['0']['select']

  app.get('/', async (_, reply) => {
    const users = await app.prisma.user.findMany({
      select,
    })

    if (!users) {
      return reply.code(404).send({ error: 'Пользователи не найдены' })
    }

    return reply.code(200).send(users)
  })

  app.get('/me', async (request, reply) => {
    const ip = request.ip
    const user = await app.prisma.user.findUnique({
      where: {
        ip,
      },
      select,
    })

    if (!user) {
      const newUser = await app.prisma.user.create({
        select,
        data: {
          ip,
        },
      })

      return reply.code(201).send(newUser)
    }

    return reply.code(200).send(user)
  })

  done()
}

export default userController
