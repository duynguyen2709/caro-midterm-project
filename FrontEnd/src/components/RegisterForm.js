import {Button, Col, Icon, Input, Row} from 'antd';
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../index.css';

const RegisterForm = ({errorText, onClickRegister}) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    return <Row type="flex" justify="center">
        <Col span={6} className="center">
            <h1 style={{
                textAlign: 'center',
                color: '#464646'
            }}>
                ĐĂNG KÝ TÀI KHOẢN
            </h1>

            {errorText != null && errorText.toString() !== '' ?
                <p style={{textAlign: 'center', color: 'red'}}>{errorText}</p>
                : null}

            <Input
                style={{marginBottom: 12}}
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
            />
            <Input
                style={{marginBottom: 12}}
                className="form-group"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Input
                style={{marginBottom: 12}}
                className="form-group"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                placeholder="Retype Password"
            />
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button horizontal-center"
                onClick={() => onClickRegister(username, password, retypePassword)}
            >
                Đăng Ký
            </Button>

            <div style={{
                textAlign: 'center',
                marginTop: '10px'
            }}>
                <a href="/login">Quay Lại Trang Đăng Nhập</a>
            </div>
        </Col>
    </Row>
};

export default RegisterForm;