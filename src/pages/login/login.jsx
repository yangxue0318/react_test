import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less'
import logo from './images/logo.png'
const Item =Form.Item
export default class Login extends Component{
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    render(){
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>>
                    <h1>后台管理系统</h1>
                </div>
               <div className="login-content">
                   <h1>用户登录</h1>
                   <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
        
        </Item>
        <Form.Item>
          
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
        
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
           登录
          </Button>
        </Form.Item>
      </Form>
               </div>
            </div>
        )
    }

}