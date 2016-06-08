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
      viewsCount: null,
      photo: JSON.parse(localStorage.getItem("clientInfo")).vendor.photo,
      name: JSON.parse(localStorage.getItem("clientInfo")).vendor.name
    }
  },
componentDidMount: function() {
	this.props.route.config().redirectWithoutSession();
   $(".menu-option").removeClass("active");
   $("#dashboard_menu").addClass("active");
	var self = this;
    //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);
    var data = {
                       
                    }
         this.props.route.config().httpInterceptor(this.props.route.config().url().DASHBOARD, 'GET', data, {},this.props.route.config().getClientInfo()).then(
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



<div className="page-body grey2">
  <div className="container">
        <div className="row">
            <div className="col-sm-4">
                <div className="dashboard-item">
                    <div className="profile">
                        <div className="pic">
                            <img src={this.state.photo} />
                        </div>
                        <div className="info">
                            <h4>{this.state.name}</h4>
                            <p>Lets see how we are doing today!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="dashboard-item views">
                   <div className="heading">
                    <p>Total views</p>
                       <div className="dropdown">
                          <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            This Month
                            <span className="glyphicon glyphicon-menu-down"></span>
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a href="#">This Month</a></li>
                            <li><a href="#">Last Month</a></li>
                        </ul>
                        </div>
                    </div>
                    <div className="number">
                        {this.state.viewsCount}
                    </div>
                </div>

            </div>
            <div className="col-sm-4">
                <div className="dashboard-item booking">
                   <div className="heading">
                    <p>Bookings</p>
                       <div className="dropdown">
                          <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            This Month
                            <span className="glyphicon glyphicon-menu-down"></span>
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a href="#">This Month</a></li>
                            <li><a href="#">Last Month</a></li>
                        </ul>
                        </div>
                    </div>
                    <div className="number">
                        {this.state.bookingCount}
                    </div>
                </div>
            
            </div>
        </div>
      <div className="row">
        <div className="col-sm-4">
            <div className="dashboard-item enquries">
               <div className="heading">
                <p>Enquries</p>
                   <div className="dropdown">
                      <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        This Month
                        <span className="glyphicon glyphicon-menu-down"></span>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a href="#">This Month</a></li>
                        <li><a href="#">Last Month</a></li>
                    </ul>
                    </div>
                </div>
                <div className="number">
                    {this.state.enquiryCount}
                </div>
            </div>  
        </div>
          <div className="col-sm-4">
            <div className="dashboard-item reviews">
               <div className="heading">
                <p>Reviews</p>
                   <div className="dropdown">
                      <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        This Month
                        <span className="glyphicon glyphicon-menu-down"></span>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a href="#">This Month</a></li>
                        <li><a href="#">Last Month</a></li>
                    </ul>
                    </div>
                </div>
                <div className="number">
                    {this.state.reviewsCount}
                </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="dashboard-item revenue">
               <div className="heading">
                <p>Revenue</p>
                   <div className="dropdown">
                      <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        This Month
                        <span className="glyphicon glyphicon-menu-down"></span>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a href="#">This Month</a></li>
                        <li><a href="#">Last Month</a></li>
                    </ul>
                    </div>
                </div>
                <div className="number">
                    {this.state.revenue}
                </div>
            </div>
          </div>
      </div>
      <div className="notify">
        <h3>Notifications(2)</h3>
          <p>You have <a href="#">5 more steps</a> to complete your listing</p>
          <p>You have <a href="#">7 awesome reviews</a> that have increased your rating to <a href="#">4.8</a></p>
      
    </div>
      
    </div>
</div>

    

      </div>
    );
  }
  
});
  
module.exports = DashboardScreen;