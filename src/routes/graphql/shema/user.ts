import { GraphQLFloat, GraphQLList, GraphQLNonNull,  GraphQLString } from "graphql";
import { ChangeUserInput, CreateUserInput, UserType } from "../types/user.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";





export const users = {
  type: new GraphQLList(UserType),
  resolve: async (_root: any, _args: any, context: { prisma: PrismaClient }) => {
    return await context.prisma.user.findMany();

  },
}

export const user = {
  type: UserType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },

  resolve: (_root: any, args: { id: string }, context: { prisma: PrismaClient }) => {
      console.log(args.id)
      return context.prisma.user.findFirst({ where: { id: args.id } });
  },
}


export const createUser = {
  type: UserType,
  args: {
    dto: { type: CreateUserInput }
  },
  resolve: async (_root, args: { dto: { name: string; balance: number; } }, context: { prisma: PrismaClient }) => {
    return await context.prisma.user.create({ data: args.dto });
  },
}

export const changeUser = {
  type: UserType,
  args: {
    id: { type: UUIDType },
    dto: { type: ChangeUserInput },
  },
  resolve: async (_root, args: { dto: { name: string, balance: number }, id: string }, context: { prisma: PrismaClient }) => {
    return await context.prisma.user.update({ where: { id: args.id }, data: args.dto });
  }
}



export const deleteUser = {
  type: GraphQLString,
  args: {
    id: { type: UUIDType },
  },
  resolve: async (_root, args: { id: string }, context: { prisma: PrismaClient }) => {
    await context.prisma.user.delete({ where: { id: args.id } });
    return null;
  }
}