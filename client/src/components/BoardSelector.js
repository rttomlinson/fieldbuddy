import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
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
      const {changeBoard, boards, currentBoard} = this.props;
        return (
          <Form id="board-selection">
            <FormGroup>
              <Label for="board-select">Select a boards:</Label>
              <Input onChange={changeBoard} type="select" name="boardSelect" id="board-select" value={currentBoard ? currentBoard.id : void 0}>
                {makeOptions(boards)}
              </Input>
            </FormGroup>
          </Form>
        );
  }
}

function mapStateToProps(state, ownProps){
    return {
        currentBoard: state.boards.data.find((board) => {
            return board.id == ownProps.match.params.boardId;
        })
    };
}


function mapDispatchToProps(dispatch, ownProps){
    
    return {
        changeBoard: (e) => {
            let board = e.target.value;
            ownProps.history.push(`/dashboard/boards/${board}`);
            
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardSelector));