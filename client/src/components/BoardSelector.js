import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const makeOptions = (boards) => {
    return boards.map((board) => {
        return (
            <option key={board.id} value={board.id}>{board.name}</option>    
        );
    });
};


class BoardSelector extends React.Component {
  render() {
      const {changeBoard, boards} = this.props;
        return (
          <Form onChange={changeBoard}>
            <FormGroup>
              <Label for="board-select">Select a boards:</Label>
              <Input type="select" name="boardSelect" id="board-select">
                {makeOptions(boards)}
              </Input>
            </FormGroup>
          </Form>
        );
  }
}


function mapDispatchToProps(dispatch, ownProps){
    
    return {
        changeBoard: (e) => {
            let board = e.target.value;
            ownProps.history.push(`/dashboard/boards/${board}`);
            
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(BoardSelector));