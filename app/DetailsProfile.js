var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var DetailsProfile = React.createClass({


  render: function() {
    return (
      <div >
      	<h1> Vendor Id {this.props.profile.id}</h1>
        <p>Registration Date : </p>
        <p> Name: {this.props.profile.name}</p>
         <p> Gender: {this.props.profile.gender}</p>
         <p> Nationality: {this.props.profile.nationality}</p>
         <p>Company Name: {this.props.profile.company_name}</p>
         <p>Company website: {this.props.profile.company_website}</p>
      </div>
    );
  }
  
});
  
module.exports = DetailsProfile;