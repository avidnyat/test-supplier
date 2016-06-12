var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var moment = require("moment");
var VariantListing = React.createClass({
 showEditPage: function(){
    window.location.href = "/#/edit-variant/" ;
 },

 
  render: function() {
    console.log(this.props.listing);
    var self = this;
    var numberCount = 1;
      var details = this.props.listing.variants.map(function(item) {

      
      var subVariants =   item.sub_variants.map(function(items) {
var subVariantsPrice = $.map( items.fixed_pricings, function( val, i ) {
        if(i === 0){
          var age = " per adult";
          var space = "";
        }else{
          var age = " per infant";
          var space = ",  "; 
        }
  return (
          <div>
          {space}<span className="price"><i className="fa fa-inr" aria-hidden="true"></i>{val.price}</span>{age}
           </div>         
      );
});

        return (
         <div >
                        <h4>{items.name}</h4>
                    <p>Get your jungle gear on because it's time to go on an African Safari. </p>
                    <p>{subVariantsPrice}</p>
                    <hr />
                    </div>
                    
      );
    });
    var detailsItems = $.map( item.this_month_bookable_dates, function( items, i ){
        var seatDate = moment(items.date).format('ddd, MMMM');
        var seatDay = moment(items.date).format('D');
        return (
         <div className="seat">
                        <h2>{seatDay} <span>{seatDate}</span></h2>
                        <p>{items.seats}<span>Occupied</span></p>
                        <p>100<span>Total Seats</span></p>
                    </div>
                    
      );
    });
    return (
        <div >
         <hr />
           <h3>0{numberCount}. {item.name}<button className="btn btn-line btn-secondary" onClick={self.showEditPage}>Edit</button></h3> 
                <p>{item.description}</p>
                <h4>Dates & Seats :</h4>
                <div className="seat-details">
                    {detailsItems}
                    <div className="seat view-details">
                        <h2><i className="glyphicon glyphicon-calendar"></i> <span>View All Dates</span></h2>
                    </div>
                </div>
                <div className="p-30">
                   {subVariants}
                
                </div>

        </div>
      );
    });
    return (
      <div role="tabpanel" className="tab-pane" id="tabVariants">
                
        {details}              
      </div>
          
            
    );
  }
  
});
  
module.exports = VariantListing;