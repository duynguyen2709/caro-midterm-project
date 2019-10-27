import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'
import LoginPage from "../../components/forms/LoginForm";
import {login, loginWithFacebook} from "../../actions/ApiActions";

function LoginContainer(props) {
    const token = localStorage.getItem("token");

    if ((token != null && token !== '') || props.loggedIn)
        return <Redirect to="/" />;

    return <LoginPage errorText={props.errorText}
                      onClickLogin={props.login}
                      onClickLoginFacebook={props.loginWithFacebook}
    />;
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
        loginWithFacebook: () => dispatch(loginWithFacebook()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));