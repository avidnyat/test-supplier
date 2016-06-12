
import {Router, Route, Link, hashHistory} from 'react-router';
import { Tabs, Tab } from 'react-tab-view'
var TabComponent =  require("./components/tabs.js");
import React, { Component, PropTypes } from 'react'
var STATES = require('./components/data/states');
import ReactPaginate from 'react-paginate';
var BookingScreen = React.createClass({
getInitialState: function () {
    return {
      bookings: [],
      history: [],
      pageNum: 0,
      pageSelected: 1,
      contactNumber: "",
      modalName: ""
    }
  },
 
componentDidMount: function() {
	this.props.route.config().redirectWithoutSession();
  this.props.route.notification.clearMenu();
   $(".menu-option").removeClass("active");
   $("#bookings_menu").addClass("active");
	this.loadfromServer(1);
  },
  loadfromServer: function(pageNo){

      var self = this;
      console.log("url-data-page:"+this.state.pageSelected);
    //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);
    var urlparams = {
                "page": pageNo,
                "per_page": 10
                       
                    }
                    var data = {}
                    var clientInfo = this.props.route.config().getClientInfo();
                    var header = {
                      "X-Thrill-Client-Id": clientInfo.client_id,
                      "X-Thrill-Auth-Token": clientInfo.auth_token
                    }
                    
         this.props.route.config().httpInterceptor(this.props.route.config().url().BOOKINGS_LIST, 'GET', data , header, urlparams).then(
                function(result){
                  self.setState({
                    bookings: result.bookings,
                    pageNum: Math.ceil(result.total_count / 10)
                  });
                  
                },
                function(result){
                  console.log(result);
                      //let message = JSON.parse(result.responseText);
                      //self.props.route.notification._addNotification(window.event, "error", message.message);
                });
          
          var urlparams = {
                "page": pageNo,
                "per_page": 10
                       
                    }
                    var data = {}
                    var clientInfo = this.props.route.config().getClientInfo();
                    var header = {
                      "X-Thrill-Client-Id": clientInfo.client_id,
                      "X-Thrill-Auth-Token": clientInfo.auth_token
                    }
                    
         this.props.route.config().httpInterceptor(this.props.route.config().url().BOOKINGS_LIST, 'GET', data , header, urlparams).then(
                function(result){
                  self.setState({
                    history: result.bookings,
                    pageNum: Math.ceil(result.total_count / 10)
                  });
                  
                },
                function(result){
                  console.log(result);
                      //let message = JSON.parse(result.responseText);
                      //self.props.route.notification._addNotification(window.event, "error", message.message);
                });
          
    
  },

   handlePageClick: function(data){
    var currentPage = data.selected+1;
    this.setState({
                    pageSelected: currentPage,
                  });
    this.loadfromServer(currentPage);
    console.log(data.selected+1);
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
    <TabComponent headers={["Upcoming Bookings",  "History"]}  bookingscreen={this} tabs={["Upcoming Bookings", "History"]} bookings={this.state.bookings} history={this.state.history} modalName={this.state.modalName} contact={this.state.contactNumber} pagenum={this.state.pageNum}/>
         <div className="modal forgot-pw-modal fade" id="forgotPwModal" tabindex="-1" role="dialog" >
             <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-body text-center">
                    <h3 id="phone"></h3>
          
     
                  </div>
      
                </div>
              </div>
          </div>
    </div>
</div>
      </div>
     
    );
  }
  
});
  
module.exports = BookingScreen;