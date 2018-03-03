import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import React, { Component } from 'react';
import {BrowserRouter } from 'react-router-dom';
import { connect } from "react-redux";
import openNotificationWithIcon from '../alertsandnotifications/notifications';
import { bindActionCreators } from 'redux';
import {newClient} from '../actions/clientAction';
import * as clientActions from '../actions/clientAction';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class ClientPage extends Component {
    
   constructor(props,context){
        super(props,context);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            msn:'',
            aError:[]
        }
        this.baseState = this.state;
        if(!localStorage.getItem("token")){
            setTimeout(
            function(){
                window.location.href = 'http://localhost:3000';
            }, 800);
        }
       // this.handleSubmit = this.handleSubmit.bind(this);
    }
 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form ----->: ', values);
        console.log(values.phone);
        this.props.dispatch(
            newClient(
            
                values.name,
                values.phone,
                values.dni,
                values.address,
                localStorage.getItem("token")
            
        )
       );
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Los password ingresados no son iguales!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
 
  
  componentWillReceiveProps(nextProps){
   console.log('next props',nextProps);
 
   if(nextProps.client === true){
        openNotificationWithIcon('success','Registro con exito',nextProps.msn);
        document.getElementById("cliente").reset();
        nextProps.form.resetFields();
        /*setTimeout(
            function(){
                window.location.href = 'http://localhost:3000/client';
            }, 800);*/
        }         
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
   
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Row type="flex" justify="center">   
          <Col span={18} >    
      <Form id="cliente" onSubmit={this.handleSubmit} className="top">
        <FormItem
          {...formItemLayout}
          label="Nombre:"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'El nombre es requerido!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Dirección:"
        >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'La direccion es requerida!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Cedula:"
        >
          {getFieldDecorator('dni', {
            rules: [{ required: true, message: 'La cedula es requerida!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Telefono:"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'El telefono es requerido!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
      
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Registrar cliente</Button>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <p style={{textAlign:'center',lineHeight:'25px'}}>
                <a href="/register_case" style={{textAlign:'center'}}>
                    Registrar caso
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


        console.log('maps',state);
    if(state.clientSet){
        if( state.clientSet.data ){
            if( state.clientSet.data.status === 'success'){ 
              return {
                status: 'success',
                msn: 'Registro con exito',
                client: true
              };
            }else if(state.clientSet.data.status === 'error'){
              return {
                status:'error',
                msn: state.clientSet.data.msnarray,
                client: false
              };
                
            }
        }else{
            return {
                status: 'error',
                msn: 'Error',
                client: false
            };
        }
    }else{
        return {
            
            status: 'no_dispatch',
            client: false
        };
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(clientActions,dispatch),
        dispatch,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(ClientPage));


