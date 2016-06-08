
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
                    bookable_pattern: result.variant.bookable_patterns.join(","),
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
    	<div className="container">
      <div className="row">
      	<div className="col-md-8">
      		<div className="row">
      			<div className="col-md-12">
      				<p>{this.state.name}</p>
      				<p>{this.state.bookable_pattern}</p>
      				<p>Travellers</p>
      				<div className="row">
      					<div className="col-md-4">
      						Adult
      					</div>
      					<div className="col-md-4">
      						{this.state.no_of_people} X  {this.state.discounted_price}
      					</div>
      					<div className="col-md-4 text-right">
      						 &#8377; {this.state.no_of_people*this.state.discounted_price}
      					</div>
      				</div>
      				<div className="row">
      					<div className="col-md-4">
      						Discount
      					</div>
      					<div className="col-md-4">
      						
      					</div>
      					<div className="col-md-4 text-right">
      						 &#8377; {this.state.discount_amount}
      					</div>
      				</div>
      				<div className="row">
      					<div className="col-md-4">
      						
      					</div>
      					<div className="col-md-4">
      						
      					</div>
      					<div className="col-md-4 text-right">
      						Total Price : &#8377; {this.state.amount}
      					</div>
      				</div>
      			</div>

      		</div>
      		
      	</div>
        <div className="col-md-4">
          <p>Booking Id</p>
          <p> {this.state.bookingid}</p>
          <p>Name</p>
          <p> {this.state.customerName}</p>
          <p>Contact Details</p>
          <p>P: {this.state.phone}</p>
          <p>E: {this.state.email}</p>
          <p>Date Of Travel</p>
          <p> {this.state.dot}</p>
          <p>Time</p>
          <p> {this.state.time}</p>
          <p>Pickup Place</p>
          <p> {this.state.place}</p>
           
        </div>
        
      </div>
      </div>
    );
  }
  
});
module.exports = BookingDetailsScreen;