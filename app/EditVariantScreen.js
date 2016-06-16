var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var TabVariantEditComponent = require("./TabVariantEdit.js");
var EditVariantScreen = React.createClass({
  getInitialState: function () {
    console.log(this.props.route.config().getListing());
    return {
      listing: {},
      variantDates: {}
    }
  },
componentDidMount: function() {
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
                  self.props.route.config().setListing(self.state.listing);
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
<div className="page-body">
    <div className="container">
        <TabVariantEditComponent  variantDates={this.state.variantDates} config={this.props.route.config} />

          

       
       
    </div>   
</div>

     </div>
    );
  }
  
});
  
module.exports = EditVariantScreen;