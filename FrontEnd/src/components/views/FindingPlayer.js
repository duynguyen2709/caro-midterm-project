import React from 'react';
import Loading from "../utils/Loading";

const FindingPlayer = React.memo(() => {
    return (<>
        <div className="all-centered" style={{
            paddingBottom: '150px',
            fontSize: '48px'
        }}>
            Đang Tìm Người Chơi Khác
        </div>
        <Loading/>
    </>)
});

export default FindingPlayer;