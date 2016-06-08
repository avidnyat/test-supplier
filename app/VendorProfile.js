var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var VendorProfile = React.createClass({


  render: function() {
    return (
      <div className={"thank-you " + this.props.position}>
      	<img src={this.props.profile.photo} />
        <h1>{this.props.profile.name}</h1>
        <p>{this.props.profile.city}</p>
        <p> Email: {this.props.profile.email}</p>
         <p> phone: {this.props.profile.phone1}</p>
         <p> Basic</p>
         <p>{this.props.profile.description}</p>
      </div>
    );
  }
  
});
  
module.exports = VendorProfile;