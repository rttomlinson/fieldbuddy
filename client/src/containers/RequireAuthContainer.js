import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom'


class RequireAuthContainer extends Component{
    
    render(){
        if (!this.props.auth.isAuth) {
            return (
                <Redirect to="/login" />    
            );
        }
        return(
            <div>
                {this.props.children}
            </div>
            
        );
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(RequireAuthContainer);