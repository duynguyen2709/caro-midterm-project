import {Button} from "antd";
import React, {useCallback} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../actions/ApiActions";

const PlayButtons = React.memo(() => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutCallback = useCallback(() => {
        dispatch(logout());
    },[dispatch]);

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
            onClick={() => history.push("/onlinegame")}
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
            onClick={() => history.push("/offlinegame")}
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
            onClick={logoutCallback}
        >
            Đăng Xuất
        </Button>
    </>)
});
PlayButtons.whyDidYouRender = true;
export default PlayButtons;