var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var STATES = require('./components/data/states');
var ListingScreen = React.createClass({
getInitialState: function () {
    return {
      listing: {
        tours:[]
      }
    }
  },
  showDetails: function(listingid){
      window.location.href = "/#/listingDetails/" + listingid;
  },
componentDidMount: function() {
  this.props.route.config().redirectWithoutSession();
  $(".menu-option").removeClass("active");
   $("#listing_menu").addClass("active");
  var self = this;
    //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);
    var data = {
                       
                    }
         this.props.route.config().httpInterceptor(this.props.route.config().url().LISTING, 'GET', data, {},this.props.route.config().getClientInfo()).then(
                        function(result){
                          
                          console.log(result);
                          self.setState({
                  listing: result
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
  var self = this;
  var detailsItems = this.state.listing.tours.map(function(items) {
        return (
         <div className="col-sm-4 pointer" onClick={()=>self.showDetails(items.id)}>
                <div className="listing-card">
                    <img src={items.nearest_metro_city.thumbnail_image.size_large} />
                    <div className="text">
                        <h3>{items.name}</h3>
                        <div className="highlights">
                            <div><span>10455</span> Views</div>
                            <div><span>428</span> Enquiries</div>
                            <div><span>{items.reviews_count}</span> Reviews</div>
                            <div><span>{items.sold_count}</span> Bookings</div>
                        </div>
                        <h2>Total Worth : <span ><i className="fa fa-inr" aria-hidden="true"></i> {items.price}</span></h2>
                        <div className="alert alert-danger" >
                            <i className="glyphicon glyphicon-warning-sign"></i>Your Booking Dates are going to Expire, update  it now!
                        </div>
                    </div>
                </div>
            </div>
      );
    });



    return (

      <div className="page-body">
    <div className="container">
        <div className="row">
            {detailsItems}
        
        </div>
    </div>   
</div>

    );
  }
  
});
  
module.exports = ListingScreen;