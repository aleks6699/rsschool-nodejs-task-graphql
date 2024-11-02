import { GraphQLList, GraphQLString } from "graphql";
import { Post } from "../types/post.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";


export const posts = {
  type: new GraphQLList(Post),
  resolve: (_root: any, _args: any, context: { prisma: PrismaClient }) => {
    return context.prisma.post.findMany();
  },
}

export const post = {
  type: Post,
  args: {
      id: { type: UUIDType },
  },
  resolve: (_root: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      return context.prisma.post.findUnique({ where: { id: args.id } });
  },
}
export const deletePost = {
  type: Post,
  args: {
    id: { type: UUIDType },
  },
  resolve: (_root, args: { id: string }, context: PrismaClient) => {
    const { id } = args;
    return context.post.delete({ where: { id } });
  },
}
export const createPost = {
  type: Post,
  args: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
  resolve: async (root, args: { title: string, content: string, authorId: string }, context: PrismaClient) => {
    return context.post.create({ data: args });
  },
}
export const changePost = {
  type: Post,
  args: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
  resolve: async (root, args: { id: string, title: string, content: string }, context: PrismaClient) => {
    const { id, title, content } = args;
    return context.post.update({
      where: { id }, 
      data: { title, content }
    });
  },
}