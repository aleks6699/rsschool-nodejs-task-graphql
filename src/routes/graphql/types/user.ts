
import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLList } from "graphql";
import { UUIDType } from "./uuid.js";
import { Profile } from "./profile.js";
import { Post } from "./post.js";


export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }
})



export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (parent, _args, context) => {
        const userPosts = await context.prisma.post.findMany({
          where: { authorId: parent.id },
        });
        return userPosts;
      },
    },
    profile: {
      type: Profile,
      resolve: async (parent, _args, context) => {
        const userProfile = await context.prisma.profile.findUnique({
          where: { userId: parent.id },
        });
        return userProfile;
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent, _args, context) => {
        const subscriptions = await context.prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: parent.id },
          include: { author: true },
        });
        return subscriptions.map((subscription) => subscription.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent, _args, context) => {
        const subscribers = await context.prisma.subscribersOnAuthors.findMany({
          where: { authorId: parent.id },
          include: { subscriber: true },
        });
        return subscribers.map((subscription) => subscription.subscriber);
      },
    },
  }),
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
})
