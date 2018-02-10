import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as GetAllTickets,
  queries as GetAllTicketsQueries,
  resolvers as GetAllTicketsResolvers,
} from './tickets/GetAllTickets';

/** * Mutations ** */
import {
  mutation as CreateTicket,
  resolvers as CreateTicketResolver,
} from './tickets/CreateTicket';
import {
  mutation as ToggleTicketStatus,
  resolvers as ToggleTicketResolver,
} from './tickets/ToggleTicketStatus';
import {
  mutation as ToggleTicketPinned,
  resolvers as ToggleTicketPinnedResolver,
} from './tickets/ToggleTicketPinned';

export const schema = [...GetAllTickets];

export const queries = [...GetAllTicketsQueries];

export const mutations = [
  ...CreateTicket,
  ...ToggleTicketStatus,
  ...ToggleTicketPinned,
];

export const resolvers = merge(
  CreateTicketResolver,
  ToggleTicketResolver,
  GetAllTicketsResolvers,
  ToggleTicketPinnedResolver,
);
