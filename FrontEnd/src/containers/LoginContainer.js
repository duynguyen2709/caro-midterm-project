import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'
import LoginPage from "../components/LoginForm";
import {login} from "../actions/ApiActions";

function LoginContainer(props) {
    const token = localStorage.getItem("token");

    if ((token != null && token !== '') || props.loggedIn)
        return <Redirect to="/" />;

    return <LoginPage errorText={props.errorText} onClickLogin={props.login}/>;
}

function mapStateToProps(state) {
    return {
        errorText: state.api.errorText,
        loggedIn: state.api.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => dispatch(login(username, password)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));