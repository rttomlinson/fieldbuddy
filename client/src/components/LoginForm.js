import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
}
from 'reactstrap';


const inputFields = [{
    type: "text",
    name: "email"
}, {
    type: "password",
    name: "password"
}];

function makeInputGroup(inputs) {
    return inputs.map((input) => {
        return (
            <FormGroup key={input.name}>
              {input.label ? <Label for={input.name}>{input.label}</Label> : null}
              <Input type={input.type} name={input.name} id={input.name} placeholder={input.name} />
            </FormGroup>
        );
    });


}

const LoginForm = ({onSubmit, show}) => {
    let classNames = ['login-form'];
    if (show) {
        classNames.push('show');
    }
    classNames = classNames.join(" ");
    console.log("rendering the login form");

    return (
        <div className="backdrop">
            <Form className={classNames} onSubmit={onSubmit}>
                <h4 style={{paddingBottom: 30}} className="text-center">Sign in to Field Buddy</h4>
                {makeInputGroup(inputFields)}
                <Button block color="primary">Login</Button>
            </Form>
        </div>
    );
};


export default LoginForm;
