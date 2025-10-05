import type { FastifyPluginCallback } from 'fastify'

const ideaController: FastifyPluginCallback = (app, options, done) => {
  app.get('/', async (_, reply) => {
    const ideas = await app.prisma.idea.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        votes: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!ideas) {
      return reply.code(404).send({ error: 'Идеи не найдены' })
    }

    return reply.code(200).send(ideas)
  })

  done()
}

export default ideaController
