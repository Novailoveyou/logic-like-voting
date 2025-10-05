import type { FastifySchema } from 'fastify'

/** @todo add responses schemas */
const voteSchema = {
  post: {
    querystring: {
      type: 'object',
      required: ['ideaId'],
      properties: {
        ideaId: { type: 'string' },
      },
    },
  },
} as const satisfies Record<string, FastifySchema>

export default voteSchema
