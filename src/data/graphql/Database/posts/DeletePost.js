import { Post } from 'data/models';

export const mutation = [
  `
  # Deletes a Post in the database
  databaseDeletePost(
    id: String!
  ): Int!
`,
];

export const resolvers = {
  Mutation: {
    async databaseDeletePost(parent, { id }) {
      // Delete Post
      const post = await Post.destroy({
        where: {
          id,
        },
      });
      return post;
    },
  },
};
