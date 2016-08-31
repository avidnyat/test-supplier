var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var moment = require("moment");
var NotificationScreen = React.createClass( {
  componentDidMount: function () {
    

  },

  render: function () {
    console.log("-0-0-0-0-");
    console.log(this.props.route.notifications().messageObj);
    var notificationsList = $.map( this.props.route.notifications().messageObj, function ( val, i ) {
      var created_day = moment( val.created_at ).fromNow();
        return (
           <p>{ val.message }<span className="time">{created_day}</span></p>
       
        );
      
    } );
    return (
    <div className="page-body grey2">
  <div className="container">
    <div className="notification-list">
        <h3>Notifications</h3>
         {notificationsList}
    </div>
      
    </div>
</div>
    );
  }

} );

module.exports = NotificationScreen;
