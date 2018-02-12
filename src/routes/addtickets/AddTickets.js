import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import createTicket from './createTicket.graphql';
import ticketsQuery from '../../routes/home/tickets.graphql';
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
      newTicket: [],
    };
  }

  componentDidMount() {
    this.topicInput.focus();
  }

  handleTopicChange = e => {
    const val = e.target.value;
    this.setState({ newTicketTopic: val });
  };

  handlePostChange = e => {
    const val = e.target.value;
    this.setState({ newTicketPost: val });
  };

  handleAddTicketClick = async () => {
    const { newTicketTopic, newTicketPost } = this.state;
    const data = await this.props.addTicket(newTicketTopic, newTicketPost);
    const { data: { databaseCreateTicket: newTicket } } = data;
    this.setState({ newTicket: [...this.state.newTicket, newTicket] });
    this.clearInputState();
  };

  clearInputState = () => {
    this.setState({ newTicketPost: '', newTicketTopic: '' });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h3>New Ticket:</h3>
          <label htmlFor="topic">
            Topic
            <input
              type="text"
              maxLength="255"
              name="topic"
              ref={input => {
                this.topicInput = input;
              }}
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
          <button
            disabled={!this.state.newTicketTopic.length}
            className={s.buttonBlue}
            onClick={this.handleAddTicketClick}
          >
            Submit
          </button>
          <button className={s.buttonClear} onClick={this.clearInputState}>
            Clear
          </button>
        </div>
        <ol>
          {this.state.newTicket.map(ticket => (
            <li>Ticket: {ticket.id} added</li>
          ))}
        </ol>
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
    options: {
      update: (proxy, { data: { databaseCreateTicket } }) => {
        const data = proxy.readQuery({ query: ticketsQuery });
        data.databaseGetAllTickets.push(databaseCreateTicket);
        proxy.writeQuery({ query: ticketsQuery, data });
      },
    },
  }),
);

export default compose(withStyles(s), graphqlQueries)(AddTickets);
