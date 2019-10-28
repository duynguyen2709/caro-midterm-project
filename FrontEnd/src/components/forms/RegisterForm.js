import {Button, Card, Col, Icon, Input, Row} from 'antd';
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';

const RegisterForm = ({errorText, onClickRegister}) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    return (<div>
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
                        ĐĂNG KÝ TÀI KHOẢN
                    </h1>

                    <p style={{textAlign: 'center', color: 'red'}}>{errorText}</p>

                    <Input
                        style={{marginBottom: 12}}
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Tên Đăng Nhập"
                    />
                    <Input
                        style={{marginBottom: 12}}
                        className="form-group"
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật Khẩu"
                    />
                    <Input
                        style={{marginBottom: 12}}
                        className="form-group"
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                        placeholder="Nhập Lại Mật Khẩu"
                    />
                    <Input
                        style={{marginBottom: 12}}
                        prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        name="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <Input
                        style={{marginBottom: 12}}
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        name="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Họ tên"
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button horizontal-center button-shadow"
                        onClick={() => onClickRegister({
                            username,
                            password,
                            retypePassword,
                            email,
                            fullName
                        })}
                    >
                        Đăng Ký
                    </Button>

                    <div style={{
                        textAlign: 'center',
                        marginTop: '10px'
                    }}>
                        <a href="/login">Quay Lại Trang Đăng Nhập</a>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>)
};

export default RegisterForm;