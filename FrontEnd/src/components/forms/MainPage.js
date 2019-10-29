import {Col, Row} from 'antd';
import ReactCardFlip from 'react-card-flip';
import React, {useCallback, useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import Error from "../utils/Error";
import ProfileCard from "./ProfileCard";
import EditProfileCard from "./EditProfileCard";
import PlayButtons from "./PlayButtons";

const MainPage = ({errorText, user, onClickLogout}) => {

    const [flip, setFlip] = useState(false);

    const toggleFlip = useCallback(() => {
        setFlip(curr => !curr);
    }, []);

    if (errorText != null && errorText !== '')
        return <Error/>;

    return (<Row type="flex" align="middle" justify="center" className="all-centered">

        <Col>
            <ReactCardFlip isFlipped={flip}>
                <ProfileCard key="front" user={user} onClickEdit={toggleFlip}/>
                <EditProfileCard key="back" user={user} onClickCancel={toggleFlip}/>
            </ReactCardFlip>
        </Col>

        <Col style={{margin: 'auto 50px', width: '200px'}}>
            <PlayButtons onClickLogout={onClickLogout}/>
        </Col>

    </Row>)
};

export default MainPage;