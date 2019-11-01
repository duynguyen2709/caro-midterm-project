import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'
import LoginPage from "../../components/views/LoginPage";

function LoginContainer(props) {
    const token = localStorage.getItem("token");

    if ((token != null && token !== '') || props.loggedIn)
        return <Redirect to="/"/>;

    return <LoginPage errorText={props.errorText}
                      isLoading={props.isLoading}
    />;
}

function mapStateToProps(state) {
    return {
        errorText: state.api.errorText,
        loggedIn: state.api.loggedIn,
        isLoading: state.api.isLoading,
    };
}

export default withRouter(connect(mapStateToProps, null)(LoginContainer));