import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './shema.js';
import depthLimit from 'graphql-depth-limit';


const maxDepth = 5;



const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { variables, query } = req.body;
      const errors = validate(schema, parse(query), [depthLimit(maxDepth)]);
      if (errors.length) {
        return { errors };
      }

      

      return graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
        },
      })
    },
  });
};

export default plugin;
