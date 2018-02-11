import { Post } from 'data/models';

export const mutation = [
  `
  # Creates a new Post in the database
  databaseCreatePost(
    content: String!
    ticketId: String!
  ): Post
`,
];

export const resolvers = {
  Mutation: {
    async databaseCreatePost(parent, { content, ticketId }) {
      // Create new Post
      const post = await Post.create({ content, ticketId });
      return post;
    },
  },
};
