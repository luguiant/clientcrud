import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,Row, Col } from 'antd';
import loginApi from '../../apis/apiLogin';
import {LoginAuth} from '../actions/loginActions';
import {storeToken} from '../actions/loginActions';
import {BrowserRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import openNotificationWithIcon from '../alertsandnotifications/notifications';
import {defaultAction} from '../actions/loginActions';

const FormItem = Form.Item;


class LoginPage extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            errorEmail: '',
            errorPassw: '',
            email:'',
            password:'',
            login:[],
            submit: false,
        }
        this.baseState = this.state;
       // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    submit:true
                });
                this.props.dispatch(LoginAuth(values.email,values.password));
            }else{
                this.setState({
                    submit:false
                });
            }
        });


    }
    
    componentDidMount(){
       if(localStorage.getItem("token")){
            openNotificationWithIcon('success','Login con exito','Felicidades te has logueado componentDidMount');
             setTimeout(
            function(){
                window.location.href = 'http://localhost:3000/register_client';
            }, 800);
        
       }
    }

    render() {

        const { getFieldDecorator} = this.props.form;
        return (
            <Row type="flex" justify="space-around" align="middle">
                <Col span="6">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem style={{marginBottom: '10px'}} >
                            {   getFieldDecorator('email', {
                                rules: [{ required: true, message: 'El password es requerido!' }],
                            })(
                                <Input onChange = {((evt) => this.setState({email:evt.target.value}))}
                                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       placeholder="email" />
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom: '10px'}}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'El password es requerido!' }],
                            })(
                                <Input onChange = {((evt) => this.setState({password:evt.target.value}))}
                                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                                Login
                            </Button>
                            <br/>
                            <p style={{textAlign:'center',lineHeight:'25px'}}>
                                <a href="/register" style={{textAlign:'center'}}>
                                    Registro
                                </a>
                            </p>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state,ownProps){
   
    console.log('mapStateToProps',state.loginSet);    
    return {
        errorEmail:'',
        errorPassw:'',
        login: state.loginSet
    };

}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(loginActions,dispatch),
        dispatch,
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(LoginPage));