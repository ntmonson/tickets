import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as GetAllUsers,
  queries as GetAllUsersQueries,
  resolvers as GetAllUsersResolver,
} from './users/GetAllUsers';
import {
  queries as GetLoggedInUserQueries,
  resolvers as GetLoggedInUserResolver,
} from './users/GetLoggedInUser';
import {
  schema as GetAllTickets,
  queries as GetAllTicketsQueries,
  resolvers as GetAllTicketsResolvers,
} from './tickets/GetAllTickets';

/** * Mutations ** */
import {
  schema as CreateUserInput,
  mutation as CreateUser,
  resolvers as CreateUserResolver,
} from './users/CreateUser';
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

export const schema = [...GetAllUsers, ...CreateUserInput, ...GetAllTickets];

export const queries = [
  ...GetAllUsersQueries,
  ...GetLoggedInUserQueries,
  ...GetAllTicketsQueries,
];

export const mutations = [
  ...CreateUser,
  ...CreateTicket,
  ...ToggleTicketStatus,
  ...ToggleTicketPinned,
];

export const resolvers = merge(
  GetAllUsersResolver,
  GetLoggedInUserResolver,
  CreateUserResolver,
  CreateTicketResolver,
  ToggleTicketResolver,
  GetAllTicketsResolvers,
  ToggleTicketPinnedResolver,
);
