import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import {register} from "../actions/ApiActions";

function RegisterContainer(props)  {
    return <RegisterForm errorText={props.errorText} onClickRegister={props.register}/>
}

function mapStateToProps(state) {
    return {
        errorText: state.api.errorText
    };
}

function mapDispatchToProps(dispatch) {
    return {
        register: (username, password, retypePassword) => dispatch(register(username, password, retypePassword)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));