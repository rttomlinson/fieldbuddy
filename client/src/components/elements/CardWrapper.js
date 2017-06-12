import React from 'react';
import {connect} from 'react-redux';
import { requestCardUpdate } from '../actions/boardActions';
import Card from '../Card';

function mapDispatchToProps(dispatch) {
    return {
        requestCardUpdate: (form, cardId) => {
            let token = localStorage.getItem('token');
            dispatch(requestCardUpdate(form, token, cardId));
        }
    };
}


export default connect(null, mapDispatchToProps)(Card);