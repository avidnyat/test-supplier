var React = require('react');
import {Router, Route, Link, hashHistory} from 'react-router';
var Input = require('./components/Input.js');
var _ = require('underscore');
var Select = require('./components/Select');
var STATES = require('./components/data/states');
var Icon = require('./components/Icon.js');
var LoginScreen = React.createClass({
getInitialState: function () {
    return {
      passwordType: "password",
      email: null,
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
     $.ajax({type: 'POST', url: "http://dev.thrillophilia.com/api/v1/suppliers/sign_in", data: {
                              "email": this.state.email,
                              "password": this.state.password
                            
                      },success: function (result) {
                        self.props.route.notification._addNotification(e, "success", "Successfully login !!!");
            window.location.href="/#/thank-you";
        },error: function(result){
          console.log(result.responseText);
          let message = JSON.parse(result.responseText);
          self.props.route.notification._addNotification(e, "error", message.message);
          
        }}); 
     
    } else {
    
      this.refs.email.isValid();
      this.refs.password.isValid();
      
    }
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
          <h1>Login</h1>
         
          <form onSubmit={this.saveAndContinue}>
            
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
              text="Password" 
              type={this.state.passwordType}
              ref="password"
              validate={this.isEmpty}
              forbiddenWords={this.state.forbiddenWords}
              value={this.state.password}
              emptyMessage="Email can't be empty"
              onChange={this.handlePasswordInput} 
             
            /> 
            <a href="javascript:void(0);" onClick={this.showHidePassword}>Show</a>
            <Link to="reset-password">Reset Password</Link>
            <button 
              type="submit" 
              className="button button_wide">
             Login
            </button>

          </form>


        </div>

      </div>
      </div>
      </div>
    );
  }
  
});
  
module.exports = LoginScreen;