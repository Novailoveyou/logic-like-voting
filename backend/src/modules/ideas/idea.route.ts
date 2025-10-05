import type { FastifyPluginCallback } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'
import ideaSchema from './idea.schema.js'

const ideaController: FastifyPluginCallback = (app, options, done) => {
  const select = {
    id: true,
    title: true,
    description: true,
    votes: {
      select: {
        id: true,
        value: true,
        userIp: true,
      },
    },
  } as const satisfies Required<
    Parameters<(typeof app.prisma.idea)['findMany' | 'findUnique']>
  >['0']['select']

  const voteSelect = {
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
    const ideas = await app.prisma.idea.findMany({
      select,
    })

    if (!ideas) return reply.code(404).send({ error: 'Идеи не найдены' })

    return reply.code(200).send(ideas)
  })

  app.post<{ Params: FromSchema<typeof ideaSchema.post.params> }>(
    '/:id/vote',
    {
      schema: ideaSchema.post,
    },
    async (request, reply) => {
      const id = request.params.id
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

      const vote = await app.prisma.vote.findFirst({
        select: voteSelect,
        where: {
          userIp: user.ip,
          ideaId: id,
        },
      })

      if (!vote) {
        const newVote = await app.prisma.vote.create({
          select: voteSelect,
          data: {
            userIp: user.ip,
            ideaId: id,
            value: 1,
          },
        })

        if (!newVote)
          return reply.code(400).send({ error: 'Не удалось проголосовать' })

        const idea = await app.prisma.idea.findUnique({
          select,
          where: { id },
        })

        return reply.code(201).send(idea)
      }

      if (vote.value >= 10)
        return reply.code(409).send({
          error: 'Превышено максимальное количество голосов',
        })

      const patchedVote = await app.prisma.vote.update({
        select: voteSelect,
        where: {
          id: vote.id,
        },
        data: {
          value: vote.value + 1,
        },
      })

      if (!patchedVote)
        return reply.code(400).send({ error: 'Не удалось проголосовать' })

      const idea = await app.prisma.idea.findUnique({
        select,
        where: { id },
      })

      return reply.code(200).send(idea)
    },
  )

  done()
}

export default ideaController
