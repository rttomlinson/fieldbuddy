import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
}
from 'reactstrap';

function makeInputGroup(inputs) {
    return inputs.map((input) => {
        return (
            <FormGroup hidden={input.type === 'hidden' ? true : false} key={input.name}>
              <Label for={input.name}>{input.label}</Label>
              <Input type={input.type} name={input.name} id={input.name} value={input.value} placeholder={input.name} />
            </FormGroup>
        );
    })
}

class FormWrapper extends Component {
    render() {
        const {
            inputFields,
            id,
            onSubmit,
            onClick,
            buttonText
        } = this.props;
        return (
            <div id={id}>
                <Form onSubmit={onSubmit}>
                    {makeInputGroup(inputFields)}
                <Button type="submit" color="primary" onClick={onClick}>{buttonText}</Button>{' '}
                </Form>
            </div>
        );

    }
}

FormWrapper.defaultProps = {
    buttonText: "Add board"
};



export default FormWrapper;
