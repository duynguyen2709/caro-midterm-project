import {Button, Col, Icon, Input, Row} from 'antd';
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../index.css';

const LoginForm = ({errorText, onClickLogin}) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return <Row type="flex" justify="center">
        <Col span={6} className="center">
            <div>
                <h1 style={{
                    textAlign: 'center',
                    color: '#464646'
                }}>
                    ĐĂNG NHẬP
                </h1>

                {errorText != null && errorText.toString() !== '' ?
                    <p style={{textAlign: 'center', color: 'red'}}>{errorText}</p>
                    : null}

                <Input
                    style={{marginBottom: 12}}
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    name="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="Username"
                />
                <Input
                    style={{marginBottom: 12}}
                    className="form-group"
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />

                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button horizontal-center"
                    onClick={() => onClickLogin(username, password)}
                >
                    Đăng Nhập
                </Button>

                <div style={{
                    textAlign: 'center',
                    marginTop: '10px'
                }}>
                    <a href="/register">Đăng Ký Tài Khoản</a>
                </div>
            </div>
        </Col>
    </Row>
};

export default LoginForm;