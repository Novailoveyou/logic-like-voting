import type { FastifyPluginCallback } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'
import voteSchema from './vote.schema.js'
import { checkIsLimit } from '../../utils.js'

const voteController: FastifyPluginCallback = (app, options, done) => {
  /** @description Get total votes for the idea */
  app.get<{ Params: FromSchema<typeof voteSchema.params> }>(
    '/:ideaId',
    {
      schema: voteSchema,
    },
    async (request, reply) => {
      const ideaVotes = await app.prisma.idea.findUnique({
        where: {
          id: request.params.ideaId,
        },
        select: {
          votes: {
            select: {
              value: true,
            },
          },
        },
      })

      if (!ideaVotes?.votes.length)
        return reply.code(404).send({ error: 'Голоса не найдены' })

      return reply
        .code(200)
        .send(ideaVotes.votes.reduce((total, vote) => total + vote.value, 0))
    },
  )

  /** @description Get my votes for the idea */
  app.get<{ Params: FromSchema<typeof voteSchema.params> }>(
    '/:ideaId/me',
    {
      schema: voteSchema,
    },
    async (request, reply) => {
      const vote = await app.prisma.vote.findUnique({
        where: {
          id: {
            ideaId: request.params.ideaId,
            ip: request.ip,
          },
        },
        select: {
          value: true,
        },
      })

      if (!vote) return reply.code(404).send({ error: 'Голос не найден' })

      const value = vote.value

      return reply.code(200).send({ value, isLimit: checkIsLimit(value) })
    },
  )

  /** @description Cast vote for the idea */
  app.post<{ Params: FromSchema<typeof voteSchema.params> }>(
    '/:ideaId',
    {
      schema: voteSchema,
    },
    async (request, reply) => {
      const ideaId = request.params.ideaId
      const ip = request.ip

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

      return reply.code(200).send(newVote.value)
    },
  )

  done()
}

export default voteController
