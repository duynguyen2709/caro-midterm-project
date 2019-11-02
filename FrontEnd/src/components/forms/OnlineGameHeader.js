import {Button, Col, Row} from "antd";
import React from 'react';

const OnlineGameHeader = React.memo((props) => {
    return (
        <>
            <Row type="flex" justify="start">
                <Col span={4}>
                    <Button style={{width: 'fit-content', fontWeight: 'bold'}}
                            type="primary"
                            icon="caret-left"
                            onClick={props.leaveRoom}>
                        Thoát
                    </Button>
                </Col>
                <Col span={6}>
                    <h2><b>Mã phòng:</b> {props.roomID}</h2>
                    <h2><b>Đối thủ:</b> {props.otherPlayerName}</h2>
                </Col>

            </Row>
        </>
    );
});

export default OnlineGameHeader;