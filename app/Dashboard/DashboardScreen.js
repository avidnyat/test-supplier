var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var STATES = require( '../components/data/states' );
var moment = require( 'moment' );
var DashboardScreen = React.createClass( {
  getInitialState: function () {
    return {
      bookingCount: 0,
      enquiryCount: 0,
      pastRevenue: 'password',
      revenue: 0,
      reviewsCount: 0,
      viewsCount: 0,
      photo: JSON.parse( localStorage.getItem( 'clientInfo' ) ).vendor.photo,
      name: JSON.parse( localStorage.getItem( 'clientInfo' ) ).vendor.name,
      notifications: null,
      notificationCount: 0
    }
  },
  getDashboardData: function ( from, to, section ) {
    $( '#pageloader' ).show();
    var data = {

    }
    var urlParams = this.props.route.config().getClientInfo();
    if ( from != -1 ) {
      urlParams[ 'from' ] = from;
      urlParams[ 'to' ] = to;
    }
    var self = this;
    this.props.route.config().httpInterceptor( this.props.route.config().url().DASHBOARD, 'GET', data, {}, urlParams ).then(
      function ( result ) {

        console.log( result );

        if ( section == 'All' ) {
          self.setState( {
            bookingCount: result.bookings_count,
            enquiryCount: result.enquiry_count,
            pastRevenue: result.past_revenue,
            revenue: result.revenue,
            reviewsCount: result.reviews_count,
            viewsCount: result.views_count
          } );
        }
        if ( section == 'views' ) {
          if(from ==-1){
             self.setState( {

              viewsCount: result.views_count
            } );
           }else{
             self.setState( {

              viewsCount: "N/A"
            } );
           }
         
        }
        if ( section == 'bookings' ) {
          self.setState( {

            bookingCount: result.bookings_count
          } );
        }
        if ( section == 'enquries' ) {
          self.setState( {

            enquiryCount: result.enquiry_count
          } );
        }
        if ( section == 'revenue' ) {
          if(from == -1){
            self.setState( {

              revenue: (result.revenue + result.past_revenue)
            } );
          }else{
            self.setState( {

              revenue: result.revenue
            } );
          }
          
        }
        if ( section == 'reviews' ) {
          self.setState( {

            reviewsCount: result.reviews_count
          } );
        }
        $( '#pageloader' ).fadeOut();
      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        self.props.route.notification._addNotification( window.event, 'error', message.message );
      }
    );

  },
  getData: function ( dataTime, section ) {
    var from = -1;
    var to = -1;
    if ( dataTime == 'Today' ) {
      from = moment().subtract( 24, 'H' ).format( 'X' ) * 1000;
      to = moment().format( 'X' ) * 1000;
    } else if ( dataTime == 'LastSeven' ) {
      from = moment().subtract( 7, 'd' ).format( 'X' ) * 1000;
      to = moment().format( 'X' ) * 1000;
    } else if ( dataTime == 'ThisMonth' ) {
      from = moment( moment().year() + '-' + (moment().month()+1) + '-01' ).format( 'X' ) * 1000;
      to = moment().format( 'X' ) * 1000;
    }
    this.getDashboardData( from, to, section );

  },
  componentDidMount: function () {
    this.props.route.config().redirectWithoutSession();
    $( '.dropdown-menu li a' ).click( function () {

      $( this ).parents( '.dropdown' ).find( '.selection' ).text( $( this ).text() );
      $( this ).parents( '.dropdown' ).find( '.selection' ).val( $( this ).text() );

    } );
    $( '.menu-option' ).removeClass( 'active' );
    $( 'body' ).removeClass( 'before-login' );
    $( '#dashboard_menu' ).addClass( 'active' );
    $( '#login' ).addClass( 'animated rotateInUpRight' );
    $( '.animate-profile' ).addClass( 'animated rotateInDownRight' );
    $( '.animate-views' ).addClass( 'animated bounceInDown' );
    $( '.animate-bookings' ).addClass( 'animated rotateInDownLeft' );
    $( '.animate-enquires' ).addClass( 'animated rotateInUpRight' );
    $( '.animate-reviews' ).addClass( 'animated bounceInUp' );
    $( '.animate-revenue' ).addClass( 'animated rotateInUpLeft' );
    var self = this;
    //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);
    var data = {

    }
    this.props.route.config().httpInterceptor( this.props.route.config().url().DASHBOARD, 'GET', data, {}, this.props.route.config().getClientInfo() ).then(
      function ( result ) {

        console.log( result );
        self.setState( {
          bookingCount: result.bookings_count,
          enquiryCount: result.enquiry_count,
          pastRevenue: result.past_revenue,
          revenue: result.revenue + result.past_revenue,
          reviewsCount: result.reviews_count,
          viewsCount: result.views_count
        } );

        $( '#pageloader' ).fadeOut();
      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        self.props.route.notification._addNotification( window.event, 'error', message.message );
      }
    );
    
    
  },
  render: function () {



    


    return (

    <div>
      <div id="pageloader">
        <div className="loader-inner">
          <img src="images/preloader-color.gif" alt="" />
        </div>
      </div>
      <div className="page-body grey2">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 animate-profile">
              <div className="dashboard-item">
                <div className="profile">
                  <div className="pic">
                    <img src={ this.state.photo } />
                  </div>
                  <div className="info">
                    <h4>{ this.state.name }</h4>
                    <p>
                      Lets see how we are doing today!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 animate-views">
              <div className="dashboard-item views">
                <div className="heading">
                  <p>
                    Total views
                  </p>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuViews"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true">
                      <span className="selection">Lifetime</span>
                      <span className="glyphicon glyphicon-menu-down"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuViews">
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Today', 'views' ) }>Today</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'LastSeven', 'views' ) }>Last Seven Days</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'ThisMonth', 'views' ) }>This Month</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Lifetime', 'views' ) }>Lifetime</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="number">
                  { this.state.viewsCount }
                </div>
              </div>
            </div>
            <div className="col-sm-4 animate-bookings">
              <div className="dashboard-item booking">
                <div className="heading">
                  <p>
                    Bookings
                  </p>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuViews"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true">
                      <span className="selection">Lifetime</span>
                      <span className="glyphicon glyphicon-menu-down"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuViews">
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Today', 'bookings' ) }>Today</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'LastSeven', 'bookings' ) }>Last Seven Days</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'ThisMonth', 'bookings' ) }>This Month</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Lifetime', 'bookings' ) }>Lifetime</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="number">
                  { this.state.bookingCount.toFixed(0) }
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 animate-enquires">
              <div className="dashboard-item enquries">
                <div className="heading">
                  <p>
                    Enquries
                  </p>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuViews"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true">
                      <span className="selection">Lifetime</span>
                      <span className="glyphicon glyphicon-menu-down"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuViews">
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Today', 'enquries' ) }>Today</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'LastSeven', 'enquries' ) }>Last Seven Days</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'ThisMonth', 'enquries' ) }>This Month</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Lifetime', 'enquries' ) }>Lifetime</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="number">
                  { this.state.enquiryCount.toFixed(0) }
                </div>
              </div>
            </div>
            <div className="col-sm-4 animate-reviews">
              <div className="dashboard-item reviews">
                <div className="heading">
                  <p>
                    Reviews
                  </p>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuViews"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true">
                      <span className="selection">Lifetime</span>
                      <span className="glyphicon glyphicon-menu-down"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuViews">
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Today', 'reviews' ) }>Today</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'LastSeven', 'reviews' ) }>Last Seven Days</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'ThisMonth', 'reviews' ) }>This Month</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Lifetime', 'reviews' ) }>Lifetime</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="number">
                  { this.state.reviewsCount.toFixed(0) }
                </div>
              </div>
            </div>
            <div className="col-sm-4 animate-revenue">
              <div className="dashboard-item revenue">
                <div className="heading">
                  <p>
                    Revenue
                  </p>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuViews"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true">
                      <span className="selection">Lifetime</span>
                      <span className="glyphicon glyphicon-menu-down"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuViews">
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Today', 'revenue' ) }>Today</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'LastSeven', 'revenue' ) }>Last Seven Days</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'ThisMonth', 'revenue' ) }>This Month</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" onClick={ () => this.getData( 'Lifetime', 'revenue' ) }>Lifetime</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="number">
                  { this.state.revenue.toFixed(2) }
                </div>
              </div>
            </div>
          </div>
          <br />
          <br/>
          <br />
          <br/>
          <br />
          <br/>
          <br />
          <br/>
          <br />
          <br/>
          <br />
          <br/>
        </div>
      </div>
    </div>
    );
  }

} );

module.exports = DashboardScreen;
