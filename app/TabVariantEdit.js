import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'
var CalendarComponent = require("./calendarComponent.js")
class TabVariantEditComponent extends Component {
  

  render () {

    return (
      <div>
        <Tabs headers={["Edit Private tour variant"]}>
            
          <Tab>
            <div className="tab-content">
            <div className="tab-pane active" >
                <p>Get your jungle gear on because it's time to go on an African Safari. Explore the beautiful country of Zambia in Africa in this tour. Arrive at Livingstone Airport in Zambia and start your 11 days of adventure.</p>  
                <h3>Customize Dates & Seats</h3>
                <div className="seat-options">
                    <div className="item active">
                        <input type="radio" name="seat-option" id="cb1" />
                        <label for="cb1">All Days</label>
                        <input type="text" placeholder="Seats" />
                    </div>
                   <div className="item">
                        <input type="radio" name="seat-option" id="cb2" />
                        <label for="cb2">All Weekends</label>
                        <input type="text" placeholder="Seats" />
                    </div>
                    <div className="item">
                        <input type="radio" name="seat-option" id="cb3" />
                        <label for="cb3">All Weekdays</label>
                        <input type="text" placeholder="Seats" />
                    </div>
                    
                
                </div>
                <div className="calendar">
                    <CalendarComponent />
                </div>
                <h3>With Breakfast</h3>
                <p>Get your jungle gear on because it's time to go on an African Safari. </p>
                <p className="price-edit"> <input type="text" placeholder="Amount" /> per adult</p>
                <hr />
                <h3>Without Breakfast</h3>
                <p>Get your jungle gear on because it's time to go on an African Safari. </p>
                <p className="price-edit"> <input type="text" placeholder="Amount" /> per adult</p>
                <p className="price-edit"> <input type="text" placeholder="Amount" /> per infant</p>
                <hr />
                <p></p>
                <button className="btn btn-secondary">Update Changes</button>
                
                <button className="btn btn-cancel">Cancel</button>
              
            </div>
          </div>

        </Tab>    
        
       
        </Tabs>
        
      </div>
    )
  }
}



module.exports = TabVariantEditComponent;