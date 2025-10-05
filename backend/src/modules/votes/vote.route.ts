import type { FastifyPluginCallback } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'
import voteSchema from './vote.schema.js'

const voteController: FastifyPluginCallback = (app, options, done) => {
  const select = {
    id: true,
    value: true,
    userIp: true,
    ideaId: true,
  } as const satisfies Required<
    Parameters<(typeof app.prisma.vote)['findUnique' | 'create' | 'update']>
  >['0']['select']

  const userSelect = {
    ip: true,
  } as const satisfies Required<
    Parameters<(typeof app.prisma.user)['create' | 'findUnique']>
  >['0']['select']

  app.get('/', async (_, reply) => {
    const votes = await app.prisma.vote.findMany({
      select: {
        id: true,
        ideaId: true,
        userIp: true,
        value: true,
      },
    })

    if (!votes) {
      return reply.code(404).send({ error: 'Голоса не найдены' })
    }

    return reply.code(200).send(votes)
  })

  app.post<{ Querystring: FromSchema<typeof voteSchema.post.querystring> }>(
    '/',
    {
      schema: voteSchema.post,
    },
    async (request, reply) => {
      const ideaId = request.query.ideaId
      const ip = request.ip

      const user =
        (await app.prisma.user.findUnique({
          select: userSelect,
          where: {
            ip,
          },
        })) ||
        (await app.prisma.user.create({
          select: userSelect,
          data: {
            ip,
          },
        }))

      const vote = await app.prisma.vote.findUnique({
        select,
        where: {
          userIp: user.ip,
        },
      })

      if (!vote) {
        const newVote = await app.prisma.vote.create({
          select,
          data: {
            userIp: user.ip,
            ideaId,
            value: 1,
          },
        })

        return reply.code(201).send(newVote)
      }

      if (vote.value >= 10)
        return reply.code(409).send({
          error: 'Превышено максимальное количество голосов',
        })

      const patchedVote = await app.prisma.vote.update({
        select,
        where: {
          id: vote.id,
        },
        data: {
          value: vote.value + 1,
        },
      })

      return reply.code(204).send(patchedVote)
    },
  )

  done()
}

export default voteController
