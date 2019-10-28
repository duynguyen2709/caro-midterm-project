import React, {useState} from 'react';
import {Button, Card, Icon, Input} from "antd";

const EditProfileCard = ({user, onClickCancel}) => {
    const [email, setEmail] = useState(user.email);
    const [fullName, setFullName] = useState(user.fullName);

    return (<Card hoverable
                  className="box-shadow"
                  style={{width: 250, textAlign: 'center'}}
                  cover={
                      <img className="avatar"
                           alt="avatar"
                           src={user.avatar}
                      />
                  }
    >
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
            style={{float: 'left'}}
            onClick={() => onClickCancel(false)}
        >
            Hủy
        </Button>
        <Button
            type="primary"
            className="button-shadow"
            style={{float: 'right'}}
        >
            Cập Nhật
        </Button>
    </Card>)
};

export default EditProfileCard;