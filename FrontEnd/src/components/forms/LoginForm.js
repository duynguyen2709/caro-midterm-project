import {Card, Col, Icon, Input, Row} from 'antd';
import React, {useState, useCallback} from 'react';
import {useDispatch} from "react-redux";
import 'antd/dist/antd.css';
import '../../index.css';
import LoginButtons from "./LoginButtons";
import LoadingModal from "../../utils/LoadingModal";
import {login} from "../../actions/ApiActions";

const LoginForm = ({errorText, isLoading}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const loginCallback = useCallback(
        () => dispatch(login(username, password)),
        [dispatch, username, password]
    );

    return <>
            <Row type="flex" justify="center">
                <img alt="logo" src={`${process.env.PUBLIC_URL}logo.png`}
                     style={{
                         marginLeft: '-50px',
                         marginTop: '50px'
                     }}
                />
            </Row>

            {isLoading ? <LoadingModal/> : null}

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
                            style={{marginBottom: 15}}
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

                        <LoginButtons onClickLogin={loginCallback} />

                        <div style={{
                            textAlign: 'center',
                            marginTop: '15px'
                        }}>
                            <a href="/register">Đăng Ký Tài Khoản</a>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
};

export default LoginForm;