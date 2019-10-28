import {Button, Card, Col, Icon, Row} from 'antd';
import * as React from 'react';
import {useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import Error from "../utils/Error";

const {Meta} = Card;

const MainPage = ({errorText, user, onClickLogout}) => {
    const history = useHistory();

    if (errorText != null && errorText !== '')
        return <Error/>;

    return <Row type="flex" align="middle" justify="center" className="all-centered">
        <Col>
            <Card hoverable
                  className="box-shadow"
                  style={{width: 300}}
                  cover={
                      <img className="avatar"
                           alt="avatar"
                           src={user.avatar}
                      />
                  }
                  actions={[
                      <span>
                          <Icon style={{marginRight: '10px'}} type="edit" key="edit"/>
                          Cập nhật thông tin
                      </span>
                  ]}
            >
                <Meta
                    title={user.fullName}
                    description={user.email}
                />
            </Card>
        </Col>
        <Col style={{margin: 'auto 50px'}}>
            <Button
                style={{
                    display: 'block',
                    background: '#f8a41c',
                    border: '0.1px solid #f8a41c'
                }}
                type="primary"
                size="large"
                block
                className="horizontal-center button-shadow"
                onClick={() => history.push("/game")}
            >
                Chơi Online
            </Button>

            <Button
                style={{display: 'block', marginTop: '20px'}}
                type="primary"
                htmlType="button"
                size="large"
                block
                className="horizontal-center button-shadow"
                onClick={() => history.push("/game")}
            >
                Chơi Với Máy
            </Button>

            <Button
                style={{display: 'block', marginTop: '20px'}}
                type="info"
                size="large"
                block
                htmlType="button"
                className="horizontal-center button-shadow"
                onClick={onClickLogout}
            >
                Đăng Xuất
            </Button>
        </Col>
    </Row>
};

export default MainPage;