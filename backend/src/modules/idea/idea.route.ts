import type { FastifyPluginCallback } from 'fastify'
import { checkIsLimit } from '../../utils.js'

const ideaController: FastifyPluginCallback = (app, options, done) => {
  /** @description Get all ideas */
  app.get('/', async (request, reply) => {
    const ip = request.ip

    const ideas = await app.prisma.idea.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        votes: {
          select: {
            ip: true,
            value: true,
          },
        },
      },
    })

    if (!ideas) return reply.code(404).send({ error: 'Идеи не найдены' })

    // TODO: optimize this
    const sortedIdeas = ideas
      .map(({ votes, ...idea }) => {
        let totalVotes = 0
        let myVotes = 0

        votes.forEach(vote => {
          if (vote.ip === ip) myVotes += vote.value
          totalVotes += vote.value
        })

        return {
          ...idea,
          totalVotes,
          myVotes,
          isLimit: checkIsLimit(myVotes),
        }
      })
      .sort((a, b) => (a.totalVotes >= b.totalVotes ? -1 : 1))

    return reply.code(200).send(sortedIdeas)
  })

  done()
}

export default ideaController
