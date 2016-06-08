
import {Router, Route, Link, hashHistory} from 'react-router';
import { Tabs, Tab } from 'react-tab-view'
var TabListingComponent =  require("./TabListingComponent.js");
import React, { Component, PropTypes } from 'react'
var STATES = require('./components/data/states');
import ReactPaginate from 'react-paginate';
var ListingDetailsScreen = React.createClass({
getInitialState: function () {
    return {
      listing: {
        description_details: {

        },
        reviews: [],
        variants: []
      },
      Tabsheader: ["Overview", "Details", "Variants", "Reviews"]
      
    }
  },
 
componentDidMount: function() {
  this.props.route.config().redirectWithoutSession();
  this.loadfromServer(1);
  },
  loadfromServer: function(pageNo){

      var self = this;
      console.log("url-data-page:"+this.state.pageSelected);
    //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);

    var urlparams = {

                    }
                    var data = {}
                    var clientInfo = this.props.route.config().getClientInfo();
                    var header = {};

                    
         this.props.route.config().httpInterceptor(this.props.route.config().url().LISTING_DETAILS+this.props.params.listingid, 'GET', data , header, this.props.route.config().getClientInfo()).then(
                function(result){
                  self.setState({
                    listing: result
                  });
                  console.log(result);
                },
                function(result){
                      let message = JSON.parse(result.responseText);
                      self.props.route.notification._addNotification(window.event, "error", message.message);
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
          <li><img src="images/icon-home.png" /><a href="#"> Dashboard</a></li>
          <li><a href="#">Listing </a></li>
          <li className="active">{this.state.listing.name}</li>
        </ol>
      <div className="row">
        <div className="col-sm-8">
            <h3>{this.state.listing.name}, Karnata</h3>
            <ul className="highlights">
                <li>
                    <div className="rating"><span>{this.state.listing.average_rating}</span> {this.state.listing.reviews_count} Reviews</div>
                </li>
                <li><img src="images/icon-day.png" /> {this.state.listing.days} Days</li>
                <li><img src="images/icon-night.png" /> {this.state.listing.nights} Night</li>
                <li><img src="images/icon-location.png" /> Coorg, Karnataka</li>
            </ul>
         </div>
          <div className="col-sm-4 text-right">
              <div className="right-block">
                 <p>Starting From</p>
                  <div className="">
                    <p className="price"><i className="fa fa-inr" aria-hidden="true"></i> {this.state.listing.price}</p>
                      
                  </div>
                </div>
           
          </div>
      
      </div>
    </div>
</div>
 <div className="tab-section">
        <TabListingComponent headers={this.state.Tabsheader}   listing={this.state.listing}   />
        </div>
      </div>
    );
  }
  
});
  
module.exports = ListingDetailsScreen;