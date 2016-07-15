var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var moment = require( 'moment' );
var _ = require( 'underscore' );
var VariantListing = React.createClass( {
  showEditPage: function ( listingid, variantid ) {
    window.location.href = '/#/edit-variant/' + listingid + '/' + variantid;
  },


  render: function () {
    console.log( this.props.listing );

    var self = this;
    var numberCount = 1;
    var details = this.props.listing.variants.map( function ( item ) {


      var subVariants = item.sub_variants.map( function ( items ) {
        var subVariantsPrice = $.map( items.fixed_pricings, function ( val ) {
          var inventoryObj = _.where( self.props.seed.inventories, {
            id: val.inventory_id
          } );
          console.log( inventoryObj );
          return (
          <div>
            <span className="price"><i className="fa fa-inr" aria-hidden="true"></i>{ val.price }</span>
            { '  ' + inventoryObj[ 0 ].name }
          </div>
          );
        } );

        return (
        <div>
          <h4>{ items.name }</h4>
          <p>
            { subVariantsPrice }
          </p>
          <hr />
        </div>

        );
      } );
      console.log( '===>>>>>' );
      console.log( self.props.variantDates );
      var datesBlock = $.map( Object.keys( self.props.variantDates ), function ( item2 ) {
        console.log( self.props.variantDates[ item2 ] );
        var id = Object.keys( self.props.variantDates[ item2 ] );
        console.log( id[ 0 ] + '-' + item.id );
        if ( id[ 0 ] == item.id ) {
          var datesItems = $.map( Object.keys( self.props.variantDates[ item2 ][ item.id ].pattern ), function ( items ) {
            console.log( items );
            if ( self.props.variantDates[ item2 ][ item.id ].pattern[ items ].enabled ) {
              return (

              <div className="seat">
                <h2>{ items }</h2>
                <p>
                  { self.props.variantDates[ item2 ][ item.id ].pattern[ items ].sold_count || 'NA' }<span>Occupied</span>
                </p>
                <p>
                  { self.props.variantDates[ item2 ][ item.id ].pattern[ items ].capacity || 'NA' }<span>Total Seats</span>
                </p>
              </div>

              );
            }
          } );
        }
        //   if(!$.isEmptyObject(value)){
        //     if(value.enabled){
        //       return (
        //      <div className="seat">
        //                     <h2>{key}</h2>
        //                     <p>{value.sold_count||"NA"}<span>Occupied</span></p>
        //                     <p>{value.capacity ||  "NA"}<span>Total Seats</span></p>
        //                 </div>

        //        );

        //     }
        // }


        return (
        <div className="seat-details">
          { datesItems }
        </div>

        );

      } );

      // var detailsItems = $.map( item.this_month_bookable_dates, function( items, i ){
      //     var seatDate = moment(items.date).format('ddd, MMMM');
      //     var seatDay = moment(items.date).format('D');
      //      return (
      //      <div className="seat">
      //                     <h2>{seatDay} <span>{seatDate}</span></h2>
      //                     <p>{value.sold_count||"NA"}<span>Occupied</span></p>
      //                     <p>{value.capacity ||  "NA"}<span>Total Seats</span></p>
      //                 </div>

      //   );
      // });
      return (
      <div>
        <hr />
        <h3>0{ numberCount }. { item.name }<button className="btn btn-line btn-secondary" onClick={ () => self.showEditPage( self.props.listing.id, item.id ) }> Edit </button></h3>
        <p>
          { item.description }
        </p>
        <h4>Dates & Seats :</h4>
        { datesBlock }
        <div className="p-30">
          { subVariants }
        </div>
      </div>
      );
    } );
    return (
    <div role="tabpanel"
         className="tab-pane"
         id="tabVariants">
      { details }
    </div>


    );
  }

} );

module.exports = VariantListing;
