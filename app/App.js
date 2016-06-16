var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var CreateAccountScreen = require('./CreateAccountScreen.js');
var ThankYouScreen = require('./ThankYouScreen.js');
var LoginScreen = require('./LoginScreen.js');
var ResetPasswordScreen = require("./ResetPasswordScreen");
var DashboardScreen = require("./DashboardScreen.js");
var BookingScreen = require("./BookingScreen.js");
var BookingDetailScreen = require("./BookingDetailScreen.js");
var ProfileScreen = require("./ProfileScreen.js");
var EditVariantScreen = require("./EditVariantScreen.js")
var ListingScreen = require("./ListingScreen.js");
var ListingDetailsScreen = require("./ListingDetailsScreen.js");
var NotificationSystem = require('react-notification-system');
var App = React.createClass({
  mixins: [ConfigMixin],
	_notificationSystem: null,
getInitialState: function () {
    return {
        headerFlag: "show",
        loginHeader: "hide",
        profile_image: "",
        menu: {
        dashboardMenu : "",
        bookingsMenu: "",
        listingMenu: ""
      }
      
    }
  },
  clearMenu: function(){
    this.setState({
      menu: {
                    dashboardMenu : "",
        bookingsMenu: "",
        listingMenu: ""
                    
                  }});
  },
  logout: function(){
    localStorage.removeItem("clientInfo");
     this.setState({
                    headerFlag: "show",
                    loginHeader: "hide",
                    
                  });
      
    window.location.href = "/#/";
  },
  login: function(){
      this.setState({
                    headerFlag: "hide",
                    loginHeader: "show",
                    profile_image: JSON.parse(localStorage.getItem("clientInfo")).vendor.photo
                    
                  });
  },
  _addNotification: function(event, level, message) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: message,
      level: level
    });
  },
  showProfile: function(){
    window.location.href = "/#/profile";
  },

  componentDidMount: function() {
    this._notificationSystem = this.refs.notificationSystem;
    if(localStorage.getItem("clientInfo")){

       this.setState({
                    headerFlag: "hide",
                    loginHeader: "show",
                    profile_image: JSON.parse(localStorage.getItem("clientInfo")).vendor.photo
                  });
      }
  },

  render: function() {
    return (
      <div>
        <div className={this.state.headerFlag} >
        
          <div className="main-banner ">
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
          </div>
          <div className={this.state.loginHeader} >
          <div className="main-banner {loginHeader}">
            <nav className="navbar">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
        <a className="navbar-brand" href="#"><img src="images/logo.png" alt="logo" /></a> </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
            <li className="menu-option" id="dashboard_menu"><a href="/#/dashboard">Dashboard</a></li>
            <li className="menu-option"  id="bookings_menu"><a href="/#/bookings">Bookings</a></li> 
            <li className="menu-option" id="listing_menu"><a href="/#/listings">Listing</a></li> 
            
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><i className="fa fa-life-ring" aria-hidden="true"></i> Help</a></li>
            <li className="notification"><a href="#"><span className="badge">3</span><img src="images/icon-notification1.png" /></a></li>
            <li className="notification"><a href="#"><span className="badge">3</span> <img src="images/icon-notification2.png" /></a></li>
            <li className="profile-pic" onClick={this.showProfile}><img src={this.state.profile_image} /></li>
            <li>
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" data-toggle="dropdown" >
                    <span className="glyphicon glyphicon-menu-down"></span>
                  </button>
                  <ul className="dropdown-menu" >
                    <li><a href="javascript:void(0);" onClick={this.logout}>Logout</a></li>
                   
                    </ul>
                </div>
            </li>
       </ul>
      </div>
    </div>
  </nav>
            
          </div>
</div>

         	<div>
         		<Router  history={hashHistory}>
               		<Route path="register" component={CreateAccountScreen} notification={this} config={this}></Route>
               		<Route path="thank-you" component={ThankYouScreen} ></Route>
                	<Route path="/" component={LoginScreen} notification={this} config={this.utils}></Route>
                  <Route path="reset-password" component={ResetPasswordScreen} notification={this} config={this.utils}></Route>
                  <Route path="dashboard" component={DashboardScreen}  notification={this} config={this.utils} menu={this.state.menu} ></Route>
                  <Route path="bookings" component={BookingScreen}  notification={this} config={this.utils}></Route>
                  <Route path="profile" component={ProfileScreen}  notification={this} config={this.utils}></Route>
                  <Route path="listings" component={ListingScreen}  notification={this} config={this.utils}></Route>
                  <Route path="edit-variant/:listingid/:variantid" component={EditVariantScreen}  notification={this} config={this.utils}></Route>
                   <Route path="listingDetails/:listingid" component={ListingDetailsScreen}  notification={this} config={this.utils}></Route>
                  <Route path="bookingDetails/:bookingid" component={BookingDetailScreen}  notification={this} config={this.utils}></Route>
                </Router>
            	<NotificationSystem ref="notificationSystem" />
          </div>
      </div>

    );
  }
  
});
  
module.exports = App;