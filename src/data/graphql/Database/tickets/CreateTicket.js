import { Ticket } from 'data/models';

export const mutation = [
  `
  # Creates a new ticket in the database
  databaseCreateTicket(
    topic: String!
  ): Ticket
`,
];

export const resolvers = {
  Mutation: {
    async databaseCreateTicket(parent, args) {
      // If Ticket already exists, throw error
      const lookupTicket = await Ticket.findOne({
        where: { topic: args.topic },
      });

      if (lookupTicket) {
        // eslint-disable-next-line no-throw-literal
        throw 'Ticket already exists!';
      }

      // Create new Ticket with profile in database
      const ticket = await Ticket.create({
        topic: args.topic,
      });

      return ticket;
    },
  },
};
