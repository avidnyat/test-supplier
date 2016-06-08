import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'

class TabComponent extends Component {
  

  render () {
   var self = this;
   // const headers = ['heading 1', 'heading 2'];
   var tabItems = this.props.tabs.map(function(items) {
    var listItems = self.props.bookings.map(function(item) {
      function setInfo(item){
    $("#name").html(item.first_name+ " "+ item.last_name);
    $("#phone").html(item.phone);
    
  } 
      function showDetails(bookingId){
        window.location.href = "/#/bookingDetails/"+bookingId;
      }
      return (
        <div className="row bookings-list">
          <div className="col-md-2" onClick={()=>showDetails(item.id)}>
            <img src={item.tour.thumbnail_image.size_tiny} />
          </div>
          <div className="col-md-7">
              <div className="row">
                <div className="col-md-8">
                   <span>{item.tour.name}</span>
                </div>
              
                <div className="col-md-8">
                   <span>Booked by: {item.vendor.name} | Booking Date: {item.created_at}</span>
                </div>
             
                <div className="col-md-8">
                   <span>Trip date: {item.date_of_travel}</span>
                </div>
             
                <div className="col-md-8">
                    <span>Travelers: {item.no_of_people}</span>
                </div>
             </div>
            
            
           
          </div>
           <div className="col-md-3">
            <a href="javascript:void(0);" data-toggle="modal" data-target="#forgotPwModal" onClick={()=>setInfo(item)}>Contact Details</a>
           </div>

        </div>
      );
    });
      return (
        <Tab>
            {listItems}
          </Tab>
      );
    });
    return (
      <div>
        <Tabs headers={this.props.headers}>
         {tabItems}
        </Tabs>
      </div>
    )
  }
}



module.exports = TabComponent;