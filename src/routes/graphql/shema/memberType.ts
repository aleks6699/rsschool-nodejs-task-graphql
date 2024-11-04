import { GraphQLList } from "graphql";
import { MemberType, MemberTypeId } from "../types/memberType.js";
import { PrismaClient } from "@prisma/client";

export const memberTypes = {
  type: new GraphQLList(MemberType),
  resolve: (_root: any, _args: any, context: { prisma: PrismaClient }) => {
    return context.prisma.memberType.findMany();
  },
}

export const memberType = {
  type: MemberType,
  args: {
    id: { type: MemberTypeId },
  },
  resolve: (_root: any, args: { id: string }, context: { prisma: PrismaClient }) => {
    return context.prisma.memberType.findUnique({ where: { id: args.id } });
  },
}