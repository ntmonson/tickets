import { Ticket, Post } from 'data/models';

export const schema = [
  `
  type Ticket {
    id: ID!
    topic: String
    closed: Int
    pinned: Int
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
      const tickets = await Ticket.findAll({
        include: [{ model: Post, as: 'posts' }],
      });
      return tickets;
    },

    async databaseGetTicket(parent, { id }) {
      const ticket = await Ticket.findOne({
        where: { id },
      });
      return ticket;
    },
  },
};
