import React from 'react';
import {Button, Col, Row} from "antd";
import {ModalConfirm} from "../utils/Modals";

const OnlineGameButtons = (props) => {
    return (<>
        <Row type="flex" justify="space-between"
             style={{
                 margin: 'auto 50px'
             }}
        >
            <Col span={7}>
                <Button type="primary"
                        className="button-shadow button-online"
                        block
                        onClick={() => ModalConfirm('Bạn Xác Nhận Muốn Xin Đi Lại ?',
                            props.onUndoClick)}
                >
                    Xin đi lại
                </Button>
            </Col>
            <Col span={7}>
                <Button type="default"
                        className="button-shadow button-online"
                        block
                        onClick={() => ModalConfirm('Bạn Xác Nhận Muốn Xin Hòa ?',
                            props.onDrawClick)}
                >
                    Xin hòa
                </Button>
            </Col>
            <Col span={7}>
                <Button type="danger"
                        className="button-shadow button-online"
                        block
                        onClick={() => ModalConfirm('Bạn Xác Nhận Muốn Đầu Hàng ?',
                            props.onSurrenderClick)}
                >
                    Đầu hàng
                </Button>
            </Col>

        </Row>
    </>)
};
export default OnlineGameButtons;