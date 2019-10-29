import {Button} from "antd";
import React from "react";
import {useHistory} from "react-router-dom";

const PlayButtons = React.memo(({onClickLogout}) => {
    const history = useHistory();

    return (<>
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
    </>)
});

export default PlayButtons;