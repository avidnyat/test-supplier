
import {Router, Route, Link, hashHistory} from 'react-router';
import { Tabs, Tab } from 'react-tab-view'
var TabComponent =  require("./components/tabs.js");
import React, { Component, PropTypes } from 'react'
var STATES = require('./components/data/states');
import ReactPaginate from 'react-paginate';
var BookingDetailsScreen = React.createClass({

 getInitialState: function () {
    return {
		    name: "",
		    bookable_pattern : [],
		    discounted_price: 0,
		    no_of_people: 0,
			discount_amount: 0,
			amount: 0,
      bookingid: "",
      customerName: "",
      time: "",
      place: "",
      dot: "",
      email: "",
      phone: ""
      
    }
  },
 componentDidMount: function() {
	console.log(this.props.params.bookingid);
	var self = this;
    var urlparams = {
                
                       
                    }
                    var data = {}
                    var clientInfo = this.props.route.config().getClientInfo();
                    var header = {
                      "X-Thrill-Client-Id": clientInfo.client_id,
                      "X-Thrill-Auth-Token": clientInfo.auth_token
                    }
                    
         this.props.route.config().httpInterceptor(this.props.route.config().url().BOOKINGS_DETAILS+this.props.params.bookingid, 'GET', data , header, urlparams).then(
                function(result){
                  self.setState({
                    name : result.tour.name,
                    bookable_pattern: result.variant.bookable_patterns.join(", "),
                    discounted_price: result.variant.sub_variant.fixed_pricings[0].discounted_price,
                    no_of_people: result.no_of_people,
                    discount_amount: result.discount_amount,
                    amount: result.amount,
                    bookingid: result.id,
                    customerName: result.first_name + " " + result.last_name,
                    time: "",
                    place: "",
                    dot: result.date_of_travel,
                    email: result.email,
                    phone: result.phone

                  });
                  console.log(result);
                  
                },
                function(result){
                      let message = JSON.parse(result.responseText);
                      self.props.route.notification._addNotification(window.event, "error", message.message);
                });
  },
  render: function() {
    return (
      <div>
      <div className="page-body grey2">
  <div className="container">
      <ol className="breadcrumb">
          <li><img src="images/icon-home.png" /><a href="/#/dashboard"> Dashboard</a></li>
          <li className="active">Bookings</li>
        </ol>
    </div>
</div>
    <div className="page-body">
    <div className="container">
        <div className="ticket-preview">
          <div className="ticket">
            <div className="bar">
              <p>Booking Voucher</p>
              <img src="images/watermark.png" /></div>
            <table>
              <tbody><tr>
                <td><div className="details1">
                    <h3>{this.state.name}</h3>
                    <p>{this.state.bookable_pattern}</p>
                    <hr />
                    <h4>Travelers</h4>
                    <p>Name : Giridhar, Pratheek</p>
                    <p>Infant: Rakesh</p>
                    <div className="block col">
                      <div>
                        <div className="left">
                          <p>Adult </p>
                          <p>{this.state.no_of_people}  x <i className="fa fa-inr"></i> {this.state.discounted_price}</p>
                        </div>
                        <div className="right">
                          <p><i aria-hidden="true" className="fa fa-inr"></i> {this.state.no_of_people*this.state.discounted_price}</p>
                        </div>
                      </div>
                      <div>
                        <div className="left">
                          <p>Adult </p>
                          <p>1 x <i className="fa fa-inr"></i> 2400</p>
                        </div>
                        <div className="right">
                          <p><i aria-hidden="true" className="fa fa-inr"></i> 2400</p>
                        </div>
                      </div>
                      <div>
                        <div className="left">
                          <p>Discount (THRILL10) </p>
                        </div>
                        <div className="right">
                          <p>- <i aria-hidden="true" className="fa fa-inr"></i> {this.state.discount_amount}</p>
                        </div>
                      </div>
                      <div>
                        <div className="left">
                          <p>Tax </p>
                        </div>
                        <div className="right">
                          <p><i aria-hidden="true" className="fa fa-inr"></i> 100</p>
                        </div>
                      </div>
                      <div>
                        <div className="left">
                          <p>Wallet Deduction </p>
                        </div>
                        <div className="right">
                          <p>- <i aria-hidden="true" className="fa fa-inr"></i> 500</p>
                        </div>
                      </div>
                    </div>
                    <div className="block col grand-total">
                      <div>
                        <div className="right">
                          <p>Total Price : <i aria-hidden="true" className="fa fa-inr"></i> {this.state.amount} </p>
                        </div>
                      </div>
                    </div>
                  </div></td>
                <td><div className="details2">
                    <p>Date of Travel</p>
                    <h3>{this.state.dot}</h3>
                    <p>Time</p>
                    <h3>{this.state.time}</h3>
                    <p>Pickup Place</p>
                    <h3>{this.state.place}</h3>
                  </div></td>
              </tr>
            </tbody></table>
          </div>
        </div>
    </div>   
</div>    

</div>



   
    );
  }
  
});
module.exports = BookingDetailsScreen;