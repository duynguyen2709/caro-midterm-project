import React from 'react';
import {Card, Icon} from "antd";

const {Meta} = Card;

const ProfileCard = ({user, onClickEdit}) => {

    return (<Card hoverable
                  className="box-shadow"
                  style={{width: 250, textAlign: 'center'}}
                  cover={
                      <img className="avatar"
                           alt="avatar"
                           src={user.avatar}
                      />
                  }
                  actions={[
                      <span onClick={() => onClickEdit(true)}>
                          <Icon style={{marginRight: '10px'}} type="edit" key="edit"/>
                          Cập nhật thông tin
                      </span>
                  ]}>
        <Meta
            title={user.fullName}
            description={user.email}
        />
    </Card>)
};

export default ProfileCard;