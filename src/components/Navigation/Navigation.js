import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  render() {
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/">
          Ticket List
        </Link>
        <Link className={s.link} to="/addtickets">
          Add Ticket
        </Link>
        {/* <span className={s.spacer}> | </span> */}
        {/* <Link className={s.link} to="/ticketdetails">
          Log in
        </Link> */}
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
