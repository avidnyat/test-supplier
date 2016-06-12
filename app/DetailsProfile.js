var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var DetailsProfile = React.createClass({


  render: function() {
    return (
      <div >

<table>
                    <tr>
                        <td>Vendor Id </td>
                        <td>{this.props.profile.id}</td>
                    </tr>
                    <tr>
                        <td>Registration Date </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{this.props.profile.name}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>
                            <div className="dropdown">
                              <button className="btn dropdown-toggle" type="button"  data-toggle="dropdown" >
                                Choose
                                <span className="glyphicon glyphicon-triangle-bottom"></span>
                              </button>
                              <ul className="dropdown-menu" >
                                <li>{this.props.profile.gender}</li>
                                <li>Female</li>
                              </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Nationality</td>
                        <td>
                            <div className="dropdown">
                              <button className="btn dropdown-toggle" type="button"  data-toggle="dropdown" >
                                {this.props.profile.nationality}
                                <span className="glyphicon glyphicon-triangle-bottom"></span>
                              </button>
                              <ul className="dropdown-menu" >
                                <li>sffasdf</li>
                                <li>sfasdfsdf</li>
                              </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Company name</td>
                        <td><input type="text" value={this.props.profile.company_name} /></td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td><input type="text" value={this.props.profile.company_website} /></td>
                    </tr>
                
                </table>
                <button className="btn btn-secondary btn-line">Edit Profile</button>

      	
      </div>
    );
  }
  
});
  
module.exports = DetailsProfile;