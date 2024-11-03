import {  GraphQLList, GraphQLString } from "graphql";
import { ChangeProfileInput, CreateProfileInput, Profile } from "../types/profile.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";





export const profiles = {
  type: new GraphQLList(Profile),
  resolve: (_root: any, _args: any, context: { prisma: PrismaClient }) => {
    return context.prisma.profile.findMany({ include: { memberType: true, user: true } });
  },
}

export const profile = {
  type: Profile,
  args: {
    id: { type: UUIDType },
  },
  resolve: (_root: any, args: { id: string }, context: { prisma: PrismaClient }) => {
    return context.prisma.profile.findUnique({ where: { id: args.id }, include: { memberType: true, user: true } });
  },
}

 export const createProfile = {
  type: Profile,
  args: {
    dto: { type:  CreateProfileInput }
  },
  resolve: async (_root, args: { dto: { isMale: boolean; yearOfBirth: number; userId: string; memberTypeId: string; } }, context: { prisma: PrismaClient }) => {
    return await context.prisma.profile.create({ data: args.dto });
  }
}




export const changeProfile = {
  type: Profile,
  args: {
    id: { type: UUIDType },
    dto: { type: ChangeProfileInput },
  },
  resolve: async (_root, args: { dto: { isMale: boolean, yearOfBirth: number, memberTypeId: string }, id: string }, context: { prisma: PrismaClient }) => {
    return await context.prisma.profile.update({ where: { id: args.id }, data: args.dto });

  }
}




export const deleteProfile = {
  type: GraphQLString,
  args: {
    id: { type: UUIDType },
  },
  resolve: async (_root, args: { id: string }, context: { prisma: PrismaClient }) => {
    await context.prisma.profile.delete({ where: { id: args.id } });
    return null;
  }
}
