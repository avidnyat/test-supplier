var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';

var CreateAccountScreen = require('./CreateAccountScreen.js');
var ThankYouScreen = require('./ThankYouScreen.js');
var LoginScreen = require('./LoginScreen.js');
var NotificationSystem = require('react-notification-system');
var App = React.createClass({
	_notificationSystem: null,

  _addNotification: function(event, level, message) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: message,
      level: level
    });
  },

  componentDidMount: function() {
    this._notificationSystem = this.refs.notificationSystem;
  },

  render: function() {
    return (
     	<div>
     		<Router  history={hashHistory}>
           		<Route path="/" component={CreateAccountScreen} notification={this}></Route>
           		<Route path="thank-you" component={ThankYouScreen}></Route>
            	<Route path="login" component={LoginScreen} notification={this}></Route>
            </Router>
        	<NotificationSystem ref="notificationSystem" />
        </div>
    );
  }
  
});
  
module.exports = App;