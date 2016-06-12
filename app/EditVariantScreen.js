var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var TabVariantEditComponent = require("./TabVariantEdit.js");
var EditVariantScreen = React.createClass({


  render: function() {
    return (
     <div>
     <div className="page-body grey2">
  <div className="container">
      <ol className="breadcrumb">
          <li><img src="images/icon-home.png" /><a href="#"> Dashboard</a></li>
          <li><a href="#">Listing </a></li>
          <li className="active">Coorg Adventure Experience</li>
        </ol>
      <div className="row">
        <div className="col-sm-8">
            <h3>Coorg Adventure Experience, Karnata</h3>
            <ul className="highlights">
                <li>
                    <div className="rating"><span>4.0</span> 126 Reviews</div>
                </li>
                <li><img src="images/icon-day.png" /> 2 Days</li>
                <li><img src="images/icon-night.png" /> 1 Night</li>
                <li><img src="images/icon-location.png" /> Coorg, Karnataka</li>
            </ul>
         </div>
          <div className="col-sm-4 text-right">className
              <div className="right-block">
                 <p>Starting From</p>
                  <div className="">
                    <p className="price"><i class="fa fa-inr" aria-hidden="true"></i> 2,800</p>
                      <button class="btn btn-secondary">View Preview</button>
                  </div>
                </div>
           
          </div>
      
      </div>
    </div>
</div>
<div className="page-body">
    <div className="container">
        <TabVariantEditComponent    />

          

       
       
    </div>   
</div>

     </div>
    );
  }
  
});
  
module.exports = EditVariantScreen;