import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import ClientPage from './components/client/ClientPage';
import CasePage from './components/case/CasePage';
import { Row, Col } from 'antd';


class App extends Component {
  
  render() {
   
    return (
    <Row>
        <Col span={24}>
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/register_client" component={ClientPage} />
                <Route exact path="/register_case" component={CasePage} />
            </Switch>
        </Router>
        </Col>
    </Row>
    );
  }
}

export default App;
