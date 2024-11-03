import {
  GraphQLSchema,
  GraphQLObjectType,


} from 'graphql';
import { subscribeTo, unsubscribeFrom } from './shema/subscribe.js';

import { memberTypes, memberType } from './shema/memberType.js';
import { users, user, createUser, changeUser, deleteUser } from './shema/user.js';
import { changeProfile, createProfile, deleteProfile, profile, profiles } from './shema/profile.js';
import { changePost, createPost, deletePost, post, posts } from './shema/post.js';








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
      createProfile,
      createPost,
      changePost,
      changeProfile,
      changeUser,
      deleteUser,
      deleteProfile,
      deletePost,
      subscribeTo,
      unsubscribeFrom

    },
  }),
});
