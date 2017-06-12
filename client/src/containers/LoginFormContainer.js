import React, {Component} from 'react';
import 'isomorphic-fetch';
import serialize from 'form-serialize';
import {withRouter} from 'react-router-dom';
import {requestUserAuthorization} from '../actions/authActions';
import {connect} from 'react-redux';
import LoginForm from '../components/LoginForm';

class LoginFormContainer extends Component{
    
    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        setTimeout(this.showForm, .5000);
    }

    showForm = () => {
        this.setState({
            show: true
        });
    }
    
    render(){
        const {requestUserAuthorization} = this.props;
        return (
                <LoginForm onSubmit={requestUserAuthorization} show={this.state.show}>
                </LoginForm>
        );
        
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        requestUserAuthorization: (e) => {
            console.log("request userauth getting called");
            e.preventDefault();
            //get form data
            const form = serialize(e.target, {
                hash: true
            });
            dispatch(requestUserAuthorization(form))
            .then((response) => {
                //this should actually go back to the page it was last on...
                ownProps.history.push('/dashboard/boards');
            });
        }
    };
}

export default withRouter(connect(null, mapDispatchToProps)(LoginFormContainer));