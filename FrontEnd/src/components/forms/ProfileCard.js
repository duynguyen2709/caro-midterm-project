import React from 'react';
import {Card, Icon} from "antd";

const {Meta} = Card;

const ProfileCard = React.memo(({user, onClickEdit}) => {

    return (<Card hoverable
                  className="box-shadow"
                  style={{width: 250, height: 467, textAlign: 'center'}}
                  cover={
                      <img className="avatar"
                           alt="avatar"
                           src={user.avatar}
                      />
                  }
                  actions={[
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                      <span onClick={onClickEdit} style={{fontSize: '16px'}}>
                          <Icon style={{marginRight: '10px'}} type="edit" key="edit"/>
                          Cập nhật thông tin
                      </span>
                  ]}>
        <Meta
            title={user.fullName}
            description={user.email}
        />
    </Card>)
});

export default ProfileCard;