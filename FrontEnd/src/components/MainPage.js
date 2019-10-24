import {Button, Col, Row} from 'antd';
import * as React from 'react';
import {useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../index.css';
import Error from "./Error";

const MainPage = ({errorText, username, onClickLogout}) => {
    const history = useHistory();

    if (errorText != null && errorText !== '')
        return <Error/>;

    return <Row type="flex" justify="center">
        <Col span={6} className="center">
            <h1 style={{
                textAlign: 'center',
                color: '#464646'
            }}>
                Xin Chào <b>{username}</b>
            </h1>

            <Button
                style={{display: 'block'}}
                type="primary"
                htmlType="button"
                className="horizontal-center"
                onClick={() => history.push("/game")}
            >
                Chơi Game
            </Button>

            <Button
                style={{display: 'block', marginTop: '15px'}}
                type="info"
                htmlType="button"
                className="horizontal-center"
                onClick={onClickLogout}
            >
                Đăng Xuất
            </Button>
        </Col>
    </Row>
};

export default MainPage;