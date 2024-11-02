import { UUIDType } from "./uuid.js";
import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export const Post = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  }
});
export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  }

})

export const UpdatePostInput = new GraphQLInputObjectType({
  name: 'UpdatePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }

});