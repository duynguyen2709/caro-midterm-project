import {Button, Col, Icon, Input, Row} from 'antd';
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../index.css';

const LoginForm = ({errorText, onClickLogin}) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
            <Row type="flex" justify="center" align="top">
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
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="horizontal-center social-login-button"
                                onClick={() => onClickLogin(username, password)}
                                block={false}>
                                Đăng Nhập
                            </Button>

                            <Button
                                type="primary"
                                className="horizontal-center social-login-button"
                                onClick={() => onClickLogin(username, password)}
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
                                className="horizontal-center social-login-button"
                                onClick={() => onClickLogin(username, password)}
                                style={{
                                    background: '#d34836',
                                    borderColor: '#d34836'
                                }}>
                                <Icon type="google-circle" theme="filled" style={{fontSize: '20px'}} />
                                Đăng Nhập Bằng Google
                            </Button>
                        </div>

                        <div style={{
                            textAlign: 'center',
                            marginTop: '10px'
                        }}>
                            <a href="/register" style={{fontWeight:'bold'}}>Đăng Ký Tài Khoản</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
};

export default LoginForm;