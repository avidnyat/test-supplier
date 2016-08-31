
import { Router, Route, Link, hashHistory } from 'react-router';
import { Tabs, Tab } from 'react-tab-view'
var TabProfileComponent = require( './TabProfileComponent.js' );
import React, { Component, PropTypes } from 'react'
var STATES = require( '../components/data/states' );
import ReactPaginate from 'react-paginate';
var _ = require("underscore");
var ProfileScreen = React.createClass( {
  getInitialState: function () {
    return {
      profile: {
        bank_detail: {
          name: '',
          account_holder: '',
          account_number: '',
          branch_name: '',
          ifsc: '',
          iban: '',
          swift_code: '',
          pan_number: '',
          service_tax_number: ''
        },
        city: '',
        country: '',
        state: '',
        vendor_associates: [ {
          name: '',
          email: '',
          phone: ''
        } ]
      },
      Tabsheader: [ 'Vendor Profile', 'Details', 'Contact Info', 'Bank Details' ],
      country: [],
      states: [],
      cities: [],
      countries: {}

    }
  },

  componentDidMount: function () {
    this.props.route.config().redirectWithoutSession();
    this.loadfromServer( 1 );
   
  },
  loadfromServer: function ( pageNo ) {

    var self = this;
    console.log( 'url-data-page:' + this.state.pageSelected );
    //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);
    var urlparams = {
    }
    var data = {}
    var clientInfo = this.props.route.config().getClientInfo();
    var header = {
      'X-Thrill-Client-Id': clientInfo.client_id,
      'X-Thrill-Auth-Token': clientInfo.auth_token
    };


    this.props.route.config().httpInterceptor( this.props.route.config().url().PROFILE, 'GET', data, header, urlparams ).then(
      function ( result ) {
        self.setState( {
          profile: result
        } );
         var data = {

          }
          var header = {
          }
          var clientInfo = self.props.route.config().getClientInfo();
          self.props.route.config().httpInterceptor( self.props.route.config().url().COUNTRIES, 'GET', data, header, clientInfo ).then(
            function ( result ) {
              self.setState( {
                country: result.countries
              } );
               console.log("=-=-=-=");
               console.log(result.countries);
               console.log(self.state.profile.country); 
               var countryObj = _.where(result.countries, {name: self.state.profile.country});
               console.log(countryObj[0].id);
               if(countryObj.length >0){
                var data = {

                }
                var header = {
                }
                var clientInfo = self.props.route.config().getClientInfo();
                clientInfo[ 'country_id' ] = countryObj[0].id;

                self.props.route.config().httpInterceptor( self.props.route.config().url().STATE, 'GET', data, header, clientInfo ).then(
                  function ( result ) {
                    self.setState( {
                      states: result.states
                    } );
                    console.log(result.states);
                    console.log(self.state.profile.state);
                    var stateObj = _.where(result.states, {name: self.state.profile.state});
                    console.log(stateObj[0].id);
                    if(stateObj.length >0){
                      var data = {

                      }
                      var header = {
                      }
                      var clientInfo = self.props.route.config().getClientInfo();
                      clientInfo[ 'state_id' ] = stateObj[0].id;

                      self.props.route.config().httpInterceptor( self.props.route.config().url().CITIES, 'GET', data, header, clientInfo ).then(
                        function ( result ) {
                          self.setState( {
                            cities: result.cities
                          } );
                          
                          
                          
                        },
                        function ( result ) {
                          let message = JSON.parse( result.responseText );
                          console.log( message );
                          // self.props.config.notification._addNotification(window.event, "error", message.message);
                        } );
                    }

                  },
                  function ( result ) {
                    let message = JSON.parse( result.responseText );
                    console.log( message );
                    // self.props.config.notification._addNotification(window.event, "error", message.message);
                  } );
               }
            },
            function ( result ) {
              let message = JSON.parse( result.responseText );
              console.log( message );
              // self.props.config.notification._addNotification(window.event, "error", message.message);
            } );
      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        self.props.route.notification._addNotification( window.event, 'error', message.message );
      } );


  },

  handlePageClick: function ( data ) {
    var currentPage = data.selected + 1;
    this.setState( {
      pageSelected: currentPage,
    } );
    this.loadfromServer( currentPage );
    console.log( data.selected + 1 );
  },
  render: function () {
    return (

    <div>
      <TabProfileComponent headers={ this.state.Tabsheader }
                           profile={ this.state.profile }
                           config={ this.props.route }
                           countries={ this.state.country }
                           states={this.state.states} 
                           cities={this.state.cities} />
    </div>
    );
  }

} );

module.exports = ProfileScreen;
