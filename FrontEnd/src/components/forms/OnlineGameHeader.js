import {Button, Col, Row} from "antd";
import React from 'react';

const OnlineGameHeader = React.memo(({roomID, otherPlayerName, leaveRoom}) => {
    return (
        <>
            <Row type="flex" justify="start">
                <Col span={4}>
                    <Button style={{width: 'fit-content', fontWeight: 'bold'}}
                            type="primary"
                            icon="caret-left"
                            onClick={leaveRoom}>
                        Thoát
                    </Button>
                </Col>
                <Col span={6}>
                    <h2><b>Mã phòng:</b> {roomID}</h2>
                    <h2><b>Đối thủ:</b> {otherPlayerName}</h2>
                </Col>

            </Row>
        </>
    );
});

export default OnlineGameHeader;