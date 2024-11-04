import { GraphQLNonNull, GraphQLString } from "graphql";
import { UUIDType } from "../types/uuid.js";

export const subscribeTo = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args, { prisma }) => {
    await prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: args.userId,
        authorId: args.authorId,
      },
    });
    return `Hi`;
  },
}

export const unsubscribeFrom = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args, { prisma }) => {
    await prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      },
    });
    return `Hi`;
  },
}
