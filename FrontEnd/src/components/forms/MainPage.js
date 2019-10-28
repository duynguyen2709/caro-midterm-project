import {Button, Col, Row} from 'antd';
import ReactCardFlip from 'react-card-flip';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import Error from "../utils/Error";
import ProfileCard from "./ProfileCard";
import EditProfileCard from "./EditProfileCard";

const MainPage = ({errorText, user, onClickLogout}) => {
    const history = useHistory();
    const [flip, setFlip] = useState(false);

    if (errorText != null && errorText !== '')
        return <Error/>;

    return (<Row type="flex" align="middle" justify="center" className="all-centered">
        <Col>
            <ReactCardFlip isFlipped={flip}>
                <ProfileCard key="front" user={user} onClickEdit={setFlip}/>
                <EditProfileCard key="back" user={user} onClickCancel={setFlip} />
            </ReactCardFlip>
        </Col>

        <Col style={{margin: 'auto 50px', width: '200px'}}>
            <Button
                style={{
                    display: 'block',
                    background: '#5cb85c',
                    border: '0.1px solid #5cb85c'
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
    </Row>)
};

export default MainPage;