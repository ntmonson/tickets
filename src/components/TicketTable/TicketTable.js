import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import reactTableCss from 'react-table/react-table.css';
import Pinned from './Renderers/Pinned/Pinned';
import Closed from './Renderers/Closed/Closed';
import Link from '../Link/Link';

const Ticket = props => {
  const { tickets } = props;
  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
      Cell: row => (
        <Link to={`/tickets/${row.original.id}`}>{row.original.id}</Link>
      ),
    },
    {
      Header: 'Topic',
      accessor: 'topic',
    },
    {
      Header: 'Created',
      accessor: 'createdAt',
    },
    {
      Header: 'Updated',
      accessor: 'updatedAt',
    },
    {
      Header: 'Pinned',
      accessor: 'pinned',
      Cell: row => <Pinned value={row.value} ticketId={row.original.id} />,
    },
    {
      Header: 'Status',
      accessor: 'closed',
      Cell: row => <Closed value={row.value} ticketId={row.original.id} />,
    },
  ];
  return (
    <ReactTable
      data={tickets}
      columns={columns}
      showPageSizeOptions={false}
      minRows={0}
      getTrProps={(state, rowInfo) => {
        if (rowInfo.original.closed) {
          return {
            style: {
              backgroundColor: '#EEE',
            },
          };
        }
        return 'none';
      }}
    />
  );
};

Ticket.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      closed: PropTypes.number.isRequired,
      pinned: PropTypes.number.isRequired,
      topic: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default withStyles(reactTableCss)(Ticket);
