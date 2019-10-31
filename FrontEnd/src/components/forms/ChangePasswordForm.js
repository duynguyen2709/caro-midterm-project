import React, {useEffect, useState} from 'react';
import {Button, Icon, Input} from "antd";
import {useDispatch} from "react-redux";
import {changePassword, setErrorText} from "../../actions/ApiActions";

const ChangePasswordForm = ({errorText, onClickCancel}) => {
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    useEffect(() => {
        if (errorText !== '')
            dispatch(setErrorText(''));
        // eslint-disable-next-line
    },[]);

    const updatePassword = () => {
        if (errorText !== '')
            dispatch(setErrorText(''));

        if (oldPassword === '' || password === '' || retypePassword === ''){
            dispatch(setErrorText('Mật khẩu không được rỗng. Vui lòng nhập lại'));
            return;
        }

        if (password !== retypePassword) {
            dispatch(setErrorText('Mật khẩu mới không khớp. Vui lòng nhập lại'));
            return;
        }

        dispatch(changePassword(password));
    };

    return (<>
        <p style={{
            width:'190px',
            textAlign: 'center',
            color: 'red',
            marginTop: '-10px'}}
        >
            {errorText}
        </p>

        <Input
            style={{marginBottom: 12}}
            className="form-group"
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="Mật Khẩu Cũ"
        />
        <Input
            style={{marginBottom: 12}}
            className="form-group"
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Mật Khẩu Mới"
        />
        <Input
            style={{marginBottom: 12}}
            className="form-group"
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            type="password"
            placeholder="Nhập Lại Mật Khẩu"
        />
        <Button
            type="default"
            className="button-shadow"
            style={{float: 'left', marginTop: '5px'}}
            onClick={onClickCancel}
        >
            Hủy
        </Button>
        <Button
            type="primary"
            className="button-shadow"
            style={{float: 'right', marginTop: '5px'}}
            onClick={updatePassword}
        >
            Cập Nhật
        </Button>
    </>)
};
ChangePasswordForm.whyDidYouRender = true;
export default ChangePasswordForm;