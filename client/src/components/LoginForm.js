import React, {Component} from 'react';
import 'isomorphic-fetch';
import serialize from 'form-serialize';
import {withRouter} from 'react-router-dom';
import {requestUserAuthorization} from '../actions/authActions';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const inputFields = [{type: "text", name:"email", label:"Email"}, {type:"password", name:"password", label:"Password"}];
function makeInputGroup(inputs) {
    return inputs.map((input) => {
        return (
            <FormGroup key={input.name}>
              <Label for={input.name}>{input.label}</Label>
              <Input type={input.type} name={input.name} id={input.name} placeholder={input.name} />
            </FormGroup>
        );
    });
    
    
}
class LoginForm extends Component{
    render(){
        const {requestUserAuthorization} = this.props;
        return (
            <Form id="login-form" onSubmit={requestUserAuthorization}>
                {makeInputGroup(inputFields)}
                <Button color="primary">Login</Button>
            </Form>
        );
        
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        requestUserAuthorization: (e) => {
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

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));