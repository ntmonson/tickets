import { Ticket } from 'data/models';

export const mutation = [
  `
  # Toggles a ticket's pinned in the database
  databaseToggleTicketPinned(
    id: String!
  ): Ticket
`,
];

export const resolvers = {
  Mutation: {
    async databaseToggleTicketPinned(parent, args) {
      // If Ticket already exists, throw error
      const lookupTicket = await Ticket.findOne({
        where: { id: args.id },
      });

      if (!lookupTicket) {
        // eslint-disable-next-line no-throw-literal
        throw 'No ticket with this ID exists!';
      }

      // Toggle ticket's status
      lookupTicket.pinned = lookupTicket.pinned ? 0 : 1;
      const ticket = await lookupTicket.save();
      return ticket;
    },
  },
};
