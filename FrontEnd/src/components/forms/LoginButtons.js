import {Button, Icon} from "antd";
import React, {useCallback} from 'react';
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import '../../index.css';
import {loginWithFacebook, loginWithGoogle} from "../../actions/ApiActions";

const LoginButtons = ({onClickLogin}) => {
    const dispatch = useDispatch();

    const loginFacebook = useCallback(
        () => dispatch(loginWithFacebook()),
        [dispatch]
    );

    const loginGoogle = useCallback(
        () => dispatch(loginWithGoogle()),
        [dispatch]
    );

    return (<div style={{display: 'flex', flexDirection: 'column'}}>
        <Button
            type="primary"
            htmlType="submit"
            className="horizontal-center social-login-button button-shadow"
            onClick={onClickLogin}
        >
            Đăng Nhập
        </Button>

        <Button
            type="primary"
            className="horizontal-center social-login-button button-shadow"
            onClick={loginFacebook}
            style={{
                background: '#4267B2',
                borderColor: '#4267B2'
            }}
        >
            <Icon type="facebook" theme="filled" style={{fontSize: '20px'}}/>
            Đăng Nhập Bằng Facebook
        </Button>

        <Button
            type="primary"
            className="horizontal-center social-login-button button-shadow"
            onClick={loginGoogle}
            style={{
                background: '#d34836',
                borderColor: '#d34836'
            }}
        >
            <Icon type="google-circle" theme="filled" style={{fontSize: '20px'}}/>
            Đăng Nhập Bằng Google
        </Button>
    </div>)
};
LoginButtons.whyDidYouRender = true;
export default LoginButtons;