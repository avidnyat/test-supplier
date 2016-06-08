var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var ContactInfoProfile = React.createClass({


  render: function() {
    return (
       <div >
      	<h1> Email {this.props.profile.email}</h1>
        <p>Secondary Email : {this.props.profile.secondary_email}</p>
        <p> Phone: {this.props.profile.phone1}</p>
        <p> secondary Phone: {this.props.profile.phone2}</p>
         <p> Address line 1: {this.props.profile.address1}</p>
         <p> Address line 2: {this.props.profile.address2}</p>
         <p> city: {this.props.profile.city}</p>
         <p>state: {this.props.profile.state}</p>
         <p>country: {this.props.profile.country}</p>
         <p> Postal code: {this.props.profile.postal_code}</p>
         <p> Assitant Name: {this.props.profile.assistant_name}</p>
         <p> Assitant email: {this.props.profile.assistant_email}</p>
         <p>Assitant phone: {this.props.profile.assistant_phone}</p>
         
      </div>
    );
  }
  
});
  
module.exports = ContactInfoProfile;