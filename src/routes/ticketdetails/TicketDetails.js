/* @flow */
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import createPost from './createPost.graphql';
import getTicket from './getTicket.graphql';
import toggleStatus from '../../components/TicketTable/Renderers/Closed/toggleStatus.graphql';
import s from './TicketDetails.css';
// Disabled lines below: Required to export a default and named component for testing.
// Changing the name would be more confusing than ignoring the linter in this specific case.
import Posts from '../../components/Posts/Posts'; // eslint-disable-line

export type Props = {
  ticketId: string,
  toggleStat: Function,
  data: {
    loading: boolean,
    databaseGetTicket?: {
      closed: number,
      createdAt: string,
      id: string,
      pinned: number,
      posts: Array<any>,
      topic: string,
      updatedAt: string,
    },
  },
  addPost: Function,
};

// Exported for testing, see https://github.com/kriasoft/react-starter-kit/issues/378
export class TicketDetails extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      newTicketPost: '',
    };
  }
  props: Props;
  handlePostChange = e => {
    this.setState({ newTicketPost: e.target.value });
  };

  handlePostClick = async () => {
    const { newTicketPost } = this.state;
    const { ticketId } = this.props;
    await this.props.addPost(newTicketPost, ticketId);
    this.clearInputState();
  };

  clearInputState = () => {
    this.setState({ newTicketPost: '' });
  };

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    const ticket = this.props.data.databaseGetTicket;
    const statusColor = ticket.closed ? 'Red' : '#373277';
    const lastPost = ticket.posts[ticket.posts.length - 1];
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.ticketDetail}>
            <span className={s.detailHeader}>Ticket ID:</span>
            <br />
            {ticket.id}
          </div>
          <div className={s.ticketDetail}>
            <span className={s.detailHeader}>Topic:</span>
            <br />
            {ticket.topic}
          </div>
          {lastPost ? (
            <div className={s.ticketDetail}>
              <span className={s.detailHeader}>Last Post:</span>
              <br />
              {lastPost.createdAt}
            </div>
          ) : (
            <div className={s.ticketDetail}>
              <span className={s.detailHeader}>Last Post:</span>
              <br />
              No posts made yet.
            </div>
          )}
          <div className={s.ticketDetail}>
            <span className={s.detailHeader}>Status:</span>
            <br />
            {ticket.closed ? 'Closed' : 'Open'}
            <button
              style={{
                color: statusColor,
                fontSize: '1.25em',
                marginLeft: '5px',
              }}
              onClick={() => this.props.toggleStat(ticket.id)}
            >
              {ticket.closed ? (
                <i
                  className="fas fa-toggle-on"
                  data-fa-transform="rotate-180"
                />
              ) : (
                <i className="fas fa-toggle-on" />
              )}
            </button>
          </div>
          {ticket.posts.length ? <Posts posts={ticket.posts} /> : null}
          <div>
            <label htmlFor="post">
              Post
              <textarea
                type="textarea"
                maxLength="255"
                name="post"
                value={this.state.newTicketPost}
                onChange={this.handlePostChange}
              />
            </label>
          </div>
          <button
            disabled={!this.state.newTicketPost.length}
            className={s.buttonBlue}
            onClick={this.handlePostClick}
          >
            Submit
          </button>
          <button className={s.buttonClear} onClick={this.clearInputState}>
            Clear
          </button>
        </div>
      </div>
    );
  }
}

const graphqlQueries = compose(
  graphql(getTicket, {
    options: ({ ticketId }) => ({ variables: { id: ticketId } }),
  }),
  graphql(createPost, {
    name: 'addPost',
    props: ({ addPost }) => ({
      addPost: (content, ticketId) =>
        addPost({ variables: { content, ticketId } }),
    }),
    options: {
      update: (proxy, { data: { databaseCreatePost } }) => {
        const data = proxy.readQuery({
          query: getTicket,
          variables: { id: databaseCreatePost.ticketId },
        });
        data.databaseGetTicket.posts.push(databaseCreatePost);
        proxy.writeQuery({ query: getTicket, data });
      },
    },
  }),
  graphql(toggleStatus, {
    name: 'toggleStat',
    props: ({ toggleStat }) => ({
      toggleStat: id => toggleStat({ variables: { id } }),
    }),
  }),
);
export default compose(withStyles(s), graphqlQueries)(TicketDetails);
