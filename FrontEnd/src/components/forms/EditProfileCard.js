import React, {useState} from 'react';
import {Card} from "antd";
import ChangePasswordForm from "./ChangePasswordForm";
import UpdateInfoForm from "./UpdateInfoForm";

const EditProfileCard = React.memo(({user, onClickCancel}) => {
    const [avatar, setAvatar] = useState(user.avatar);
    const [isChangePassword, setIsChangePassword] = useState(false);

    return (<Card hoverable
                  className="box-shadow"
                  style={{width: 250, textAlign: 'center'}}
                  cover={
                      <img className="avatar"
                           alt="avatar"
                           src={avatar}
                      />
                  }>

        {isChangePassword ?
            <ChangePasswordForm/> :
            <UpdateInfoForm user={user}
                            onClickCancel={onClickCancel}
                            setAvatar={setAvatar}
                            setIsChangePassword={setIsChangePassword}
            />}

    </Card>)
});

export default EditProfileCard;