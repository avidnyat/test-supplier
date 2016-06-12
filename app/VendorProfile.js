var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var VendorProfile = React.createClass({


  render: function() {
    return (
      <div className="vendor-profile">
                    <div className="profile">
                        <div className="pic">
                            <img src={this.props.profile.photo} />
                        </div>
                        
                   </div>
                   <div className="profile-details">
                       <h4>{this.props.profile.name}</h4>
                       <p>{this.props.profile.city}  |   Thrillophilia Vendor since 2014</p>
                       <p><strong>Phone:</strong> {this.props.profile.phone1}      &nbsp;&nbsp;&nbsp; <strong>Email:</strong> <a href="mailto:email.vendoremail.com">{this.props.profile.email}</a></p>
                        <h4>Basic Info</h4>
                       <p>{this.props.profile.description}</p>
                       <button className="btn btn-line btn-secondary">Edit Profile</button>


                   
                   </div>
                
                </div>
      
    );
  }
  
});
  
module.exports = VendorProfile;