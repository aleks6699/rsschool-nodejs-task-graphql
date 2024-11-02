import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../types/user.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { Post } from "../types/post.js";
import { Profile } from "../types/profile.js";




export const users = {
  type: new GraphQLList(UserType),
  resolve: (_root: any, _args: any, context: { prisma: PrismaClient }) => {
    return context.prisma.user.findMany();
  },
}

export const user = {
  type: UserType,
  args: {
      id: { type: UUIDType },
  },
  resolve: (_root: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      console.log(args.id)
      return context.prisma.user.findFirst({ where: { id: args.id } });
  },
}


export const deleteUser = {
  type: UserType,
  args: {
    id: { type: UUIDType },
  },
  resolve: (root, args: { id: string }, context: PrismaClient) => {
    const { id } = args;
    return context.user.delete({ where: { id } });
  },
}
export const createUser = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
  resolve: async (root, args: { name: string, balance: number }, context: PrismaClient) => {
    return context.user.create({ data: args });
  },
}
export const changeUser = {
  type: UserType,
  args: {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
  resolve: async (root, args: { id: string, name: string, balance: number }, context: PrismaClient) => {
    const { id, name, balance } = args;
    return context.user.update({
      where: { id }, 
      data: { name, balance }
    });
  },
}