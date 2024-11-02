import { GraphQLBoolean, GraphQLInt, GraphQLList } from "graphql";
import { Profile } from "../types/profile.js";
import { PrismaClient } from "@prisma/client";
import { UUIDType } from "../types/uuid.js";
import { MemberTypeId } from "../../member-types/schemas.js";





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

export const deleteProfile = {
  type: Profile,
  args: {
    id: { type: UUIDType },
  },
  resolve: (root, args: { id: string }, context: PrismaClient) => {
    const { id } = args;
    return context.profile.delete({ where: { id } });
  },
}
export const createProfile = {
  type: Profile,
  args: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
  },
  resolve: async (root, args: { isMale: boolean, yearOfBirth: number, userId: string, memberTypeId: MemberTypeId }, context: PrismaClient) => {
    return context.profile.create({ data: args });
  },
}
export const changeProfile = {
  type: Profile,
  args: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  },
  resolve: async (root, args: { id: string, isMale: boolean, yearOfBirth: number, memberTypeId: MemberTypeId }, context: PrismaClient) => {
    const { id, isMale, yearOfBirth, memberTypeId } = args;
    return context.profile.update({
      where: { id }, 
      data: { isMale, yearOfBirth, memberTypeId }
    });
  },
}