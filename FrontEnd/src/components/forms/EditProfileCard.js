import React, {useState, useCallback} from 'react';
import {Card} from "antd";
import ChangePasswordForm from "./ChangePasswordForm";
import UpdateInfoForm from "./UpdateInfoForm";

const EditProfileCard = React.memo(({errorText, user, onClickCancel}) => {
    const [avatar, setAvatar] = useState(user.avatar);
    const [isChangePassword, setIsChangePassword] = useState(false);

    const cancelChangePassword = useCallback(() => {
        setIsChangePassword(false);
        onClickCancel();
    },[onClickCancel]);

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
            <ChangePasswordForm errorText={errorText}
                                onClickCancel={cancelChangePassword}/> :

            <UpdateInfoForm user={user}
                            onClickCancel={onClickCancel}
                            setAvatar={setAvatar}
                            setIsChangePassword={setIsChangePassword}
            />}

    </Card>)
});
EditProfileCard.whyDidYouRender = true;
export default EditProfileCard;