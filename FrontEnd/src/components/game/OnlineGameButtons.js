import React from 'react';
import {Button, Col, Row} from "antd";

const OnlineGameButtons = () => {
    return (<>
        <Row type="flex" justify="space-between"
             style={{
                 margin: 'auto 50px'
             }}
        >
            <Col span={7}>
                <Button type="primary"
                        className="button-shadow button-online"
                        block>
                    Xin đi lại
                </Button>
            </Col>
            <Col span={7}>
                <Button type="default"
                        className="button-shadow button-online"
                        block>
                    Xin hòa
                </Button>
            </Col>
            <Col span={7}>
                <Button type="danger"
                        className="button-shadow button-online"
                        block>
                    Đầu hàng
                </Button>
            </Col>

        </Row>
    </>)
};

export default OnlineGameButtons;