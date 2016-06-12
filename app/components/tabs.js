import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'
import ReactPaginate from 'react-paginate';
var moment = require("moment");
class TabComponent extends Component {
  

  render () {
   var self = this;
   // const headers = ['heading 1', 'heading 2'];
  
    var listItems = self.props.bookings.map(function(item) {
      function setInfo(item){
    $("#name").html(item.first_name+ " "+ item.last_name);
    $("#phone").html(item.phone);
    
  } 
      function showDetails(bookingId){
        window.location.href = "/#/bookingDetails/"+bookingId;
      }
      return (

        <div className="booking-card" onClick={()=>showDetails(item.id)}>
          <div className="img">
              <img src={item.tour.thumbnail_image.size_tiny} />  
          </div>
          <div className="info">
              <div className="details">
                  <h3>{item.tour.name}</h3>
                 <p>Booked by: {item.first_name} {item.last_name}  |  Booking Date: {moment(item.created_at).format("D MMMM")} </p>
                  <p><img src="images/icon-date.png" />Trip Date: {moment(item.date_of_travel).format("D MMMM YYYY")} </p>
                  <p><img src="images/icon-travellar.png" />Travelers: {item.no_of_people}</p>
              </div>
              <div className="contact">
                 <div className="contact-info" data-toggle="modal" data-target="#forgotPwModal" onClick={()=>setInfo(item)}><span><img src="images/icon-phone.png" /></span>Contact Details</div> 
              </div>                      
          </div>                  
        </div>
       
      );
    });

  var listItemsHistory = self.props.history.map(function(item) {
      function setInfo(item){
    $("#name").html(item.first_name+ " "+ item.last_name);
    $("#phone").html(item.phone);
    
  } 
      function showDetails(bookingId){
        window.location.href = "/#/bookingDetails/"+bookingId;
      }
      return (

        <div className="booking-card" onClick={()=>showDetails(item.id)}>
          <div className="img">
              <img src={item.tour.thumbnail_image.size_tiny} />  
          </div>
          <div className="info">
              <div className="details">
                  <h3>{item.tour.name}</h3>
                 <p>Booked by: {item.first_name} {item.last_name}  |  Booking Date: {moment(item.created_at).format("D MMMM")} </p>
                  <p><img src="images/icon-date.png" />Trip Date: {moment(item.date_of_travel).format("D MMMM YYYY")} </p>
                  <p><img src="images/icon-travellar.png" />Travelers: {item.no_of_people}</p>
              </div>
              <div className="contact">
                 <div className="contact-info" data-toggle="modal" data-target="#forgotPwModal" onClick={()=>setInfo(item)}><span><img src="images/icon-phone.png" /></span>Contact Details</div> 
              </div>                      
          </div>                  
        </div>
       
      );
    });

      
    return (
      <div>
        <Tabs headers={this.props.headers}>
        
              <Tab>
               <div className="sort-list">
                    <p>Sort By: </p>
                      <div className="checkbox">
                        <input type="checkbox" id="sortcb1" />
                        <label for="sortcb1">Today</label>
                      </div>
                      <div className="checkbox">
                        <input type="checkbox" id="sortcb2" />
                        <label for="sortcb2">Tomorrow</label>
                      </div>
                      <div className="checkbox">
                        <input type="checkbox" id="sortcb3" />
                        <label for="sortcb3">This Weekend</label>
                      </div>
                      <div className="sort-dropdown">
                          <div className="dropdown">
                              <button className="btn dropdown-toggle"  data-toggle="dropdown" > Trip Date
                                <span className="glyphicon glyphicon-menu-down"></span>
                              </button>
                              <ul className="dropdown-menu" >
                                <li>11/11/1111</li>
                                <li>22/22/2222</li>
                               </ul>
                            </div>
                            <a href="javascript:void(0)" className="help-note"><i className="fa fa-question-circle-o" aria-hidden="true"></i></a>
                      
                      </div>
                      <div className="sort-dropdown">
                          <div className="dropdown">
                              <button className="btn dropdown-toggle"  data-toggle="dropdown" > Coorg Trekking
                                <span className="glyphicon glyphicon-menu-down"></span>
                              </button>
                              <ul className="dropdown-menu" >
                                <li>Coorg Trekking</li>
                                <li>Coorg Trekking</li>
                               </ul>
                            </div>
                            <a href="javascript:void(0)" className="help-note"><i className="fa fa-question-circle-o" aria-hidden="true"></i></a>
                      
                      </div>
                  
                  </div>
              <div className="tab-pane active" id="tabNewBookings" >
            {listItems}
            </div>
            <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       pageNum={self.props.pagenum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={self.props.bookingscreen.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
          </Tab>
          <Tab>
           <div className="tab-pane active" id="tabNewBookings" >
            {listItemsHistory}
            </div>
            <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       pageNum={self.props.pagenum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={self.props.bookingscreen.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
          </Tab> 
         
       
        </Tabs>
      </div>
    )
  }
}



module.exports = TabComponent;