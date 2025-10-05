import type { FastifyPluginCallback } from 'fastify'

const userController: FastifyPluginCallback = (app, options, done) => {
  const select = {
    ip: true,
  } as const satisfies Required<
    Parameters<(typeof app.prisma.user)['findUnique' | 'create']>
  >['0']['select']

  app.get('/me', async (request, reply) => {
    const ip = request.ip
    const user = await app.prisma.user.findUnique({
      select,
      where: {
        ip,
      },
    })

    if (!user) {
      const newUser = await app.prisma.user.create({
        select,
        data: {
          ip,
        },
      })

      if (!newUser)
        return reply.code(400).send({
          error: 'Не удалось создать пользователя',
        })

      return reply.code(201).send(newUser)
    }

    return reply.code(200).send(user)
  })

  done()
}

export default userController
