import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'
import {getUser} from "../../actions/ApiActions";
import Loading from "../../components/utils/Loading";
import MainPage from "../../components/forms/MainPage";

function MainPageContainer(props) {
    const token = localStorage.getItem("token");

    if (token == null || token === '')
        return <Redirect to="/login"/>;

    if (props.user == null) {
        props.getUser();
        return <Loading/>;
    }

    return <MainPage errorText={props.errorText}
                     user={props.user}
                     isEditing={props.isEditing} />;
}

function mapStateToProps(state) {
    return {
        errorText: state.api.errorText,
        user: state.api.user,
        isEditing: state.api.isEditing,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageContainer));