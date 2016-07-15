var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var VendorProfile = React.createClass( {
  mixins: [ ConfigMixin ],
  getInitialState: function () {
    console.log( this.props.data.photo );
    return {
      photo: '',
      name: '',

      phone: '',
      email: '',
      description: ''
    }
  },
  showEdit: function () {

    this.setState( {
      photo: $( '#photo' ).prop( 'src' ),
      name: $( '#name' ).html(),

      phone: $( '#phone' ).html(),
      email: $( '#email' ).html(),
      description: $( '#description' ).html()
    } );
    $( '.vendor-profile.actual' ).addClass( 'hide' );
    $( '.vendor-profile.edit' ).removeClass( 'hide' );
    $( '.vendor-profile.edit' ).addClass( '\'animated bounceInLeft\'' );


  },
  updateName: function ( e ) {


    this.setState( {
      name: e.target.value
    } );
  },
  updateEmail: function ( e ) {


    this.setState( {
      email: e.target.value
    } );
  },
  updatePhone: function ( e ) {


    this.setState( {
      phone: e.target.value
    } );
  },
  updateDescription: function ( e ) {


    this.setState( {
      description: e.target.value
    } );
  },
  componentDidMount: function () {
    console.log( this.props );

    $( '.vendor-profile.actual' ).addClass( 'animated bounceInLeft' );
    $( '.vendor-profile.edit' ).addClass( '\'animated bounceInLeft\'' );

  },
  showActual: function () {
    $( '.vendor-profile.actual' ).removeClass( 'hide' );
    $( '.vendor-profile.edit' ).addClass( 'hide' );
  },
  save: function () {
    var data = {
      profile: {
        name: this.state.name,
        phone1: this.state.phone,
        email: this.state.email,
        description: this.state.description
      }
    }
    var header = {
    }
    var clientInfo = this.utils().getClientInfo();
    var self = this;
    this.utils().httpInterceptor( this.utils().url().PROFILE_SAVE, 'PUT', data, header, clientInfo ).then(
      function ( result ) {
        $( '#name' ).html( self.state.name );
        $( '#email' ).html( self.state.email );
        $( '#phone' ).html( self.state.phone );
        $( '#description' ).html( self.state.description );
        $( '.vendor-profile.actual' ).removeClass( 'hide' );
        $( '.vendor-profile.edit' ).addClass( 'hide' );

      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        console.log( message );
        // self.props.config.notification._addNotification(window.event, "error", message.message);
      } );

  },
  render: function () {
    return (
    <div>
      <div className="vendor-profile actual">
        <div className="profile">
          <div className="pic">
            <img src={ this.props.data.photo } id="photo" />
          </div>
        </div>
        <div className="profile-details">
          <h4 id="name">{ this.props.data.name }</h4>
          <p>
            <strong>Phone:</strong> <span id="phone">{ this.props.data.phone1 }</span> &nbsp;&nbsp;&nbsp; <strong>Email:</strong>
            <a href={ 'mailto:' + this.props.data.email } id="email">
              { this.props.data.email }
            </a>
          </p>
          <h4>Basic Info</h4>
          <p id="description">
            { this.props.data.description }
          </p>
          <button className="btn btn-line btn-secondary" onClick={ this.showEdit }>
            Edit Profile
          </button>
        </div>
      </div>
      <div className="vendor-profile edit hide">
        <div className="profile">
          <div className="pic">
            <img src={ this.state.photo } />
          </div>
        </div>
        <div className="profile-details">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-field">
                <div className="field-name">
                  Vendor Name
                </div>
                <input type="text"
                       value={ this.state.name }
                       onChange={ this.updateName }
                       fieldName="name" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-field">
                <div className="field-name">
                  Email
                </div>
                <input type="text"
                       value={ this.state.email }
                       onChange={ this.updateEmail } />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-field">
                <div className="field-name">
                  Phone
                </div>
                <input type="text"
                       value={ this.state.phone }
                       onChange={ this.updatePhone } />
              </div>
            </div>
          </div>
          <div className="form-field">
            <div className="field-name">
              Basic Info
            </div>
            <textarea value={ this.state.description } onChange={ this.updateDescription }></textarea>
          </div>
          <button className="btn btn-secondary" onClick={ this.save }>
            Update
          </button>
          <button className="btn btn-cancel" onClick={ this.showActual }>
            Cancel
          </button>
        </div>
      </div>
    </div>

    );
  }

} );

module.exports = VendorProfile;
