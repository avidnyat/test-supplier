var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var OverviewListing = React.createClass({


  render: function() {
    return (
     <div role="tabpanel" className="tab-pane active" id="tabOverview">
                <div className="highlights">
                    <div className="item">
                        <img src="images/icon-meals.png" />
                        <p>Meals</p>
                    </div>
                    
                    <div className="item">
                        <img src="images/icon-transport.png" />
                        <p>Transport</p>
                    </div>
                    <div className="item">
                        <img src="images/icon-cab.png" />
                        <p>Pick-Up & Drop</p>
                    </div>
                    <div className="item">
                        <img src="images/icon-activities.png" />
                        <p>Activities</p>
                    </div>
                </div>
                <h3>Overview</h3>
                <p dangerouslySetInnerHTML={{__html: this.props.listing.overview}}></p>
                <h3>Selected Categories</h3>
                <div className="item2">
                    <p>Nature & Adventure</p>
                    <p>Camping</p>
                    <p>Stay Experience</p>
                    <p>Sample text</p>
                </div>
                
            </div>
    );
  }
  
});
  
module.exports = OverviewListing;