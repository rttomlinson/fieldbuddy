import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, setRedirectUrl} from 'react-router-dom'
class RequireAuthContainer extends Component{
    
    componentDidMount() {
    const { dispatch, currentURL, history, isAuth } = this.props

        if (!isAuth) {
          // set the current url/path for future redirection (we use a Redux action)
          // then redirect (we use a React Router method)
          //dispatch(setRedirectUrl(currentURL));
          history.replace("/login");
        }
    }
    
    
    render(){
        if (!this.props.isAuth) {
            return (
                <Redirect to="/login" />    
            );
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  return {
    isAuth: state.auth.isAuth,
    currentURL: ownProps.location.pathname
  };
}

export default connect(mapStateToProps)(RequireAuthContainer);

