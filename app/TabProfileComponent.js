import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'
var VendorProfile = require("./VendorProfile.js");
var DetailsProfile = require("./DetailsProfile.js");
var ContactInfoProfile = require("./ContactInfoProfile.js");
var BankDetailsProfile = require("./BankDetailsProfile.js");
var TermsAndConditionsProfile = require('./TermsAndConditionsProfile.js');
class TabProfileComponent extends Component {
  

  render () {

    return (
      <div>
        <Tabs headers={this.props.headers}>
          <Tab>
            <VendorProfile profile={this.props.profile}/>
        </Tab>    
        <Tab>
            <DetailsProfile profile={this.props.profile}/>
         </Tab>   
         <Tab>
            <ContactInfoProfile profile={this.props.profile}/>
        </Tab>    
        <Tab>
            <BankDetailsProfile profile={this.props.profile}/>
        </Tab>    
        <Tab>
            <TermsAndConditionsProfile profile={this.props.profile}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}



module.exports = TabProfileComponent;