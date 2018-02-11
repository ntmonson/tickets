import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import createTicket from './createTicket.graphql';
import s from './AddTickets.css';

class AddTickets extends React.Component {
  static propTypes = {
    addTicket: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newTicketTopic: '',
      newTicketPost: '',
    };
  }

  handleTopicChange = e => {
    const val = e.target.value;
    this.setState({ newTicketTopic: val });
  };

  handlePostChange = e => {
    const val = e.target.value;
    this.setState({ newTicketPost: val });
  };

  handleAddTicketClick = () => {
    const { newTicketTopic, newTicketPost } = this.state;
    this.props.addTicket(newTicketTopic, newTicketPost);
    this.clearInputState();
  };

  clearInputState = () => {
    this.setState({ newTicketPost: '', newTicketTopic: '' });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div>New Ticket:</div>
          <label htmlFor="topic">
            Topic
            <input
              type="text"
              maxLength="255"
              name="topic"
              value={this.state.newTicketTopic}
              onChange={this.handleTopicChange}
            />
          </label>
          <div>
            <label htmlFor="topic">
              Content
              <textarea
                type="textarea"
                maxLength="255"
                name="topic"
                value={this.state.newTicketPost}
                onChange={this.handlePostChange}
              />
            </label>
          </div>
          <button onClick={this.handleAddTicketClick}>Add</button>
        </div>
      </div>
    );
  }
}

const graphqlQueries = compose(
  graphql(createTicket, {
    name: 'addTicket',
    props: ({ addTicket }) => ({
      addTicket: (topic, content) =>
        addTicket({ variables: { topic, content } }),
    }),
  }),
);

export default compose(withStyles(s), graphqlQueries)(AddTickets);
