import {Card, Col, Icon, Input, Row} from 'antd';
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import LoginButtons from "./LoginButtons";

const LoginForm = ({errorText, onClickLogin, onClickLoginFacebook}) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
            <Row type="flex" justify="center">
                <img alt="logo" src={`${process.env.PUBLIC_URL}logo.png`}
                     style={{
                         marginLeft: '-50px',
                         marginTop: '50px'
                     }}
                />
            </Row>
            <Row type="flex" justify="center">
                <Col span={6} className="center">

                    <Card style={{
                        borderRadius: '10px'
                    }}>
                        <h1 style={{
                            textAlign: 'center',
                            color: '#464646'
                        }}>
                            ĐĂNG NHẬP
                        </h1>

                        <p style={{textAlign: 'center', color: 'red'}}>{errorText}</p>

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

                        <LoginButtons onClickLogin={() => onClickLogin(username,password)}
                                      onClickLoginFacebook={onClickLoginFacebook}/>

                        <div style={{
                            textAlign: 'center',
                            marginTop: '10px'
                        }}>
                            <a href="/register" style={{fontWeight: 'bold'}}>Đăng Ký Tài Khoản</a>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
};

export default LoginForm;