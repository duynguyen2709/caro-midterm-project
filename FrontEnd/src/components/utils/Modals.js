import {Modal} from "antd";

export function ModalOutRoom(onOk){
    Modal.warning({
        title: 'Thông Báo',
        content: 'Đối Thủ Của Bạn Đã Thoát',
        onOk
    });
}