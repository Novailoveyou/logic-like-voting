import type { FastifyPluginCallback } from 'fastify'
import { checkIsLimit } from '../../utils.js'
import ideaSchema from './idea.schema.js'
import type { FromSchema } from 'json-schema-to-ts'

const ideaController: FastifyPluginCallback = (app, options, done) => {
  /** @description Get all ideas */
  app.get('/', async (request, reply) => {
    const ip = request.ips?.[0] || request.ip

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

  /** @description Cast vote for the idea */
  app.patch<{ Params: FromSchema<typeof ideaSchema.params> }>(
    '/:id/vote',
    {
      schema: ideaSchema,
    },
    async (request, reply) => {
      const ideaId = request.params.id
      const ip = request.ips?.[0] || request.ip

      const vote = await app.prisma.vote.findUnique({
        where: {
          id: {
            ideaId,
            ip,
          },
        },
      })

      if (typeof vote?.value === 'number' && checkIsLimit(vote.value))
        return reply.code(409).send({
          error: 'Превышен лимит голосов',
        })

      const newVote = await app.prisma.vote.upsert({
        where: {
          id: {
            ideaId,
            ip,
          },
        },
        create: {
          ip,
          ideaId,
          value: 1,
        },
        update: {
          value: {
            increment: 1,
          },
        },
        select: {
          value: true,
        },
      })

      return reply
        .code(200)
        .send({ value: newVote.value, isLimit: checkIsLimit(newVote.value) })
    },
  )

  done()
}

export default ideaController
