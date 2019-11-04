import {Col, Row} from "antd";
import * as React from "react";

const Error = React.memo(() => {
    return (<Row type="flex" justify="center">
        <Col span={6} className="center">
            <h1 style={{
                textAlign: 'center',
                color: 'red'
            }}>
                Đã có lỗi xảy ra.
            </h1>
            <h1 style={{
                textAlign: 'center',
                color: 'red'
            }}>
                Vui lòng thử lại sau.
            </h1>
        </Col>
    </Row>)
});

export default Error;