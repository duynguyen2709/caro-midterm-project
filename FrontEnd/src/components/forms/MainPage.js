import {Col, Row} from 'antd';
import ReactCardFlip from 'react-card-flip';
import React, {useCallback, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import Error from "../utils/Error";
import ProfileCard from "./ProfileCard";
import EditProfileCard from "./EditProfileCard";
import PlayButtons from "./PlayButtons";
import LoadingModal from "../../utils/LoadingModal";

const MainPage = ({errorText, user, isEditing, onClickUpdateInfo, onClickLogout}) => {

    const [flip, setFlip] = useState(false);

    const toggleFlip = useCallback(() => {
        setFlip(curr => !curr);
    }, []);

    useEffect(() => {
        if (!isEditing && flip)
            toggleFlip();
    // eslint-disable-next-line
    }, [isEditing]);

    if (errorText != null && errorText !== '')
        return <Error/>;

    return (
        <>
            {isEditing ? <LoadingModal/> : null}

            <Row type="flex" align="middle" justify="center" className="all-centered">

                <Col>
                    <ReactCardFlip isFlipped={flip}>

                        <ProfileCard key="front"
                                     user={user}
                                     onClickEdit={toggleFlip}/>

                        <EditProfileCard key="back"
                                         user={user}
                                         onClickUpdateInfo={onClickUpdateInfo}
                                         onClickCancel={toggleFlip}/>
                    </ReactCardFlip>
                </Col>

                <Col style={{margin: 'auto 50px', width: '200px'}}>
                    <PlayButtons onClickLogout={onClickLogout}/>
                </Col>

            </Row>
        </>)
};

export default MainPage;