import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";

const Loading = React.memo(() => {
    return (<div className="all-centered">
                <PulseLoader size={50}
                            color="#dea724"/>
            </div>)
});

export default Loading;