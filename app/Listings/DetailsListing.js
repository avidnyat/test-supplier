var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var DetailsListing = React.createClass( {


  render: function () {
    console.log( this.props.listing );
    var self = this;

    var dayItenary = Object.keys(this.props.listing.itineraries).map(function(item){
          var details = Object.keys(self.props.listing.itineraries[item].data).map(function(dataItem){
              return (
                  <p>
                    {self.props.listing.itineraries[item].data[dataItem]}
                  </p>
                );

          })
            return (
                <div>
                  <h4 className=""><span></span>{self.props.listing.itineraries[item].short_itinerary || self.props.listing.itineraries[item].long_itinerary}</h4>
                  {details}
                </div>
              );
    })
    console.log("333---");
    console.log(Object.keys(this.props.listing.itineraries).length);
    if(Object.keys(this.props.listing.itineraries).length ==0){
      $(".itinerary-label").hide();
      $(".itineraries-title").hide();
    }else{
       $(".itinerary-label").show();
      $(".itineraries-title").show();
    }
    var details = Object.keys( this.props.listing.description_details ).map( function ( item, index ) {

      var detailsItems = self.props.listing.description_details[ item ].map( function ( items ) {
        return (
        <li>
          { items }
        </li>

        );
      } );
      console.log("0900-=-="+item);
      if(index != 0){
        return (
        <div>
          <hr />
          <h3>{ item }</h3>
          <ul className="arrow-list">
            { detailsItems }
          </ul>
        </div>
        );
      }else{
          return (
            <div>
              <h3>{ item }</h3>
              <ul className="arrow-list">
                { detailsItems }
              </ul>
            </div>
            );
      }
      
    } );
    return (
    <div role="tabpanel"
         className="tab-pane"
         id="tabDetails">
      <h3 className="itinerary-label">Itenary</h3>
      <div className="details itineraries-title">
        {dayItenary}
        </div>
      
      { details }
    </div>


    );
  }

} );

module.exports = DetailsListing;
