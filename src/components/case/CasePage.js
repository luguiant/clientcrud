import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import React, { Component } from 'react';
import {BrowserRouter } from 'react-router-dom';
import { connect } from "react-redux";
import openNotificationWithIcon from '../alertsandnotifications/notifications';

import CaseApi from '../../apis/caseApi';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class CasePage extends Component {
    
   objProduct = null; 
   constructor(props,context){
        super(props,context);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            msn:'',
            aError:[]
        }
        this.baseState = this.state;
        this.objProduct = new CaseApi();
        
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
        this.objProduct.newCaseApi(
            values.descripcion,
            values.numero_caso,
            values.cliente_id,
            values.asesor_id).then(response => {
            if(response.data){
                if(response.data.status === 'success'){
                    openNotificationWithIcon('success','Exito','El caso fue regostrado con exito');
                    console.log('props',this.props);
                }else if(response.data.status === 'error'){
                    if(response.data.msnarray){
                       response.data.msnarray.map(error =>
                               openNotificationWithIcon('error','Error al registrar',error)
                       ); 
                    }
                }
            }
          })
          .catch();
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
          label="Descriptción:"
        >
          {getFieldDecorator('descripcion', {
            rules: [{ required: true, message: 'La descripción es requerida!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Nro del caso:"
        >
          {getFieldDecorator('numero_caso', {
            rules: [{ required: true, message: 'El numero del caso es requerido!' }],
          })(
            <Input style={{ width: '100%' }} type="number" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Cliente:"
        >
          {getFieldDecorator('cliente_id', {
            rules: [{ required: true, message: 'El cliente es requerido!' }],
          })(
           <Select>
            <Option value="1">fredy mauricio</Option>
            <Option value="2">fredy mauricio</Option>
            <Option value="3">fredy mauricio</Option>
            <Option value="4">fredy mauricio</Option>
            <Option value="5">fredy mauricio</Option>
            
          </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Asesor:"
        >
          {getFieldDecorator('asesor_id', {
            rules: [{ required: true, message: 'El Asesor es requerido!' }],
          })(
           <Select>
            <Option value="13">fredy mauricio</Option>
          </Select>
          )}
        </FormItem>
      
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Registrar caso</Button>
        </FormItem>
         <FormItem {...tailFormItemLayout}>
          <p style={{textAlign:'center',lineHeight:'25px'}}>
                <a href="/register_client" style={{textAlign:'center'}}>
                    Registrar clientes
                </a>
            </p>
        </FormItem>
       
      </Form>
      </Col>
      </Row>
    );
  }
}



export default Form.create()(CasePage);

