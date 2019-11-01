import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import React from 'react';
import RegisterPage from '../../components/views/RegisterPage';
import {register, setErrorText} from "../../actions/ApiActions";

function RegisterContainer(props) {

    function validateInfo(user) {
        const {username, password, retypePassword, email, fullName} = user;

        if (username === '' || password === '' ||
            email === '' || fullName === '') {
            props.setErrorText('Thông tin không được rỗng. Vui lòng nhập lại');
            return;
        }

        if (password !== retypePassword) {
            props.setErrorText('Mật khẩu không khớp. Vui lòng nhập lại');
            return;
        }

        props.register(user);
    }

    return <RegisterPage errorText={props.errorText}
                         isLoading={props.isLoading}
                         onClickRegister={validateInfo}/>
}
RegisterContainer.whyDidYouRender = true;

function mapStateToProps(state) {
    return {
        errorText: state.api.errorText,
        isLoading: state.api.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setErrorText: (err) => dispatch(setErrorText(err)),
        register: (user) => dispatch(register(user)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));