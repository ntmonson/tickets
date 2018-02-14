/* @flow */
import React from 'react';
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

export type Props = {
  posts: Array<{
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  }>,
};

// Exported for testing, see https://github.com/kriasoft/react-starter-kit/issues/378
export const Posts = (props: Props) => {
  const { posts } = props;

  return (
    <ReactTable
      data={posts}
      columns={columns}
      minRows={0}
      showPageSizeOptions={false}
    />
  );
};

export default withStyles(reactTableCss)(Posts);
