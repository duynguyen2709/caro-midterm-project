import React from 'react';
import {connect} from 'react-redux';
import {Redirect, useHistory, withRouter} from 'react-router-dom'
import {getUser, logout} from "../../actions/ApiActions";
import Loading from "../../components/utils/Loading";
import MainPage from "../../components/forms/MainPage";

function MainPageContainer(props) {
    const token = localStorage.getItem("token");
    const history = useHistory();

    if (token == null || token === '')
        return <Redirect to="/login"/>;

    function redirect() {
        props.logout();
        history.push("/login");
    }

    if (props.user == null) {
        props.getUser();
        return <Loading />;
    }


    return <MainPage errorText={props.errorText}
                     user={props.user}
                     onClickLogout={redirect}/>;
}

function mapStateToProps(state) {
    return {
        errorText: state.api.errorText,
        loggedIn: state.api.loggedIn,
        user: state.api.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        getUser: () => dispatch(getUser())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageContainer));