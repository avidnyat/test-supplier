var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var CreateAccountScreen = require('./Register/CreateAccountScreen.js');
var ThankYouScreen = require('./Register/ThankYouScreen.js');
var LoginScreen = require('./Register/LoginScreen.js');
var ResetPasswordScreen = require("./Register/ResetPasswordScreen");
var DashboardScreen = require("./Dashboard/DashboardScreen.js");
var BookingScreen = require("./Bookings/BookingScreen.js");
var BookingDetailScreen = require("./Bookings/BookingDetailScreen.js");
var ProfileScreen = require("./Profile/ProfileScreen.js");
var EditVariantScreen = require("./Listings/EditVariantScreen.js")
var ListingScreen = require("./Listings/ListingScreen.js");
var ListingDetailsScreen = require("./Listings/ListingDetailsScreen.js");
var NotificationSystem = require('react-notification-system');
var NotificationScreen = require("./Notifications/NotificationScreen.js");
var App = React.createClass({
  mixins: [ConfigMixin],
	_notificationSystem: null,
getInitialState: function () {
    return {
        headerFlag: "show",
        loginHeader: "hide",
        registerFlag: "show",
        loginFlag: "hide",
        profile_image: "",
        menu: {
        dashboardMenu : "",
        bookingsMenu: "",
        listingMenu: "",
        actionText: "/#/register",
        actionLink: "Register Now",
        notificationsMessage: [],
        notificationCount: 0
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
    $("#register").addClass("animated rotateInUpRight");
    $("#login").addClass("animated rotateInUpRight");
     $(".logo-text").addClass("animated rotateInUpRight");
    if(localStorage.getItem("clientInfo")){

       this.setState({
                    headerFlag: "hide",
                    loginHeader: "show",
                    profile_image: JSON.parse(localStorage.getItem("clientInfo")).vendor.photo
                  });
      }
      $(document).off("click",".notification-message").on("click",".notification-message",function(){
        window.location.href = "/#/notifications";
      });
      var self = this;
    var data = {

    }
    var url_params = {
      page: 1,
      per_page: 50
    }
    var clientInfo = this.utils().getClientInfo();
    var headers = {
      'X-Thrill-Client-Id': clientInfo.client_id,
      'X-Thrill-Auth-Token': clientInfo.auth_token
    }
    this.utils().httpInterceptor( this.utils().url().NOTIFICATIONS, 'GET', data, headers, url_params ).then(
      function ( result ) {

        console.log( result );
        self.setState( {
          notificationsMessage: result.user_notifications,
          notificationCount: result.unread_count
        } );
        $( '.badge' ).html( result.unread_count );

      },
      function ( result ) {
        if(result.responseText){
          let message = result.responseText;
          self.notification._addNotification( window.event, 'error', message.message );
        }
      }
    );  
  },
  showLogin: function(){
    this.setState({
                    registerFlag: "hide",
                    loginFlag: "show",
                    
                  });
    window.location.href = "/#/register";
  },
  showRegister: function(){
     this.setState({
                    registerFlag: "show",
                    loginFlag: "hide",
                    
                  });
    window.location.href = "/#/";
  },
  notificationMessage: function(){
      var messageObj =  this.state.notificationsMessage;
      console.log(this.state.actionLink);
      return {
        "messageObj" : messageObj
      };
  },
  render: function() {

  var showNotificationPage = function(){
    window.location.href = "/#/notifications";
  }
  var self = this;
    var notificationsList = $.map( this.state.notificationsMessage, function ( val, i ) {
     if(i <=2 ){
        return (
        <li className="notification-message" onClick={self.showNotificationPage}>
          { val.message }
        </li>
        );
      }
    } );
    console.log("0000");
    console.log(this.state.notificationsMessage);
    return (
      <div>
        <div className={this.state.headerFlag} >
        
          <div className="main-banner ">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                  <a className="navbar-brand logo-text" href="/#/"><img src="images/logo.png" alt="logo" /></a> </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  
                  <ul className="nav navbar-nav navbar-right">
                    <li className={this.state.registerFlag} id="register"><a href="javascript:void(0);" className="btn btn-secondary"  onClick={this.showLogin}>Register Now</a></li>
                     <li className={this.state.loginFlag} id="login"><a href="javascript:void(0);" className="btn btn-secondary"   onClick={this.showRegister}>Login Now</a></li>
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
            <li className="menu-option" id="dashboard_menu"><a href="/#/supplier/dashboard">Dashboard</a></li>
            <li className="menu-option"  id="bookings_menu"><a href="/#/supplier/bookings">Bookings</a></li> 
            <li className="menu-option" id="listing_menu"><a href="/#/supplier/listings">Listing</a></li> 
            
        </ul>
        <ul className="nav navbar-nav navbar-right">
            <li className="notification">
                 <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" data-toggle="dropdown" >
                    <span className="badge">0</span> <img src="images/icon-notification2.png" />
                  </button>
                  <ul className="dropdown-menu" >
                      {notificationsList}
                      <li className="notification-message"><a className="all-notification-link" href="javascript:void(0);" onClick={this.showNotificationPage} > <i className="glyphicon glyphicon-menu-right"></i> See all Notifications </a></li>
                  </ul>
                </div>
                
              </li>
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
               		<Route path="register" component={CreateAccountScreen} notification={this} config={this.utils}></Route>
               		<Route path="thank-you" component={ThankYouScreen} ></Route>
                  <Route path="notifications" component={NotificationScreen} notifications={this.notificationMessage}></Route>
                	<Route path="/" component={LoginScreen} notification={this} config={this.utils}></Route>
                  <Route path="reset-password" component={ResetPasswordScreen} notification={this} config={this.utils}></Route>
                  <Route path="supplier/dashboard" component={DashboardScreen}  notification={this} config={this.utils} menu={this.state.menu} ></Route>
                  <Route path="supplier/bookings" component={BookingScreen}  notification={this} config={this.utils}></Route>
                  <Route path="profile" component={ProfileScreen}  notification={this} config={this.utils}></Route>
                  <Route path="supplier/listings" component={ListingScreen}  notification={this} config={this.utils}></Route>
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