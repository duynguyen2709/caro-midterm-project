import {Button, Icon} from "antd";
import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';

const LoginButtons = ({onClickLogin, onClickLoginFacebook}) => {
  return (<div style={{display: 'flex', flexDirection: 'column'}}>
      <Button
          type="primary"
          htmlType="submit"
          className="horizontal-center social-login-button"
          onClick={onClickLogin}
          block={false}>
          Đăng Nhập
      </Button>

      <Button
          type="primary"
          className="horizontal-center social-login-button"
          onClick={onClickLoginFacebook}
          style={{
              background: '#4267B2',
              borderColor: '#4267B2'
          }}
      >
          <Icon type="facebook" theme="filled" style={{fontSize: '20px'}}/>
          Đăng Nhập Bằng Facebook
      </Button>

      <Button
          type="primary"
          className="horizontal-center social-login-button"
          onClick={onClickLogin}
          style={{
              background: '#d34836',
              borderColor: '#d34836'
          }}>
          <Icon type="google-circle" theme="filled" style={{fontSize: '20px'}}/>
          Đăng Nhập Bằng Google
      </Button>
  </div>)
};


export default LoginButtons;