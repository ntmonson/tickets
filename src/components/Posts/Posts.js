import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import reactTableCss from 'react-table/react-table.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const columns = [
  {
    Header: 'Post',
    accessor: 'content',
  },
  {
    Header: 'Created',
    accessor: 'createdAt',
  },
];

// Exported for testing, see https://github.com/kriasoft/react-starter-kit/issues/378
export const Posts = ({ posts }) => (
  <ReactTable
    data={posts}
    columns={columns}
    minRows={0}
    showPageSizeOptions={false}
  />
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default withStyles(reactTableCss)(Posts);
