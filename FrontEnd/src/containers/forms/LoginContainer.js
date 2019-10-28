import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'
import LoginPage from "../../components/forms/LoginForm";
import {login, loginWithFacebook, loginWithGoogle} from "../../actions/ApiActions";

function LoginContainer(props) {
    const token = localStorage.getItem("token");

    if ((token != null && token !== '') || props.loggedIn)
        return <Redirect to="/"/>;

    return <LoginPage errorText={props.errorText}
                      isLoading={props.isLoading}
                      onClickLogin={props.login}
                      onClickLoginFacebook={props.loginWithFacebook}
                      onClickLoginGoogle={props.loginWithGoogle}
    />;
}

function mapStateToProps(state) {
    return {
        errorText: state.api.errorText,
        loggedIn: state.api.loggedIn,
        isLoading: state.api.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => dispatch(login(username, password)),
        loginWithFacebook: () => dispatch(loginWithFacebook()),
        loginWithGoogle: () => dispatch(loginWithGoogle()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));