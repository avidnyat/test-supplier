var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var CreateAccountScreen = require('./CreateAccountScreen.js');
var ThankYouScreen = require('./ThankYouScreen.js');
var LoginScreen = require('./LoginScreen.js');
var ResetPasswordScreen = require("./ResetPasswordScreen");
var DashboardScreen = require("./DashboardScreen.js");
var NotificationSystem = require('react-notification-system');
var App = React.createClass({
  mixins: [ConfigMixin],
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
      <div className="main-banner">
  <nav className="navbar">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
        <a className="navbar-brand" href="#"><img src="images/logo.png" alt="logo" /></a> </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><i className="fa fa-life-ring" aria-hidden="true"></i> Help</a></li>
          <li><a href="/#/register" className="btn btn-login">Register Now</a></li>
       </ul>
      </div>
    </div>
  </nav>
</div>


     	<div>
     		<Router  history={hashHistory}>
           		<Route path="register" component={CreateAccountScreen} notification={this} config={this}></Route>
           		<Route path="thank-you" component={ThankYouScreen} ></Route>
            	<Route path="/" component={LoginScreen} notification={this} config={this.utils}></Route>
              <Route path="reset-password" component={ResetPasswordScreen} notification={this} config={this.utils}></Route>
              <Route path="dashboard" component={DashboardScreen}  notification={this} config={this.utils}></Route>
            </Router>
        	<NotificationSystem ref="notificationSystem" />
        </div>
        </div>

    );
  }
  
});
  
module.exports = App;