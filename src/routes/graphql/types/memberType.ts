import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { MemberTypeId as MemberTypeIdEnum } from "../../member-types/schemas.js";
import { PrismaClient } from "@prisma/client";


export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeIdEnum.BASIC]: { value: MemberTypeIdEnum.BASIC },
    [MemberTypeIdEnum.BUSINESS]: { value: MemberTypeIdEnum.BUSINESS },
  }

});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }
});

