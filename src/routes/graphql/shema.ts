import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,

} from 'graphql';
import { PrismaClient } from '@prisma/client';
// import { UserType } from './types/user.js';
// import { Post } from './types/post.js';
// import { Profile } from './types/profile.js';
import { UUIDType } from './types/uuid.js';
import { memberTypes, memberType } from './shema/memberType.js';
import { users, user, deleteUser, changeUser, createUser } from './shema/user.js';
import { changePost, createPost, deletePost, post, posts } from './shema/post.js';
import { changeProfile, createProfile, deleteProfile, profile, profiles } from './shema/profile.js';







// Определение RootQueryType
// const Query = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     memberTypes: {
//       type: new GraphQLList(MemberType),
//       resolve: async (_parent, _args,   context: { prisma: PrismaClient }) => {
//         console.log("Context DB:", context.prisma); 

//         return  context.prisma.memberType.findMany();

//       },
//     },
//     memberType: {
//       type: MemberType,
//       args: { id: { type:new GraphQLNonNull(MemberTypeId)} },
//       resolve: async (_parent, args: { id: string }, context: { prisma: PrismaClient }) => {
//         return  context.prisma.memberType.findUnique({ where: { id: args.id } });

//       },
//     },

// users: {
//   type: new GraphQLList(UserType),
//   resolve: async (_parent, _args, context: { db: PrismaClient }) => {
//     return await context.db.user.findMany();
//   },

// },

// user: {
//   type: UserType,
//   args: { id: { type: UUIDType } },
//   resolve: async (_parent, { id }, context: { db: PrismaClient }) => {
//     return await context.db.user.findUnique({ where: { id: id } });
//   },
// },
// posts: {
//   type:new GraphQLList(Post),
//   resolve: async (_parent, _args, context: { db: PrismaClient }) => {
//     return await context.db.post.findMany();
//   },
// },
// post: {
//   type: Post,
//   args: { id: { type: UUIDType } },
//   resolve: async (_parent, { id }, context: { db: PrismaClient }) => {
//     return await context.db.post.findUnique({ where: { id: id } });
//   },
// },
// profiles: {
//   type:new GraphQLList(Profile),
//   resolve: async (_parent, _args, context: { db: PrismaClient }) => {

//     return await context.db.profile.findMany();
//   },
// },


// profile: {
//   type: Profile,
//   args: { id: { type: UUIDType} },
//   resolve: async (_parent, { id }, context: { db: PrismaClient }) => {
//     return await context.db.profile.findUnique({ where: { id: id } });
//   },
// },


//   },

// });

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      memberTypes,
      memberType,
      users,
      user,
      posts,
      post,
      profiles,
      profile
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser,
      changeUser,
      deleteUser,
      createPost,
      changePost,
      deletePost,
      // createProfile,
      // changeProfile,
      deleteProfile,
    },
  }),
});
