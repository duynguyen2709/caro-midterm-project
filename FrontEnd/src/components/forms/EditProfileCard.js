import React, {useState} from 'react';
import {Button, Card, Icon, Input} from "antd";
import AvatarUpload from "./AvatarUpload";

const EditProfileCard = React.memo(({user, onClickUpdateInfo, onClickCancel}) => {
    const [email, setEmail] = useState(user.email);
    const [fullName, setFullName] = useState(user.fullName);
    const [avatar, setAvatar] = useState(user.avatar);
    const [avatarFile, setAvatarFile] = useState(null);

    const updateInfo = () => {
        const formData = new FormData();
        if (avatarFile)
            formData.append("file", avatarFile.originFileObj);
        formData.append("username", user.username);
        formData.append("email", email);
        formData.append("fullName", fullName);
        formData.append("avatar", user.avatar);

        onClickUpdateInfo(formData);
    };

    return (<Card hoverable
                  className="box-shadow"
                  style={{width: 250, textAlign: 'center'}}
                  cover={
                      <img className="avatar"
                           alt="avatar"
                           src={avatar}
                      />
                  }
    >
        <AvatarUpload setAvatar={setAvatar} setFile={setAvatarFile}/>

        <Input
            style={{marginBottom: 12}}
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
            name="username"
            type="text"
            defaultValue={user.username}
            disabled
        />
        <Input
            style={{marginBottom: 12}}
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
            name="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Họ tên"
        />
        <Input
            style={{marginBottom: 12}}
            prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />
        <Button
            type="default"
            className="button-shadow"
            style={{float: 'left', marginTop: '5px'}}
            onClick={onClickCancel}
        >
            Hủy
        </Button>
        <Button
            type="primary"
            className="button-shadow"
            style={{float: 'right', marginTop: '5px'}}
            onClick={updateInfo}
        >
            Cập Nhật
        </Button>
    </Card>)
});

export default EditProfileCard;