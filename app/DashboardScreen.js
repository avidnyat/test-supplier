var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var STATES = require('./components/data/states');
var DashboardScreen = React.createClass({
getInitialState: function () {
    return {
      bookingCount: null,
      enquiryCount: null,
      pastRevenue: "password",
      revenue: null,
      reviewsCount: null,
      viewsCount: null
    }
  },
componentDidMount: function() {
	this.props.route.config().redirectWithoutSession();
	var self = this;
    //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);
    var data = {
                       
                    }
         this.props.route.config().httpInterceptor(this.props.route.config().url().DASHBOARD, 'GET', data).then(
                        function(result){
                          
                          console.log(result);
                          self.setState({
						      bookingCount: result.bookings_count,
						      enquiryCount: result.enquiry_count,
						      pastRevenue: result.past_revenue,
						      revenue: result.revenue,
						      reviewsCount: result.reviews_count,
						      viewsCount: result.views_count
						    });
                          
                         $("#pageloader").fadeOut();
                        },
                        function(result){
                              let message = JSON.parse(result.responseText);
                              self.props.route.notification._addNotification(window.event, "error", message.message);
                        }
          );
    
  },
  render: function() {
    return (

      <div>
      	<div id="pageloader">
			<div className="loader-inner">
			<img src="images/preloader-color.gif" alt="" />
			</div>
		</div>
		<p>Bookings count: {this.state.bookingCount}</p>
		<p>Enquiry count: {this.state.enquiryCount}</p>
		<p>Past Revenue: {this.state.pastRevenue}</p>
		<p>Revenue: {this.state.revenue}</p>
		<p>Reviews count: {this.state.reviewsCount}</p>
		<p>Views count: {this.state.viewsCount}</p>
		
       
      </div>
    );
  }
  
});
  
module.exports = DashboardScreen;