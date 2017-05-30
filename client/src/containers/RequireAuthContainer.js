import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'


class RequireAuthContainer extends Component{

    render(){
        if (!localStorage.getItem("token")) {
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

export default RequireAuthContainer;

