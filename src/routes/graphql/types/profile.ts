import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeId } from "./memberType.js";
import { PrismaClient } from "@prisma/client";

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (
        { userId }: { userId: string },
        _,
        { prisma }: { prisma: PrismaClient },
      ) => {
        const memberType = await prisma.memberType.findFirst({
          where: {
            profiles: {
              some: { userId },
            },
          },
        });
        return memberType;
      },
    },
  },
});



export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }
});


export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
  }
});
