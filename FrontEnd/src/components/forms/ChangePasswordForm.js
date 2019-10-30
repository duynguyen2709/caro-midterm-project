import React, {useState} from 'react';
import {Button, Icon, Input} from "antd";

const ChangePasswordForm = ({onClickCancel, onClickUpdate}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    return (<>
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
            onClick={onClickUpdate}
        >
            Cập Nhật
        </Button>
    </>)
};

export default ChangePasswordForm;