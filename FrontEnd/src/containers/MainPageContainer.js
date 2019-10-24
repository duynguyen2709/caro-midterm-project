import React from 'react';
import {connect} from 'react-redux';
import {Redirect, useHistory, withRouter} from 'react-router-dom'
import MainPage from "../components/MainPage";
import {getUsername, logout} from "../actions/ApiActions";

function MainPageContainer(props) {
    const token = localStorage.getItem("token");
    const history = useHistory();

    if (token == null || token === '')
        return <Redirect to="/login" />;

    function redirect(){
        props.logout();
        history.push("/login");
    }
    if (props.errorText == null || props.errorText === '')
        props.getUsername();

    return <MainPage errorText={props.errorText}
                     username={props.username}
                     onClickLogout={redirect}/>;
}

function mapStateToProps(state) {
    return {
        errorText: state.api.errorText,
        loggedIn: state.api.loggedIn,
        username: state.api.username
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        getUsername: () => dispatch(getUsername())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageContainer));