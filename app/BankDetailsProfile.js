var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var BankDetailsProfile = React.createClass({


  render: function() {
    return (
      <div className={"thank-you " + this.props.position}>

        <h1>BankDetailsProfile</h1>
        <Link to="login">Login Now </Link>
      </div>
    );
  }
  
});
  
module.exports = BankDetailsProfile;