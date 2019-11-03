import React from 'react';
import {Button, Upload} from "antd";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const AvatarUpload = React.memo(({setAvatar, setFile}) => {

    const handleUpload = ({fileList}) => {
        const file = [...fileList.slice(-1)];
        getBase64(file[0].originFileObj, avatar => {
                setAvatar(avatar);
                setFile(file[0]);
            }
        );
    };

    return (
        <>
            <Upload accept="image/*"
                    showUploadList={false}
                    onChange={handleUpload}
                    beforeUpload={() => false}
            >
                <div className="horizontal-center"
                     style={{position: 'absolute', zIndex: '1', top: '220px'}}>
                    <Button type="dashed"
                            className="button-shadow"
                            icon="plus"
                            style={{
                                borderColor: '#ff8888'
                            }}
                    >
                        Đổi avatar
                    </Button>
                </div>
            </Upload>
        </>
    );
});

export default AvatarUpload;