import {Col, Row} from 'antd';
import ReactCardFlip from 'react-card-flip';
import React, {useCallback, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import ProfileCard from "../forms/ProfileCard";
import EditProfileCard from "../forms/EditProfileCard";
import PlayButtons from "../forms/PlayButtons";
import LoadingModal from "../../utils/LoadingModal";

const MainPage = ({errorText, user, isEditing}) => {

    const [flip, setFlip] = useState(false);

    const toggleFlip = useCallback(() => {
        setFlip(curr => !curr);
    }, []);

    useEffect(() => {
        if (errorText === '' && !isEditing && flip)
            toggleFlip();
        // eslint-disable-next-line
    }, [isEditing, errorText]);

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
                                         errorText={errorText}
                                         user={user}
                                         onClickCancel={toggleFlip}/>
                    </ReactCardFlip>
                </Col>

                <Col style={{margin: 'auto 50px', width: '200px'}}>
                    <PlayButtons/>
                </Col>

            </Row>
        </>)
};
MainPage.whyDidYouRender = true;
export default MainPage;