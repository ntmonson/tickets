import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import createPost from './createPost.graphql';
import getTicket from './getTicket.graphql';
import s from './TicketDetails.css';
import Posts from '../../components/Posts/Posts';

class TicketDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTicketPost: '',
    };
  }
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

TicketDetails.propTypes = {
  ticketId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    databaseGetTicket: PropTypes.shape({
      closed: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      pinned: PropTypes.number.isRequired,
      posts: PropTypes.array.isRequired,
      topic: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
  }).isRequired,
  addPost: PropTypes.func.isRequired,
};

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
);
export default compose(withStyles(s), graphqlQueries)(TicketDetails);
