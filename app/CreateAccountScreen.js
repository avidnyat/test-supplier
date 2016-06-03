var React = require('react');
var Input = require('./components/Input.js');
var _ = require('underscore');
var Select = require('./components/Select');
var STATES = require('./components/data/states');
var Icon = require('./components/Icon.js');
import {Router, Route, Link, hashHistory} from 'react-router';

var CreateAccountScreen = React.createClass({
  getInitialState: function () {
    return {
      yourName: null,
      phonenumber: null,
      passwordType: "password",
      email: null,
      companyName: null,
      password: null,
      statesValue: null,
      forbiddenWords: ["password", "user", "username"]
    }
  },

  handlePasswordInput: function (event) {
    this.setState({
      password: event.target.value
    });
  },

  

  saveAndContinue: function (e) {
    e.preventDefault();

    var canProceed = this.validateEmail(this.state.email) 
        && this.refs.password.isValid();

    if(canProceed) {
      var data = {
        email: this.state.email
      }
     var self = this;
     $.ajax({type: 'POST', url: "https://dev.thrillophilia.com/api/v1/suppliers/sign_up", data: { 
                  "vendor": {
                              "name": this.state.yourName,
                              "email": this.state.email,
                              "password": this.state.password,
                              "phone1": this.state.phonenumber,
                              "company_name": this.state.companyName,
                              "company_website": this.state.companyWebsite
                            }
                      },success: function (result) {
                        this.props.route.notification._addNotification(e, "success", "Successfully registered !!!");
            window.location.href="/#/thank-you";
        },error: function(result){
          console.log(result.responseText);
          let message = JSON.parse(result.responseText);
          self.props.route.notification._addNotification(e, "error", message.message);
          
        }}); 
     
    } else {
      this.refs.yourName.isValid();
      this.refs.phonenumber.isValid();
      this.refs.email.isValid();
      this.refs.companyName.isValid();
      this.refs.password.isValid();
      
    }
  },

  
  handleCompanyInput: function(event) {
    this.setState({
      companyName: event.target.value
    })
  },
  handleNameInput: function(event) {
    this.setState({
      yourName: event.target.value
    })
  },
  handlephoneInput: function(event) {
    this.setState({
      phonenumber: event.target.value
    })
  },
  handleEmailInput: function(event){
    this.setState({
      email: event.target.value
    });
  },
  showHidePassword: function(event){
    if(this.state.passwordType == "password"){
      this.setState({
        passwordType: "text"
      });
    }else{
      this.setState({
        passwordType: "password"
      });
    }
     
    
  },
  validateEmail: function (event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  },

  isEmpty: function (value) {
    return !_.isEmpty(value);
  },

  updateStatesValue: function (value) {
    this.setState({
      statesValue: value
    })
  },

  render: function() {
    return (
       <div className="application_wrapper">

        <div className="application_routeHandler">
      <div className="create_account_screen">

        <div className="create_account_form">
          <h1>Register account</h1>
          <form onSubmit={this.saveAndContinue}>
            <Input 
              text="Your Name" 
              ref="yourName"
              validate={this.isEmpty}
              value={this.state.yourName}
              onChange={this.handleNameInput} 
              emptyMessage="Your name can't be empty"
            /> 
            <Input 
              text="Phone Number" 
              ref="phonenumber"
              validate={this.isEmpty}
              value={this.state.phonenumber}
              onChange={this.handlephoneInput} 
              emptyMessage="Phone number can't be empty"
            /> 
            <Input 
              text="Email Address" 
              ref="email"
              type="text"
              defaultValue={this.state.email} 
              validate={this.validateEmail}
              value={this.state.email}
              onChange={this.handleEmailInput} 
              errorMessage="Email is invalid"
              emptyMessage="Email can't be empty"
              errorVisible={this.state.showEmailError}
            />

           

            <Input 
              text="Create Password" 
              type={this.state.passwordType}
              ref="password"
              validator="true"
              minCharacters="8"
              requireCapitals="1"
              requireNumbers="1"
              forbiddenWords={this.state.forbiddenWords}
              value={this.state.password}
              emptyMessage="Password is invalid"
              onChange={this.handlePasswordInput} 
            /> 
            <a href="#" onClick={this.showHidePassword}>Show</a>
            <Input 
              text="Company Name" 
              ref="companyName"
              validate={this.isEmpty}
              value={this.state.companyName}
              onChange={this.handleCompanyInput} 
              emptyMessage="Company name can't be empty"
            /> 
             <Input 
              text="Company Website" 
              ref="companyWebiste"
              value={this.state.companyWebsite}
              onChange={this.handleCompanyWebsiteInput} 
            /> 
            
            <button 
              type="submit" 
              className="button button_wide">
              CREATE ACCOUNT
            </button>

          </form>

          

        </div>

      </div>
      </div>
      </div>
    );
  }
    
});
    
module.exports = CreateAccountScreen;