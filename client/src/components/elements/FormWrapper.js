import React, {
    Component
}
from 'react';
import 'isomorphic-fetch';
import serialize from 'form-serialize';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
}
from 'reactstrap';

function makeInputGroup(inputs) {
    return inputs.map((input) => {
        return (
            <FormGroup key={input.name}>
              <Label for={input.name}>{input.label}</Label>
              <Input type={input.type} name={input.name} id={input.name} placeholder={input.name} />
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
            onClick
        } = this.props;
        return (
            <div id={id}>
                <Form onSubmit={onSubmit}>
                    {makeInputGroup(inputFields)}
                <Button type="submit" color="primary" onClick={onClick}>Add board</Button>{' '}
                </Form>
            </div>
        );

    }
}


export default FormWrapper;
