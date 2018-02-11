import { Ticket, Post } from 'data/models';

export const schema = [
  `
  type Post {
    id: ID!
    content: String!
    ticketId: String!
    createdAt: String
    updatedAt: String
  }
  type Ticket {
    id: ID!
    topic: String
    closed: Int
    pinned: Int
    posts: [Post]
    createdAt: String
    updatedAt: String
  }
`,
];

export const queries = [
  `
  # Gets all tickets from the database
  databaseGetAllTickets: [Ticket]

  databaseGetTicket(
    id: String!
  ): Ticket
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllTickets() {
      const tickets = await Ticket.findAll();
      return tickets;
    },
    async databaseGetTicket(parent, { id }) {
      const ticket = await Ticket.findOne({
        where: { id },
      });
      return ticket;
    },
  },
  Ticket: {
    async posts(ticket) {
      const posts = await Post.findAll({
        where: {
          ticketId: ticket.id,
        },
      });
      return posts;
    },
  },
};
