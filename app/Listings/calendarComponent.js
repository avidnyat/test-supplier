import React from 'react';
import ReactDOM from 'react-dom';

import FullCalendar from 'rc-calendar/lib/FullCalendar';

var moment = require( 'moment' );

import Select from 'rc-select';

function onSelect( value ) {
  //console.log('select', dateFormatter.format(value));
}

const CalendarComponent = React.createClass( {
  getInitialState() {
    return {
      type: 'date',
    };
  },
  onTypeChange( type ) {
    this.setState( {
      type,
    } );
  },

  

  componentDidMount: function () {
    $( '.rc-calendar-next-month-btn-day' ).hide();
    $( '.rc-calendar-full-header-switcher' ).hide();
    if ( $( '.rc-calendar-table' ).length == 3 ) {
     $( '.rc-calendar-table' ).first().find( 'th' ).each( function ( i ) {
        var weekday = (i == 0) ? 7 : i;
        var objHTML = <span className='rc-calendar-column-header item'>
                        <input type='checkbox' value={weekday} className='weekday' id={'week1_' + i } />
                        <label htmlFor={'week1_' + i }> {moment().day( $( this ).prop( 'title' ) ).format( 'ddd' ) }</label>
                        <input type='text' placeholder='Seats' />
                      </span>
        ReactDOM.render(objHTML, this);          
        
      } );
    }

$( '.rc-calendar-table:first').find( 'td' ).each( function ( i ) {
  var DateDay = parseInt(new moment($( this ).prop("title"),"YYYY-MM-D", false).format("D")) ;
  var today = parseInt(new moment($( '.rc-calendar-today' ).prop("title"),"YYYY-MM-D", false).format("D")) ;
      if (  DateDay < today) {
        var objHTML = <div className="rc-calendar-date">
                        <a className="link" href="#">Edit</a>
                        <p className=" grey">{DateDay}</p>
                      </div>;
        ReactDOM.render(objHTML, this);
      } else {  
        var objHTML = <div className="rc-calendar-date">
                        <a className="link edit-link" href="javascript:void(0)">Edit</a>
                        <a className="link save-link hide" href="javascript:void(0)">Save</a>
                        <p>{DateDay}</p>
                        <div className="gray-section">
                          <div className="total">0/0</div>
                        </div>
                        <div className="gray-section2">
                          <div className="total">Total seats <input type="text" /></div>
                        </div>
                      </div>;
       ReactDOM.render(objHTML, this);
      }


    } );

$( '.rc-calendar-table:not(:first)').find( 'td' ).each( function ( i ) {
      var DateDay = new moment($( this ).prop("title"),"YYYY-MM-D", false).format("D") ;
        var objHTML = <div className="rc-calendar-date">
                        <a className="link edit-link" href="javascript:void(0)">Edit</a>
                        <a className="link save-link hide" href="javascript:void(0)">Save</a>
                        <p>{DateDay}</p>
                        <div className="gray-section">
                          <div className="total">0/0</div>
                        </div>
                        <div className="gray-section2">
                          <div className="total">Total seats <input type="text" /></div>
                        </div>
                      </div>;
       ReactDOM.render(objHTML, this);
  
    } );


    $( document ).off( 'click', 'td' ).on( 'click', 'td', function ( e ) {
      if ( moment( $( this ).prop( 'title' ) ).unix() >= moment( $( '.rc-calendar-today' ).prop( 'title' ) ).unix() ) {
        if ( !$( e.target ).closest( 'td' ).hasClass( 'active' ) ) {
          console.log( $( e.target ) );
          $( e.target ).closest( 'td' ).addClass( 'active' );
        }
      }
    } );
  },
  render() {
    var self = this;
    
    console.log( 'step5' );
    $( '.rc-calendar-table' ).find( 'td' ).each( function ( i ) {
      $( this ).removeClass( 'active' );
    } );
    if ( this.props.repeatFlag ) {
      console.log( 'step4' );
      $( '.rc-calendar-table' ).find( 'td' ).each( function ( i ) {
        console.log( self.props.weekdaysFlag.indexOf( parseInt( moment( $( this ).prop( 'title' ) ).isoWeekday() ) ) );
        $( this ).removeClass( 'active' );
        if ( self.props.variantDates[ moment( $( this ).prop( 'title' ) , "YYYY-MM-D").format( 'YYYY-MM-DD',false ) ] ) {
          $( this ).find( '.gray-section .total' ).html( self.props.variantDates[ moment( $( this ).prop( 'title' ) , "YYYY-MM-D").format( 'YYYY-MM-DD' ) ].sold_count + '/' + self.props.variantDates[ moment( $( this ).prop( 'title' ) , "YYYY-MM-D").format( 'YYYY-MM-DD' ) ].capacity );
          $( this ).find( '.gray-section2 .total input' ).val( self.props.variantDates[ moment( $( this ).prop( 'title' ), "YYYY-MM-D" ).format( 'YYYY-MM-DD' ) ].capacity );

          if ( self.props.variantDates[ moment( $( this ).prop( 'title' ), "YYYY-MM-D" ).format( 'YYYY-MM-DD', false ) ].is_customized_date ) {
            $( this ).addClass( 'active' );
          }
        }

        if ( self.props.weekdaysFlag.indexOf( parseInt( moment( $( this ).prop( 'title' ), "YYYY-MM-D" ).isoWeekday() ) ) != -1 ) {
          console.log( 'step2' );
          if ( !$( this ).find( 'p' ).hasClass( 'grey' ) ) {
            $( this ).addClass( 'active' );
          }
        }
      } );
    } else {
      console.log( 'step20' );
      $( '.rc-calendar-table' ).first().find( 'td' ).each( function ( i ) {
        $( this ).removeClass( 'active' );

        if ( self.props.variantDates[ moment( $( this ).prop( 'title' ), "YYYY-MM-D" ).format( 'YYYY-MM-DD',false ) ] ) {
          $( this ).find( '.gray-section .total' ).html( self.props.variantDates[ moment( $( this ).prop( 'title' ) , "YYYY-MM-D").format( 'YYYY-MM-DD' ) ].sold_count + '/' + self.props.variantDates[ moment( $( this ).prop( 'title' ), "YYYY-MM-D" ).format( 'YYYY-MM-DD' ) ].capacity );
          $( this ).find( '.gray-section2 .total input' ).val( self.props.variantDates[ moment( $( this ).prop( 'title' ) , "YYYY-MM-D").format( 'YYYY-MM-DD' ) ].capacity );

          if ( self.props.variantDates[ moment( $( this ).prop( 'title' ), "YYYY-MM-D" ).format( 'YYYY-MM-DD', false ) ].is_customized_date ) {
            $( this ).addClass( 'active' );
          }
        }
        console.log(self.props.weekdaysFlag); 
        if ( self.props.weekdaysFlag.indexOf( parseInt( moment( $( this ).prop( 'title' ), "YYYY-MM-D" ).isoWeekday() ) ) != -1 ) {

          if ( !$( this ).find( 'p' ).hasClass( 'grey' ) ) {

            $( this ).addClass( 'active' );
          }
        }
      } );
    }

    return (
    <div style={ { zIndex: 1000, position: 'relative' } }>
      <FullCalendar style={ { margin: 10 } }
                    Select={ Select }
                    value={ this.props.month }
                    fullscreen
                    onSelect={ onSelect }
                    type={ this.state.type }
                    onTypeChange={ this.onTypeChange } />
    </div>
    );
  },
} );

module.exports = CalendarComponent;
