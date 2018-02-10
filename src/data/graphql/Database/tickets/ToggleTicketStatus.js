import { Ticket } from 'data/models';

export const mutation = [
  `
  # Toggles a ticket's status in the database
  databaseToggleTicketStatus(
    id: String!
  ): Ticket
`,
];

export const resolvers = {
  Mutation: {
    async databaseToggleTicketStatus(parent, args) {
      // If Ticket already exists, throw error
      const lookupTicket = await Ticket.findOne({
        where: { id: args.id },
      });

      if (!lookupTicket) {
        // eslint-disable-next-line no-throw-literal
        throw 'No ticket with this ID exists!';
      }

      // Toggle ticket's status
      lookupTicket.closed = lookupTicket.closed ? 0 : 1;
      const ticket = await lookupTicket.save();
      return ticket;
    },
  },
};
