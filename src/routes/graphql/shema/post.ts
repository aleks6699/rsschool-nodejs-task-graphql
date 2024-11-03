import { GraphQLList, GraphQLString } from "graphql";
import { ChangePostInput, CreatePostInput, Post } from "../types/post.js";
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



export const changePost = {
  type: Post,
  args: {
    id: { type: UUIDType },
    dto: { type: ChangePostInput },
  },
  resolve: async (_root, args: { id: string, dto: { title: string, content: string; }, }, context: { prisma: PrismaClient }) => {
    return await context.prisma.post.update({ where: { id: args.id }, data: args.dto });
  }
}

export const deletePost = {
  type: GraphQLString,
  args: {
    id: { type: UUIDType },
  },
  resolve: async (_root, args: { id: string }, context: { prisma: PrismaClient }) => {
    await context.prisma.post.delete({ where: { id: args.id } });

    return null;
  }
}

export const createPost = {
  type: Post,
  args: {
    dto: { type: CreatePostInput }
  },
  resolve: async (_root, args: { dto: { title: string; content: string; authorId: string; } }, context: { prisma: PrismaClient }) => {
    return await context.prisma.post.create({ data: args.dto });
  }
}