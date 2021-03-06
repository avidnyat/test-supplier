import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'
var CalendarComponent = require( './calendarComponent.js' )
var GregorianCalendar = require( 'gregorian-calendar' );
var date1 = new GregorianCalendar(); // defaults to en_US
var moment = require( 'moment' );
var _ = require( 'underscore' );
var now = new Date();
if ( now.getMonth() == 11 ) {
  var current = new Date( now.getFullYear() + 2, 0, 1 );
} else {
  var current = new Date( now.getFullYear(), now.getMonth() + 2, 1 );
}
date1.setTime( current );

var date2 = new GregorianCalendar(); // defaults to en_US
var now = new Date();
if ( now.getMonth() == 11 ) {
  var current = new Date( now.getFullYear() + 3, 0, 1 );
} else {
  var current = new Date( now.getFullYear(), now.getMonth() + 3, 1 );
}
date2.setTime( current );
var date = new GregorianCalendar(); // defaults to en_US
var now = new Date();
if ( now.getMonth() == 11 ) {
  var current = new Date( now.getFullYear() + 1, 0, 1 );
} else {
  var current = new Date( now.getFullYear(), now.getMonth() + 1, 1 );
}
date.setTime( current );

var TabVariantEditComponent = React.createClass( {
  getInitialState: function () {

    return {

      variantDates: {},
      calendarDates: [],
      weekdaysFlag: [],
      patternFlag: 0,
      repeatFlag: false,
      check_all_days: false,
      check_all_weekends: false,
      check_all_weekdays: false,
      all_days: '',
      all_weekdays: '',
      all_weekends: '',
      seed: {
        inventories: []
      },
      fixed_pricings: {}

    }
  },
  getNextDate: function () {
    var date = new GregorianCalendar(); // defaults to en_US
    var now = new Date();
    console.log(now.getTimezoneOffset());
    var current = new Date(Date.UTC( now.getFullYear(), now.getMonth() + this.state.calendarDates.length +1, 1, 0 , 0, 0 ));
    date.setTime( current );
    var arrayDates = this.state.calendarDates;
    arrayDates.push( date );
    var date1 = new GregorianCalendar(); // defaults to en_US
    console.log(now.getMonth() +">>>>>====="+ this.state.calendarDates.length +">>>>>>>");
    var current = new Date( now.getFullYear(), now.getMonth() + this.state.calendarDates.length +1, 1 );
    date1.setTime( current );
    arrayDates.push( date1 );
    var date2 = new GregorianCalendar(); // defaults to en_US
    
    var current = new Date( now.getFullYear(), now.getMonth() + this.state.calendarDates.length +1, 1 );
    date2.setTime( current );
    arrayDates.push( date2 );
    for(var i=3;i<12;i++){
      var date3 = new GregorianCalendar(); // defaults to en_US
    
    var current = new Date( now.getFullYear(), now.getMonth() + this.state.calendarDates.length +1, 1 );
    date3.setTime( current );
    arrayDates.push( date3 );
    }
    this.setState( {
      calendarDates: arrayDates
    } )
  },
  componentDidMount: function () {
    this.getNextDate();
    $('#container1').mCustomScrollbar({ 
            theme:"dark-3",
            alwaysShowScrollbar: 2        
    });
    var self = this;
    
    $( document ).on( 'click', '.edit-link', function ( e ) {
      $( e.target ).closest( 'td' ).find( '.gray-section' ).hide();
      $( e.target ).closest( 'td' ).find( '.gray-section2' ).show();
      $( e.target ).addClass( 'hide' );
      $( e.target ).next().removeClass( 'hide' );
    } );
    $( document ).on( 'click', '.save-link', function ( e ) {
      var urlparams = {

      }

      var clientInfo = self.props.config().getClientInfo();
      var data = clientInfo;
      data[ 'variants_date_capacity' ] = {};
      var seat = 0;
      $.each( $( e.target ).closest( 'td' ).find( '.gray-section2 input' ), function ( key, value ) {
        if ( $( value ).val() != '' ) {
          seat = $( value ).val()
        }

      } )
      var datesParams = {
        date: moment( $( e.target ).closest( 'td' ).prop( 'title' ) ).format( 'YYYY-MM-DD' ),
        seats: seat
      }
      data[ 'variants_date_capacity' ][ self.props.listObj.getUrls().variantid ] = {
        dates: [ datesParams ]
      };
      var header = {
        'Content-Type': 'application/json'
      };

      console.log( JSON.stringify( data ) );

      self.props.config().httpInterceptor( self.props.config().url().VARIANT + self.props.listObj.getUrls().listingid + '/add_update_date_capacity?', 'POST', JSON.stringify(data), header, self.props.config().getClientInfo() ).then(
        function ( result ) {
          let response = result ;
          if(response.success){
             $( e.target ).closest( 'td' ).find( '.gray-section' ).show();

          $( e.target ).closest( 'td' ).find( '.gray-section2' ).hide();
          $( e.target ).addClass( 'hide' );
          $( e.target ).prev().removeClass( 'hide' );

            let variantDates=self.state.variantDates;
            variantDates[datesParams.date]={capacity:datesParams.seats,is_customized_date:true,sold_count:0}
            self.setState({
                variantDates:variantDates
            })
            self.props.notification._addNotification( window.event, 'success', "Updated successfully!!!" );
          }else{
             self.props.notification._addNotification( window.event, 'error', response.message );
          }
         
        }, function (result) {
              let message = JSON.parse( result.responseText );
              self.props.notification._addNotification( window.event, 'error', message.message );

          } );

    } );

    $( '.rc-calendar-table' ).first().find( 'td' ).each( function ( i ) {
      console.log( 'step' + i );
      if ( parseInt( $( this ).find( 'div' ).html() ) < parseInt( $( '.rc-calendar-today' ).find( 'div' ).html() ) ) {
        $( this ).html( '<div class="rc-calendar-date"><a class="link" href="#">Edit</a><p class=" grey">' + (new moment($( this ).prop("title")).format("D")) + '</p></div>' );
      } else {
        $( this ).html( '<div class="rc-calendar-date"><a class="link" href="#">Edit</a><p>' + (new moment($( this ).prop("title")).format("D")) + '</p><div class="gray-section"><div class="total">0/0</div></div><div class="gray-section2"><div class="total">Total seats <input type="text" ></div></div></div>' );
      }


    } );
    $( '.rc-calendar-table:not(:first)' ).find( 'td' ).each( function ( i ) {

       console.log("9-9-");
       console.log(new moment($( this ).prop("title")).format("D"));
      $( this ).html( '<div class="rc-calendar-date"><a class="link" href="#">Edit</a><p>' + (new moment($( this ).prop("title")).format("D"))+ '</p><div class="gray-section"><div class="total">0/0</div></div><div class="gray-section2"><div class="total">Total seats <input type="text" ></div></div></div>' );


    } );
    console.log( this.props.listObj.getUrls() );
    var urlparams = {

    }
    var data = {}
    var clientInfo = this.props.config().getClientInfo();
    var header = {
      'Content-Type': 'application/json'
    };


    this.props.config().httpInterceptor( this.props.config().url().VARIANT + this.props.listObj.getUrls().listingid + '/available_dates?', 'GET', data, header, this.props.config().getClientInfo() ).then(
      function ( result ) {

        var arrayDays = [
          'all_days',
          'all_weekdays',
          'all_weekends',
          'all_mondays',
          'all_tuesdays',
          'all_wednesdays',
          'all_thursdays',
          'all_fridays',
          'all_saturdays',
          'all_sundays'
        ];
        var arrayDaysCount = [
          [
            1, 2, 3, 4, 5, 6, 7

          ],
          [ 1, 2, 3, 4, 5 ],
          [ 6, 7 ],
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ];
        var flagAllDays = false;
        $.each( result.variants[ self.props.listObj.getUrls().variantid ].pattern, function ( key, val ) {
            console.log("variant",result)
          if ( val.enabled ) {
            if ( $.isArray( arrayDaysCount[ arrayDays.indexOf( key ) ] ) ) {
              if(key == "all_days"){
                $( '.weekday').prop( 'checked', 'checked' );
                flagAllDays = true;
              }else if (key == "all_weekdays"){
                 $( '.weekday[value=1]' ).prop( 'checked', 'checked' );  
                 $( '.weekday[value=2]' ).prop( 'checked', 'checked' );  
                 $( '.weekday[value=3]' ).prop( 'checked', 'checked' );  
                 $( '.weekday[value=4]' ).prop( 'checked', 'checked' );  
                 $( '.weekday[value=5]' ).prop( 'checked', 'checked' );  
              }else{
                 $( '.weekday[value=6]' ).prop( 'checked', 'checked' );  
                 $( '.weekday[value=7]' ).prop( 'checked', 'checked' );  
              }
               let checkSelection =`check_${key}`;
               self.setState({
                   weekdaysFlag : arrayDaysCount[ arrayDays.indexOf( key ) ],
                   [checkSelection] : true,
                   [key] : val.capacity
               })
              $('#'+key ).addClass( 'active' );
              
              $( '.weekday' ).next().next().val( val.capacity );
            } else {
              if(!flagAllDays){


                let weekdaysFlag=self.state.weekdaysFlag;
                weekdaysFlag.push( arrayDaysCount[ arrayDays.indexOf( key ) ] );
                self.setState({
                    weekdaysFlag : weekdaysFlag
                })
              }
              $( '.weekday[value=\'' + arrayDaysCount[ arrayDays.indexOf( key ) ] + '\']' ).prop( 'checked', 'checked' );
              $( '.weekday[value=\'' + arrayDaysCount[ arrayDays.indexOf( key ) ] + '\']' ).next().next().val( val.capacity );
            }
          }

        } )
        self.setState( {
          variantDates: result.variants[ self.props.listObj.getUrls().variantid ].all_dates
        } );
      }, function () {} );
    this.props.config().httpInterceptor( this.props.config().url().SEED, 'GET', data, header, this.props.config().getClientInfo() ).then(
      function ( result ) {
        self.setState( {
          seed: result
        } );


      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        self.props.notification._addNotification( window.event, 'error', message.message );
      } );

    var self1 = this;

    $( document ).on( 'click', '.weekday', function ( e ) {

      var self1 = e.target;


      if ( $( e.target ).is( ':checked' ) ) {

        if ( self.state.weekdaysFlag.indexOf( parseInt( $( e.target ).val() ) ) == -1 ) {
          var weeks = self.state.weekdaysFlag;
          weeks.push( parseInt( $( e.target ).val() ) );
        }
         $('.patterns' ).removeClass( 'active' );
        self.setState( {
          weekdaysFlag: weeks
        } );

      //   $(e.target).closest(".rc-calendar-table").find("td").each(function(i) {
      //     if(parseInt($(self).val()) == parseInt(moment($(this).prop("title")).isoWeekday())){
      //       console.log($(this).find("div").html());
      //       if($(this).find("p").hasClass("grey")){
      //         $(this).removeClass("active");
      //       }else{
      //         $(this).addClass("active");
      //       }
      //     }
      // });
      } else {
        //   $(e.target).closest(".rc-calendar-table").find("td").each(function(i) {
        //     if(parseInt($(self).val()) == parseInt(moment($(this).prop("title")).isoWeekday())){

        //       $(this).removeClass("active");
        //     }
        // });

        if ( self.state.weekdaysFlag.indexOf( parseInt( $( e.target ).val() ) ) != -1 ) {
          self.state.weekdaysFlag.splice( self.state.weekdaysFlag.indexOf( parseInt( $( e.target ).val() ) ), 1 );;
          console.log(self.state.weekdaysFlag);

        }
        if(parseInt($(e.target).val()) >0 &&  parseInt($(e.target).val()) < 6 ){
          self.state.check_all_weekdays = false;
          self.state.check_all_days = false;
        } else if(parseInt($(e.target).val()) ==6 ||  parseInt($(e.target).val()) == 7 ){
          self.state.check_all_weekends = false;
          self.state.check_all_days = false;
        }
         $('.patterns' ).removeClass( 'active' );
         $( '.patterns input[type="radio"]' ).prop("checked", false);
      
    
      }
if(self.state.weekdaysFlag.length == 7){
          $( ".patterns[data-pattern='1']" ).addClass("active");
          $( ".patterns[data-pattern='1'] input[type='radio']" ).prop("checked", true);
        }
        if((self.state.weekdaysFlag.length == 5) && ($.inArray(6, self.state.weekdaysFlag)==-1) && ($.inArray(7, self.state.weekdaysFlag)==-1)){
          $( ".patterns[data-pattern='3']" ).addClass("active");
          $( ".patterns[data-pattern='3'] input[type='radio']" ).prop("checked", true);
        }
        if((self.state.weekdaysFlag.length == 2) && ($.inArray(6, self.state.weekdaysFlag)!=-1) && ($.inArray(7, self.state.weekdaysFlag)!=-1)){
          $( ".patterns[data-pattern='2']" ).addClass("active");
          $( ".patterns[data-pattern='2'] input[type='radio']" ).prop("checked", true);
        }
        $( '.rc-calendar-table' ).first().find( 'td' ).each( function ( i ) {
          if ( (self.state.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ]!=undefined) && !self.state.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].is_customized_date ) {
            $( this ).removeClass( 'active' );
          }
          
          if ( self.state.weekdaysFlag.indexOf( parseInt( moment( $( this ).prop( 'title' ) ).isoWeekday() ) ) != -1 ) {

            if ( !$( this ).find( 'p' ).hasClass( 'grey' ) ) {

              $( this ).addClass( 'active' );
            }
          }
        });
    } );
    var self = this;
    $( '#repeat_action' ).on( 'click', function ( e ) {
      $(".pace").addClass("pace-inactive").removeClass("pace-active");
      $(e.target).css("disabled",true);
      if ( $( '#repeat_action' ).is( ':checked' ) ) {

        self.setState( {
          repeatFlag: true
        } );
      } else {
        self.setState( {
          repeatFlag: false
        } );
      }
    } );

    $( '.patterns input[type="radio"]' ).on( 'click', function ( e ) {
      var repeat = ':first';
      self.setState({
          check_all_days:false,
      check_all_weekdays:false,
      check_all_weekends:false
    })
      $('.patterns' ).removeClass( 'active' );
      $(e.target).prop( 'checked', false );
      $(e.target ).prop( 'checked', true );
      $(e.target ).closest(".patterns").addClass( 'active' );
      // $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input").each(function(i){
      //         if($(this).is(":checked")){
      //             $(this).trigger("click");
      //         }

      //     });

      //$(".rc-calendar-table"+repeat).find("td").removeClass("active");
      if ( $(e.target ).closest(".patterns").data( 'pattern' ) == '1' ) {
        self.setState( {
          patternFlag: 1,
          weekdaysFlag: [ 1, 2, 3, 4, 5, 6, 7 ],
          check_all_days:true
        } );
      // $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input").each(function(i){
      //     if(!$(this).is(":checked")){
      //         $(this).trigger("click");
      //     }

      // });
      } else if ( $(e.target ).closest(".patterns").data( 'pattern' ) == '2' ) {
        self.setState( {
          patternFlag: 2,
          weekdaysFlag: [ 6, 7 ],
          check_all_weekends:true
        } )

      // if(!$(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='7']").is(":checked")){
      //     $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='7']").trigger("click");
      // }
      //  if(!$(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='6']").is(":checked")){
      //     $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='6']").trigger("click");
      // }
      } else {
        self.setState( {
          patternFlag: 3,
          weekdaysFlag: [ 1, 2, 3, 4, 5 ],
          check_all_weekdays:true
        } )
        // if(!$(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='1']").is(":checked")){
        //     $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='1']").trigger("click");
        // }
        //   if(!$(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='2']").is(":checked")){
        //     $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='2']").trigger("click");
        // }
        //  if(!$(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='3']").is(":checked")){
        //     $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='3']").trigger("click");
        // }
        //  if(!$(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='4']").is(":checked")){
        //     $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='4']").trigger("click");
        // }
        //  if(!$(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='5']").is(":checked")){
        //     $(".rc-calendar-table"+repeat+" .rc-calendar-column-header input[value='5']").trigger("click");
        // }
      }
      $( '.weekday' ).prop( 'checked', false );
      $.each( self.state.weekdaysFlag, function ( key, val ) {
        $( '.weekday[value=\'' + val + '\']' ).prop( 'checked', 'checked' );
      } )
    } )

  },
  redirectVariantEdit: function () {
    window.location.href = '/#/listingDetails/' + this.props.listObj.getUrls().listingid;
  },

  saveAndRedirectVariantEdit: function () {
    var self = this;
    var data = this.props.config().getClientInfo();
    var array = {};
    $( '.price-edit input' ).each( function () {
      console.log( $( this ).data( 'id' ) );
      array[ $( this ).data( 'id' ) ] = {
        mrp: $( this ).val()
      }

    } );

    data[ 'fixed_pricings' ] = array;
    data=JSON.stringify(data)
    var header = {
      'Content-Type': 'application/json'
    };
    this.props.config().httpInterceptor( this.props.config().url().VARIANT + this.props.listObj.getUrls().listingid + '/update_fixed_pricings?', 'POST', data, header, this.props.config().getClientInfo() ).then(
      function ( result ) {
          self.savePatternAndRedirect();
      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        self.props.notification._addNotification( window.event, 'error', message.message );
      } );

  },
  componentDidUpdate: function() {
    $(".pace").addClass("pace-active").removeClass("pace-inactive");
  },
  onChangeCapacityValue:function(type,e){
    console.log(type,e.target.value)
    this.setState({
      [type] : e.target.value
    })
  },

  render: function () {
    var self = this;

    var item = _.where( this.props.listing.variants, {
      id: parseInt( this.props.listObj.getUrls().variantid )
    } );
    if ( item.length > 0 ) {
      var subVariants = item[ 0 ].sub_variants.map( function ( items ) {
        var subVariantsPrice = $.map( items.fixed_pricings, function ( val ) {
          var inventoryObj = _.where( self.state.seed.inventories, {
            id: val.inventory_id
          } );
          //TODO check if val.price or val.mrp ??
          return (

          <p className="price-edit">
            <input type="text"
                   placeholder="Amount"
                   defaultValue={ val.mrp }
                   data-id={ val.id } />
            { '  ' + inventoryObj[ 0 ].name }
          </p>
          );
        } );

        return (
        <div className="sub-variants">
          <h3>{ items.name }</h3>
          { subVariantsPrice }
          <hr />
        </div>

        );
      } );

    } else {
      var subVariants = '';
    }




    var calendarItems = $.map( this.state.calendarDates, function ( item ) {
console.log(item);
      return (
      <div className="calendar">
        <CalendarComponent month={ item }
                           pattern={ self.state.patternFlag }
                           weekdaysFlag={ self.state.weekdaysFlag }
                           repeatFlag={ self.state.repeatFlag }
                           variantDates={ self.state.variantDates } />
      </div>
      )
    } );

    return (
    <div>
      <Tabs headers={ [ 'Edit Private tour variant' ] }>
        <Tab>
          <div className="tab-content">
            <div className="tab-pane active">
              <h3>Customize Dates & Seats</h3>
              <div className="seat-options">
                <div id="all_days" className="item patterns" data-pattern="1">
                  <input type="radio"
                         name="seat-option"
                         id="cb1"
                         checked={ this.state.check_all_days } />
                  <label htmlFor="cb1">
                    All Days
                  </label>
                  <input type="text"
                         placeholder="Seats"
                         value={ this.state.all_days}
                         onChange={this.onChangeCapacityValue.bind(this,'all_days')} />
                </div>
                <div id="all_weekends" className="item patterns" data-pattern="2">
                  <input type="radio"
                         name="seat-option"
                         id="cb2"
                         checked={ this.state.check_all_weekends } />
                  <label htmlFor="cb2">
                    All Weekends
                  </label>
                  <input type="text"
                         placeholder="Seats"
                         value={ this.state.all_weekends }
                         onChange={this.onChangeCapacityValue.bind(this,'all_weekends')} />
                </div>
                <div id="all_weekdays" className="item patterns" data-pattern="3">
                  <input type="radio"
                         name="seat-option"
                         id="cb3"
                         checked={ this.state.check_all_weekdays } />
                  <label htmlFor="cb3">
                    All Weekdays
                  </label>
                  <input type="text"
                         placeholder="Seats"
                         value={ this.state.all_weekdays }
                         onChange={this.onChangeCapacityValue.bind(this,'all_weekdays')} />
                </div>
              </div>
              <div className="seat-options repeat-text">
                <div className="item item-border">
                  <input type="checkbox" id="repeat_action" />
                  <label htmlFor="repeat_action">
                    Repeat for next 12 months
                  </label>
                </div>
              </div>
              <div className="scroll-bar" id="container1">
                { calendarItems }
              </div>
              <hr />
              { subVariants }
              <p></p>
              <button className="btn btn-secondary" onClick={ this.saveAndRedirectVariantEdit }>
                Update Changes
              </button>
              <button className="btn btn-cancel" onClick={ this.redirectVariantEdit }>
                Cancel
              </button>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
    )
  },
    savePatternAndRedirect : function(){
        let self =this;
        var data = self.props.config().getClientInfo();
        data['variants_date_capacity'] = {};
        var patternFlagTemp  = false;
        var patternParams = {};
        if(self.state.check_all_days){
            patternParams["all_days"]=self.state.check_all_days;
            patternParams["all_days_seats"]=parseInt(self.state.all_days)||0;
            patternFlagTemp = true;
        }
        if(self.state.check_all_weekends){
            patternParams["all_weekends"]=self.state.check_all_weekends;
            patternParams["all_weekends_seats"]=parseInt(self.state.all_weekends)||0;
            patternFlagTemp = true;
        }
        if(self.state.check_all_weekdays){
            patternParams["all_weekdays"]=self.state.check_all_weekdays;
            patternParams["all_weekdays_seats"]=parseInt(self.state.all_weekdays)||0;
            patternFlagTemp = true;
        }
        var weekdays = [1, 2, 3, 4, 5, 6, 7];
        var weekdaysInWords = [
          'all_mondays',
          'all_tuesdays',
          'all_wednesdays',
          'all_thursdays',
          'all_fridays',
          'all_saturdays',
          'all_sundays'
        ];
        var weekdaysInWordsSeats = [
          'all_mondays_seats',
          'all_tuesdays_seats',
          'all_wednesdays_seats',
          'all_thursdays_seats',
          'all_fridays_seats',
          'all_saturdays_seats',
          'all_sundays_seats'
       
          ];
        if(!patternFlagTemp){
            for(var keyDay in self.state.weekdaysFlag){
              patternParams[weekdaysInWords[weekdays.indexOf(self.state.weekdaysFlag[keyDay])]] = true;
              patternParams[weekdaysInWordsSeats[weekdays.indexOf(self.state.weekdaysFlag[keyDay])]] = $(".weekday[value='"+self.state.weekdaysFlag[keyDay]+"']").next().next().val() || 0;
            }
        }
        


        data['variants_date_capacity'][self.props.listObj.getUrls().variantid] = {
            "pattern" : patternParams,
            "dates": []
        };
        var header = {
            'Content-Type': 'application/json'
        };

        console.log(JSON.stringify(data));

        self.props.config().httpInterceptor(self.props.config().url().VARIANT + self.props.listObj.getUrls().listingid + '/add_update_date_capacity?', 'POST', JSON.stringify(data), header, self.props.config().getClientInfo()).then(
            function (result) {
                self.props.notification._addNotification(window.event, 'success', "Updated Successfully !!!");

            }, function (result) {
                let message = JSON.parse(result.responseText);
                self.props.notification._addNotification(window.event, 'error', message.message);

            });
    },


} );



module.exports = TabVariantEditComponent;
